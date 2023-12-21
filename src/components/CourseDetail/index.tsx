import React, { useEffect } from 'react';
import { ClockCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Obj } from '@/global/interface';
import { useGetListCourse, useHandleDrawer } from '@/utils/hooks';
import { formatDatetoString } from '@/utils';
import AttachDocument from '@/icons/AttachDocument';
import Bookmark from '@/icons/Bookmark';
import Employee from '@/icons/Employee';
import IconEdit2 from '@/icons/IconEdit2';
import ChartColumn from './ChartColumn';
import BlockCourse from '../BlockCourse';
import Loading from '../loading';
import styles from '@/styles/course/ManagerCourse.module.scss';

const arr = [1, 2, 3, 4];
const CourseDetail = () => {
    const listCourse = useGetListCourse();
    const drawer = useHandleDrawer();
    const router = useRouter();
    const listValueCourse = (listCourse.listCourse?.data as Array<Obj>);
    const currentCourse = listValueCourse?.find((item) => {
        return item._id === router.query.courseId as string;
    });
    const handleOpenDrawerCourseDetail = () => {
        drawer.open({
            open: true,
            componentDirection: 'CourseDetail/UpdateCourse',
            size: "default",
            title: <div className={styles.titleCourseDetailDrawer}>{currentCourse?.courseTitle}</div>,
            props: {
                currentCourse
            }
        });
    }
    useEffect(() => {
        if (!listValueCourse) {
            listCourse.queryListCourse();
        }
    }, []);
    return (
        <div className={styles.courseDetail}>
            {listCourse.loading ? <Loading isCenterScreen /> : (currentCourse ? <>
                <div className={styles.header}>
                    <div className={styles.leftHeader}>
                        <div className={styles.courseImage}>
                            <img alt="" src={currentCourse?.courseImage ?? '/static/ci.jpeg'} className={styles.image} />
                        </div>
                    </div>
                    <div className={styles.rightHeader}>
                        <div className={styles.combineTop}>
                            <p className={`${styles.title}`}>{currentCourse.courseTitle} <IconEdit2 className={styles.iconEdit} onClick={handleOpenDrawerCourseDetail} /></p>
                            <div className={styles.groupInfo}>
                                <div className={styles.infoOverview}>
                                    <div className={styles.left}>
                                        <span className={styles.attachLink}>
                                            <AttachDocument className={styles.icon} />
                                            <span><b>Tên khoá</b>: {currentCourse.courseName}</span>
                                        </span>
                                        <span className={styles.attachLink}>
                                            <AttachDocument className={styles.icon} />
                                            <span><b>Syllabus</b>: {currentCourse.syllabus ? <a href={`${currentCourse.syllabus}`} target="_blank">Link</a> : 'Chưa có'}</span>
                                        </span>
                                        <span className={styles.attachLink}>
                                            <Bookmark className={styles.iconBookmark} /><span><b>Số khoá học</b>: {(currentCourse.courseLevel as Obj[])?.length}</span>
                                        </span>
                                        <span className={styles.attachLink}>
                                            <InfoCircleOutlined className={styles.icon} /><span><b>Teacherpoint</b>: 4</span>
                                        </span>
                                    </div>
                                    <div className={styles.right}>
                                        <span className={styles.attachLink}>
                                            <InfoCircleOutlined className={styles.icon} /><span><b>Trạng thái</b>: {currentCourse.active ? 'Hoạt động' : 'Ngừng hoạt động'}</span>
                                        </span>
                                        <span className={styles.attachLink}>
                                            <Employee className={styles.icon} /><span><b>TE QC</b>: Trần Đăng khoa</span>
                                        </span>
                                        <span className={styles.attachLink}>
                                            <ClockCircleOutlined className={styles.icon} /><span><b>Cập nhật lúc</b>: {formatDatetoString(currentCourse.updatedAt as string ?? new Date(), 'HH:mm, dd/MM/yyyy')}</span>
                                        </span>
                                        <span className={styles.attachLink}>
                                            {currentCourse.courseDescription}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.chartOverviewLevel}>
                            <ChartColumn />
                        </div>
                    </div>
                </div>
                <hr />
                <div className={styles.listCourse}>
                    {arr.map((item) => {
                        return <BlockCourse level={item} isLevel className={styles.itemCourse} />
                    })}
                </div>
            </> : <div>Không tồn tại khoá học</div>)
            }
        </div>
    )
}

export default CourseDetail;