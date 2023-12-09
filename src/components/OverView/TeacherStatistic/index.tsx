import React from 'react';
import PiStatistic from './PiStatistic';
import Columns from './Columns';
import TableOverViewTotalTeacher from './TableOverViewTotalTeacher';
import TeacherPoint from './TeacherPoint';
import styles from '@/styles/Overview.module.scss';

const TeacherStatistic = () => {

    return (
        <div className={styles.teacherAnalystic}>
            <h2>Giáo viên</h2>
            <div className={styles.chart}>
                <PiStatistic />
                <Columns />
                <TableOverViewTotalTeacher />
                <TeacherPoint />
            </div>
        </div>
    )
}

export default TeacherStatistic;