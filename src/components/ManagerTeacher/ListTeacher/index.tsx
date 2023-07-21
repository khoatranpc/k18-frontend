import React, { useEffect, useRef } from 'react';
import ToolBar from '@/components/Tabs/ToolBar';
import ManagetTeacherContext from '../context';
import Table from '@/components/Table';
import { Obj } from '@/global/interface';
import { useListTeacher, useTeacherRegisterCourse } from '@/utils/hooks';
import { getColums, mapRowData } from './config';
import styles from '@/styles/teacher/ManagerTeacher.module.scss';

const ListTeacher = () => {
    const { listTeacher, query } = useListTeacher();
    const dataTeacherRegisterCourse = useTeacherRegisterCourse();
    const firstQuery = useRef(true);
    const columns = getColums();
    const rowData = mapRowData((listTeacher.response?.data as Obj)?.listTeacher || [], (dataTeacherRegisterCourse.listData.response?.data as Array<Obj>) || []);
    console.log(rowData);
    useEffect(() => {
        if (!listTeacher.response) {
            query(10, 1);
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
                context={ManagetTeacherContext}
                listFilter={[]}
                exportCSVButton
                createButton
                iconReload
            />
            <Table
                loading={listTeacher.isLoading}
                className={styles.tableManagerTeacher}
                disableDefaultPagination
                enablePaginationAjax
                bordered
                hasFixedColumn
                columns={columns}
                rowData={rowData}
            />
        </div>
    )
}

export default ListTeacher;