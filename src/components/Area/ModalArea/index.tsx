import React from 'react';
import { Form } from 'react-bootstrap';
import { Button, Input } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Obj } from '@/global/interface';
import styles from '@/styles/Location.module.scss';

interface Props {
    data?: Obj;
    handleSubmit?: (values: Obj) => void;
    loading?: boolean;
    isCreate?: boolean;
}
const validationSchema = yup.object({
    name: yup.string().required('Bạn cần nhập tên khu vực'),
    code: yup.string().required('Bạn cần nhập mã khu vực'),
})
const ModalArea = (props: Props) => {
    const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: {
            name: props.data?.name as string ?? '',
            code: props.data?.code as string ?? ''
        },
        validationSchema,
        onSubmit(values) {
            props.handleSubmit?.(values);
        }
    });
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Mã khu vực <span className="error">*</span></Form.Label>
                <Input size="small" name='code' value={values.code} onChange={handleChange} onBlur={handleBlur} />
                {errors.code && touched.code && <p className="error">{errors.code}</p>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Tên <span className="error">*</span></Form.Label>
                <Input size="small" name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                {errors.name && touched.name && <p className="error">{errors.name}</p>}
            </Form.Group>
            <Button className={styles.btnSubmit} loading={props.loading} size="small" htmlType="submit">{props.isCreate ? 'Tạo' : 'Cập nhật'}</Button>
        </Form>
    )
}

export default ModalArea;