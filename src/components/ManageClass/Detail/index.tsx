import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, TabsProps } from 'antd';
import { Obj } from '@/global/interface';
import { PositionTe, ROLE } from '@/global/enum';
import { useComparePositionTE, useDetailClass } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import useGetCrrUser from '@/utils/hooks/getUser';
import Tabs from '@/components/Tabs';
import Loading from '@/components/loading';
import OverView from './OverView';
import Attendance from './Attendance';
import FeedBack from './FeedBack';
import ManagerGroup from './ManagerGroup';
import Student from './Student';
import Syllabus from './Syllabus';
import TextBook from './TextBook';
import BookTeacher from './BookTeacher';
import CreateClass from '../CreateClass';
import styles from '@/styles/class/DetailClass.module.scss';

export enum TabDetailClass {
    OVERVIEW = 'OVERVIEW',
    STUDENT = 'STUDENT',
    MANAGER_GROUP = 'MANAGER_GROUP',
    ATTENDANCE = 'ATTENDANCE',
    TEXTBOOK = 'TEXTBOOK',
    SYLLABUS = 'SYLLABUS',
    FEEDBACK = 'FEEDBACK',
    BOOK_TEACHER = 'BOOK_TEACHER',
    SETTING = 'SETTING'
}

interface Props {
    classId?: string;
}
const Detail = (props: Props) => {
    const router = useRouter();
    const hasRole = useComparePositionTE(PositionTe.LEADER, PositionTe.QC, PositionTe.ASSISTANT);
    const crrUser = useGetCrrUser();
    const crrRoleUser = (crrUser?.data as Obj)?.roleAccount;
    const listTab: TabsProps['items'] = [
        {
            key: TabDetailClass.OVERVIEW,
            label: 'Tổng quan'
        },
        {
            key: TabDetailClass.ATTENDANCE,
            label: 'Điểm danh'
        },
        {
            key: TabDetailClass.FEEDBACK,
            label: 'Phản hồi'
        },
        {
            key: TabDetailClass.BOOK_TEACHER,
            label: 'Sắp xếp GV'
        },
        ...(hasRole || crrRoleUser === ROLE.CS) ? [{
            key: TabDetailClass.SETTING,
            label: 'Cài đặt'
        }] : []
    ];
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
        BOOK_TEACHER: <BookTeacher classId={router.query.classId as string} />,
        SETTING: <CreateClass data={data.response?.data as Obj} />
    }
    useEffect(() => {
        query?.(router.query.classId as string);
    }, []);
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
                hasRole && currentContent === TabDetailClass.OVERVIEW ? (<div className={styles.fncBtn}>
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