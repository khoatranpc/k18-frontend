import React, { useEffect } from 'react';
import { Select, SelectProps } from 'antd';
import { Obj } from '@/global/interface';
import { useGetArea } from '@/utils/hooks';
import styles from '@/styles/Location.module.scss';

interface Props extends SelectProps {

}
const SelectArea = (props: Props) => {
    const area = useGetArea();
    const getArea = area.data.response?.data as Obj[];
    const mapOptions = getArea?.map(item => {
        return {
            ...item,
            key: item._id,
            value: item._id,
            label: `${item.region}-${item.name}`
        }
    }) ?? [];
    useEffect(() => {
        if (!area.data.response) {
            area.query();
        }
    }, []);
    return (
        <div className={styles.selectArea}>
            <Select
                {...props}
                options={mapOptions}
            />
        </div>
    )
}

export default SelectArea;