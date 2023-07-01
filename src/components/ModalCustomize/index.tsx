import React from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from '@/styles/Modal.module.scss';

interface Props {
    className?: string;
    children: string;
    show?: boolean;
    disableCloseButtonHeader?: boolean;
    modalHeader?: React.ReactElement | string;
    modalFooter?: React.ReactElement | string;
    dialogClassName?: string;
    onHide?: () => void;
}
const ModalCustomize = (props: Props) => {
    return (
        <div className={`modalCustomize ${props.className}`}>
            <Modal
                dialogClassName={`${props.dialogClassName}`}
                show={props.show}
                onHide={props.onHide}
                backdrop="static"
                keyboard={false}
            >
                {
                    props.modalHeader && <Modal.Header closeButton={!props.disableCloseButtonHeader}>
                        <Modal.Title>{props.modalHeader}</Modal.Title>
                    </Modal.Header>
                }

                <Modal.Body>
                    {
                        props.children
                    }
                </Modal.Body>
                {props.modalFooter &&
                    <Modal.Footer>
                        {props.modalFooter}
                    </Modal.Footer>}

            </Modal>
        </div>
    )
}

export default ModalCustomize;