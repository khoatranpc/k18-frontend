import React from 'react';
import { Button, Dropdown as DropdownComponent, MenuProps } from 'antd';

export interface ClickItem {
    key: string;
    keyPath: string[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}
interface Props {
    trigger: 'click' | 'hover' | 'contextMenu';
    listSelect: MenuProps['items'];
    title: string;
    className?: string;
    disabled?: boolean;
    onClickItem?: (e: ClickItem, keyIndex?: string) => void;
    keyIndex?: string;
}
const Dropdown = (props: Props) => {
    const mapListSelect: any = props.listSelect!.map((item) => {
        return {
            ...item,
            onClick(e: ClickItem) {
                props.onClickItem?.(e, props.keyIndex);
            }
        }
    });
    return (
        <div className={props.className}>
            <DropdownComponent
                menu={{ items: mapListSelect }}
                trigger={[props.trigger]}
                className="dropdownCustomize"
            >
                <Button>{props.title}</Button>
            </DropdownComponent>
        </div>
    )
}

export default Dropdown;