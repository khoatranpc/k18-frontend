import React, { useContext, useState } from 'react';
import { Button, Dropdown, Tag } from 'antd';
import type { MenuProps } from 'antd';
import { fieldFilter } from '@/global/init';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import ManagerClassContext from '../../ManagerClass/context';
import PopUp from '@/components/PopUp';
import PopUpFilter from './PopUpFilter';
import FieldOption from '@/components/ManagerClass/listFieldByOption';
import styles from '@/styles/tabs/Toolbar.module.scss';

export interface ItemFilterField {
    key: string;
    title: string
}

interface Props {
    listFilter: ItemFilterField[];
}
const ToolBar = (props: Props) => {
    const storeManagerClass = useContext(ManagerClassContext);

    const items: MenuProps['items'] = props.listFilter.filter((item) => {
        return (storeManagerClass.listFieldFilter.findIndex((element) => element.key === item.key) < 0)
    }).map((item) => {
        return {
            label: <Tag key={item.key} className='tag-customize'>
                <span>{item.title}</span>
            </Tag>,
            key: item.key,
            onClick: () => {
                storeManagerClass.listFieldFilter.push({
                    key: item.key,
                    title: item.title,
                    value: ''
                });
                storeManagerClass.setContext({
                    crrKeyTab: storeManagerClass.crrKeyTab,
                    listFieldFilter: storeManagerClass.listFieldFilter
                })
            }
        }
    });
    const handleCloseTag = (key: string) => {
        let crrIndex = -1;
        const storeFindKey = storeManagerClass.listFieldFilter.find((item, index) => {
            if (item.key === key) {
                crrIndex = index;
                return item;
            }
            return undefined;
        });
        if (storeFindKey) {
            storeManagerClass.listFieldFilter.splice(crrIndex, 1);
            storeManagerClass.setContext({
                crrKeyTab: storeManagerClass.crrKeyTab,
                listFieldFilter: storeManagerClass.listFieldFilter
            });
        }
    };
    const [openPopUp, setOpenPopUp] = useState({
        open: false,
        index: ''
    });
    return (
        <div className={`${styles.toolbar} toolbar-customize`}>
            <div className="filter-list">
                {
                    storeManagerClass.listFieldFilter.map((item: { key: string; title: string }) => {
                        return (
                            <PopUp
                                open={item.key === openPopUp.index && openPopUp.open}
                                handlePopUp={() => {
                                    setOpenPopUp({
                                        index: item.key,
                                        open: true
                                    });
                                }} content={<PopUpFilter closeIcon handleClose={() => {
                                    setOpenPopUp({
                                        index: '',
                                        open: false
                                    })
                                }} listFilter={FieldOption[item.key]} limit={2} />} key={item.key}>
                                <Tag role='button' className="tag-customize">
                                    <span className={`${item.key === fieldFilter.OPEN_SCHEDULE || item.key === fieldFilter.TIME_SCHEDULE ? 'default' : ''}`}>
                                        {item.title}
                                        <span onClick={() => {
                                            handleCloseTag(item.key);
                                        }}>{MapIconKey[KEY_ICON.PLCR]}</span>
                                    </span>
                                </Tag>
                            </PopUp>
                        )
                    })
                }
                <div className="dropdown-toolbar-manager-class">
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <span>{MapIconKey[KEY_ICON.PL]} Thêm filter</span>
                    </Dropdown>
                </div>
            </div>
            <div className="right-fnc">
                <div className="search">
                    {MapIconKey[KEY_ICON.SRCH]}
                    {MapIconKey[KEY_ICON.DOT3VT]}
                </div>
                <Button className="btn-toolbar mr-8">
                    <span>{MapIconKey[KEY_ICON.PLCR]} Tạo mới</span>
                </Button>
                <Button className="btn-toolbar">
                    <span>{MapIconKey[KEY_ICON.EP]} Xuất file</span>
                </Button>
            </div>
        </div>
    )
}

export default ToolBar