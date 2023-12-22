import React, { useEffect } from 'react';
import { Popconfirm } from 'antd';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { Obj } from '@/global/interface';
import { PositionTe } from '@/global/enum';
import { formatDatetoString } from '@/utils';
import { useComparePositionTE, useDeleteDocument, useGetListDocument, useHandleDrawer } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import styles from '@/styles/Document.module.scss';

interface Props {
    doc?: Obj;
    isToggle?: boolean;
}
const Content = (props: Props) => {
    const message = useHookMessage();
    const hasRole = useComparePositionTE(PositionTe.LEADER, PositionTe.QC, PositionTe.ASSISTANT);
    const drawer = useHandleDrawer();
    const deleteDoc = useDeleteDocument();
    const listDocument = useGetListDocument();
    const handleOpenForm = () => {
        drawer.open({
            open: true,
            componentDirection: 'Document/FormDocument',
            props: {
                doc: props.doc,
            },
            title: <div className={styles.titleDrawerUpdate}>
                {props.doc?.docTitle}
                <Popconfirm
                    title="Xác nhận xoá?"
                    onConfirm={() => {
                        deleteDoc.query({
                            params: [props.doc?._id as string]
                        });
                    }}
                >
                    <DeleteOutlined className={styles.iconDelete} />
                </Popconfirm>
            </div>
        })
    }
    useEffect(() => {
        if (deleteDoc.data.response) {
            message.open({
                content: deleteDoc.data.response?.message as string,
                type: deleteDoc.data.success ? 'success' : 'error'
            });
            if (deleteDoc.data.success) {
                listDocument.query();
                drawer.close();
            }
            deleteDoc.clear?.();
            message.close();
        }
    }, [deleteDoc.data]);
    return (
        <div className={styles.contentDocument}>
            {
                props.doc ? <div className={`${styles.viewContent} ${props.isToggle ? styles.onToggle : ''}`}>
                    {hasRole && <EditFilled className={styles.editIcon} onClick={() => {
                        handleOpenForm()
                    }} />}
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