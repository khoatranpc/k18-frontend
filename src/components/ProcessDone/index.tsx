import React from 'react';
import styles from '@/styles/ProcessDone.module.scss'
import { Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

interface Props {
    className?: string;
}
const ProcessDone = (props: Props) => {
    return (
        <Tag className={`${styles.processDone} ${props.className}`} icon={<CheckCircleOutlined />} color="#87d068">
            Hoàn Thành
        </Tag>
    )
}

export default ProcessDone;