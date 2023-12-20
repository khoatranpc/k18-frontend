import React from 'react';
import styles from '@/styles/course/ManagerCourse.module.scss';
import BlockCourse from '@/components/BlockCourse/BlockCourse';

const arr = [1, 2, 3, 4];
const NewListCourse = () => {
    return (
        <div className={styles.listCourse}>
            {arr.map((item) => {
                return <BlockCourse level={item} className={styles.itemCourse} />
            })}
        </div>
    )
}

export default NewListCourse;