import React, { useEffect, useState } from 'react';
import Tabs from '../Tabs';
import { TabsProps } from 'antd';
import NewDocument from './NewDocument';
import { useComparePositionTE, useGetListFile, useGetListFolder } from '@/utils/hooks';
import styles from '@/styles/Document.module.scss';

const ContainerDocument = () => {
    const listFolder = useGetListFolder();
    const listFile = useGetListFile();
    const hasRoleMg = useComparePositionTE('ASSISTANT', 'HR', 'LEADER', 'QC');

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
            {hasRoleMg && <Tabs
                notAllowContent
                listItemTab={tabs}
                onClickTab={(key) => {
                    setTab(key)
                }}
            />}
            <NewDocument onBin={hasRoleMg && tab === 'BIN'} />
        </div>
    )
}

export default ContainerDocument;