import React from 'react';
import NewListCourse from './NewList';
import styles from '@/styles/course/ManagerCourse.module.scss';

const ManagerCourse = () => {
    return (
        <div className={styles.managerCourse}>
            <NewListCourse />
        </div>
    )
}

export default ManagerCourse;