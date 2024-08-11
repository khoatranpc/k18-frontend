import React from 'react';
import styles from '@/styles/NoProcess.module.scss';
import { Tag } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

interface Props {
    className?: string;
}
const NoProcess = (props: Props) => {
    return (
        <Tag className={`${styles.noProcess} ${props.className}`} icon={<MinusCircleOutlined />} color="#b2bec3">
            Chưa xử lý
        </Tag>

    )
}

export default NoProcess;