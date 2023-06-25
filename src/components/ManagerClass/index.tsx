import React, { useState } from 'react';
import { TabsProps } from 'antd';
import ManagerClassContext, { FieldFilter } from './context';
import Tabs from '../Tabs';
import ToolBar, { ItemFilterField } from '../Tabs/ToolBar';
import styles from '@/styles/class/Class.module.scss';
import { fieldFilter } from '@/global/init';

const items: TabsProps['items'] = [
    {
        key: 'ALL_CLASS',
        label: 'Tất cả lớp',
    },
    {
        key: 'UIUX',
        label: `UI/UX`,
    },
    {
        key: 'PMBA',
        label: `PM/BA`,
    },
];

const listFilter: ItemFilterField[] = [
    {
        title: 'Môn học',
        key: fieldFilter.SUBJECT
    },
    {
        title: 'Trạng thái',
        key: fieldFilter.STATUS
    },
    {
        title: 'Mã khoá (cấp độ)',
        key: fieldFilter.CODE_CLASS_LEVEL
    },
    {
        title: 'Hình thức',
        key: fieldFilter.STYLE
    },
    {
        title: 'Giáo viên',
        key: fieldFilter.TEACHER
    },
    {
        title: 'Tháng KG',
        key: fieldFilter.OPEN_SCHEDULE
    },
    {
        title: 'Lịch học',
        key: fieldFilter.TIME_SCHEDULE
    }
];
const ManagerClass = () => {
    const [storeManagerClass, setStoreManagerClass] = useState<{
        crrKeyTab: string;
        listFieldFilter: Array<{
            key: string;
            value: any;
        }>
    }>({
        crrKeyTab: items[0].key,
        listFieldFilter: [],
    });
    return (
        <ManagerClassContext.Provider value={{
            crrKeyTab: storeManagerClass!.crrKeyTab,
            listFieldFilter: storeManagerClass!.listFieldFilter as FieldFilter[],
            setContext: setStoreManagerClass
        }}
        >
            <div className={styles.containerClassManger}>
                <Tabs listItemTab={items} activeKey={storeManagerClass.crrKeyTab} onClickTab={(key) => {
                    setStoreManagerClass({
                        ...storeManagerClass,
                        crrKeyTab: key
                    })
                }} />
                <ToolBar listFilter={listFilter} />
            </div>
        </ManagerClassContext.Provider>
    )
}

export default ManagerClass;