import React from 'react';
import { Checkbox, Tooltip } from 'antd';
import { Obj } from '@/global/interface';
import { mapLevelToColor, mapLevelToColor2 } from '@/global/init';
import Bookmark from '@/icons/Bookmark';
import Cell from '@/icons/Cell';
import styles from '@/styles/course/ManagerCourse.module.scss';

interface Props {
    className?: string;
    data?: Obj;
    level: number;
    isLevel?: boolean;
}
const BlockCourse = (props: Props) => {
    return (
        <div className={`${styles.blockCourse} ${props.className}`}>
            <div className={styles.content}>
                <div className={styles.imageCourse}>
                    <img alt="" src={'/static/ci.jpeg'} className={styles.image} />
                </div>
                <div className={styles.course}>
                    <div className={styles.title}>
                        <span
                            className={`${styles.courseName}`}
                            style={{
                                ...props.isLevel ? { background: mapLevelToColor2[props.level], color: mapLevelToColor[props.level] } : {}
                            }}
                        >
                            Khoá học lập trình Web
                        </span>
                        <span className={styles.action}>
                            <Checkbox>Active</Checkbox>
                        </span>
                    </div>
                    <p className={styles.description}>
                        Khoá học lập trình web với lộ trình Web fullstack developer
                    </p>
                    <p>
                        Copyright © MindX Technology School
                    </p>
                    <hr />
                    <div className={styles.info}>
                        <span><Bookmark />16/16 Lesson</span>
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