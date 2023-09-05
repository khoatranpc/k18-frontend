import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Columns, Obj } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import { useGetListCourse } from '@/utils/hooks';
import { generateRowDataForMergeRowSingleField } from '@/utils';
import Table from '@/components/Table';
import Popup from '../Popup';
import styles from '@/styles/course/ManagerCourse.module.scss';
import PopupDetailCourse from '../PopupDetailCourse';

const initModal = {
    show: false,
    title: '',
    courseId: '',
    levelId: ''
}
const List = () => {
    const listCourse = useGetListCourse();
    const [modal, setModal] = useState<{
        show: boolean;
        title: string;
        courseId: string;
        levelId: string;
    }>(initModal);

    const [modalDetail, setModalDetail] = useState<{
        show: boolean;
        courseId: string;
    }>({
        show: false,
        courseId: '',
    });
    const columns: Columns = [
        {
            key: 'COURSE',
            title: 'Khoá',
            dataIndex: 'courseName',
            className: `tdCourse`,
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            },
            render(value, record) {
                return <div className={styles.divFlex}>
                    <span>{value}</span>
                    <EyeOutlined
                        className={`${styles.iconEye} iconEye`}
                        onClick={() => {
                            setModalDetail({
                                show: true,
                                courseId: record._id as string
                            })
                        }}
                    />
                </div>
            }
        },
        {
            key: 'SYLLABUS',
            title: 'Lộ trình',
            dataIndex: 'syllabus',
            render(value) {
                return value ? <a href={value || ''} target="_blank" className={"link"}>Link</a> : 'Thiếu'
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
                        return value.levelNumber || 'Thiếu'
                    }

                },
                {
                    key: 'CODE',
                    title: 'Mã',
                    dataIndex: 'courseLevel',
                    render(value) {
                        return value.levelCode || 'Thiếu'
                    }
                },
                {
                    key: 'NAME',
                    title: 'Tên',
                    dataIndex: 'courseLevel',
                    render(value) {
                        return value.levelName || 'Thiếu'
                    }
                },
                {
                    key: 'TEXTBOOK',
                    title: 'Giáo trình',
                    dataIndex: 'courseLevel',
                    render(value) {
                        return value.textBook ? <a href={value.textBook || ''} target="_blank" className={"link"}>Link</a> : 'Thiếu'
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
        <div className={`${styles.containerTable} tableListCourse`}>
            <div className={styles.reload}>
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
            {modalDetail.show && <PopupDetailCourse
                courseId={modalDetail.courseId}
                show={modalDetail.show}
                onHide={() => {
                    setModalDetail({
                        show: false,
                        courseId: ''
                    });
                }}
            />}
        </div>
    )
}

export default List;