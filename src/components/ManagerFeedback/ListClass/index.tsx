import React, { useEffect } from 'react';
import { Input, Switch, Checkbox, DatePicker, Radio } from 'antd';
import { CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Columns, Obj, RowData } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import { formatDatetoString } from '@/utils';
import { useGetListClassFeedback } from '@/utils/hooks';
import Table from '@/components/Table';
import styles from '@/styles/feedback/Feedback.module.scss';

const ListClass = () => {
    const dataListClass = useGetListClassFeedback();
    // pending logic filter for column
    const columns: Columns = [
        {
            key: 'CODE_CLASS',
            dataIndex: 'codeClass',
            title: 'Mã lớp',
            render(value, record, index) {
                return value.codeClass || '';
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            },
            filterDropdown(props) {
                return <Input className="inputAntd" placeholder="Tìm kiếm mã lớp" />
            },
            filterIcon: <SearchOutlined />
        },
        {
            key: 'TIMECOLLECT',
            dataIndex: 'time',
            title: 'Lần',
            className: 'text-center',
            render(value, record, index) {
                return value as string
            },
            filterDropdown(props) {
                return <div className={styles.selectTime}>
                    <Checkbox.Group className={styles.checkboxGroup} defaultValue={[1]}>
                        <Checkbox value={1}>
                            Lần 1
                        </Checkbox>
                        <Checkbox value={2}>
                            Lần 2
                        </Checkbox>
                    </Checkbox.Group>
                </div>
            },
        },
        {
            key: 'DATE',
            dataIndex: 'date',
            title: 'Ngày lấy',
            render(value) {
                return formatDatetoString(value as Date || new Date(), 'dd/MM/yyyy') || '';
            },
            filterDropdown: (props) => {
                return <DatePicker size={'middle'} picker="month" placeholder="Tháng" />
            },
            filterIcon: MapIconKey[KEY_ICON.TIMESCHEDULE]
        },
        {
            key: 'RATE',
            dataIndex: '',
            title: 'Tỉ lệ',
            render(value) {
                return `0%`
            },
            filterDropdown(props) {
                return <Radio.Group className={styles.option}>
                    <Radio value={'GTE'}>{'>='} 50%</Radio>
                    <Radio value={'LTE'}>{'<'} 50%</Radio>
                </Radio.Group>
            },
        },
        {
            key: 'ENABLED',
            dataIndex: 'enabled',
            title: 'Triển khai',
            className: `${styles.status} text-center`,
            render(value, record, index) {
                return <Switch
                    disabled={value}
                    className={styles.switch}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={value as boolean}
                />
            },
            filterDropdown(props) {
                return <div className={styles.selectTime}>
                    <Checkbox.Group className={styles.checkboxGroup} defaultValue={[true, false]}>
                        <Checkbox value={true}>
                            Đã triển khai
                        </Checkbox>
                        <Checkbox value={false}>
                            Chưa triển khai
                        </Checkbox>
                    </Checkbox.Group>
                </div>
            },
        },
        {
            key: 'DONE',
            dataIndex: 'done',
            title: 'Hoàn thành',
            render(value) {
                return <div className={styles.actionChecked}>
                    <CheckCircleOutlined className={`${value.done ? styles.active : styles.deactive} ${styles.iconCheck}`} />
                    <CloseCircleOutlined className={`${!value.done ? styles.active : styles.deactive} ${styles.iconCheck}`} />
                </div>
            },
            width: 150,
            filterDropdown(props) {
                return <Radio.Group className={styles.option} defaultValue={true}>
                    <Radio value={false}>Chưa hoàn thành</Radio>
                    <Radio value={true}>Đã hoàn thành</Radio>
                </Radio.Group>
            },
        }
    ]
    const rowData: RowData[] = (dataListClass.data.response?.data as Array<Obj>)?.map((item) => {
        return {
            ...item,
            key: item._id as string,
        }
    }) || [];
    useEffect(() => {
        if (!dataListClass.data.response) {
            const fields: Array<string> = ['codeClass', '_id', 'date', 'done', 'enabled', 'numberCollected', 'time'];
            dataListClass.query(8, fields);
        }
    }, []);
    return (
        <div className={styles.listClass}>
            <div
                className={styles.filter}
            >

            </div>
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