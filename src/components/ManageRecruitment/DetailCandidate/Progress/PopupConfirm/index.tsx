import React, { useContext } from 'react';
import { Button } from 'antd';
import { RoundProcess } from '@/global/enum';
import ModalCustomize from '@/components/ModalCustomize';
import ConfirmContext from '../context';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

interface Props {
    header?: React.ReactElement | string;
    show?: boolean;
    title?: React.ReactElement | string;
    children?: React.ReactElement | string;
    step?: RoundProcess;
}

const PopupConfirm = (props: Props) => {
    const confirmModal = useContext(ConfirmContext);
    console.log(props.step);
    return (
        <ModalCustomize
            dialogClassName={styles.modalConfirm}
            modalHeader={confirmModal.title ?? 'Xác nhận'}
            onHide={() => {
                confirmModal.onConfirm?.(confirmModal.round, false);
            }}
            show={props.show}
            centered
            modalFooter={<div className={styles.handleConfirm}>
                <Button
                    size="small"
                    onClick={() => {
                        confirmModal.onConfirm?.(confirmModal.round, false);
                    }}
                >
                    Huỷ
                </Button>
                <Button size="small"
                    onClick={() => {
                        confirmModal.onConfirm?.(confirmModal.round, true);
                    }}
                >
                    Đồng ý
                </Button>
                {props.step && props.step === RoundProcess.CV && <Button size="small"
                    onClick={() => {
                        confirmModal.onConfirm?.(confirmModal.round, true);
                    }}
                >
                    Đồng ý và Gửi mail
                </Button>
                }
            </div>}
        >
            <div>
                {props.children}
            </div>
        </ModalCustomize>
    )
}

export default PopupConfirm;