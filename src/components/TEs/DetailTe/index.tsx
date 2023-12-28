import React, { useState } from 'react';
import { Image, TabsProps } from 'antd';
import { useGetTeById } from '@/utils/hooks';
import Tabs from '../../Tabs';
import OverView from './OverView';
import PersonalInfo from './PersonalInfo';
import styles from '@/styles/employee/TE.module.scss';

enum Tab {
    OVER_VIEW = 'OVER_VIEW',
    PERSONAL_INFO = 'PERSONAL_INFO',
    REPORT = 'REPORT',
    SCHEDULE = 'SCHEDULE'
}
const TeInfo = () => {
    const listTabs: TabsProps['items'] = [
        {
            key: Tab.OVER_VIEW,
            label: "Tổng quan"
        },
        {
            key: Tab.REPORT,
            label: "Báo cáo"
        },
        {
            key: Tab.PERSONAL_INFO,
            label: "Cá nhân"
        },
        {
            key: Tab.SCHEDULE,
            label: "Lịch"
        }
    ];
    const currentTe = useGetTeById();
    const [tab, setTab] = useState<Tab>(Tab.OVER_VIEW);
    const contentTab: Record<Tab, React.ReactNode> = {
        OVER_VIEW: <OverView />,
        PERSONAL_INFO: <PersonalInfo />,
        REPORT: <></>,
        SCHEDULE: <></>
    }
    return (
        <div className={styles.teInfo}>
            <div className={styles.leftInfo}>
                <div className={styles.shortInfo}>
                    <Image className={styles.imageStaff} width={200} height={200} src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png" />
                    <p className={styles.teName}>Trần Đăng Khoa</p>
                    <p>QC-Web</p>
                    <p>khoatranpc603@gmail.com</p>
                    <p>0353923603</p>
                </div>
            </div>
            <div className={styles.rightInfo}>
                <Tabs
                    listItemTab={listTabs}
                    onClickTab={(key) => {
                        setTab(key as Tab);
                    }}
                    notAllowContent
                />
                <div className={styles.contentTab}>
                    {contentTab[tab]}
                </div>
            </div>
        </div>
    )
}

export default TeInfo;