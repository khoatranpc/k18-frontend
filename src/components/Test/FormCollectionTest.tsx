import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Input } from 'antd';
import { Form } from 'react-bootstrap';
import styles from '@/styles/Test.module.scss';

interface Props {
    courseLevelId?: string;
    courseId?: string;
    isUpdate?: boolean;
}
const validationSchema = yup.object({
    title: yup.string().required('Chưa có tiêu đề!'),
    quantity: yup.number().min(10, 'Số lượng câu hỏi tối thiểu là 10').max(20, 'Số lượng câu hỏi tối đa là 20').required('Chưa có số lượng câu hỏi!')
});
const FormCollectionTest = (props: Props) => {
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            title: '',
            quantity: 10
        },
        validationSchema,
        onSubmit(values) {

        }
    })
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>
                    Tiêu đề <span className="error">*</span>
                </Form.Label>
                <Input size="small" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} />
                {errors.title && touched.title && <p className="error">{errors.title}</p>}
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Số câu hỏi <span className="error">*</span>
                </Form.Label>
                <br />
                <Input type="number" size="small" style={{ width: 'fit-content' }} max={20} name="quantity" value={values.quantity} onChange={handleChange} onBlur={handleBlur} />
                {errors.quantity && touched.quantity && <p className="error">{errors.quantity}</p>}
            </Form.Group>
            <Button htmlType="submit" style={{ float: 'right' }} size="small">{props.isUpdate ? 'Cập nhật' : 'Tạo'}</Button>
        </Form>
    )
}

export default FormCollectionTest;