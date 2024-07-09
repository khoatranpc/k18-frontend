import React, { useEffect } from 'react';
import { EditOutlined, EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { Columns, Obj } from '@/global/interface';
import { useHandleDrawer, useListCs } from '@/utils/hooks';
import { PositionCs } from '@/global/enum';
import { getLabelPositionCs } from '@/utils';
import Table from '@/components/Table';
import styles from '@/styles/CS.module.scss';

const ListCS = () => {
    const drawer = useHandleDrawer();
    const listCs = useListCs();
    const router = useRouter();
    const getListCs = (listCs.data.response?.data as Obj[] ?? []).map(item => {
        return {
            ...item,
            key: item._id
        }
    });
    const columns: Columns = [
        {
            key: 'EMAIL',
            title: 'Email',
            dataIndex: 'email'
        },
        {
            key: 'NAME',
            title: 'Tên',
            dataIndex: 'name',
            render(value, record) {
                return <div className={styles.viewCs}>
                    <img src={record.image as string ?? ''} />
                    {value}
                </div>
            }
        },
        {
            key: 'POSITION',
            title: 'Vị trí',
            dataIndex: 'position',
            render(value) {
                return getLabelPositionCs[value as PositionCs];
            }
        },
        {
            key: 'LC',
            title: 'BU',
            dataIndex: 'area',
            render(value) {
                return value ? `${(value).region} - ${value.name}` : ''
            }
        },
        {
            key: 'STATUS',
            title: 'Trạng thái',
            dataIndex: 'active',
            className: 'text-center',
            render(value) {
                return <span className={styles.status} style={{ backgroundColor: Boolean(value) ? 'var(--success)' : 'var(--status-process-no-process)', color: 'white' }}>{Boolean(value) ? 'Hoạt động' : 'Ngừng hoạt động'}</span>
            }
        },
        {
            key: 'ACTION',
            title: 'Hành động',
            className: 'text-center',
            render(_, record) {
                return <div className={styles.btnAction}>
                    <Button icon={<EyeOutlined />} size='small' onClick={() => {
                        router.push(`/cs/${record._id}`);
                    }}>Chi tiết</Button>
                    <Button icon={<EditOutlined />} size='small'
                        onClick={() => {
                            handleOpen('Cập nhật tài khoản', { isCreate: false, csId: record._id })
                        }}
                    >
                        Cập nhật</Button>
                </div>
            }
        }
    ];
    const handleOpen = (title: string, props?: Obj) => {
        drawer.open({
            componentDirection: 'CS/FormCS',
            open: true,
            title: title,
            props
        });
    }

    useEffect(() => {
        if (!listCs.data.response?.data) {
            listCs.query();
        }
    }, []);
    return (
        <div className={styles.listCs}>
            <div className={styles.topAction}>
                <Button size="small" icon={<ReloadOutlined />} className={styles.reload} onClick={() => {
                    listCs.query();
                }}></Button>
                <Button size="small" onClick={() => handleOpen('Tạo tài khoản', { isCreate: true })}>Tạo</Button>
            </div>
            <Table
                columns={columns}
                rowData={getListCs}
                disableDefaultPagination
            />
        </div>
    )
}

export default ListCS;