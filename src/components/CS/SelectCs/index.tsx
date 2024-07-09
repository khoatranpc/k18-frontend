import React, { useEffect } from 'react';
import { Select, SelectProps } from 'antd';
import { Obj } from '@/global/interface';
import { useListCs } from '@/utils/hooks';
import styles from '@/styles/CS.module.scss';

interface Props extends SelectProps { };

const SelectCs = (props: Props) => {
    const listCs = useListCs();
    const getListCs = (listCs.data.response?.data as Obj[] ?? [])?.map(item => {
        return {
            ...item,
            key: item._id
        }
    });
    useEffect(() => {
        if (!listCs.data.response) {
            listCs.query();
        }
    }, []);
    return (
        <div style={{ width: '100%' }} className={styles.selectCs}>
            <Select
                loading={listCs.data.isLoading}
                {...props}
                placeholder="Tìm kiếm theo tên hoặc email"
                options={getListCs?.map((item: Obj) => {
                    return {
                        ...item,
                        value: item._id,
                        label: <div className={styles.viewCs}><img src={item.image} />CS {item.area?.code} | {item.name}</div>
                    }
                })}
            />
        </div>
    )
}

export default SelectCs;