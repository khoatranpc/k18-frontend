import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Popover, Popconfirm } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Columns, Obj, RowData, State } from '@/global/interface';
import { mapRoleToString } from '@/global/init';
import { KEY_ICON, ROLE_TEACHER } from '@/global/enum';
import { MapIconKey } from '@/global/icon';
import { generateRowDataForMergeRowSingleField, uuid } from '@/utils';
import { useQueryBookTeacher } from '@/utils/hooks';
import { RootState } from '@/store';
import Table from '@/components/Table';
import ModalCustomize from '@/components/ModalCustomize';
import AddRequestGroup from './AddRequestGroup';
import styles from '@/styles/class/BookTeacher.module.scss';

interface Props {
    classId: string;
}
const BookTeacher = (props: Props) => {
    const { query } = useQueryBookTeacher('GET');
    const router = useRouter();
    const columns: Columns = [
        {
            key: 'GROUP_NUMBER',
            dataIndex: 'groupNumber',
            className: `${styles.tdGroup}`,
            title: 'Nhóm',
            render(value, record) {
                return <Popover
                    trigger={['hover']}
                    placement='top'
                    content={<div className={styles.popOver}>
                        <div>Chi tiết</div>
                        <Popconfirm
                            title="Xoá nhóm"
                            okText="Xác nhận"
                            cancelText="Huỷ"
                            placement="top"
                            onConfirm={() => {
                                console.log('delete', record._id as string);
                            }}
                        >
                            <div>
                                Xoá
                            </div>
                        </Popconfirm>
                    </div>}
                >
                    <span>{value}</span>
                    <EyeOutlined className={styles.eye} />
                </Popover>;
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'LOCATION',
            dataIndex: 'locationId',
            title: 'Cơ sở',
            render(value) {
                return <div>{value?.locationCode} - {value?.locationDetail}</div>
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'TEACHER_REGISTER',
            dataIndex: 'teacherRegister',
            title: 'Giáo viên đăng ký',
            render(value) {
                return <div>{value?.idTeacher?.fullName || 'Thiếu'}</div>
            },
        },
        {
            key: 'ROLE',
            dataIndex: 'teacherRegister',
            title: 'Vị trí',
            render(value) {
                return <div>
                    {mapRoleToString[value?.roleRegister as ROLE_TEACHER] || 'Thiếu'}
                </div>
            },
        },
        {
            key: 'STATUS',
            dataIndex: 'teacherRegister',
            title: 'Trạng thái',
            className: 'text-center',
            render(value) {
                return <div>{value.accept ? 'Duyệt' : 'Chưa duyệt'}</div>
            },
        },
    ]
    const [openModal, setOpenModal] = useState<boolean>(false);
    const dataRd = useSelector((state: RootState) => (state.bookTeacher as State).state);
    const rowData: RowData[] = ((dataRd?.response as Obj)?.data as Array<Obj>)?.map((item) => {
        return {
            key: uuid(),
            ...item
        }
    }) || [];
    useEffect(() => {
        query!(router.query.classId as string);
    }, []);
    return (
        <div className={styles.bookTeacher}>
            <div className={styles.fnc}>
                <Button
                    className={styles.btnCreateRequest}
                    onClick={() => {
                        setOpenModal(true);
                    }}>
                    {MapIconKey[KEY_ICON.PLCR]}
                    <span>Thêm nhóm</span>
                </Button>
            </div>
            <ModalCustomize
                modalHeader={'Thêm nhóm'}
                show={openModal}
                onHide={() => {
                    setOpenModal(false);
                }}
            >
                <AddRequestGroup
                    groupNumber={((dataRd?.response as Obj)?.data as Array<Obj>)?.length + 1}
                    classId={router.query.classId as string}
                    closeModal={() => {
                        setOpenModal(false);
                    }}
                />
            </ModalCustomize>
            <Table
                loading={dataRd.isLoading}
                className="hasMergeCell"
                bordered
                columns={columns}
                rowData={generateRowDataForMergeRowSingleField(rowData, 'teacherRegister')}
                disableDefaultPagination
            />
        </div>
    )
}

export default BookTeacher;