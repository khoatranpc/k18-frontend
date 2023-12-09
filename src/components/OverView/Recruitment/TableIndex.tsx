import React from 'react';
import { Columns, RowData } from '@/global/interface';
import { generateRowDataForMergeRowSingleField, uuid } from '@/utils';
import Table from '@/components/Table';
import styles from '@/styles/Overview.module.scss';


const TableIndex = () => {
    const columns: Columns = [
        {
            title: 'TT',
            dataIndex: 'tt',
            className: 'text-center',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                    className: `${styles.title} ${data.className as string}`
                }
            }

        },
        {
            title: 'NỘI DUNG',
            dataIndex: 'info',
            className: 'text-center',
            render(value) {
                return value.content
            },
            onCell(data) {
                return {
                    className: data.className as string
                }
            }
        },
        {
            title: 'SỐ LƯỢNG',
            dataIndex: 'info',
            className: 'text-center',
            render(value) {
                return value.total
            },
            onCell(data) {
                return {
                    className: data.className as string
                }
            }
        },
        {
            title: 'TỈ LỆ',
            dataIndex: 'info',
            className: 'text-center',
            render(value) {
                return value.rate
            },
            onCell(data) {
                return {
                    className: data.className as string
                }
            }
        }
    ];
    const evulate = [
        {
            tt: 'Đánh giá',
            info: [
                {
                    content: 'Pass PV',
                    total: '12',
                    rate: '15%',
                },
                {
                    tt: 'ĐÁNH GIÁ',
                    content: 'Đang hẹn PV',
                    total: '12',
                    rate: '15%'
                },
                {
                    tt: 'ĐÁNH GIÁ',
                    content: 'Đang chờ KQ',
                    total: '12',
                    rate: '15%'
                },

            ],
            className: `${styles.green} green`
        },
        {
            tt: '',
            info: [
                {
                    key: uuid(),
                    content: 'Chưa xử lý',
                    total: '12',
                    rate: '15%'
                },
            ],
            className: styles.orange
        },
        {
            tt: 'Từ chối',
            info: [
                {
                    content: 'CV Không đạt',
                    total: '12',
                    rate: '15%'
                },
                {
                    content: 'Fail PV',
                    total: '12',
                    rate: '15%'
                }
            ],
            className: styles.red
        },

        {
            tt: 'Tổng',
            info: [
                {
                    total: '130'
                }
            ]
        }
    ]
    const data = generateRowDataForMergeRowSingleField(evulate, 'info');
    return (
        <div className={`${styles.tableIndex}`}>
            <table className={styles.tableTotal}>
                <thead>
                    <tr>
                        <th rowSpan={4} className={styles.totalCandiate}>
                            131
                        </th>
                        <th rowSpan={2} className={`${styles.bdLeft} ${styles.bdBottom}`}>Nam: 500</th>
                        <th rowSpan={4} className={`${styles.bdLeft} text-center ${styles.avgProcess}`}>9,12 Ngày</th>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                        <th rowSpan={2} className={styles.ageAvg}>Độ tuổi TB: 25,93</th>
                        <th rowSpan={2}>Nữ: 70</th>
                    </tr>
                    <tr>
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.title}>
                        <td colSpan={2}>
                            Tổng dữ liệu ứng viên
                        </td>
                        <td>
                            Thời gian xử lý TB
                        </td>
                    </tr>
                </tbody>
            </table>
            <Table
                bordered
                className={`${styles.table} noSetBgColorHover`}
                disableDefaultPagination
                rowData={data}
                columns={columns}
            />
        </div>
    )
}

export default TableIndex;