import React from 'react';
import { DatePicker } from 'antd';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import TableIndex from './TableIndex';
import PiResourceApply from './PiResourceApply';
import ByCourse from './ByCourse';
import styles from '@/styles/Overview.module.scss';

interface Props {
    setOpenExpand?: () => void;
}
const OverViewRecruitment = (props: Props) => {
    return (
        <div className={`${styles.overViewRecruitment}`}>
            <h2>Tuyển dụng</h2>
            <div className={`${styles.pickDate}`}>
                Lọc: <DatePicker size="small" placeholder="Từ ngày" format="DD/MM/YYYY" />
                <span className={styles.arrow}>{MapIconKey[KEY_ICON.ARROWL]}</span>
                <DatePicker size="small" placeholder="Đến ngày" format="DD/MM/YYYY" />
            </div>
            <div className={styles.chartTable}>
                <TableIndex />
                <PiResourceApply />
                <ByCourse />
            </div>
        </div>
    )
}

export default OverViewRecruitment;