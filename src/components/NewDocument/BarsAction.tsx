import React from 'react';
import { MenuProps } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
import Dropdown from '../Dropdown';
import styles from '@/styles/Document.module.scss';


interface Props {
    onOpenNewTab?: () => void;
    className?: string;
}
enum KeyAction {
    OPEN = 'OPEN',
    EDITROLE = 'EDITROLE'
}
const BarsAction = (props: Props) => {
    const listSelectDropDown: MenuProps['items'] = [
        {
            key: KeyAction.OPEN,
            label: 'Mở trang mới',
        },
        {
            key: KeyAction.EDITROLE,
            label: 'Chỉnh sửa quyền'
        }
    ];
    const handleClickItemDropDown = (key: string) => {
        switch (key) {
            case KeyAction.OPEN:
                props.onOpenNewTab?.();
                break;
        }
    }
    return (
        <div className={props.className}>
            <Dropdown
                trigger={'click'}
                listSelect={listSelectDropDown}
                title={<BarsOutlined style={{ cursor: 'pointer' }} />}
                onClickItem={(e) => handleClickItemDropDown(e.key)}
            />
        </div>
    )
}

export default BarsAction;