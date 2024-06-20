import React from 'react';
import { getColorTeacherPoint } from '@/global/init';
import { Columns, Obj, RowData } from '@/global/interface';
import Table from '../Table';
import styles from '@/styles/teacher/TeacherInfo.module.scss';

const CacheClass = () => {
    const columns: Columns = [
        {
            key: 'CLASS',
            title: 'Lớp',
            dataIndex: 'codeClass'
        },
        {
            key: 'TC',
            title: 'TeacherPoint',
            dataIndex: 'tcp',
            className: 'text-center',
            render(value, record, index) {
                return <span style={{ color: getColorTeacherPoint(value), fontWeight: 'bold' }}>
                    {value}
                </span>
            },
        }
    ];
    const data: RowData[] = [
        {
            key: 1,
            codeClass: 'TC-C4EJS145',
            tcp: 4.2,
            listFb: [
                {
                    name: 'Nguyễn Văn A',
                    fb: 'Nguuuuuuuuuuuuuuuuuuu'
                },
                {
                    name: 'Nguyễn Văn A',
                    fb: 'Nguuuuuuuuuuuuuuuuuuu'
                },
                {
                    name: 'Nguyễn Văn A',
                    fb: 'Nguuuuuuuuuuuuuuuuuuu'
                },
            ]
        },
        {
            key: 2,
            codeClass: 'TC-C4EJS145',
            tcp: 4.2
        },
    ];

    return (
        <div className={styles.cacheClass}>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => {
                        return (record.listFb as Obj[])?.map((item, idx) => {
                            return <p key={idx}>{item.fb}</p>
                        });
                    },
                }}
                disableDefaultPagination
                rowData={data}
            />
        </div>
    )
}

export default CacheClass;