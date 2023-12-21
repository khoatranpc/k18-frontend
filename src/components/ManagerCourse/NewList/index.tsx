import React, { useEffect } from 'react';
import { Obj } from '@/global/interface';
import { useGetListCourse } from '@/utils/hooks';
import BlockCourse from '@/components/BlockCourse';
import styles from '@/styles/course/ManagerCourse.module.scss';

const NewListCourse = () => {
    const listCourse = useGetListCourse();
    const listValueCourse = (listCourse.listCourse?.data as Array<Obj>);
    useEffect(() => {
        if (!listValueCourse) {
            listCourse.queryListCourse();
        }
    }, []);
    return (
        <div className={styles.listCourse}>
            {listValueCourse?.map((item) => {
                return <BlockCourse className={styles.itemCourse} data={item} key={item._id as string}/>
            })}
        </div>
    )
}

export default NewListCourse;