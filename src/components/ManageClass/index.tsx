import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Badge, DatePicker, Popover, TabsProps } from 'antd';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { Action, Columns, Obj, RowData } from '@/global/interface';
import { fieldFilter, getClassForm, getColorFromStatusClass, getColorTeacherPoint, mapStatusToString } from '@/global/init';
import { ClassForm, ComponentPage, PositionTe, ROLE, ROLE_TEACHER, STATUS_CLASS } from '@/global/enum';
import CombineRoute from '@/global/route';
import { formatDatetoString, generateRowDataForMergeRowSingleField, sortByString } from '@/utils';
import { useComparePositionTE, useDebounce, useGetListClass, useGetListFeedback, useGetListBookTeacher } from '@/utils/hooks';
import { AppDispatch } from '@/store';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import useGetCrrUser from '@/utils/hooks/getUser';
import { queryGetListClass } from '@/store/reducers/class/listClass.reducer';
import { FieldFilter } from '../Tabs/ToolBar/interface';
import ManagerClassContext from './context';
import Tabs from '../Tabs';
import ToolBar, { ItemFilterField } from '../Tabs/ToolBar';
import Table from '../Table';
import TitleHeader from './TitleHeader';
import ModalCustomize from '../ModalCustomize';
import CreateClass from './CreateClass';
import { TabDetailClass } from './Detail';
import SelectBaseCourse from '../SelectBaseCourse';
import SelectStatusClass from './SelectStatusClass';
import styles from '@/styles/class/Class.module.scss';


enum Tab {
    ALL_CLASS = 'ALL_CLASS',
    MY_CLASS = 'MY_CLASS',
    REGISTER_CLASS = 'REGISTER_CLASS'
}

interface PropsFilter {
    onChange?: (filter: Obj) => void;
}
const CustomizeFilter = (props: PropsFilter) => {
    const firstRender = useRef<boolean>(true);
    const [filter, setFilter] = useState<Obj>({
        course: '',
        status: 'ALL',
        date: null
    });
    useEffect(() => {
        if (!firstRender.current) {
            props.onChange?.(filter);
        }
        firstRender.current = false;
    }, [filter]);
    const listFilter: ItemFilterField[] = [
        {
            title: 'Môn học',
            key: fieldFilter.SUBJECT,
            filter: <SelectBaseCourse
                value={filter.course}
                onChange={(value) => {
                    setFilter({
                        ...filter,
                        course: value
                    });
                }}
            />
        },
        {
            title: 'Trạng thái',
            key: fieldFilter.STATUS,
            filter: <SelectStatusClass
                value={filter.status}
                onChange={(value) => {
                    setFilter({
                        ...filter,
                        status: value
                    });
                }}
            />
        },
        {
            title: 'Tháng',
            key: fieldFilter.OPEN_SCHEDULE,
            filter: <DatePicker
                value={filter.date ? dayjs(new Date(filter.date)) : null}
                size="small"
                placeholder="Chọn (mm/yyyy)"
                format={"MM/YYYY"}
                picker="month"
                onChange={(value) => {
                    const getDate = (value as Obj)?.$d ? (value as Obj)?.$d : null;
                    setFilter({
                        ...filter,
                        date: getDate
                    });
                }}
            />
        }
    ];
    return <div className={styles.customizeFilter}>
        {
            listFilter.map((item) => {
                return <div className={styles.itemFilter} key={item.key}>
                    <span><b>{item.title}</b></span>
                    {item.filter}
                </div>
            })
        }
    </div>;
}
const ManagerClass = () => {
    const hasRole = useComparePositionTE(PositionTe.LEADER, PositionTe.QC, PositionTe.ASSISTANT);
    const crrUser = useGetCrrUser();
    const getCrrUser = crrUser?.data as Obj;
    const items: TabsProps['items'] = [
        {
            key: Tab['ALL_CLASS'],
            label: 'Tất cả lớp',
        },
    ];
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
    const listFeedBack = useGetListFeedback();
    const getListFeedback = ((listFeedBack.data.response as Obj)?.data as Obj)?.list as Obj[];
    const router = useRouter();
    const listClass = useGetListClass();
    const firstQuery = useRef<boolean>(true);
    const isQueryClassTeacherPoint = useRef<boolean>(true);
    const mapDataListClass: RowData[] = useMemo(() => {
        const list: Obj[] = ((listClass.response?.data as Obj)?.classes as Array<Obj>)?.map((item) => {
            let crrST = '';
            (item.recordBookTeacher as Array<Obj>)!.find((rc) => {
                const findST = (rc.teacherRegister as Array<Obj>)?.find((rcTc) => {
                    return (rcTc?.roleRegister as ROLE_TEACHER) === ROLE_TEACHER.ST
                });
                crrST = findST?.idTeacher?.fullName || '';
                return findST;
            });
            const listBook = (item.recordBookTeacher as Obj[])?.map((rc => {
                return {
                    groupNumber: rc.groupNumber,
                    ...(rc.locationId as Obj),
                    teacherRegister: rc.teacherRegister ?? []
                }
            })) ?? [];
            return {
                _id: item._id as string,
                key: item._id as string,
                codeClass: item.codeClass,
                subject: item.courseId?.courseName,
                teacher: crrST,
                dateStart: item.dayRange?.start,
                status: item.status,
                timeSchedule: item.timeSchedule,
                classForm: getClassForm[item.classForm as ClassForm],
                color: item.courseId?.color,
                bookTeachers: listBook,
            }
        }) || [];
        return generateRowDataForMergeRowSingleField(list, 'bookTeachers');
    }, [(listClass.response?.data as Obj)]);
    const dispatch = useDispatch<AppDispatch>();
    const [codeClass, setCodeClass] = useState('');
    const [conditionFilter, setConditionFilter] = useState<Obj>({});

    const codeClassDebounce = useDebounce(codeClass, 1000);
    const columns: Columns = [
        {
            key: 'codeClass',
            dataIndex: 'codeClass',
            title: 'Mã lớp',
            className: `hasSort ${styles.colTable}`,
            sorter: (a, b) => {
                return sortByString(a.codeClass as string, b.codeClass as string)
            },
            render(value, record, index) {
                const filterClTeacherPoint: Array<Obj> = getListFeedback?.filter((item) => {
                    return item.codeClass._id === record._id
                });
                const calcTC = filterClTeacherPoint?.reduce((prevValue, item) => {
                    return prevValue + (item.pointST + item.pointMT) / 2
                }, 0);
                return <Badge
                    count={`${Number(filterClTeacherPoint?.length ? (calcTC / filterClTeacherPoint?.length) : 0).toFixed(2)}`}
                    color={getColorTeacherPoint(filterClTeacherPoint?.length ? Number(calcTC / filterClTeacherPoint?.length) : 0)}
                    size='small'
                    offset={[15, -8]}
                >
                    <span className={styles.cellCodeClass}>{value}</span>
                </Badge>
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number ?? 1,
                    style: {
                        fontWeight: '500'
                    }
                }
            },
            width: 230,
        },

        {
            key: 'subject',
            dataIndex: 'subject',
            title: 'Khoá',
            className: `hasSort text-center`,
            sorter: (a, b) => {
                return sortByString(a.subject as string, b.subject as string)
            },
            render(value, record) {
                return <div className={styles.subject} style={{ backgroundColor: record.color as string }}>
                    {value}
                </div>
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number ?? 1,
                }
            },
            width: 170
        },
        {
            key: 'teacher',
            dataIndex: 'teacher',
            title: 'Giáo viên',
            className: `${styles.mw20}`,
            sorter: (a, b) => {
                return sortByString(a.teacher as string, b.teacher as string)
            },
            render(value) {
                return value || <span style={{ color: 'var(--base)', fontWeight: '500' }}>Thiếu</span>
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number ?? 1,
                }
            },
            width: 170
        },
        {
            key: 'group',
            title: 'Nhóm',
            dataIndex: 'bookTeachers',
            render(value: Obj) {
                const tc = (value.teacherRegister as Obj[])?.filter((item: Obj) => item.accept) ?? [];
                return <Popover content={<p>{value.locationDetail ?? 'Chưa có thông tin '}</p>}>
                    <span
                        style={{
                            color: !value.groupNumber ? 'var(--base)' : 'unset',
                            fontWeight: !value.groupNumber ? '500' : 'unset',
                        }}
                    >
                        {value.groupNumber ? (`Nhóm ${value.groupNumber} - ${value.locationCode}`) : 'Thiếu'}
                        {!tc.length ? <span style={{ color: 'var(--base)', fontWeight: '500' }}> Chưa có GV</span> : ''}
                    </span>
                </Popover>
            },
            width: 200
        },
        {
            key: 'dateStart',
            dataIndex: 'dateStart',
            title: 'Ngày khai giảng',
            render(value) {
                return formatDatetoString(value as Date, 'dd/MM/yyyy');
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number ?? 1,
                }
            },
            width: 170
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
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number ?? 1,
                }
            },
            width: 250,
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
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number ?? 1,
                }
            },
            width: 100,
            fixed: 'right'
        },
    ];
    const handleClickRow = (record: Obj) => {
        const routePayload: PayloadRoute = {
            payload: {
                route: hasRole ? CombineRoute['TE']['MANAGER']['DETAILCLASS'] : CombineRoute['TEACHER']['DETAILCLASS'],
                title: record?.codeClass,
                replaceTitle: <TitleHeader tabDetail={TabDetailClass.OVERVIEW} editTitle title={record.codeClass as string} dateStart={formatDatetoString(new Date(record.dateStart as Date), 'dd/MM/yyyy')} statusClass={record.status as STATUS_CLASS} />,
                hasBackPage: true,
                moreData: record,
                component: ComponentPage.DETAILCLASS
            }
        }
        dispatch(initDataRoute(routePayload));

        const route = getCrrUser?.roleAccount === ROLE.TE ? (hasRole ? `/te/manager/class/detail/${record._id}` : '/404') : (
            getCrrUser?.roleAccount === ROLE.CS ? `/cs/class/${record._id}` : `/teacher/class/detail/${record._id}`
        );
        router.push(route);
    }
    const handleQueryListClass = (currentPage: number, recordOnPage: number, filter?: Obj) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        currentPage: currentPage,
                        recordOnPage: recordOnPage,
                        fields: ["_id", "codeClass", "dayRange", "timeSchedule", "courseId", "courseLevelId", "levelName", "levelCode", "courseName", "color", "start", "end", "weekday", "status", "classForm", "recordBookTeacher", 'groupNumber', 'locationCode', 'locationDetail'],
                        codeClass: codeClassDebounce,
                        ...conditionFilter,
                        ...filter,
                    }
                }
            }
        };
        dispatch(queryGetListClass(payload));
    }
    const [openModal, setOpenModal] = useState<boolean>(false);
    useEffect(() => {
        if (!firstQuery.current) {
            handleQueryListClass(1, 10);
        }
        firstQuery.current = false;
    }, [codeClassDebounce]);
    useEffect(() => {
        if (listClass.success && listClass.response && isQueryClassTeacherPoint.current && !listClass.isLoading) {
            isQueryClassTeacherPoint.current = false;
            const getListClassId = ((listClass.response.data as Obj)?.classes as Array<Obj>)?.map((item) => item._id as string);
            listFeedBack.query(undefined, undefined, {
                listClass: getListClassId
            }, ['_id', 'pointST', 'pointMT']);
        }
    }, [listClass]);
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
                    });
                }} />
                <ToolBar
                    customizeFilter={<CustomizeFilter onChange={(filter) => {
                        handleQueryListClass(1, 10, filter);
                        // console.log(filter);
                        setConditionFilter(filter);
                    }} />}
                    context={ManagerClassContext}
                    listFilter={[]}
                    createButton={hasRole}
                    exportCSVButton={hasRole}
                    onClickCreateButton={() => {
                        router.push('/te/manager/class/request-class');
                    }}
                    iconReload
                    onClickReload={() => {
                        isQueryClassTeacherPoint.current = true;
                        handleQueryListClass((listClass?.response?.data as Obj)?.currentPage as number, (listClass?.response?.data as Obj)?.recordOnPage as number, conditionFilter)
                    }}
                    placeHolderSearch="Nhập mã lớp"
                    onChangeSearch={(value) => {
                        setCodeClass(value);
                    }}
                />
            </div>
            <Table
                bordered
                className={styles.tableMangerClass}
                columns={columns}
                rowData={mapDataListClass}
                loading={listClass.isLoading}
                disableDefaultPagination
                enablePaginationAjax
                onChangeDataPagination={(dataPagination: { currentPage: number; currentTotalRowOnPage: number; }) => {
                    handleQueryListClass(dataPagination.currentPage, dataPagination.currentTotalRowOnPage, conditionFilter);
                    isQueryClassTeacherPoint.current = true;
                }}
                crrPage={(listClass.response?.data as Obj)?.currentPage}
                rowOnPage={(listClass.response?.data as Obj)?.recordOnPage}
                showSizePage
                hanldeClickRow={handleClickRow}
                maxPage={(listClass.response?.data as Obj)?.totalPage as number}
            />
            {
                openModal && <ModalCustomize
                    show={openModal}
                    modalHeader={<h2>Tạo lớp</h2>}
                    onHide={() => {
                        setOpenModal(false);
                    }}
                    size='lg'
                >
                    <CreateClass />
                </ModalCustomize>
            }

        </ManagerClassContext.Provider>
    )
}

export default ManagerClass;