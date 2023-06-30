import React, { useEffect, useRef, useState } from 'react';
import { TableColumnsType, TabsProps } from 'antd';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Action, Obj, RowData } from '@/global/interface';
import { fieldFilter, getClassForm, getColorFromStatusClass, mapStatusToString } from '@/global/init';
import { ClassForm, ComponentPage, STATUS_CLASS } from '@/global/enum';
import CombineRoute from '@/global/route';
import { formatDatetoString, sortByString } from '@/utils';
import { useGetListClass } from '@/utils/hooks';
import { AppDispatch } from '@/store';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import { queryGetListClass } from '@/store/reducers/class/listClass.reducer';
import ManagerClassContext, { FieldFilter } from './context';
import Tabs from '../Tabs';
import ToolBar, { ItemFilterField } from '../Tabs/ToolBar';
import Table from '../Table';
import TitleHeader from './TitleHeader';
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
    const router = useRouter();
    const listClass = useGetListClass();
    const firstQuery = useRef<boolean>(true);
    const mapDataListClass: RowData[] = ((listClass.response?.data as Obj)?.classes as Array<Obj>)?.map((item) => {
        return {
            key: item._id as string,
            codeClass: item.codeClass,
            subject: item.courseId.courseName,
            teacher: '',
            dateStart: item.dayRange.start,
            status: item.status,
            timeSchedule: item.timeSchedule,
            classForm: getClassForm[item.classForm as ClassForm]
        }
    }) || [];
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState<boolean>(true);
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
            key: 'classForm',
            dataIndex: 'classForm',
            title: 'Hình thức',
        },
        {
            key: 'teacher',
            dataIndex: 'teacher',
            title: 'Giáo viên',
            className: `${styles.mw20} hasSort`,
            sorter: (a, b) => {
                return sortByString(a.teacher as string, b.teacher as string)
            },
            render(value, record, index) {
                return value || 'Thiếu'
            },
        },
        {
            key: 'dateStart',
            dataIndex: 'dateStart',
            title: 'Ngày khai giảng',
            render(value, record, index) {
                return formatDatetoString(value as Date, 'dd/MM/yyyy');
            },
        },
        {
            key: 'timeSchedule',
            dataIndex: 'timeSchedule',
            title: 'Lịch học',
            render(value: Array<Record<string, unknown>>) {
                return <div className={styles.colTimeSchedule}>
                    <p>{value[0]?.weekday as string}: {value?.[0]?.start as string}-{value?.[0]?.end as string}</p>
                    <p>{value[1]?.weekday as string}: {value?.[1]?.start as string}-{value?.[1]?.end as string}</p>
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
    // const rowData: RowData[] = [
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }],
    //     },
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }]
    //     },
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }]
    //     },
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }]
    //     },
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }]
    //     },
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }]
    //     },
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }]
    //     },
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }]
    //     },
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }]
    //     },
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }]
    //     },
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }]
    //     },
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }]
    //     },
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }]
    //     },
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }]
    //     },
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }]
    //     },
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }]
    //     },
    //     {
    //         key: uuid(),
    //         codeClass: 'PNL-UID08',
    //         subject: 'Code',
    //         teacher: 'Nguyễn Văn Cường',
    //         style: 'Hybrid',
    //         dateStart: '20/02/2022',
    //         status: STATUS_CLASS.RUNNING,
    //         timeSchedule: [{
    //             weekday: 'T2',
    //             time: '19h15-22h15'
    //         }]
    //     },
    // ];
    const handleClickRow = (record: Obj) => {
        const routePayload: PayloadRoute = {
            payload: {
                route: CombineRoute['TE']['MANAGER']['DETAILCLASS'],
                title: record?.codeClass,
                replaceTitle: <TitleHeader codeClass='PNL-CIJS84' dateStart='30/2/2022' statusClass={STATUS_CLASS.RUNNING} />,
                hasBackPage: true,
                moreData: record,
                component: ComponentPage.DETAILCLASS
            }
        }
        dispatch(initDataRoute(routePayload));
        router.push('/te/manager/class/detail/123');
    }
    const handleQueryListClass = (currentPage: number, recordOnPage: number) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        currentPage: currentPage,
                        recordOnPage: recordOnPage
                    }
                }
            }
        };
        dispatch(queryGetListClass(payload));
    }
    useEffect(() => {
        if (!listClass.response && firstQuery.current) {
            handleQueryListClass(1, 10)
            firstQuery.current = false
        } else {
            if (loading) {
                setLoading(false);
            }
        }
    }, [listClass, loading, setLoading, handleQueryListClass]);

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
                rowData={mapDataListClass}
                loading={loading}
                enableRowSelection
                disableDefaultPagination
                enablePaginationAjax
                onChangeDataPagination={(dataPagination: { currentPage: number; currentTotalRowOnPage: number; }) => {
                    handleQueryListClass(dataPagination.currentPage, dataPagination.currentTotalRowOnPage);
                }
                }
                hanldeClickRow={handleClickRow}
                maxPage={(listClass.response?.data as Obj)?.totalPage as number || 1}
            />
        </ManagerClassContext.Provider>
    )
}

export default ManagerClass;