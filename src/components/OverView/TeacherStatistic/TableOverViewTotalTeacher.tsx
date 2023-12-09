import React from 'react';
import { Columns, RowData } from '@/global/interface';
import Table from '@/components/Table';
import styles from '@/styles/Overview.module.scss';
import { uuid } from '@/utils';

const TableOverViewTotalTeacher = () => {
    const columns: Columns = [
        {
            title: 'Bộ môn',
            dataIndex: 'course'
        },
        {
            title: 'Tổng giáo viên',
            dataIndex: 'total'
        },
        {
            title: 'Giảng viên',
            dataIndex: 'st'
        },
        {
            title: 'Mentor',
            dataIndex: 'mt'
        },
        {
            title: 'Supporter',
            dataIndex: 'sp'
        },
        {
            title: 'Lv1',
            dataIndex: 'countLv'
        },
        {
            title: 'Lv2',
            dataIndex: 'countLv'
        },
        {
            title: 'Lv3',
            dataIndex: 'countLv'
        },
        {
            title: 'Lv4',
            dataIndex: 'countLv'
        },
    ]
    const rowData: RowData[] = [
        {
            key: uuid(),
            course: 'Data',
            teacher: 123,
            st: 100,
            mt: 100,
            sp: 100,
            countLv: 50,
            total: 1000
        },
        {
            key: uuid(),
            course: 'Web',
            teacher: 123,
            st: 100,
            mt: 100,
            sp: 100,
            countLv: 50,
            total: 1000
        },
        {
            key: uuid(),
            course: 'UI/UX',
            teacher: 123,
            st: 100,
            mt: 100,
            sp: 100,
            countLv: 50,
            total: 1000
        },
    ]
    return (
        <div className={styles.tableOverViewTotalTeacher}>
            <Table
                disableDefaultPagination
                columns={columns}
                rowData={rowData}
            />
        </div>
    )
}

export default TableOverViewTotalTeacher;