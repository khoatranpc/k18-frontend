import React, { useEffect } from 'react';
import { TabsProps } from 'antd';
import { Obj } from '@/global/interface';
import { uuid } from '@/utils';
import { useGetListCourse } from '@/utils/hooks';
import ContextProvider from './ContextProvider';
import FilterBar from './FilterBar';
import Table from './Table';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const ManagerRecruitment = () => {
    const allCourse = useGetListCourse();
    useEffect(() => {
        if (!allCourse.listCourse) {
            allCourse.queryListCourse();
        }
    }, []);
    const tabs: TabsProps['items'] = ((allCourse.listCourse as Obj)?.data as Array<Obj>)?.map((item) => {
        return {
            key: item._id as string || uuid(),
            label: item.courseName as string
        }
    }) || [];
    return (
        <ContextProvider>
            <div className={styles.containerManagerRecruitment}>
                {/* <Tabs
                    listItemTab={tabs}
                    notAllowContent
                /> */}
                <FilterBar />
                <Table />
            </div>
        </ContextProvider>
    )
}

export default ManagerRecruitment;