import React from 'react';
import { Select, SelectProps } from 'antd';
import { Obj } from '@/global/interface';
import { useListCs } from '@/utils/hooks';

interface Props extends SelectProps { };

const SelectCs = (props: Props) => {
    const listCs = useListCs();
    const getListCs = (listCs.data.response?.data as Obj[] ?? [])?.map(item => {
        return {
            ...item,
            key: item._id
        }
    });
    return (
        <Select
            {...props}
            options={getListCs?.map((item: Obj) => {
                return {
                    value: item._id,
                    label: <div><img src={item.image} /> {item.name}</div>
                }
            })}
        />
    )
}

export default SelectCs;