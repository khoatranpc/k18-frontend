import React, { useEffect } from 'react';
import { Obj } from '@/global/interface';
import { ROLE_TEACHER } from '@/global/enum';
import { useGetListCourse, useListTeacher, useTeacherRegisterCourse } from '@/utils/hooks';
import BlockCourse from '@/components/BlockCourse';
import { getStatisticTeacher } from '@/components/OverView/TeacherStatistic/config';
import styles from '@/styles/course/ManagerCourse.module.scss';

const NewListCourse = () => {
    const listCourse = useGetListCourse();
    const listValueCourse = (listCourse.listCourse?.data as Array<Obj>);
    const listTeacher = useListTeacher();
    const getListTeacher = (listTeacher.listTeacher?.response?.data as Obj)?.listTeacher as Obj[] || [];
    const courseApply = useTeacherRegisterCourse();
    const getListCourseApplyData = courseApply.listData.response?.data as Obj[];
    const listCourseMapName = getStatisticTeacher(listValueCourse, getListCourseApplyData, getListTeacher);
    useEffect(() => {
        if (!listValueCourse) {
            listCourse.queryListCourse();
        }
        listTeacher.query(undefined, undefined, {
            fields: ['_id', 'roleIsMT', 'roleIsST', 'roleIsSP']
        })
    }, []);
    return (
        <div className={styles.listCourse}>
            {listValueCourse?.map((item, index) => {
                const getListRole: Obj[] = [];
                for (const key in listCourseMapName.data) {
                    const newRole = {
                        role: key,
                        total: listCourseMapName.data[key as ROLE_TEACHER][index]
                    };
                    getListRole.push(newRole);
                }
                return <BlockCourse dataStatistic={listCourseMapName} listRole={getListRole} className={styles.itemCourse} data={item} key={item._id as string} />
            })}
        </div>
    )
}

export default NewListCourse;