import React from 'react';
import styles from '@/styles/feedback/Feedback.module.scss';
import { Radio } from 'antd';

interface Props {
    value: string | number;
    onChange?: (value: string | number) => void;
}
const value = [
    {
        value: 1,
        label: 1
    },
    {
        value: 2,
        label: 2
    },
    {
        value: 3,
        label: 3
    },
    {
        value: 4,
        label: 4
    },
    {
        value: 5,
        label: 5
    },
];
const getColorLevelClass: Record<number, string> = {
    [1]: 'redLevel',
    [2]: 'orangeLevel',
    [3]: 'yellowLevel',
    [4]: 'greenLightLevel',
    [5]: 'greenLevel'
}

const Point = (props: Props) => {
    return (
        <div className={`${styles.point} feedbackPoint flex items-center gap-[1.2rem]`}>
            <span className="font-semibold">Rất không hài lòng</span>
            <Radio.Group optionType='button' className={styles.parentPoint} value={props.value} onChange={(e) => {
                props.onChange?.(e.target.value as string);
            }}>
                {value.map((item, idx) => {
                    return <Radio className={`w-full block ${getColorLevelClass[item.value]}`} key={idx} value={item.value}><p className="text-center">{item.label}</p></Radio>
                })}
            </Radio.Group>
            <span className="font-semibold">Rất hài lòng</span>
        </div>
    )
}

export default Point;