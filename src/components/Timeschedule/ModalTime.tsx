import React, { useState } from 'react';
import { Button, DatePicker, MenuProps } from 'antd';
import { getOrderWeekday } from '@/global/init';
import { Obj } from '@/global/interface';
import ModalCustomize from '../ModalCustomize';
import Dropdown from '../Dropdown';
import styles from '@/styles/Timeschedule.module.scss';

interface Data {
    weekday: keyof typeof getOrderWeekday | string;
    start: string;
    end: string;
}
interface Props {
    show?: boolean;
    onHide?: () => void;
    isCreate?: boolean;
    loading?: boolean;
    onSubmit?: (data: Data) => void;
    data?: Data;
}
const ModalTime = (props: Props) => {
    const getListWeekday = Object.keys(getOrderWeekday);
    const [data, setData] = useState<Data>({
        weekday: props.data?.weekday ?? '',
        end: props.data?.end ?? '',
        start: props.data?.start ?? ''
    });
    const listSelect: MenuProps['items'] = getListWeekday.map((item) => {
        return {
            key: item,
            label: item
        }
    });
    return (
        <ModalCustomize
            show={props.show}
            onHide={props.onHide}
            modalHeader={props.isCreate ? 'Tạo khung giờ' : 'Cập nhật khung giờ'}
            loading={props.loading}
            size="sm"
            centered
        >
            <div>
                <Dropdown
                    sizeButton="small"
                    listSelect={listSelect}
                    trigger="click"
                    title={data.weekday ? data.weekday : 'Chọn ngày'}
                    onClickItem={(e) => {
                        const getKey = e.key as string;
                        if (data.weekday !== getKey) {
                            setData({
                                ...data,
                                weekday: getKey
                            });
                        }
                    }}
                />
                <div className={styles.pickTime}>
                    <div className={styles.item}>
                        <label>Giờ bắt đầu</label>
                        <DatePicker.TimePicker
                            size="small"
                            format={"HH:mm"}
                            placeholder="Giờ bắt đầu"
                            onChange={(value) => {
                                const getH = (value as Obj)?.$H;
                                const getM = (value as Obj)?.$m;
                                if (getH !== 'undefined' && getM !== 'undefined') {
                                    const mapStr = `${getH}:${getM} ${getH > 11 ? 'PM' : 'AM'}`
                                    setData({
                                        ...data,
                                        start: mapStr
                                    });
                                }
                            }}
                        />
                    </div>
                    <div className={styles.item}>
                        <label>Giờ kết thúc</label>
                        <DatePicker.TimePicker
                            size="small"
                            format={"HH:mm"}
                            placeholder="Giờ kết thúc"
                            onChange={(value) => {
                                const getH = (value as Obj)?.$H;
                                const getM = (value as Obj)?.$m;
                                if (getH !== 'undefined' && getM !== 'undefined') {
                                    const mapStr = `${getH}:${getM} ${getH > 11 ? 'PM' : 'AM'}`
                                    setData({
                                        ...data,
                                        end: mapStr
                                    });
                                }
                            }}
                        />
                    </div>
                    <div className={styles.btnGroup}>
                        <Button
                            size="small"
                            onClick={() => {
                                props.onSubmit?.(data);
                            }}
                            loading={props.loading}
                        >
                            {props.isCreate ? 'Tạo' : 'Cập nhật'}
                        </Button>
                    </div>
                </div>
            </div>
        </ModalCustomize>
    )
}

export default ModalTime;