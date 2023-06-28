import React, { useState } from 'react';
import { TableColumnsType, TabsProps } from 'antd';
import { RowData } from '@/global/interface';
import { fieldFilter, getColorFromStatusClass, mapStatusToString } from '@/global/init';
import { STATUS_CLASS } from '@/global/enum';
import Tabs from '../Tabs';
import ToolBar, { ItemFilterField } from '../Tabs/ToolBar';
import Table from '../Table';
import ManagerClassContext, { FieldFilter } from './context';
import { sortByString, uuid } from '@/utils';
import styles from '@/styles/class/Class.module.scss';

const items: TabsProps['items'] = [
    {
        key: 'ALL_CLASS',
        label: 'Tất cả lớp',
    },
    {
        key: 'UIUX',
        label: `UI/UX`,
    },
    {
        key: 'PMBA',
        label: `PM/BA`,
    },
];

const listFilter: ItemFilterField[] = [
    {
        title: 'Môn học',
        key: fieldFilter.SUBJECT
    },
    {
        title: 'Trạng thái',
        key: fieldFilter.STATUS
    },
    {
        title: 'Mã khoá (cấp độ)',
        key: fieldFilter.CODE_CLASS_LEVEL
    },
    {
        title: 'Hình thức',
        key: fieldFilter.STYLE
    },
    {
        title: 'Giáo viên',
        key: fieldFilter.TEACHER
    },
    {
        title: 'Tháng KG',
        key: fieldFilter.OPEN_SCHEDULE
    },
    {
        title: 'Lịch học',
        key: fieldFilter.TIME_SCHEDULE
    }
];
const ManagerClass = () => {
    const [storeManagerClass, setStoreManagerClass] = useState<{
        crrKeyTab: string;
        listFieldFilter: Array<{
            key: string;
            value: any;
        }>
    }>({
        crrKeyTab: items[0].key,
        listFieldFilter: [],
    });
    const columns: TableColumnsType<Record<string, unknown>> = [
        {
            key: 'codeClass',
            dataIndex: 'codeClass',
            title: 'Mã lớp',
            className: 'hasSort',
            sorter: (a, b) => {
                return sortByString(a.codeClass as string, b.codeClass as string)
            },
        },
        {
            key: 'subject',
            dataIndex: 'subject',
            title: 'Khoá',
            className: 'hasSort',
            sorter: (a, b) => {
                return sortByString(a.subject as string, b.subject as string)
            },
            render(value) {
                return <div className={styles.subject}>
                    {value}
                </div>
            },
        },
        {
            key: 'style',
            dataIndex: 'style',
            title: 'Hình thức',
            className: 'hasSort',
        },
        {
            key: 'teacher',
            dataIndex: 'teacher',
            title: 'Giáo viên',
            className: `${styles.mw20} hasSort`,
            sorter: (a, b) => {
                return sortByString(a.teacher as string, b.teacher as string)
            },
        },
        {
            key: 'dateStart',
            dataIndex: 'dateStart',
            title: 'Ngày khai giảng',
        },
        {
            key: 'timeSchedule',
            dataIndex: 'timeSchedule',
            title: 'Lịch học',
            render(value: Array<Record<string, unknown>>, record, index) {
                return <div>
                    <p>{value[0]?.weekday as string}: {value[0]?.time as string}</p>
                </div>
            },
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: 'Trạng thái',
            render(value) {
                return <div className={`${value} stt`} style={{ backgroundColor: getColorFromStatusClass[value as STATUS_CLASS] }}>
                    {mapStatusToString[value as STATUS_CLASS]}
                </div>
            },
        },
    ];
    const rowData: RowData[] = [
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }],
        },
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }]
        },
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }]
        },
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }]
        },
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }]
        },
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }]
        },
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }]
        },
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }]
        },
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }]
        },
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }]
        },
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }]
        },
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }]
        },
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }]
        },
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }]
        },
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }]
        },
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }]
        },
        {
            key: uuid(),
            codeClass: 'PNL-UID08',
            subject: 'Code',
            teacher: 'Nguyễn Văn Cường',
            style: 'Hybrid',
            dateStart: '20/02/2022',
            status: STATUS_CLASS.RUNNING,
            timeSchedule: [{
                weekday: 'T2',
                time: '19h15-22h15'
            }]
        },
    ];
    return (
        <ManagerClassContext.Provider value={{
            crrKeyTab: storeManagerClass!.crrKeyTab,
            listFieldFilter: storeManagerClass!.listFieldFilter as FieldFilter[],
            setContext: setStoreManagerClass
        }}
        >
            <div className={styles.containerClassManger}>
                <Tabs listItemTab={items} activeKey={storeManagerClass.crrKeyTab} onClickTab={(key) => {
                    setStoreManagerClass({
                        ...storeManagerClass,
                        crrKeyTab: key
                    })
                }} />
                <ToolBar listFilter={listFilter} />
            </div>
            <Table
                columns={columns}
                rowData={rowData}
                enableRowSelection
                disableDefaultPagination
                enablePaginationAjax
                getCrrDataPagination={(crrPage, crrRowOnPage) => {
                    console.log(crrPage);
                    console.log(crrRowOnPage);
                }}
                hanldeClickRow={(record) => {
                    console.log(record);
                }}
            />
        </ManagerClassContext.Provider>
    )
}

export default ManagerClass;