import React from 'react';
import styles from '@/styles/Progressing.module.scss';
import { Tag } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

interface Props {
    className?: string;
}
const Processing = (props: Props) => {
    return (
        <Tag className={`${styles.inProgress} ${props.className}`} icon={<SyncOutlined spin />} color="#2db7f5">
            Đang xử lý
        </Tag>

    )
}

export default Processing;