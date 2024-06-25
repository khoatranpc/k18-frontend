import React from 'react';
import FormCreateEvaluate from './FormCreateEvaluate';
import styles from '@/styles/teacher/TeacherInfo.module.scss'

const TeacherEvaluate = () => {
    return (
        <div className={styles.teacherEvulate}>
            <div className={styles.listEvaluate}>

            </div>
            <div className={styles.formCreateEvaluate}>
                <FormCreateEvaluate />
            </div>
        </div>
    )
}

export default TeacherEvaluate;