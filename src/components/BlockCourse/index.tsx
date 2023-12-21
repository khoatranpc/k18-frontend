import React from 'react';
import { useRouter } from 'next/router';
import { Checkbox, Tooltip } from 'antd';
import { Obj } from '@/global/interface';
import { ROLE } from '@/global/enum';
import { useHandleDrawer } from '@/utils/hooks';
import { mapLevelToColor, mapLevelToColor2, mapLevelToLabel } from '@/global/init';
import useGetCrrUser from '@/utils/hooks/getUser';
import Bookmark from '@/icons/Bookmark';
import Cell from '@/icons/Cell';
import styles from '@/styles/course/ManagerCourse.module.scss';

interface Props {
    className?: string;
    data?: Obj;
    level?: number;
    isLevel?: boolean;
}
const BlockCourse = (props: Props) => {
    const router = useRouter();
    const drawer = useHandleDrawer();
    const crrUser = useGetCrrUser() as Obj;

    const handleClickToDetail = (courseId?: string) => {
        if (props.isLevel) {
            drawer.open({
                open: true,
                title: courseId,
                componentDirection: 'BlockCourse/DetailInDrawer',
                size: 'large'
            })
        }
        else if (crrUser.data.roleAccount === ROLE.TE) {
            if (!props.isLevel) {
                router.push(`/te/manager/storage/course/${courseId}`);
            } else {

            }
        } else {

        }
    }
    return (
        <div className={`${styles.blockCourse} ${props.className}`}>
            <div className={`${styles.content} ${props.isLevel ? styles.levelCourse : ''}`}>
                <div className={styles.imageCourse}>
                    <img alt="" src={!props.isLevel ? (props.data?.courseImage) : (props.data?.courseLevelImage) ?? '/static/ci.jpeg'} className={styles.image} />
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
                            }}
                        >
                            {props.isLevel ? mapLevelToLabel[props.level as number] : props.data?.courseTitle as string}
                        </span>
                        <span className={styles.action}>
                            <Checkbox checked={props.data?.active}>Active</Checkbox>
                        </span>
                    </div>
                    <div className={styles.combineDescription}>
                        <p className={styles.description}>
                            {props.data ? (!props.isLevel ? props.data.courseDescription : props.data.courseLevelDescription) : ''}
                        </p>
                        <p>
                            Copyright © MindX Technology School
                        </p>
                    </div>
                    <hr />
                    <div className={styles.info}>
                        <span><Bookmark />{!props.level ? `${(props.data?.courseLevel as Obj[])?.length} Khoá học` : '16/16 Lesson'}</span>
                        <span className={styles.totalTeacher}>
                            <Tooltip color="white" title={<ul className={styles.listDetail}>
                                <li>ST: 10</li>
                                <li>MT: 10</li>
                                <li>SP: 10</li>
                            </ul>}>
                                <Cell />30 GV
                            </Tooltip>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlockCourse;