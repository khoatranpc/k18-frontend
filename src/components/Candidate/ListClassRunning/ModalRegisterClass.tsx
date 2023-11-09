import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, DatePicker, Input, Radio } from 'antd';
import dayjs from 'dayjs';
import { Form } from 'react-bootstrap';
import { Obj } from '@/global/interface';
import { ClassForm } from '@/global/enum';
import { useRegisterClautid } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import ModalCustomize from '@/components/ModalCustomize';
import styles from '@/styles/Recruitment/Candidate.module.scss';

const validationSchema = yup.object({
    date: yup.string().required('Bạn chưa chọn ngày dự thính!'),
    emailCandidate: yup.string().required('Bạn chưa nhập email!'),
    form: yup.string().required('Bạn chưa chọn hình thức dự thính!'),
    location: yup.string().required('Bạn chưa chọn hình thức dự thính!').when(["form"], (form, schema) => {
        if (form[0] === "OFFLINE") return schema.required('Bạn cần chọn cơ sở dự thính!');
        return schema.notRequired();
    }),
});
interface Props {
    showModal?: boolean;
    handleShowModal?: (show: boolean) => void;
    class?: Obj;
}
const ModalRegisterClass = (props: Props) => {
    const registerClautid = useRegisterClautid();
    const message = useHookMessage();
    const getListLocationClass = (props.class?.recordBookTeacher as Array<Obj>)?.map((item) => {
        return item.locationId
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            classId: props.class?._id || '',
            date: '',
            emailCandidate: '',
            form: '',
            location: ClassForm.ONLINE || ''
        },
        validationSchema,
        onSubmit(values) {
            if (values.location === ClassForm.ONLINE) {
                const findIdOnline = getListLocationClass.find((item) => item.locationCode === ClassForm.ONLINE);
                values.location = findIdOnline?._id;
            }
            registerClautid.query({
                body: values
            });
        }
    });

    useEffect(() => {
        if (registerClautid.data.response) {
            message.open({
                content: registerClautid.data.response.message as string,
                type: registerClautid.data.success ? 'success' : 'error'
            });
            registerClautid.clear?.();
            message.close();
        }
    }, [registerClautid.data]);
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
                    <Form.Label><b>Email <span className="error">*</span></b></Form.Label>
                    <Input size="small" name="emailCandidate" value={values.emailCandidate} onChange={handleChange} onBlur={handleBlur} />
                    {errors.emailCandidate && touched.emailCandidate && <p className="error">{errors.emailCandidate}</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label><b>Ngày <span className="error">*</span></b></Form.Label>
                    <br />
                    <DatePicker
                        name="date"
                        value={values.date ? dayjs(new Date(values.date)) : null}
                        size="small"
                        onBlur={handleBlur}
                        onChange={(value) => {
                            const date = (value as Obj)?.$d;
                            console.log(date);
                            setFieldValue('date', date);
                        }}
                        popupClassName={styles.pickDateRegister}
                        format={'DD/MM/YYYY'}
                    />
                    {errors.date && touched.date && <p className="error">{errors.date}</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label><b>Hình thức <span className="error">*</span></b></Form.Label>
                    <br />
                    <Radio.Group value={values.form} onChange={handleChange} name="form" onBlur={handleBlur}>
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
                        <Form.Label><b>Cơ sở <span className="error">*</span></b></Form.Label>
                        <br />
                        <Radio.Group value={values.location} onChange={handleChange} name="location" onBlur={handleBlur}>
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
                {errors.location && touched.location && <p className="error">{errors.location}</p>}

                <Button
                    size="small"
                    className={styles.btnRegister}
                    htmlType="submit"
                    loading={registerClautid.data.isLoading}
                >
                    Đăng ký
                </Button>
            </Form>
        </ModalCustomize>
    )
}

export default ModalRegisterClass;