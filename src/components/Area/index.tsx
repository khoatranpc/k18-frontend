import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Columns, Obj, RowData } from '@/global/interface';
import { useCreateArea, useGetArea } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import ModalCustomize from '../ModalCustomize';
import ModalArea from './ModalArea';
import Table from '../Table';
import styles from '@/styles/Location.module.scss';

const Area = () => {
    const area = useGetArea();
    const createArea = useCreateArea();
    const [modal, setModal] = useState<{
        open: boolean,
        isCreate: boolean,
        data?: Obj
    }>({
        open: false,
        isCreate: false,
        data: undefined
    });
    const message = useHookMessage();
    const columns: Columns = [
        {
            title: 'Mã khu vực',
            dataIndex: 'code'
        },
        {
            title: 'Tên khu vực',
            dataIndex: 'name'
        },
        {
            title: 'Số cơ sở',
            className: 'text-center',
            children: [
                {
                    title: 'Hoạt động',
                    dataIndex: 'active',
                    className: 'text-center',
                    render(value) {
                        return value ?? 0;
                    },
                },
                {
                    title: 'Ngưng Hoạt động',
                    dataIndex: 'deactive',
                    className: 'text-center',
                    render(value) {
                        return value ?? 0;
                    },
                },
            ]
        },
        {
            title: 'Hành động',
            className: 'text-center',
            render(_, record) {
                return <div>
                    <Button style={{ marginRight: '1.2rem' }} onClick={() => {
                        setModal({
                            open: true,
                            isCreate: false,
                            data: record
                        });
                    }}>Cập nhật</Button>
                    <Button>Xoá</Button>
                </div>
            },
            width: 200
        }
    ];
    const rowData: RowData[] = (area.data.response?.data as Obj[])?.map((item) => {
        return {
            key: item._id as string,
            ...item
        }
    });
    const handleCreate = (values: Obj) => {
        createArea.query({
            body: values
        });
    }
    useEffect(() => {
        area.query();
    }, []);
    useEffect(() => {
        if (createArea.data.response) {
            if (createArea.data.success) {
                setModal({
                    open: true,
                    isCreate: true,
                    data: undefined
                });
                area.query();
            }
            message.open({
                content: createArea.data.response.message as string,
                type: createArea.data.success ? 'success' : 'error'
            });
            createArea.clear?.();
            message.close();
        }
    }, [createArea.data]);
    return (
        <div className={styles.area}>
            <div className={styles.btn}>
                <Button onClick={() => {
                    setModal({
                        open: true,
                        isCreate: true,
                        data: undefined
                    });
                }}>Thêm</Button>
            </div>
            <Table
                loading={area.data.isLoading}
                columns={columns}
                rowData={rowData}
                disableDefaultPagination
            />
            {
                modal &&
                <ModalCustomize
                    show={modal.open}
                    modalHeader={<h2>Thêm khu vực</h2>}
                    onHide={() => {
                        setModal({
                            open: false,
                            isCreate: false,
                            data: undefined
                        });
                    }}
                >
                    <ModalArea data={modal.data} isCreate={modal.isCreate} handleSubmit={handleCreate} loading={createArea.data.isLoading} />
                </ModalCustomize>
            }
        </div>
    )
}

export default Area;