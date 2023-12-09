import React from 'react';
import { uuid } from '@/utils';
import Table from '@/components/Table';
import { Columns, RowData } from '@/global/interface';
import styles from '@/styles/Overview.module.scss';

const TeacherPoint = () => {
    const columns: Columns = [
        {
            title: 'Data',
            dataIndex: 'point'
        },
        {
            title: 'Web',
            dataIndex: 'point'
        },
        {
            title: 'UI/UX',
            dataIndex: 'point'
        },
        {
            title: 'Trung bình',
            dataIndex: 'pointAvg'
        }
    ]
    const rowData: RowData[] = [
        {
            key: uuid(),
            point: 4.5,
            pointAvg: 4.5
        }
    ]
    return (
        <div className={styles.teacherPointTable}>
            <h3>TeacherPoint</h3>
            <Table
                disableDefaultPagination
                columns={columns}
                rowData={rowData}
            />
        </div>
    )
}

export default TeacherPoint;