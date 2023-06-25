import React from 'react';
import { Collapse as CollapseComponent } from 'antd';
import styles from '@/styles/Collapse.module.scss';

export interface ItemPanels {
    header: React.ReactNode,
    key: string,
    content: React.ReactElement
}
interface Props {
    panels: Array<ItemPanels>;
    handleChange?: (key: string | string[]) => void;
    expandIconPosition?: 'start' | 'end' | 'left' | 'right';
    className?: string;
}
const Collapse = (props: Props) => {

    return (
        <div className={`customize-collapse ${props.className}`}>
            <CollapseComponent
                expandIconPosition={props.expandIconPosition || 'end'}
                onChange={(key) => {
                    props.handleChange?.(key);
                }}
            >
                {
                    props.panels.map((item) => {
                        return <CollapseComponent.Panel header={item.header} key={item.key} >
                            {item.content}
                        </CollapseComponent.Panel>
                    })
                }
            </CollapseComponent>
        </div>
    )
}

export default Collapse