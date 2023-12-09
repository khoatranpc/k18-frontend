import React from 'react';
import { DatePicker } from 'antd';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import TableIndex from './TableIndex';
import PiResourceApply from './PiResourceApply';
import ByCourse from './ByCourse';
import Expand from '@/icons/Expand';
import { ExpandContent } from '..';
import styles from '@/styles/Overview.module.scss';

interface Props {
    setOpenExpand?: (open: boolean, type: ExpandContent) => void;
    isOnExpand?: boolean;
}
const OverViewRecruitment = (props: Props) => {
    return (
        <div className={`${styles.overViewRecruitment} ${props.isOnExpand ? styles.recruitmentOnExpand : ''}`}>
            <h2>Tuyển dụng <Expand className={styles.expandIcon} onClick={() => {
                props.setOpenExpand?.(!props.isOnExpand, ExpandContent.RECRUITMENT)
            }} /></h2>
            <div className={`${styles.pickDate}`}>
                Lọc: <DatePicker size="small" placeholder="Từ ngày" format="DD/MM/YYYY" />
                <span className={styles.arrow}>{MapIconKey[KEY_ICON.ARROWL]}</span>
                <DatePicker size="small" placeholder="Đến ngày" format="DD/MM/YYYY" />
            </div>
            <div className={styles.chartTable}>
                <TableIndex />
                <div className={styles.chart}>
                    <PiResourceApply />
                    <ByCourse />
                </div>
            </div>
        </div>
    )
}

export default OverViewRecruitment;