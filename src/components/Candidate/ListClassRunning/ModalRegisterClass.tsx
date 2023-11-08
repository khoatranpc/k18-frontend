import React from 'react';
import { Button, DatePicker, Input, Radio } from 'antd';
import { Form } from 'react-bootstrap';
import { Obj } from '@/global/interface';
import ModalCustomize from '@/components/ModalCustomize';
import styles from '@/styles/Recruitment/Candidate.module.scss';
import { useFormik } from 'formik';
import dayjs from 'dayjs';

interface Props {
    showModal?: boolean;
    handleShowModal?: (show: boolean) => void;
    class?: Obj;
}
const ModalRegisterClass = (props: Props) => {
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            classId: props.class?._id || '',
            date: '',
            emailCandidate: '',
            form: '',
            location: ''
        },
        onSubmit(values) {

        }
    });
    const getListLocationClass = (props.class?.recordBookTeacher as Array<Obj>)?.map((item) => {
        return item.locationId
    });
    console.log(getListLocationClass);
    return (
        <ModalCustomize
            show={props.showModal}
            onHide={() => {
                props.handleShowModal?.(false);
            }}
            modalHeader={<h2>Đăng ký dự thính</h2>}
        >
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label><b>Lớp</b></Form.Label>
                    <br />
                    {props.class?.codeClass}
                </Form.Group>
                <Form.Group>
                    <Form.Label><b>Email</b></Form.Label>
                    <Input size="small" />
                </Form.Group>
                <Form.Group>
                    <Form.Label><b>Ngày</b></Form.Label>
                    <br />
                    <DatePicker
                        size="small"
                        onChange={(value) => {
                            const date = (value as Obj)?.$d;
                            console.log(date);
                            setFieldValue('date', date);
                        }}
                        popupClassName={styles.pickDateRegister}
                        format={'DD/MM/YYYY'}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label><b>Hình thức</b></Form.Label>
                    <br />
                    <Radio.Group value={values.form} onChange={handleChange} name="form">
                        <Form.Label>
                            <Radio value="ONLINE" name="form" />Online
                        </Form.Label>
                        <br />
                        <Form.Label>
                            <Radio value="OFFLINE" name="form" />Offline
                        </Form.Label>
                    </Radio.Group>
                </Form.Group>
                {values.form === "OFFLINE" &&
                    <Form.Group>
                        <Form.Label><b>Cơ sở</b></Form.Label>
                        <br />
                        <Radio.Group value={values.location} onChange={handleChange} name="location">
                            {getListLocationClass?.map((item, idx) => {
                                return (
                                    <Form.Label key={idx}>
                                        <Radio value={item._id as string} />{item.locationCode}&nbsp;&nbsp;
                                    </Form.Label>
                                )
                            })}
                        </Radio.Group>
                    </Form.Group>
                }
                <Button size="small" className={styles.btnRegister}>
                    Đăng ký
                </Button>
            </Form>
        </ModalCustomize>
    )
}

export default ModalRegisterClass;