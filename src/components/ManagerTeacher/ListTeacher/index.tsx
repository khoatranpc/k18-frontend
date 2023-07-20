import React from 'react';
import ToolBar from '@/components/Tabs/ToolBar';
import ManagetTeacherContext from '../context';
import Table from '@/components/Table';
import { RowData } from '@/global/interface';
import { getColums } from './config';
import styles from '@/styles/teacher/ManagerTeacher.module.scss';
import { uuid } from '@/utils';

const ListTeacher = () => {
    const columns = getColums();
    const rowData: RowData[] = [
        {
            key: uuid(),
            fullName: 'Trần Đăng Khoa'
        }
    ];
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
                hasFixedColumn
                columns={columns}
                rowData={rowData}
            />
        </div>
    )
}

export default ListTeacher;