import React from 'react';
import Progressing from '@/icons/Progressing';
import styles from '@/styles/Progressing.module.scss';

interface Props {
    className?: string;
}
const InProgressing = (props: Props) => {
    return (
        <div className={styles.inProgress}>
            <Progressing className={`${styles.progressing} ${props.className}`} />
            <label>Đang xử lý</label>
        </div>
    )
}

export default InProgressing;