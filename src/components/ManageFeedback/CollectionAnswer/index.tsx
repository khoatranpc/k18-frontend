import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input } from 'antd';
import { Columns, Obj, RowData } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { getColorTeacherPoint } from '@/global/init';
import { KEY_ICON } from '@/global/enum';
import { formatDatetoString, uuid } from '@/utils';
import { useDebounce, useGetListCourse, useGetListFeedback } from '@/utils/hooks';
import Table from '@/components/Table';
import ExportExcel from '@/components/ExportExcel';
import styles from '@/styles/feedback/CollectionResponse.module.scss';
import { mapTableDataToExcel } from '@/components/Table/config';


const initFilter = {
    month: '',
    year: '',

    studentName: '',
    phoneNumber: '',
    course: [],
    codeClass: '',
    groupNumber: [],
    time: [1, 2],
}
const CollectionAnswer = () => {
    const [filter, setFilter] = useState<typeof initFilter>(initFilter);
    const debounceFilter = useDebounce(filter);
    const listCourse = useGetListCourse();
    const listResponseFeedback = useGetListFeedback();
    const getPaginating = (listResponseFeedback.data.response as Obj)?.data as Obj;
    const listValueCourse = (listCourse.listCourse?.data as Array<Obj>)?.map((item) => item._id as string) || [];
    const tableRef = useRef<HTMLDivElement>(null);
    const dataExcel = useRef<Obj[]>([]);

    const handleFilter = (isFilter: boolean, query: Obj) => {
        setFilter({
            ...filter,
            ...query
        })
    }
    useEffect(() => {
        listResponseFeedback.query(100, 1, debounceFilter)
    }, [debounceFilter]);
    useEffect(() => {
        if (!listCourse.listCourse) {
            listCourse.queryListCourse();
        }
    }, []);
    const rowData: RowData[] = ((listResponseFeedback.data.response?.data as Obj)?.list as Array<Obj>)?.map((item) => {
        return {
            key: uuid(),
            ...item
        }
    });
    const columns: Columns = [
        {
            key: 'TIME',
            dataIndex: 'createdAt',
            title: 'Thời gian',
            render(value, record, index) {
                return formatDatetoString(value as Date);
            },
            width: 150,
            fixed: 'left',
            filterIcon: MapIconKey[KEY_ICON.TIMESCHEDULE],
        },
        {
            key: 'STUDENT_NAME',
            dataIndex: 'studentName',
            title: 'Học viên',
            width: 170,
            fixed: 'left',
            filterDropdown(props) {
                return <Input className="inputAntd" placeholder="Tìm học viên" onChange={(e) => {
                    handleFilter(true, {
                        ...filter,
                        studentName: e.target.value
                    })
                }} />
            },
            filterIcon: <SearchOutlined />
        },
        {
            key: 'NUMBER_PHONE',
            dataIndex: 'phoneNumber',
            title: 'SĐT',
            width: 100,
            filterDropdown(props) {
                return <Input className="inputAntd" placeholder="Tìm sđt" onChange={(e) => {
                    handleFilter(true, {
                        phoneNumber: e.target.value
                    });
                }} />
            },
            filterIcon: <SearchOutlined />
        },
        {
            key: 'COURSE',
            dataIndex: 'course',
            title: 'Học phần',
            width: 100,
            filterDropdown(props) {
                return <Checkbox.Group className={styles.checkboxGroup} defaultValue={listValueCourse} onChange={(checkedValue) => {
                    handleFilter(true, {
                        course: checkedValue
                    })
                }}>
                    {(listCourse.listCourse?.data as Array<Obj>)?.map((item) => {
                        return <Checkbox key={item._id} value={item._id as string}>
                            {item?.courseName as string}
                        </Checkbox>
                    }) || <span>Ôi chưa có gì để chọn hết!</span>}
                </Checkbox.Group>
            },
            render(value) {
                return value?.courseName
            }
        },
        {
            key: 'CODE_CLASS',
            dataIndex: 'codeClass',
            title: 'Mã lớp',
            width: 100,
            filterDropdown(props) {
                return <Input className="inputAntd" placeholder="Mã lớp" onChange={(e) => {
                    handleFilter(true, {
                        codeClass: e.target.value
                    })
                }} />
            },
            filterIcon: <SearchOutlined />,
            render(value) {
                return value?.codeClass
            }
        },
        {
            key: 'GROUP_NUMBER',
            dataIndex: 'groupNumber',
            className: 'text-center',
            title: 'Nhóm',
            width: 90,
            render(value) {
                return value?.groupNumber;
            },
        },
        {
            key: 'TIMECOLLECT',
            dataIndex: 'feedbackId',
            title: 'Buổi học',
            className: 'text-center',
            width: 100,
            filterDropdown(props) {
                return <Checkbox.Group className={styles.checkboxGroup} defaultValue={filter.time} onChange={(checkedValue) => {
                    filter.time = checkedValue.map(item => Number(item));
                    setFilter({
                        ...filter
                    });
                }}>
                    <Checkbox value={1}>
                        Buổi 4
                    </Checkbox>
                    <Checkbox value={2}>
                        Buổi 9
                    </Checkbox>
                </Checkbox.Group>
            },
            render(value) {
                return value?.time === 1 ? 'Buổi 4' : 'Buổi 9'
            }
        },
        {
            key: 'CXO',
            dataIndex: 'pointCxo',
            title: `CXO`,
            className: `text-center hasSort ${styles.flexReverse}`,
            width: 70,
            sorter: (a, b) => {
                return Number(a.pointCxo) - Number(b.pointCxo) ?? 0;
            },
            onCell(data: Obj) {
                return {
                    style: {
                        color: getColorTeacherPoint(data.pointCxo),
                        fontWeight: 'bold'
                    }
                }
            },
        },
        {
            key: 'ST',
            dataIndex: 'pointST',
            title: 'Giảng viên',
            className: `text-center hasSort ${styles.flexReverse}`,
            width: 120,
            sorter: (a, b) => {
                return Number(a.pointST) - Number(b.pointST) ?? 0;
            },
            onCell(data: Obj) {
                return {
                    style: {
                        color: getColorTeacherPoint(data.pointST),
                        fontWeight: 'bold'
                    }
                }
            },
        },
        {
            key: 'MT',
            dataIndex: 'pointMT',
            title: 'Mentor',
            className: `text-center hasSort ${styles.flexReverse}`,
            width: 90,
            sorter: (a, b) => {
                return Number(a.pointMT) - Number(b.pointMT) ?? 0;
            },
            onCell(data: Obj) {
                return {
                    style: {
                        color: getColorTeacherPoint(data.pointMT ?? 0),
                        fontWeight: 'bold'
                    }
                }
            },
        },
        {
            key: 'OB',
            dataIndex: 'pointOb',
            className: `text-center hasSort ${styles.flexReverse}`,
            title: 'CSVC',
            width: 90,
            sorter: (a, b) => {
                return Number(a.pointOb) - Number(b.pointOb) ?? 0;
            },
            onCell(data: Obj) {
                return {
                    style: {
                        color: getColorTeacherPoint(data.pointOb),
                        fontWeight: 'bold'
                    }
                }
            },
        },
        {
            key: 'SYL',
            dataIndex: 'pointSyl',
            title: 'Giáo trình',
            className: `text-center hasSort ${styles.flexReverse}`,
            width: 90,
            sorter: (a, b) => {
                return Number(a.pointSyl) - Number(b.pointSyl) ?? 0;
            },
            onCell(data: Obj) {
                return {
                    style: {
                        color: getColorTeacherPoint(data.pointSyl),
                        fontWeight: 'bold'
                    }
                }
            },
        },
        {
            key: 'DOCDETAIL',
            dataIndex: 'docDetail',
            title: 'Chia sẻ thêm',
            fixed: 'right',
            width: 400
        },
    ];

    useEffect(() => {
        if ((listResponseFeedback.data.response?.data as Obj)?.list) {
            const dataTable = mapTableDataToExcel(tableRef.current as HTMLDivElement);
            if (dataTable.length) {
                dataExcel.current = dataTable;
            }
        }
    }, [(listResponseFeedback.data.response?.data as Obj)?.list]);
    return (
        <div className={styles.collectionAnswer}>
            <div className={styles.toolBar}>
                <Button
                    size="small"
                    className={`${styles.btn}`}
                    onClick={() => {
                        listResponseFeedback.query(getPaginating?.recordOnPage ?? 100, getPaginating?.currentPage ?? 1, debounceFilter)
                    }}
                >
                    <span>{MapIconKey[KEY_ICON.RELOAD]} Reset</span>
                </Button>
                <ExportExcel fileName='feedback' sizeBtn='small' onExport={(exportFnc) => {
                    exportFnc(dataExcel.current);
                }} />
            </div>
            <Table
                loading={listResponseFeedback.data.isLoading}
                onChangeDataPagination={(data) => {
                    listResponseFeedback.query(data.currentTotalRowOnPage, data.currentPage);
                }}
                maxPage={(listResponseFeedback.data.response?.data as Obj)?.totalPage ?? 1}
                enablePaginationAjax
                disableDefaultPagination
                className={styles.tableAnswerFeedback}
                bordered
                hasFixedColumn
                columns={columns}
                rowData={rowData}
                showSizePage
                rowOnPage={(listResponseFeedback.data.response?.data as Obj)?.rowOnPage ?? 100}
                ref={tableRef}
            />
        </div>
    )
}

export default CollectionAnswer;