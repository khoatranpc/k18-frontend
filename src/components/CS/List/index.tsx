import React, { useEffect } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { Columns, Obj } from '@/global/interface';
import { useHandleDrawer, useListCs } from '@/utils/hooks';
import Table from '@/components/Table';
import { Button } from 'antd';
import styles from '@/styles/CS.module.scss';

const ListCS = () => {
    const drawer = useHandleDrawer();
    const listCs = useListCs();
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
            dataIndex: 'name'
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
            render(value) {
                return <span>{Boolean(value) ? 'Hoạt động' : 'Ngừng hoạt động'}</span>
            }
        },
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
                <Button size="small" onClick={() => handleOpen('Tạo tài khoản', { isCreate: true })}>Tạo tài khoản</Button>
            </div>
            <Table
                columns={columns}
                rowData={getListCs}
                disableDefaultPagination
                hanldeClickRow={(record) => {
                    handleOpen('Cập nhật tài khoản', { isCreate: false, csId: record._id })
                }}
            />
        </div>
    )
}

export default ListCS;