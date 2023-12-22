import React from 'react';
import { EditFilled } from '@ant-design/icons';
import { Obj } from '@/global/interface';
import { formatDatetoString } from '@/utils';
import { useHandleDrawer } from '@/utils/hooks';
import styles from '@/styles/Document.module.scss';

interface Props {
    doc?: Obj;
    isToggle?: boolean;
}
const Content = (props: Props) => {
    const drawer = useHandleDrawer();
    const handleOpenForm = () => {
        drawer.open({
            open: true,
            componentDirection: 'Document/FormDocument',
            props: {
                doc: props.doc,
            },
            title: props.doc?.docTitle
        })
    }
    return (
        <div className={styles.contentDocument}>
            {
                props.doc ? <div className={`${styles.viewContent} ${props.isToggle ? styles.onToggle : ''}`}>
                    <EditFilled className={styles.editIcon} onClick={() => {
                        handleOpenForm()
                    }} />
                    {props.isToggle && <>
                        <p className={styles.docName}>Tài liệu: <b>{props.doc?.docTitle}</b></p>
                        <p>Mô tả: <b>{props.doc?.docDescribe}</b></p>
                    </>}
                    <p>Trạng thái: {props.doc.active ? 'Triển khai' : 'Ngừng triển khai'}</p>
                    <p>Cập nhật: {formatDatetoString(props.doc.updatedAt as string, 'MM/yyyy')}</p>
                    <p>Link tài liệu: {props.doc.linkDoc ? <a target="_blank" href={props.doc.linkDoc}>Link</a> : 'Đang cập nhật'}</p>
                    {
                        props.doc.linkDoc && <div className={styles.preview}>
                            <iframe src={props.doc.linkDoc} className={styles.linkPreview} />
                        </div>
                    }
                </div> : <div>Hãy chọn tài liệu để xem nội dung</div>
            }
        </div>
    )
}

export default Content;