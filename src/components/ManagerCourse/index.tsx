import React from 'react';
import NewListCourse from './NewList';
import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useGetListCourse, useHandleDrawer, useTeacherRegisterCourse } from '@/utils/hooks';
import { ROLE } from '@/global/enum';
import useGetCrrUser from '@/utils/hooks/getUser';
import Loading from '../loading';
import styles from '@/styles/course/ManagerCourse.module.scss';

const ManagerCourse = () => {
    const listCourse = useGetListCourse();
    const drawer = useHandleDrawer();
    const crrUser = useGetCrrUser();
    const courseApply = useTeacherRegisterCourse();

    return (
        <div className={styles.managerCourse}>
            <div className={styles.btn}>
                {listCourse.loading && <Loading />}
                <Button onClick={() => {
                    if (crrUser?.data?.roleAccount === ROLE.TE) {
                        listCourse.queryListCourse();
                    } else {
                        courseApply.query([crrUser?.data?._id as string]);
                    }
                }}>
                    <ReloadOutlined />
                </Button>
                {crrUser?.data?.roleAccount === ROLE.TE && <Button onClick={() => {
                    drawer.open({
                        componentDirection: 'CourseDetail/FormCourse',
                        props: {
                            isCreate: true
                        },
                        open: true,
                        title: 'Tạo khoá học mới'
                    })
                }}>Tạo khoá học</Button>}
            </div>
            <NewListCourse />
        </div>
    )
}

export default ManagerCourse;