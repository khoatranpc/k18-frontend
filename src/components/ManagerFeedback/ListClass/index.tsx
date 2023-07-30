import React from 'react';
import { formatDatetoString, generateRowDataForMergeRowSingleField } from '@/utils';
import { Columns, RowData } from '@/global/interface';
import { data } from './data';
import Table from '@/components/Table';
import styles from '@/styles/feedback/Feedback.module.scss';
import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const ListClass = () => {
    const columns: Columns = [
        {
            key: 'CODE_CLASS',
            dataIndex: 'codeClass',
            title: 'Mã lớp',
            render(value, record, index) {
                return 'TC-C4EJS142'
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'TIMECOLLECT',
            dataIndex: 'collection',
            title: 'Lần',
            className: 'text-center',
            render(value, record, index) {
                return value.timeCollect as string
            },
        },
        {
            key: 'DATE',
            dataIndex: 'collection',
            title: 'Ngày lấy',
            render(value) {
                return formatDatetoString(value.date as Date || new Date(), 'dd/MM/yyyy');
            }
        },
        {
            key: 'RATE',
            dataIndex: 'collection',
            title: 'Tỉ lệ',
            render(value) {
                const rate = Math.round((Number(value.numberCountCollect) / Number(value.total)) * 100);
                return `${(rate > 10 ? rate : `0${rate}`) || 0}%`
            }
        },
        {
            key: 'ENABLED',
            dataIndex: 'collection',
            title: 'Trạng thái',
            className: `${styles.status} text-center`,
            render(value, record, index) {
                return <Switch
                    disabled={value.done}
                    className={styles.switch}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={value as boolean}
                />
            },
        }
    ]
    const rowData: RowData[] = generateRowDataForMergeRowSingleField(data, 'collection');
    console.log(rowData);
    return (
        <div className={styles.listClass}>
            <Table
                bordered
                disableDefaultPagination
                enablePaginationAjax
                columns={columns}
                rowData={rowData}
            />
        </div>
    )
}

export default ListClass;