import React from 'react';
import List from './List';
import styles from '@/styles/course/ManagerCourse.module.scss';

const ManagerCourse = () => {
    return (
        <div className={styles.managerCourse}>
            <List />
        </div>
    )
}

export default ManagerCourse;