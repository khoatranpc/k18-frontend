import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Button, TabsProps } from 'antd';
import { Obj } from '@/global/interface';
import CombineRoute from '@/global/route';
import { ComponentPage, STATUS_CLASS } from '@/global/enum';
import { formatDatetoString } from '@/utils';
import { useDetailClass } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import Tabs from '@/components/Tabs';
import OverView from './OverView';
import Attendance from './Attendance';
import FeedBack from './FeedBack';
import ManagerGroup from './ManagerGroup';
import Student from './Student';
import Syllabus from './Syllabus';
import TextBook from './TextBook';
import BookTeacher from './BookTeacher';
import TitleHeader from '../TitleHeader';
import styles from '@/styles/class/DetailClass.module.scss';
import Loading from '@/components/loading';

export enum TabDetailClass {
    OVERVIEW = 'OVERVIEW',
    STUDENT = 'STUDENT',
    MANAGER_GROUP = 'MANAGER_GROUP',
    ATTENDANCE = 'ATTENDANCE',
    TEXTBOOK = 'TEXTBOOK',
    SYLLABUS = 'SYLLABUS',
    FEEDBACK = 'FEEDBACK',
    BOOK_TEACHER = 'BOOK_TEACHER'
}
export const listTab: TabsProps['items'] = [
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
        key: TabDetailClass.ATTENDANCE,
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
        label: 'Phản hồi'
    },
    {
        key: TabDetailClass.BOOK_TEACHER,
        label: 'Sắp xếp GV'
    },
];

interface Props {
    classId?: string;
}
const Detail = (props: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const message = useHookMessage();
    const { data, query, clear } = useDetailClass('GET');
    const [currentContent, setCurrentContent] = useState<TabDetailClass>(TabDetailClass.OVERVIEW);
    const getComponent: Record<TabDetailClass, React.ReactElement> = {
        OVERVIEW: <OverView />,
        ATTENDANCE: <Attendance />,
        FEEDBACK: <FeedBack codeClassId={router.query.classId as string} />,
        MANAGER_GROUP: <ManagerGroup />,
        STUDENT: <Student />,
        SYLLABUS: <Syllabus />,
        TEXTBOOK: <TextBook />,
        BOOK_TEACHER: <BookTeacher classId={router.query.classId as string} />
    }
    useEffect(() => {
        query?.(router.query.classId as string);
    }, []);
    useEffect(() => {
        switch (currentContent) {
            case TabDetailClass.STUDENT:
                const routePayload: PayloadRoute = {
                    payload: {
                        route: CombineRoute['TE']['MANAGER']['DETAILCLASS'],
                        title: 'Học viên',
                        replaceTitle: <TitleHeader title={'Học viên'} tabDetail={TabDetailClass.STUDENT} />,
                        hasBackPage: true,
                        component: ComponentPage.DETAILCLASS
                    }
                }
                dispatch(initDataRoute(routePayload));
                break;
            case TabDetailClass.OVERVIEW:
                if (data.success) {
                    const crrData = (data.response?.data as Obj);
                    const payloadRoute: PayloadRoute = {
                        payload: {
                            route: CombineRoute['TE']['MANAGER']['DETAILCLASS'],
                            title: crrData?.codeClass as string,
                            replaceTitle: <TitleHeader tabDetail={TabDetailClass.OVERVIEW} editTitle title={crrData?.codeClass as string} dateStart={formatDatetoString(new Date(crrData?.dayRange?.start as Date), 'dd/MM/yyyy')} statusClass={crrData?.status as STATUS_CLASS} />,
                            hasBackPage: true,
                            moreData: crrData,
                            component: ComponentPage.DETAILCLASS
                        }
                    };
                    dispatch(initDataRoute(payloadRoute));
                }
                break;
            case TabDetailClass.ATTENDANCE:
                const payloadRoute: PayloadRoute = {
                    payload: {
                        route: CombineRoute['TE']['MANAGER']['DETAILCLASS'],
                        title: 'Điểm danh',
                        replaceTitle: <TitleHeader tabDetail={TabDetailClass.ATTENDANCE} title={'Điểm danh'} />,
                        hasBackPage: true,
                        component: ComponentPage.ATTENDANCE_TEACHER_CLASS
                    }
                };
                dispatch(initDataRoute(payloadRoute));
                break;
            case TabDetailClass.FEEDBACK:
                const payloadRouteFeedback: PayloadRoute = {
                    payload: {
                        route: CombineRoute['TE']['MANAGER']['FEEDBACK'],
                        title: 'Feedback',
                        replaceTitle: <TitleHeader tabDetail={TabDetailClass.FEEDBACK} title={'Phản hồi'} />,
                        hasBackPage: true,
                        component: ComponentPage.MANAGER_FEEDBACK
                    }
                };
                dispatch(initDataRoute(payloadRouteFeedback));
                break;
            default:
                break;
        }
    }, [currentContent, data]);
    useEffect(() => {
        if (data.response && !data.success) {
            clear?.();
            message.open({
                content: `Không tìm thấy lớp học! ${data.response.message}`,
                type: 'error'
            });
            message.close();
        }
    }, [data.response]);
    return (
        <div className={styles.detailClassContainer}>
            <Tabs
                className={styles.listTab}
                listItemTab={listTab}
                notAllowContent
                onClickTab={(key) => {
                    setCurrentContent(key as TabDetailClass);
                }}
            />
            {
                currentContent === TabDetailClass.OVERVIEW ? (<div className={styles.fncBtn}>
                    <Button className={styles.btn}>Chỉnh sửa</Button>
                    <Button className={styles.btn}>Export</Button>
                </div>) : (null)
            }

            <div className={styles.containerMain}>
                {!data.response ? <Loading /> :
                    (
                        !data.response.data ? <h3 style={{ textAlign: 'center' }}>Không thấy thông tin lớp!</h3> :
                            getComponent[currentContent]
                    )
                }
            </div>
        </div>
    )
}

export default Detail;