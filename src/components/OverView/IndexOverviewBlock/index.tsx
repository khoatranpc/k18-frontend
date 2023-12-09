import React, { useState } from 'react';
import IconArrowView from '@/icons/IconArrowView';
import { uuid } from '@/utils';
import styles from '@/styles/Overview.module.scss';

export enum TypeOverView {
    'TEACHER' = 'TEACHER',
    'TEACHERPOINT' = 'TEACHERPOINT',
    'CLASS' = 'CLASS',
    'RANKSALARY' = 'RANKSALARY'
}
const getTitleTotal: Record<TypeOverView, string> = {
    CLASS: 'Lớp học',
    RANKSALARY: 'Trung bình',
    TEACHER: 'Giáo viên',
    TEACHERPOINT: 'Điểm GV'
}
interface Props {
    title?: string;
    type?: TypeOverView;
    children?: React.ReactNode;
}
const IndexOverViewBlock = (props: Props) => {
    const [componentId] = useState<string>(uuid());
    return (
        <div className={styles.indexOverviewBlock}>
            <div className={styles.title}>
                <span>{props.title}</span>
                <IconArrowView />
            </div>
            <div className={styles.content}>
                <div className={`${styles.flex} ${styles.teacher}`}>
                    <div className={`${styles.item} ${styles.total}`}>
                        <span>1000</span>
                        <span>{getTitleTotal[props.type as TypeOverView]}</span>
                    </div>
                    <div className={`${styles.item} ${styles.flex} ${styles.listTeacher}`}>
                        <div className={`${styles.flex}`}>
                            <span>450:</span>
                            <span>Giảng viên</span>
                        </div>
                        <div className={`${styles.flex}`}>
                            <span>300:</span>
                            <span>Mentor</span>
                        </div>
                        <div className={`${styles.flex}`}>
                            <span>250:</span>
                            <span>Supporter</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndexOverViewBlock;