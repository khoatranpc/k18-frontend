import React from 'react';
import PiStatistic from './PiStatistic';
import Columns from './Columns';
import TableOverViewTotalTeacher from './TableOverViewTotalTeacher';
import TeacherPoint from './TeacherPoint';
import Expand from '@/icons/Expand';
import { ExpandContent } from '..';
import styles from '@/styles/Overview.module.scss';

interface Props {
    setOpenExpand?: (open: boolean, type: ExpandContent) => void;
    isOnExpand?: boolean;
}
const TeacherStatistic = (props: Props) => {
    return (
        <div className={`${styles.teacherAnalystic} ${props.isOnExpand ? styles.teacherAnalysticOnExpand : ''}`}>
            <h2>Giáo viên <Expand className={styles.expandIcon} onClick={() => {
                props.setOpenExpand?.(!props.isOnExpand, ExpandContent.TEACHER)
            }} /></h2>
            <div className={styles.chart}>
                <div className={styles.item}>
                    <PiStatistic />
                    <Columns />
                </div>
                <div className={styles.item}>
                    <TableOverViewTotalTeacher />
                    <TeacherPoint />
                </div>
            </div>
        </div>
    )
}

export default TeacherStatistic;