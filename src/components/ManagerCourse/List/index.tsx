import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Columns, Obj } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON, PositionTe } from '@/global/enum';
import { useComparePositionTE, useGetListCourse } from '@/utils/hooks';
import { generateRowDataForMergeRowSingleField } from '@/utils';
import Table from '@/components/Table';
import Popup from '../Popup';
import PopupDetailCourse from '../PopupDetailCourse';
import PopupLevel from '../PopupLevel';
import styles from '@/styles/course/ManagerCourse.module.scss';
import useGetCrrUser from '@/utils/hooks/getUser';

const initModal = {
    show: false,
    title: '',
    courseId: '',
    levelId: ''
}
const initModalDetail = {
    show: false,
    courseId: ''
}
const List = () => {
    const listCourse = useGetListCourse();
    const hasRole = useComparePositionTE(PositionTe.LEADER);
    const [modal, setModal] = useState<{
        show: boolean;
        title: string;
        courseId: string;
        levelId: string;
    }>(initModal);
    const [modalDetail, setModalDetail] = useState<
        {
            show: boolean;
            courseId: string
        }>({
            show: false,
            courseId: ''
        });
    const [modalLevelCourse, setModalLevelCourse] = useState<{
        show: boolean,
        courseId: string;
        levelId: string;
        level: Obj
    }>({
        courseId: '',
        levelId: '',
        show: false,
        level: {}
    });
    const handleClickCellLevelCourse = (record: Obj) => {
        if (record.courseLevel._id) {
            setModalLevelCourse({
                show: true,
                courseId: record._id as string,
                levelId: record.courseLevel._id as string,
                level: {
                    ...record.courseLevel as Obj
                }
            })
        }
    }
    const columns: Columns = [
        {
            key: 'COURSE',
            title: 'Khối',
            dataIndex: 'courseName',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            },
            render(value, record) {
                return <div className={`${styles.cellCourseName}`}>
                    {value}
                    <EyeOutlined
                        className={`${styles.icon} iconEyeCourse`}
                        onClick={function (e) {
                            setModalDetail({
                                show: true,
                                courseId: record._id as string
                            });
                        }}
                    />
                </div>
            },
        },
        {
            key: 'SYLLABUS',
            title: 'Lộ trình',
            dataIndex: 'syllabus',
            render(value) {
                return value ? <a href={value || ''} target="_blank" className="link">Link</a> : <span className="error">Thiếu</span>
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'LIST_SUBJECT',
            title: 'Môn học',
            children: [
                {
                    key: 'ORDER',
                    title: 'STT',
                    dataIndex: 'courseLevel',
                    render(value) {
                        return value.levelNumber || <span className="error">Thiếu</span>
                    }

                },
                {
                    key: 'CODE',
                    title: 'Mã',
                    dataIndex: 'courseLevel',
                    className: `${styles.tdHover}`,
                    render(value) {
                        return value.levelCode || <span className="error">Thiếu</span>
                    },
                    onCell(record: Obj) {
                        return {
                            onClick() {
                                handleClickCellLevelCourse(record);
                            }
                        }
                    }
                },
                {
                    key: 'NAME',
                    title: 'Tên',
                    className: `${styles.tdHover}`,
                    dataIndex: 'courseLevel',
                    render(value) {
                        return value.levelName || <span className="error">Thiếu</span>
                    },
                    onCell(record: Obj) {
                        return {
                            onClick() {
                                handleClickCellLevelCourse(record);
                            }
                        }
                    }
                },
                {
                    key: 'TEXTBOOK',
                    title: 'Giáo trình',
                    dataIndex: 'courseLevel',
                    render(value) {
                        return value.textbook ? <a href={value.textbook || ''} target="_blank" className="link">Link</a> : <span className="error">Thiếu</span>
                    }
                },
            ]
        }
    ];
    const getDataMergeRow = generateRowDataForMergeRowSingleField(listCourse.listCourse?.data as Array<Obj> || [], 'courseLevel');
    useEffect(() => {
        if (!listCourse.listCourse) {
            listCourse.queryListCourse();
        }
    }, []);
    return (
        <div className={`${styles.containerTable} tableCourse`}>
            {hasRole && <div className={styles.reload}>
                <Button
                    size="small"
                    className={`btn-toolbar mr-8`}
                    onClick={(() => {
                        setModal({
                            title: 'Thêm mới khoá học!',
                            courseId: '',
                            levelId: '',
                            show: true
                        })
                    })}
                >
                    <span>{MapIconKey[KEY_ICON.PLCR]} Tạo mới</span>
                </Button>
                <Button
                    size="small"
                    className={`btn-toolbar ${styles.btnReload}`}
                    onClick={() => {
                        listCourse.queryListCourse();
                    }}
                >
                    <span>{MapIconKey[KEY_ICON.RELOAD]}</span>
                </Button>
            </div>
            }
            <Table
                loading={listCourse.loading}
                disableDefaultPagination
                columns={columns}
                rowData={getDataMergeRow}
            />
            {modal.show && <Popup
                show={modal.show}
                title={modal.title}
                onHide={() => {
                    setModal(initModal);
                }}
            />}
            {
                modalDetail.show && <PopupDetailCourse
                    show={modalDetail.show}
                    onHide={() => {
                        setModalDetail(initModalDetail);
                    }}
                    courseId={modalDetail.courseId}
                />
            }
            {
                modalLevelCourse.show && <PopupLevel
                    show={modalLevelCourse.show}
                    courseId={modalDetail.courseId}
                    levelCode={modalLevelCourse.level.levelCode}
                    levelName={modalLevelCourse.level.levelName}
                    levelId={modalLevelCourse.level._id}
                    levelNumber={modalLevelCourse.level.levelNumber}
                    textbook={modalLevelCourse.level.textbook}
                    onHide={() => {
                        setModalLevelCourse({
                            show: false,
                            courseId: '',
                            levelId: '',
                            level: {}
                        });
                    }}
                />
            }
        </div>
    )
}

export default List;