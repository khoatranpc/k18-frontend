import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MenuProps } from 'antd';
import { Obj } from '@/global/interface';
import { useGetTimeSchedule } from '@/utils/hooks';
import Dropdown, { ClickItem } from '../Dropdown';
import { queryGetListTimeSchedule } from '@/store/reducers/timeSchedule.reducer';
import styles from '@/styles/PickTimeSchedule.module.scss'

interface Props {
    className?: string;
    title?: string;
    keyIndex?: string;
    value?: string;
    hasFilterByValue?: boolean;
    onClickItem?: (e: ClickItem, keyIndex?: string | undefined) => void;
}
const PickTimeSchedule = (props: Props) => {
    const listTimeSchedule = useGetTimeSchedule();
    const dispatch = useDispatch();
    const listSelect: MenuProps['items'] =
        ((props.hasFilterByValue && props.value) ?
            ((listTimeSchedule?.data as Array<Obj>)?.filter((item) => {
                return item.weekday as string === props.value
            })!.map((item) => {
                return {
                    key: item._id as string,
                    label: <span>{item.weekday as string}: {item.start as string}-{item.end as string}</span>,
                }
            }))
            :
            (listTimeSchedule?.data as Array<Obj>)?.map((item) => {
                return {
                    key: item._id as string,
                    label: <span>{item.weekday as string}: {item.start as string}-{item.end as string}</span>,
                }
            })) || [];

    useEffect(() => {
        if (!listTimeSchedule) {
            dispatch(queryGetListTimeSchedule());
        }
    }, [listTimeSchedule, dispatch]);
    return (
        <Dropdown
            className={`${props.className}  ${styles.pickTimeSchedule}`}
            trigger='click'
            listSelect={listSelect}
            keyIndex={props.keyIndex}
            title={props.title || 'Chọn lịch'}
            onClickItem={props.onClickItem}
        />
    )
}

export default PickTimeSchedule;