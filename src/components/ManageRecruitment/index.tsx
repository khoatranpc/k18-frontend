import React, { useEffect, useState } from 'react';
import { useGetListCourse } from '@/utils/hooks';
import ContextProvider from './ContextProvider';
import FilterBar from './FilterBar';
import Table from './Table';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const ManagerRecruitment = () => {
    const allCourse = useGetListCourse();
    const [isSearching, setIsSearching] = useState(false);
    useEffect(() => {
        if (!allCourse.listCourse) {
            allCourse.queryListCourse();
        }
    }, []);
    return (
        <ContextProvider>
            <div className={styles.containerManagerRecruitment}>
                <FilterBar
                    setIsSearching={setIsSearching}
                />
                <Table
                    isSearching={isSearching}
                />
            </div>
        </ContextProvider>
    )
}

export default ManagerRecruitment;