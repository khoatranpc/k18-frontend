import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { TabsProps } from 'antd';
import { STATUS_CLASS } from '@/global/enum';
import { uuid } from '@/utils';
import useGetDataRoute from '@/utils/hooks/getDataRoute';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import Tabs from '@/components/Tabs';
import styles from '@/styles/class/DetailClass.module.scss';

const listTab: TabsProps['items'] = [
    {
        key: 'over-view',
        label: 'Tổng quan'
    },
    {
        key: 'student',
        label: 'Học viên'
    },
    {
        key: 'manager-group',
        label: 'Quản lý nhóm'
    },
    {
        key: 'attendance',
        label: 'Điểm danh'
    },
    {
        key: 'textbook',
        label: 'Học liệu'
    },
    {
        key: 'syllabus',
        label: 'Chương trình học'
    },
    {
        key: 'feedback',
        label: 'Feedback'
    },
];

const Detail = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const stateRoute = useGetDataRoute();

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
            <Tabs listItemTab={listTab} notAllowContent />

        </div>
    )
}

export default Detail;