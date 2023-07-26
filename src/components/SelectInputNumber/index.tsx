import React from 'react';
import { MenuProps, InputNumber } from 'antd';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import Dropdown, { ClickItem } from '../Dropdown';
import styles from '@/styles/SelectInputNumber.module.scss';

interface Props {
    className?: string;
    total?: number;
    size?: 'small' | 'large' | 'middle';
    value?: number;
    onSelect?: (e: ClickItem, keyIndex?: string) => void;
}
const SelectInputNumber = (props: Props) => {
    const listSelectNumber: MenuProps['items'] = [];
    for (let i = 1; i <= (props.total as number || 10); i++) {
        listSelectNumber.push({
            key: i,
            label: i
        });
    }
    return (
        <div className={styles.selectInputNumber}>
            <Dropdown
                onClickItem={props.onSelect}
                className={`${styles.selectNumberDropdown} selectNumberCustom`}
                overlayClassName={styles.overlaySelectNumer}
                title={<InputNumber
                    size={props.size || 'small'}
                    min={1}
                    value={props.value}
                    upHandler={<span className={styles.iconChevron}>{MapIconKey[KEY_ICON.CHEVRONU]}</span>}
                    downHandler={<span className={styles.iconChevron}>{MapIconKey[KEY_ICON.CHEVROND]}</span>}
                />}
                trigger={'click'}
                listSelect={listSelectNumber}
            />
        </div>
    )
}

export default SelectInputNumber;