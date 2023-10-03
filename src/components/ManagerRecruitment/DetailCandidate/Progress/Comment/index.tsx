import React, { FormEventHandler, useState } from 'react';
import { Avatar, Button } from 'antd';
import { Form } from 'react-bootstrap';
import TextArea from 'antd/es/input/TextArea';
import { Obj } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import { formatDatetoString } from '@/utils';
import { useGetDataRoundComments } from '@/utils/hooks';
import NoData from '@/components/table-ant/NoData';
import UnCheck from '@/icons/UnCheck';
import Send from '@/icons/Send';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

interface Props {
    comment?: Obj;
    isCreate?: boolean;
    className?: string;
}
export const Comment = (props: Props) => {
    const [comment, setComment] = useState<string>('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const getCommentValue = (e.target as any).comment.value;
    }
    return (
        <div className={`${styles.comment} ${props.isCreate && styles.isCreate}`}>
            <div className={styles.author}>
                <Avatar size="large" />
                <span>
                    <span className={styles.user}>Khánh Linh</span>
                    <br />
                    <span>HR Teaching</span>
                </span>
            </div>
            <div className={styles.commentContent}>
                {
                    !props.isCreate && <small className={styles.updatedAt}>
                        {formatDatetoString(props.comment ? new Date(props.comment.updatedAt) : new Date(), 'MMMM dd, yyyy - HH:mm a')}
                    </small>
                }
                {
                    !props.isCreate && <p className={styles.cmtContent}>
                        {(props.comment?.contentComment as string)?.slice(0, 200)}
                    </p>
                }
                {
                    props.isCreate && <Form onSubmit={handleSubmit}>
                        <TextArea name="comment" value={comment} onChange={(e) => {
                            setComment(e.target.value);
                        }} className={styles.inputComment} autoSize styles={{ textarea: { resize: 'none' } }} placeholder="Để lại feedback!" />
                        <div className={styles.btnFnc}>
                            <Button className={styles.buttonFormComment}>
                                <UnCheck />
                            </Button>
                            <Button disabled={!comment} className={styles.buttonFormComment} htmlType="submit">
                                <Send className={styles.send} />
                            </Button>
                        </div>
                    </Form>
                }
            </div>
            {!props.isCreate && <div className={styles.action}>
                {MapIconKey[KEY_ICON.DOT3VT]}
            </div>}
        </div>
    )
}

interface ListCommentProps {
    className?: string;
}
const ListComment = (props: ListCommentProps) => {
    const dataComments = useGetDataRoundComments();
    const getDataComments = (dataComments.data.response?.data as Array<Obj>) || [];
    return <div className={styles.containerComment}>
        <Comment isCreate />
        <div className={props.className}>
            {
                getDataComments.length === 0 ? <NoData className={styles.nodataCenter} /> :
                    getDataComments.map((item) => {
                        return <Comment key={item._id as string} comment={item} />
                    })
            }
        </div>
    </div>

};
export default ListComment;