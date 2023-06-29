import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Button, TabsProps } from 'antd';
import { STATUS_CLASS } from '@/global/enum';
import { uuid } from '@/utils';
import useGetDataRoute from '@/utils/hooks/getDataRoute';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import Tabs from '@/components/Tabs';
import OverView from './OverView';
import Attendace from './Attendace';
import FeedBack from './FeedBack';
import ManagerGroup from './ManagerGroup';
import Student from './Student';
import Syllabus from './Syllabus';
import TextBook from './TextBook';
import styles from '@/styles/class/DetailClass.module.scss';

enum TabDetailClass {
    OVERVIEW = 'OVERVIEW',
    STUDENT = 'STUDENT',
    MANAGER_GROUP = 'MANAGER_GROUP',
    ATTENDACE = 'ATTENDACE',
    TEXTBOOK = 'TEXTBOOK',
    SYLLABUS = 'SYLLABUS',
    FEEDBACK = 'FEEDBACK',
}
const listTab: TabsProps['items'] = [
    {
        key: TabDetailClass.OVERVIEW,
        label: 'Tổng quan'
    },
    {
        key: TabDetailClass.STUDENT,
        label: 'Học viên'
    },
    {
        key: TabDetailClass.MANAGER_GROUP,
        label: 'Quản lý nhóm'
    },
    {
        key: TabDetailClass.ATTENDACE,
        label: 'Điểm danh'
    },
    {
        key: TabDetailClass.TEXTBOOK,
        label: 'Học liệu'
    },
    {
        key: TabDetailClass.SYLLABUS,
        label: 'Chương trình học'
    },
    {
        key: TabDetailClass.FEEDBACK,
        label: 'Feedback'
    },
];
const getComponent: Record<TabDetailClass, React.ReactElement> = {
    OVERVIEW: <OverView />,
    ATTENDACE: <Attendace />,
    FEEDBACK: <FeedBack />,
    MANAGER_GROUP: <ManagerGroup />,
    STUDENT: <Student />,
    SYLLABUS: <Syllabus />,
    TEXTBOOK: <TextBook />,
}
const Detail = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const stateRoute = useGetDataRoute();
    const [currentContent, setCurrentContet] = useState<TabDetailClass>(TabDetailClass.OVERVIEW);
    // missing logic call api detail class
    useEffect(() => {
        if (!stateRoute.replaceTitle) {
            const payloadRoute: PayloadRoute = {
                payload: {
                    ...stateRoute,
                    moreData: {
                        key: uuid(),
                        codeClass: 'PNL-UID08',
                        subject: 'Code',
                        teacher: 'Nguyễn Văn Cường',
                        style: 'Hybrid',
                        dateStart: '20/02/2022',
                        status: STATUS_CLASS.RUNNING,
                        timeSchedule: [{
                            weekday: 'T2',
                            time: '19h15-22h15'
                        }]
                    },
                    replaceTitle: 'PNL-CIJS84',
                }
            };
            dispatch(initDataRoute(payloadRoute));
        }
    }, []);
    return (
        <div className={styles.detailClassContainer}>
            <Tabs
                className={styles.listTab}
                listItemTab={listTab}
                notAllowContent
                onClickTab={(key) => {
                    setCurrentContet(key as TabDetailClass);
                }}
            />
            {
                currentContent === TabDetailClass.OVERVIEW ? (<div className={styles.fncBtn}>
                    <Button className={styles.btn}>Chỉnh sửa</Button>
                    <Button className={styles.btn}>Export</Button>
                </div>) : (null)
            }

            <div className={styles.containerMain}>
                {getComponent[currentContent]}
            </div>
        </div>
    )
}

export default Detail;