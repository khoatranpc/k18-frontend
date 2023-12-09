import React from 'react';
import IndexOverViewBlock, { TypeOverView } from './IndexOverviewBlock';
import OverViewRecruitment from './Recruitment';
import TeacherStatistic from './TeacherStatistic';
import styles from '@/styles/Overview.module.scss';

const OverView = () => {
    return (
        <div className={styles.containerOverView}>
            <div className={styles.listIndexOverview}>
                <IndexOverViewBlock title="Số giáo viên" type={TypeOverView.TEACHER} />
                <IndexOverViewBlock title="Teacherpoint" type={TypeOverView.TEACHERPOINT} />
                <IndexOverViewBlock title="Lớp học" type={TypeOverView.CLASS} />
                <IndexOverViewBlock title="Rank lương" type={TypeOverView.RANKSALARY} />
            </div>
            <div className={styles.general}>
                <OverViewRecruitment />
                <TeacherStatistic />
            </div>
        </div>
    )
}

export default OverView;