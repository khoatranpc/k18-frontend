import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Checkbox, Tooltip } from 'antd';
import { Obj } from '@/global/interface';
import { ROLE } from '@/global/enum';
import { useHandleDrawer, usePropsPassRoute, useTeacherRegisterCourse } from '@/utils/hooks';
import { mapLevelToColor, mapLevelToColor2 } from '@/global/init';
import useGetCrrUser from '@/utils/hooks/getUser';
import Bookmark from '@/icons/Bookmark';
import Cell from '@/icons/Cell';
import { getTotalTeacher } from './config';
import styles from '@/styles/course/ManagerCourse.module.scss';

interface Props {
    className?: string;
    data?: Obj;
    level?: number;
    isLevel?: boolean;
    dataStatistic?: Obj;
    listRole?: Obj[];
}
const BlockCourse = (props: Props) => {
    const router = useRouter();
    const drawer = useHandleDrawer();
    const crrUser = useGetCrrUser() as Obj;
    const passDataRoute = usePropsPassRoute();
    const listTeacherRegisterCourse = useTeacherRegisterCourse();
    const getCourseId = props.data?._id as string;
    const getListRecordRegisterCourse = listTeacherRegisterCourse.listData.response?.data as Obj[];
    const getCalcTeacher = getTotalTeacher(getCourseId, getListRecordRegisterCourse);

    const handleClickToDetail = (id?: string) => {
        if (props.isLevel) {
            drawer.open({
                open: true,
                title: props.data?.levelName,
                componentDirection: 'CourseLevelDetail',
                size: 'default',
                props: {
                    data: props.data
                }
            });
        }
        else if (crrUser.data.roleAccount === ROLE.TE) {
            if (!props.isLevel) {
                router.push(`/te/manager/storage/course/${id}`);
            } else {

            }
        } else {

        }
    };
    useEffect(() => {
        if (!getListRecordRegisterCourse) {
            listTeacherRegisterCourse.query();
        }
    }, []);
    return (
        <div className={`${styles.blockCourse} ${props.className}`}>
            <div className={`${styles.content} ${props.isLevel ? styles.levelCourse : ''}`}>
                <div className={styles.imageCourse}>
                    <img alt="" src={!props.isLevel ? (props.data?.courseImage) : ((props.data?.levelImage) ?? '/static/ci.jpeg')} className={styles.image} />
                </div>
                <div className={styles.course}>
                    <div className={styles.title}>
                        <span
                            className={`${styles.courseName}`}
                            style={{
                                ...props.isLevel ? { background: mapLevelToColor2[props.level as number], color: mapLevelToColor[props.level as number] } : {}
                            }}
                            onClick={() => {
                                handleClickToDetail(props.data?._id as string);
                                if (!props.isLevel) {
                                    passDataRoute.query({
                                        getCalcTeacher,
                                        dataStatistic: props.dataStatistic,
                                    });
                                }
                            }}
                        >
                            {props.isLevel ? props.data?.levelCode : props.data?.courseTitle as string}
                        </span>
                        <span className={styles.action}>
                            <Checkbox checked={props.data?.active}>Active</Checkbox>
                        </span>
                    </div>
                    <div className={styles.combineDescription}>
                        <p className={`${!props.level ? styles.description : ''}`}>
                            {props.data ? (!props.isLevel ? props.data.courseDescription : (`${props.data.levelCode} - ${props.data.levelName}`)) : ''}
                            {props.isLevel && <span><br />{props.data?.levelDescription}</span>}
                        </p>
                        <p>
                            Copyright © MindX Technology School
                        </p>
                    </div>
                    <hr />
                    <div className={styles.info}>
                        <span><Bookmark />{!props.level ? `${(props.data?.courseLevel as Obj[])?.length} Khoá học` : '16/16 Lesson'}</span>
                        <span className={styles.totalTeacher}>
                            {!props.level ? <Tooltip
                                color="white"
                                title={<ul className={styles.listDetail}>
                                    {props.listRole?.map((item) => {
                                        return <li key={item.role}>{item.role}: {item.total}</li>
                                    })}
                                </ul>}>
                                <Cell />{getCalcTeacher.data.total} GV
                            </Tooltip> :
                                <><Cell />{props.dataStatistic?.[`lv${props.level}`]} GV</>
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlockCourse;