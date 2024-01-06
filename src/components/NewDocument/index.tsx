import React, { useEffect, useState } from 'react';
import styles from '@/styles/Document.module.scss';
import Tabs from '../Tabs';
import { TabsProps } from 'antd';
import NewDocument from './NewDocument';
import { useGetListFile, useGetListFolder } from '@/utils/hooks';

const ContainerDocument = () => {
    const listFolder = useGetListFolder();
    const listFile = useGetListFile();

    const tabs: TabsProps['items'] = [
        {
            key: 'ALL',
            label: 'Tất cả'
        },
        {
            key: 'BIN',
            label: 'Thùng rác'
        }
    ];
    const [tab, setTab] = useState<string>(tabs[0].key);
    useEffect(() => {
        listFolder.query({
            query: {
                isDeleted: tab === 'BIN' ? 1 : 0
            }
        });
        listFile.query({
            query: {
                isDeleted: tab === 'BIN' ? 1 : 0
            }
        });
    }, [tab]);
    return (
        <div className={styles.containerDocument}>
            <Tabs
                notAllowContent
                listItemTab={tabs}
                onClickTab={(key) => {
                    setTab(key)
                }}
            />
            <NewDocument />
        </div>
    )
}

export default ContainerDocument;