import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { PositionTe } from '@/global/enum';
import { Columns, Obj, RowData } from '@/global/interface';
import { useComparePositionTE, useCreateTimeSchedule, useGetTimeSchedule, useUpdateTimeSchedule } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import Table from '../Table';
import ModalTime from './ModalTime';
import styles from '@/styles/Timeschedule.module.scss';

const Timeschedule = () => {
    const listTimeSchedule = useGetTimeSchedule();
    const hasRole = useComparePositionTE(PositionTe.LEADER, PositionTe.QC, PositionTe.ASSISTANT);
    const message = useHookMessage();
    const createTimeSchedule = useCreateTimeSchedule();
    const updateTimeSchedule = useUpdateTimeSchedule();
    const [modal, setModal] = useState<Obj>({
        open: false,
        isCreate: true,
        timeId: '',
    });
    const columns: Columns = [
        {
            title: 'STT',
            render(_, __, index) {
                return index + 1;
            }
        },
        {
            title: 'Thứ',
            dataIndex: 'weekday'
        },
        {
            title: 'Khung giờ',
            render(_, record) {
                return record ? `${record.start}-${record.end}` : ''
            }
        },
        {
            title: 'Hành động',
            render(_, record) {
                return <div>
                    <Button
                        onClick={() => {
                            setModal({
                                isCreate: false,
                                open: true,
                                timeId: record?._id as string,
                                data: {
                                    weekday: record?.weekday as string,
                                    start: record?.start as string,
                                    end: record?.end as string,
                                }
                            });
                        }}
                    >
                        Cập nhật
                    </Button>
                    <Button>Xoá</Button>
                </div>
            }
        }
    ];
    const rowData: RowData[] = (listTimeSchedule.data.response?.data as Obj[])?.map((item) => {
        return {
            key: item._id as string,
            ...item
        }
    });
    useEffect(() => {
        if (!listTimeSchedule.data.response) {
            listTimeSchedule.query();
        }
    }, []);
    useEffect(() => {
        if (createTimeSchedule.data.response || updateTimeSchedule.data.response) {
            message.open({
                type: (createTimeSchedule.data.success || updateTimeSchedule.data.success) ? 'success' : 'error',
                content: createTimeSchedule.data.response?.message as string ?? updateTimeSchedule.data.response?.message as string
            });
            if (createTimeSchedule.data.response) {
                createTimeSchedule.clear?.();
            }
            if (updateTimeSchedule.data.response) {
                createTimeSchedule.clear?.();
            }
            message.close();
        }
    }, [createTimeSchedule.data.response, updateTimeSchedule.data.response]);
    return (
        <div className={styles.timeSchedule}>
            {
                hasRole &&
                <div className={styles.btn}>
                    <Button
                        className={styles.btnCreateTimeRange}
                        onClick={() => {
                            setModal({
                                open: true,
                                isCreate: true,
                                timeId: ''
                            })
                        }}>Tạo khung giờ</Button>
                </div>
            }
            <Table
                columns={columns}
                rowData={rowData}
                disableDefaultPagination
            />
            {modal.open && <ModalTime
                data={modal.data}
                onSubmit={(data) => {
                    if (modal.isCreate) {
                        createTimeSchedule.query({
                            body: data
                        });
                    } else {
                        updateTimeSchedule.query({
                            body: data,
                            params: [modal.timeId]
                        });
                    }
                }}
                isCreate={modal.isCreate}
                loading={createTimeSchedule.data.isLoading || updateTimeSchedule.data.isLoading}
                show={modal.open}
                onHide={() => {
                    setModal({
                        open: false,
                        isCreate: true,
                        timeId: ''
                    });
                }} />}
        </div>
    )
}

export default Timeschedule;