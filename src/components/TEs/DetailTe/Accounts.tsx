import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Button, Input } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHookMessage } from '@/utils/hooks/message';
import { Obj } from '@/global/interface';
import { useGetTeById, useUpdateAccount } from '@/utils/hooks';
import styles from '@/styles/employee/TE.module.scss';

const validationSchema = yup.object({
    email: yup.string().email("Email không đúng định dạng!").required("Chưa có email!"),
    password: yup.string().required("Chưa có mật khẩu!"),
})
const Accounts = () => {
    const currentTe = useGetTeById();
    const getCurrentTe = (currentTe.data.response as Obj)?.data as Obj;
    const updateAccount = useUpdateAccount();
    const message = useHookMessage();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: getCurrentTe?.accountId?.email as string ?? "",
            password: ''
        },
        validationSchema,
        onSubmit(values) {
            updateAccount.query({
                body: values,
                params: [getCurrentTe?.accountId?._id as string]
            });
        }
    });
    useEffect(() => {
        if (updateAccount.data.response) {
            message.open({
                content: updateAccount.data.response?.message as string,
                type: updateAccount.data.success ? 'success' : 'error'
            });
            updateAccount.clear?.();
            message.close();
        }
    }, [updateAccount.data]);
    return (
        <Form className={styles.formAccount} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>
                    Email <span className="error">*</span>:
                </Form.Label>
                <Input size="small" placeholder="example@gmail.com" value={values.email} name="email" onChange={handleChange} onBlur={handleBlur} />
                {errors.email && touched.email && <p className="error">{errors.email}</p>}
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Mật khẩu <span className="error">*</span>:
                </Form.Label>
                <Input size="small" type="password" placeholder="Mật khẩu" value={values.password} name="password" onChange={handleChange} onBlur={handleBlur} />
                {errors.password && touched.password && <p className="error">{errors.password}</p>}
            </Form.Group>
            <div className={styles.btnSubmit}>
                <Button htmlType="submit" size="small">
                    Cập nhật
                </Button>
            </div>
        </Form>
    )
}

export default Accounts;