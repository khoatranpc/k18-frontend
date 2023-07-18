import React from 'react';
import { Button, Dropdown as DropdownComponent, MenuProps } from 'antd';
import { Obj } from '@/global/interface';

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
    activeKey?: string;
    activeClass?: string;
    onClickItem?: (e: ClickItem, keyIndex?: string) => void;
}
const Dropdown = (props: Props) => {
    const mapListSelect: any = props.listSelect!.map((item) => {
        return {
            ...item,
            className: props.activeKey === item!.key ? props.activeClass : '',
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
                dropdownRender={(origin) => {
                    const getArrayItems = ((origin as unknown as Obj)?.props as Obj)?.items as Array<Obj>;
                    if (getArrayItems.length === 0) return <span style={{ backgroundColor: 'white', padding: '4px' }}>Ôi, không có gì để chọn hết!</span>
                    return origin
                }}
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