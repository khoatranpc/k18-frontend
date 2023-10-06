import React, { useContext } from 'react';
import { Button } from 'antd';
import { RoundProcess } from '@/global/enum';
import ConfirmContext from '../context';
import ModalCustomize from '@/components/ModalCustomize';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

interface Props {
    header?: React.ReactElement | string;
    show?: boolean;
    title?: React.ReactElement | string;
    children?: React.ReactElement | string;
}

const PopupConfirm = (props: Props) => {
    const confirmModal = useContext(ConfirmContext);
    return (
        <ModalCustomize
            dialogClassName={styles.modalConfirm}
            modalHeader={confirmModal.title ?? 'Xác nhận'}
            onHide={() => {
                confirmModal.onConfirm?.(confirmModal.round);
            }}
            show={props.show}
            centered
            modalFooter={<div className={styles.handleConfirm}>
                <Button
                    size="small"
                    onClick={() => {
                        confirmModal.onConfirm?.(confirmModal.round);
                    }}
                >
                    Huỷ
                </Button>
                <Button size="small"
                    onClick={() => {
                        confirmModal.onConfirm?.(confirmModal.round);
                    }}
                >
                    Đồng ý
                </Button>
            </div>}
        >
            <div>
                {props.children}
            </div>
        </ModalCustomize>
    )
}

export default PopupConfirm;