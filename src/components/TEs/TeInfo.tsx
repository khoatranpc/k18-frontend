import React, { useState } from 'react';
import { TabsProps } from 'antd';
import CropImage from '../CropImage';
import Tabs from '../Tabs';
import styles from '@/styles/employee/TE.module.scss';
import OverView from './OverView';

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
    const [tab, setTab] = useState<Tab>(Tab.OVER_VIEW);
    const contentTab: Record<Tab, React.ReactNode> = {
        OVER_VIEW: <OverView />,
        PERSONAL_INFO: <></>,
        REPORT: <></>,
        SCHEDULE: <></>
    }
    return (
        <div className={styles.teInfo}>
            <div className={styles.leftInfo}>
                <div className={styles.shortInfo}>
                    <CropImage className={styles.cropImage} classNameImgPreview={styles.imageStaff} src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png" />
                    <p className={styles.teName}>Trần Đăng Khoa</p>
                    <p>QC-Web</p>
                    <p>khoatranpc603@gmail.com</p>
                    <p>0353923603</p>
                </div>
            </div>
            <div className={styles.rightInfo}>
                <Tabs
                    listItemTab={listTabs}
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