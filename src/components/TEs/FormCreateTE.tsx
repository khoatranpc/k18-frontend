import React, { useEffect } from 'react';
import { Button, Checkbox, DatePicker, Input } from 'antd';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { Obj } from '@/global/interface';
import { useCreateTe, useGetListCourse } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import { PositionTe } from '@/global/enum';
import PositionTEPicker from '../PositionTEPicker';
import Loading from '../loading';
import styles from '@/styles/employee/TE.module.scss';

const validationSchema = yup.object({
    teName: yup.string().required("Chưa có tên TE!"),
    facebook: yup.string().required("Cần có link Facebook của TE!"),
    email: yup.string().required("Chưa có email!"),
    personalEmail: yup.string().required("Chưa có email cá nhân!"),
    phoneNumber: yup.string().required("Chưa có số điện thoại!"),
});
const FormCreateTE = () => {
    const listCourse = useGetListCourse();
    const getListCourse = listCourse.listCourse?.data as Obj[];
    const createTe = useCreateTe();
    const message = useHookMessage();
    const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            teName: '',
            positionTe: PositionTe.QC,
            courseId: [],
            facebook: '',
            phoneNumber: '',
            email: '',
            dob: new Date(),
            img: '',
            personalEmail: ''
        },
        validationSchema,
        onSubmit(values) {
            createTe.query({
                body: values
            });
        }
    });
    useEffect(() => {
        if (!getListCourse) {
            listCourse.queryListCourse({
                query: {
                    fields: '_id,courseName'
                }
            });
        }
    }, []);
    useEffect(() => {
        if (createTe.data.response) {
            message.open({
                type: createTe.data.success ? 'success' : 'error',
                content: createTe.data.response?.message as string
            });
            createTe.clear?.();
            message.close();
        }
    }, [createTe.data.response]);
    return (
        <Form className={styles.formCreateTe} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>
                    Họ và tên <span className="error">*</span>:
                </Form.Label>
                <Input value={values.teName} name="teName" size="small" onChange={handleChange} onBlur={handleBlur} />
                {errors.teName && touched.teName && <p className="error">{errors.teName}</p>}
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Email <span className="error">*</span>:
                </Form.Label>
                <Input size="small" name="email" onChange={handleChange} onBlur={handleBlur} />
                {errors.email && touched.email && <p className="error">{errors.email}</p>}
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Email cá nhân <span className="error">*</span>:
                </Form.Label>
                <Input size="small" name="personalEmail" onChange={handleChange} onBlur={handleBlur} />
                {errors.personalEmail && touched.personalEmail && <p className="error">{errors.personalEmail}</p>}
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    SĐT <span className="error">*</span>:
                </Form.Label>
                <Input size="small" name="phoneNumber" onChange={handleChange} onBlur={handleBlur} />
                {errors.phoneNumber && touched.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Facebook <span className="error">*</span>:
                </Form.Label>
                <Input size="small" name="facebook" onChange={handleChange} onBlur={handleBlur} />
                {errors.facebook && touched.facebook && <p className="error">{errors.facebook}</p>}
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Vị trí <span className="error">*</span>:
                </Form.Label>
                <PositionTEPicker
                    value={values.positionTe as PositionTe}
                    onChange={(position) => {
                        setFieldValue('positionTe', position);
                    }}
                />
                {errors.facebook && touched.facebook && <p className="error">{errors.facebook}</p>}
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Bộ môn <small>(Dành cho TE QC)</small>:
                </Form.Label>
                {listCourse.loading ? <Loading /> :
                    <Checkbox.Group
                        onChange={(checkedValues) => {
                            setFieldValue('courseId', checkedValues);
                        }}
                    >
                        {getListCourse?.map((item) => {
                            return <Checkbox value={item?._id}>{item.courseName}</Checkbox>
                        })}
                    </Checkbox.Group>
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Ngày sinh:
                </Form.Label>
                <br />
                <DatePicker
                    name="dob"
                    onBlur={handleBlur}
                    value={dayjs(values.dob ? values.dob : new Date())}
                    format={"DD/MM/YYYY"}
                    size="small"
                    onChange={(value) => {
                        const day = (value as Obj)?.$d;
                        setFieldValue('dob', day ?? null);
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Ảnh:
                </Form.Label>
                <Input size="small" />
            </Form.Group>
            <Button loading={createTe.data.isLoading} htmlType="submit" className={styles.btnSubmit}>Tạo thông tin</Button>
        </Form>
    )
}

export default FormCreateTE;