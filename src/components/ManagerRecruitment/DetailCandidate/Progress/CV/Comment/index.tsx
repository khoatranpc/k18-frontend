import React from 'react';
import { Avatar } from 'antd';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';
import { formatDatetoString } from '@/utils';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';

const Comment = () => {
    return (
        <div className={styles.comment}>
            <div className={styles.author}>
                <Avatar size="large" />
                <span>
                    <span className={styles.user}>Khánh Linh</span>
                    <br />
                    <span>HR Teaching</span>
                </span>
            </div>
            <div className={styles.commentContent}>
                <small className={styles.updatedAt}>
                    {formatDatetoString(new Date().toString(), 'MMMM dd, yyyy - HH:mm a')}
                </small>
                <p className={styles.cmtContent}>
                    {"Lorem ipsum dolor sit amet, lconsectetur adipisicing elit. Dignissimos possimus modi nihil pariatur veniam velit vero repellendus tempore facilis ratione, officiis fuga est, reiciendis rem vitae quae cumque asperiores sed?".slice(0, 200)}
                </p>
            </div>
            <div className={styles.action}>
                {MapIconKey[KEY_ICON.DOT3VT]}
            </div>
        </div>
    )
}

export default Comment;