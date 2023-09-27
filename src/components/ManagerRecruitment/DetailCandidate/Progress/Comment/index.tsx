import React from 'react';
import { Avatar } from 'antd';
import { Obj } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import { formatDatetoString } from '@/utils';
import { useGetDataRoundComments } from '@/utils/hooks';
import NoData from '@/components/table-ant/NoData';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

interface Props {
    comment?: Obj;
}
const Comment = (props: Props) => {
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
                    {formatDatetoString(props.comment ? new Date(props.comment.updatedAt) : new Date(), 'MMMM dd, yyyy - HH:mm a')}
                </small>
                <p className={styles.cmtContent}>
                    {props.comment?.contentComment.slice(0, 200)}
                </p>
            </div>
            <div className={styles.action}>
                {MapIconKey[KEY_ICON.DOT3VT]}
            </div>
        </div>
    )
}

interface ListCommentProps {
    className?: string;
}
const ListComment = (props: ListCommentProps) => {
    const dataComments = useGetDataRoundComments();
    const getDataComments = (dataComments.data.response?.data as Array<Obj>) || [];
    return <div className={props.className}>
        {
            getDataComments.length === 0 ? <NoData className={styles.nodataCenter} /> :
                getDataComments.map((item) => {
                    return <Comment key={item._id as string} comment={item} />
                })
        }
    </div>

};
export default ListComment;