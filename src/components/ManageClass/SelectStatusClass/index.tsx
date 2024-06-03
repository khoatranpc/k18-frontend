import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { STATUS_CLASS } from '@/global/enum';
import { mapStatusToString } from '@/global/init';
import styles from '@/styles/class/Class.module.scss';

interface Props {
    value?: keyof typeof STATUS_CLASS | 'ALL';
    onChange?: (value: string) => void;
}

const SelectStatusClass = (props: Props) => {
    const [value, setValue] = useState(props.value ?? 'ALL');
    const options = Object.keys(mapStatusToString).map((key) => {
        return {
            label: mapStatusToString[key as STATUS_CLASS],
            value: key
        }
    });
    useEffect(() => {
        props.onChange?.(value);
    }, [value]);
    return (
        <div className={`${styles.selectStatusClass}`} >
            <Select

                value={value}
                size="small"
                options={[{
                    label: 'Tất cả',
                    value: 'ALL'
                }, ...options]}
                onChange={(value: keyof typeof STATUS_CLASS | 'ALL') => {
                    setValue(value);
                }}
            />
        </div>
    )
}

export default SelectStatusClass;