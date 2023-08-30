import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Columns, Obj } from '@/global/interface';
import { KEY_ICON } from '@/global/enum';
import { useGetListCourse } from '@/utils/hooks';
import { generateRowDataForMergeRowSingleField } from '@/utils';
import Table from '@/components/Table';
import { MapIconKey } from '@/global/icon';
import styles from '@/styles/course/ManagerCourse.module.scss';
import Popup from '../Popup';

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
    const columns: Columns = [
        {
            key: 'COURSE',
            title: 'Khoá',
            dataIndex: 'courseName',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'SYLLABUS',
            title: 'Lộ trình',
            dataIndex: 'syllabus',
            render(value) {
                return <a href={value || ''} target="_blank">Link</a>
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
                        return value.levelNumber || ''
                    }

                },
                {
                    key: 'CODE',
                    title: 'Mã',
                    dataIndex: 'courseLevel',
                    render(value) {
                        return value.levelCode || ''
                    }
                },
                {
                    key: 'NAME',
                    title: 'Tên',
                    dataIndex: 'courseLevel',
                    render(value) {
                        return value.levelName || ''
                    }
                },
                {
                    key: 'TEXTBOOK',
                    title: 'Giáo trình',
                    dataIndex: 'courseLevel',
                    render(value) {
                        return <a href={value.textBook || ''} target="_blank">Link</a>
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
        <div className={styles.containerTable}>
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
        </div>
    )
}

export default List;