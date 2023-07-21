import React, { useEffect, useRef } from 'react';
import ToolBar from '@/components/Tabs/ToolBar';
import ManagerTeacherContext from '../context';
import Table from '@/components/Table';
import { Obj } from '@/global/interface';
import { useListTeacher, useTeacherRegisterCourse } from '@/utils/hooks';
import { getColums, mapRowData } from './config';
import styles from '@/styles/teacher/ManagerTeacher.module.scss';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import { ComponentPage } from '@/global/enum';
import CombineRoute from '@/global/route';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { useRouter } from 'next/router';

const ListTeacher = () => {
    const { listTeacher, query } = useListTeacher();
    const dataTeacherRegisterCourse = useTeacherRegisterCourse();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const firstQuery = useRef(true);
    const columns = getColums();
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
            }
        }
        dispatch(initDataRoute(payload));
        router.push(`/te/manager/teacher/detail/${record._id as string}`);
    }
    useEffect(() => {
        if (!listTeacher.response) {
            handleQueryListTeacher(10, 1);
        }
    }, []);
    useEffect(() => {
        if (!dataTeacherRegisterCourse.listData.response && listTeacher.success && firstQuery.current) {
            firstQuery.current = false;
            dataTeacherRegisterCourse.query(((listTeacher.response?.data as Obj)?.listTeacher as Array<Obj>)?.map((item) => item._id));
        }
    }, [dataTeacherRegisterCourse.listData, listTeacher]);
    return (
        <div className={styles.listTeacher}>
            <ToolBar
                context={ManagerTeacherContext}
                listFilter={[]}
                exportCSVButton
                createButton
                iconReload
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
                rowData={rowData}
                hanldeClickRow={handleClickRow}
            />
        </div>
    )
}

export default ListTeacher;