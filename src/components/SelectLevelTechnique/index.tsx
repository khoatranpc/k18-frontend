import React from 'react'
import Dropdown, { ClickItem } from '../Dropdown';
import { MenuProps } from 'antd';

interface Props {
    onSelect?: (e: ClickItem, key?: string) => void;
    className?: string;
    title: string | React.ReactNode;
    size?: "small" | 'middle' | 'large'
}
const SelectLevelTechnique = (props: Props) => {
    const listLevel: MenuProps['items'] = [
        {
            key: 'INTERN',
            label: 'Intern'
        },
        {
            key: 'FRESHER',
            label: 'Fresher'
        },
        {
            key: 'JUNIOR',
            label: 'Junior'
        },
        {
            key: 'MIDDLE',
            label: 'Middle'
        },
        {
            key: 'SENIOR',
            label: 'Senior'
        },
        {
            key: 'LEADER',
            label: 'Leader'
        },
    ]
    return (
        <Dropdown
            sizeButton={props.size}
            className={props.className}
            trigger="click"
            listSelect={listLevel}
            icon
            onClickItem={props.onSelect}
            title={props.title}
        />
    )
}

export default SelectLevelTechnique;