import React, { useEffect } from 'react';
import { Button, Dropdown, MenuProps } from 'antd';
import { Obj } from '@/global/interface';
import { useGetLocations } from '@/utils/hooks';
import styles from '@/styles/Location.module.scss';

interface Props {
    /**
     * @title this param shows label of value
     */
    title?: string;
    className?: string;
    selectClassName?: string;
    sizeButton?: 'small' | 'large' | 'middle'
    onSelectLocation?: (locationId: string, text?: string, code?: string) => void;
}
const SelectLocation = (props: Props) => {
    const { locations, queryLocations } = useGetLocations();
    const mapLocation: MenuProps['items'] = (locations?.data as Array<Obj>)?.map((item) => {
        return {
            key: item._id as string,
            label: item.locationDetail as string,
            onClick() {
                props.onSelectLocation?.(item._id as string, item.locationDetail as string, item.locationCode as string);
            }
        }
    }) || [];
    useEffect(() => {
        if (!locations) {
            queryLocations();
        }
    }, [locations])
    return (
        <div className={`${styles.selectLocation} ${props.className}`}>
            <Dropdown
                menu={{ items: mapLocation }}
                trigger={['click']}
                overlayClassName={props.selectClassName}
            >
                <Button size={props.sizeButton}>{props.title || 'Click'}</Button>
            </Dropdown>
        </div>
    )
}

export default SelectLocation;