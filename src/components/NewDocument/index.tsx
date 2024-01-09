import React, { useEffect, useMemo, useState } from 'react';
import { FolderOpenOutlined } from '@ant-design/icons';
import { Breadcrumb, TabsProps } from 'antd';
import { Obj } from '@/global/interface';
import { useComparePositionTE, useGetListFile, useGetListFolder } from '@/utils/hooks';
import Tabs from '../Tabs';
import NewDocument from './NewDocument';
import { mapNodeParentByPath } from './config';
import styles from '@/styles/Document.module.scss';

const ContainerDocument = () => {
    const listFolder = useGetListFolder();
    const listFile = useGetListFile();
    const getListFolder = listFolder.data.response?.data as Obj[] || [];
    const getListFile = listFile.data.response?.data as Obj[] || [];
    const mappingListData = [...getListFolder, ...getListFile];
    const hasRoleMg = useComparePositionTE('ASSISTANT', 'HR', 'LEADER', 'QC');
    const [currentNode, setCurrentNode] = useState<string>('');
    const getCurrentNode = useMemo(() => {
        return mapNodeParentByPath(currentNode, mappingListData)
    }, [currentNode, getListFolder, getListFile]) as Obj[];
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
        <div className={`${styles.containerDocument} ${!hasRoleMg && styles.anRole}`}>
            {hasRoleMg && <Tabs
                notAllowContent
                listItemTab={tabs}
                onClickTab={(key) => {
                    setTab(key)
                }}
            />}
            <div className={styles.breadCumb}>
                <Breadcrumb
                    items={getCurrentNode.map((item) => {
                        return {
                            title: <span className={styles.flexIconBreadCumb}>{item?.type === 'FOLDER' && <FolderOpenOutlined />}{item?.name}</span>,
                        }
                    })}
                />
            </div>
            <NewDocument onBin={hasRoleMg && tab === 'BIN'} setCurrentNode={setCurrentNode} />
        </div>
    )
}

export default ContainerDocument;