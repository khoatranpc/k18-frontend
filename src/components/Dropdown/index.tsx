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
    className?: string;
    disabled?: boolean;
    keyIndex?: string;
    title?: React.ReactNode | string;
    open?: boolean;
    onClickItem?: (e: ClickItem, keyIndex?: string) => void;
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
                open={props.open}
                trigger={[props.trigger]}
                className="dropdownCustomize"
            >
                {typeof props.title === 'string' ?
                    (<Button>{props.title}</Button>) :
                    (props.title)
                }

            </DropdownComponent>
        </div>
    )
}

export default Dropdown;