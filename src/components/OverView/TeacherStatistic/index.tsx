import React, { useEffect } from 'react';
import { useListTeacher, useTeacherRegisterCourse } from '@/utils/hooks';
import PiStatistic from './PiStatistic';
import Columns from './Columns';
import TableOverViewTotalTeacher from './TableOverViewTotalTeacher';
import { ExpandContent } from '..';
import Expand from '@/icons/Expand';
import styles from '@/styles/Overview.module.scss';

interface Props {
    setOpenExpand?: (open: boolean, type: ExpandContent) => void;
    isOnExpand?: boolean;
}
const TeacherStatistic = (props: Props) => {
    const listTeacher = useListTeacher();
    const courseApply = useTeacherRegisterCourse();
    useEffect(() => {
        if (!listTeacher.listTeacher.response || (listTeacher.listTeacher.response?.data?.currentPage)) {
            if (!courseApply.listData.isLoading) {
                courseApply.query();
            }
            listTeacher.query?.(undefined, undefined, {
                fields: ['_id', 'roleIsMT', 'roleIsST', 'roleIsSP', 'teacherPoint', 'salaryPH', 'area']
            });

        }
    }, []);
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
                </div>
            </div>
        </div>
    )
}

export default TeacherStatistic;