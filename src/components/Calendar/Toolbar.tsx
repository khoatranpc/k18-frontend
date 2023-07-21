import React from 'react';
import { ToolbarProps } from 'react-big-calendar';
import styles from '@/styles/Calendar.module.scss';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';

const getViewString = {
    month: 'Tháng',
    week: 'Tuần',
    day: 'Ngày'
}
const Toolbar = (props: ToolbarProps<Event, object>) => {
    console.log(props);
    return (
        <div className={`${styles.toolbar}`}>
            <div className={`${styles.left}`}>
                <span className={`${styles.chevronL}`}>
                    {MapIconKey[KEY_ICON.CHEVRONLCAL]}
                </span>
                <span className={styles.chevronR}>
                    {MapIconKey[KEY_ICON.CHEVRONLCAL]}
                </span>
                <span className={styles.month}>Tháng {props.label}</span>
                <button className={styles.btnToday} >Hôm nay</button>
            </div>
            <div className={styles.right}>
                {(props.views as Array<string>).slice(0, (props.views as Array<string>).length - 1).map((item, idx) => {
                    return <button key={idx} className={`${props.view === item ? styles.active : ''}`}>{
                        getViewString[item as 'month' | 'week' | 'day']
                    }</button>
                })}
            </div>
        </div>
    )
}

export default Toolbar;