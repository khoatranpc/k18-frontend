import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Avatar } from 'antd';
import { Obj } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import { useGetTeacherDetail, useTeacherRegisterCourse } from '@/utils/hooks';
import Tabs from '@/components/Tabs';
import styles from '@/styles/teacher/DetailTeacher.module.scss';
import Input from 'antd/es/input/Input';


const Overview = () => {
    const currentTeacher = useGetTeacherDetail();
    const dataTeacherRegisterCourse = useTeacherRegisterCourse();
    const router = useRouter();
    const getTeacher = currentTeacher.data.response?.data as Obj;
    // const getCourseTeacherRegister = (dataTeacherRegisterCourse.listData.response?.data as Array<Obj>);
    const getCourseTeacherRegister = (dataTeacherRegisterCourse.listData.response?.data as Array<Obj>)?.filter((item) => {
        return item.idTeacher === router.query.teacherId
    });
    const getSalaryTeacher = getTeacher?.salaryPH as Array<Obj>;

    // order by: SuperTeacher, Mentor, Suppoter
    const mapRole = [getTeacher?.roleIsST, getTeacher?.roleIsMT, getTeacher?.roleIsSP];
    useEffect(() => {
        currentTeacher.query(router.query.teacherId as string, []);
        if (!getCourseTeacherRegister) {
            dataTeacherRegisterCourse.query([router.query.teacherId as string]);
        }
    }, []);
    return (
        <div className={styles.overViewTeacher}>
            <div className={styles.headerOverview}>
                <Avatar size={150} icon={MapIconKey[KEY_ICON.TEACHER_MALE]} />
                <div className={styles.overView}>
                    <div className={styles.fullName}>
                        {getTeacher?.fullName}
                    </div>
                    <div className={styles.info}>
                        <div className={styles.column}>
                            <p>
                                <b>MST:</b> {getTeacher?.taxCode || ''}
                            </p>
                            <div className={styles.indexes}>
                                <b>Vị trí:</b>
                                <ul>
                                    {mapRole.map((item, idx) => {
                                        return item && <li key={idx}>
                                            {
                                                item && idx === 0 ? 'Giảng viên'
                                                    :
                                                    (item && idx === 1 ? 'Mentor' :
                                                        'Suppoter'
                                                    )

                                            }
                                        </li>
                                    })}
                                </ul>
                            </div>
                            <div className={styles.salaryPH}>
                                <b>Lương/h: </b>
                                <Input
                                    size="small"
                                    style={{ width: 'fit-content' }}
                                    value={(getSalaryTeacher?.[getSalaryTeacher.length - 1]?.rank as number || 0).toLocaleString()}
                                />
                            </div>
                        </div>
                        <div className={`${styles.column} ${styles.flex}`}>
                            <div className={styles.courseRegister}>
                                <b>Bộ môn:</b>
                                <div className={styles.listCourseRegister}>
                                    {
                                        getCourseTeacherRegister?.map((item) => {
                                            return (item.coursesRegister as Array<Obj>)?.map((course) => {
                                                return <ul className={styles.containerCourse} key={course.idCourse._id as string}>
                                                    <span className={styles.course}>{course.idCourse.courseName || ''}</span>
                                                    {(course.levelHandle as Array<Obj>)?.map((level, idxLevel) => {
                                                        return <li key={idxLevel}>
                                                            {level.levelCode || ''}
                                                        </li>
                                                    })}
                                                </ul>
                                            })
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className={styles.hr} />
            <Tabs
                className={styles.listTabChild}
                listItemTab={[
                    {
                        key: 'INFO',
                        label: 'Cá nhân'
                    },
                    {
                        key: 'FEEDBACK',
                        label: 'Phản hồi'
                    },
                ]}
            />
        </div>
    )
}

export default Overview;