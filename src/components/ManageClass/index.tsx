import React, { useEffect, useRef, useState } from 'react';
import { DatePicker, TabsProps } from 'antd';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { Action, Columns, Obj, RowData } from '@/global/interface';
import { fieldFilter, getClassForm, getColorFromStatusClass, getColorTeacherPoint, mapStatusToString } from '@/global/init';
import { ClassForm, ComponentPage, PositionTe, ROLE_TEACHER, STATUS_CLASS } from '@/global/enum';
import CombineRoute from '@/global/route';
import { formatDatetoString, sortByString } from '@/utils';
import { useComparePositionTE, useDebounce, useGetClassTeacherPonit, useGetListClass, useGetListFeedback } from '@/utils/hooks';
import { AppDispatch } from '@/store';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
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
    const mapDataListClass: RowData[] = ((listClass.response?.data as Obj)?.classes as Array<Obj>)?.map((item) => {
        let crrST = '';
        (item.recordBookTeacher as Array<Obj>)!.find((rc) => {
            const findST = (rc.teacherRegister as Array<Obj>)?.find((rcTc) => {
                return (rcTc?.roleRegister as ROLE_TEACHER) === ROLE_TEACHER.ST
            });
            crrST = findST?.idTeacher?.fullName || '';
            return findST;
        });
        return {
            key: item._id as string,
            codeClass: item.codeClass,
            subject: item.courseId?.courseName,
            teacher: crrST,
            dateStart: item.dayRange?.start,
            status: item.status,
            timeSchedule: item.timeSchedule,
            classForm: getClassForm[item.classForm as ClassForm],
            color: item.courseId?.color
        }
    }) || [];
    const dispatch = useDispatch<AppDispatch>();
    const [codeClass, setCodeClass] = useState('');
    const [conditionFilter, setConditionFilter] = useState<Obj>({});
    const codeClassDebounce = useDebounce(codeClass, 1000);
    const columns: Columns = [
        {
            key: 'codeClass',
            dataIndex: 'codeClass',
            title: 'Mã lớp',
            className: 'hasSort',
            sorter: (a, b) => {
                return sortByString(a.codeClass as string, b.codeClass as string)
            },
            render(value, record, index) {
                const filterClTeacherPoint: Array<Obj> = getListFeedback?.filter((item) => {
                    return item.codeClass._id === record.key
                });
                const calcTC = filterClTeacherPoint?.reduce((prevValue, item) => {
                    return prevValue + (item.pointST + item.pointMT) / 2
                }, 0);
                return <span>{value} {filterClTeacherPoint &&
                    <b style={{ color: getColorTeacherPoint(filterClTeacherPoint?.length ? Number(calcTC / filterClTeacherPoint?.length) : 0) }}>
                        <small>
                            {Number(filterClTeacherPoint?.length ? (calcTC / filterClTeacherPoint?.length) : 0).toFixed(2)}
                        </small>
                    </b>}
                </span>
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
            render(value, record) {
                return <div className={styles.subject} style={{ backgroundColor: record.color as string }}>
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
            render(value) {
                return value || <span style={{ color: 'var(--base)' }}>Thiếu</span>
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
        router.push(hasRole ? `/te/manager/class/detail/${record.key}` : `/teacher/class/detail/${record.key}`);
    }
    const handleQueryListClass = (currentPage: number, recordOnPage: number, filter?: Obj) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        currentPage: currentPage,
                        recordOnPage: recordOnPage,
                        fields: ["_id", "codeClass", "dayRange", "timeSchedule", "courseId", "courseLevelId", "levelName", "levelCode", "courseName", "color", "start", "end", "weekday", "status", "classForm", "recordBookTeacher"],
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
                className={styles.tableMangerClass}
                columns={columns}
                rowData={mapDataListClass}
                loading={listClass.isLoading}
                enableRowSelection
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