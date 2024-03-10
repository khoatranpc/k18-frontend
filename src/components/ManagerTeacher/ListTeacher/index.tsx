import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import ManagerTeacherContext from '../context';
import { Obj } from '@/global/interface';
import { useGetArea, useImportCSVDataTeacher, useListTeacher, useTeacherRegisterCourse } from '@/utils/hooks';
import { ComponentPage } from '@/global/enum';
import CombineRoute from '@/global/route';
import { useHookMessage } from '@/utils/hooks/message';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import { AppDispatch } from '@/store';
import Table from '@/components/Table';
import ToolBar from '@/components/Tabs/ToolBar';
import { getColums, mapRowData } from './config';
import styles from '@/styles/teacher/ManagerTeacher.module.scss';

const ListTeacher = () => {
    const { listTeacher, query } = useListTeacher();
    const importCSVDataTeacher = useImportCSVDataTeacher();
    const message = useHookMessage();
    const getDataImportCSV = importCSVDataTeacher.data;
    const getListTeacher = listTeacher.response?.data as Obj;
    const dataTeacherRegisterCourse = useTeacherRegisterCourse();
    const router = useRouter();
    const area = useGetArea();
    const getAreas = area.data.response?.data as Obj[];
    const dispatch = useDispatch<AppDispatch>();
    const firstQuery = useRef(true);
    const columns = getColums(undefined, getAreas, dataTeacherRegisterCourse.listData.isLoading);
    const rowData = mapRowData((listTeacher.response?.data as Obj)?.listTeacher || [], (dataTeacherRegisterCourse.listData.response?.data as Array<Obj>) || []);
    const handleQueryListTeacher = (rowOnPage: number, currentPage: number) => {
        query(rowOnPage, currentPage);
    }
    const handleClickRow = (record: Obj) => {
        const payload: PayloadRoute = {
            payload: {
                component: ComponentPage.TEACHER_DETAIL,
                route: CombineRoute['TE']['MANAGER']['DETAILTEACHER'],
                title: `Giáo viên: ${record.fullName as string}`,
                hasBackPage: true,
                replaceTitle: `Giáo viên: ${record.fullName as string}`,
                moreData: {
                    teacherId: record._id
                }
            }
        }
        dispatch(initDataRoute(payload));
        router.push(`/te/manager/teacher/detail/${record._id as string}`);
    }
    useEffect(() => {
        if (!getListTeacher || (getListTeacher && !getListTeacher.currentPage) || !listTeacher.payload?.query?.query?.currentPage) {
            handleQueryListTeacher(10, 1);
        }
        if (!area.data.success) {
            area.query();
        }
    }, []);
    useEffect(() => {
        if (listTeacher.payload?.query?.query?.currentPage) {
            if (firstQuery.current && listTeacher.success) {
                firstQuery.current = false;
                const getListId = ((listTeacher.response?.data as Obj)?.listTeacher as Array<Obj>)?.map((item) => item._id) || [];
                dataTeacherRegisterCourse.query(getListId);
            }
        }
    }, [listTeacher]);
    useEffect(() => {
        if (getDataImportCSV.response) {
            message.open({
                type: getDataImportCSV.success ? 'success' : 'error',
                content: (getDataImportCSV.response as Obj)?.message as string
            });
            importCSVDataTeacher.clear?.();
            message.close();
        }
    }, [getDataImportCSV]);
    return (
        <div className={styles.listTeacher}>
            <ToolBar
                context={ManagerTeacherContext}
                onClickReload={() => {
                    handleQueryListTeacher(getListTeacher?.recordOnPage ?? 10, getListTeacher?.currentPage ?? 1);
                }}
                listFilter={[]}
                exportCSVButton
                createButton
                iconReload
                enableImportCSV
                loadingImport={importCSVDataTeacher.data.isLoading}
                onImportCSV={(data) => {
                    // console.log(data) 
                    const formData = new FormData();
                    if (data) {
                        formData.append("csvFile", data as File);
                        importCSVDataTeacher.query({
                            body: formData,
                            headers: {
                                "Content-Type": "mutilpart/form-data"
                            }
                        });
                    }
                }}
            />
            <Table
                loading={listTeacher.isLoading}
                className={styles.tableManagerTeacher}
                disableDefaultPagination
                onChangeDataPagination={(data) => {
                    handleQueryListTeacher(data.currentTotalRowOnPage, data.currentPage);
                }}
                enablePaginationAjax
                bordered
                hasFixedColumn
                columns={columns}
                rowData={getListTeacher?.currentPage && rowData}
                hanldeClickRow={handleClickRow}
                rowOnPage={getListTeacher?.recordOnPage}
                showSizePage
                crrPage={getListTeacher?.currentPage ?? 1}
                maxPage={(listTeacher.response?.data as Obj)?.totalPage ?? 1}
            />
        </div>
    )
}

export default ListTeacher;