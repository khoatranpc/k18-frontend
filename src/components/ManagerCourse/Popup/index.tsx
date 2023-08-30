import React from 'react';
import { Button, Input } from 'antd';
import { Form } from 'react-bootstrap';
import ModalCustomize from '@/components/ModalCustomize';
import styles from '@/styles/course/ManagerCourse.module.scss';

interface Props {
    isCreate?: boolean;
    title?: string;
    show?: boolean;
    onHide?: () => void;
}
const Popup = (props: Props) => {
    return (
        <div className={styles.popupManagerCourse}>
            <ModalCustomize
                show={props.show}
                modalHeader={<h2>{props.title}</h2>}
                onHide={props.onHide}
            >
                <div className={styles.contenModalCourse}>
                    <Form>
                        <Form.Group className={styles.mb_24}>
                            <Form.Label>Khối</Form.Label>
                            <Input type="text" name="course" placeholder="Nhập khối mới" size="small" className={styles.input} />
                        </Form.Group>
                        <Form.Group className={styles.mb_24}>
                            <Form.Label>Lộ trình</Form.Label>
                            <Input type="text" name="course" placeholder="VD: https://syllabus.com" size="small" className={styles.input} />
                        </Form.Group>
                        {
                            <Button size="small">Trước</Button>
                        }
                        <Button size="small">Tiếp</Button>
                    </Form>
                </div>
            </ModalCustomize>
        </div>
    )
}

export default Popup;