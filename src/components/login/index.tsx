import React, { useEffect } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Input, Button } from 'antd';
import { State } from '@/global/interface';
import { useHookMessage } from '@/utils/hooks/message';
import { AppDispatch, RootState } from '@/store';
import { clearToken, queryToken } from '@/store/reducers/auth-get-user.reducer';
import styles from '@/styles/auth/Login.module.scss';

const validationSchema = yup.object({
    email: yup.string().email('Sai định dạng email!').required('Bạn chưa nhập email!'),
    password: yup.string().required('Bạn chưa nhập mật khẩu!'),
});
const Login = () => {
    const message = useHookMessage();
    const dispatch = useDispatch<AppDispatch>();
    const crrToken = useSelector((state: RootState) => (state.token as State).state);
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit() {
            dispatch(queryToken({
                payload: {
                    query: {
                        body: values
                    }
                }
            }))
        }
    });
    useEffect(() => {
        if (!crrToken.isLoading) {
            if (crrToken.response) {
                if (crrToken.response.status) {
                } else {
                    message.open({
                        content: crrToken.response.message as string,
                        type: 'error'
                    });
                    dispatch(clearToken());
                }
            }
        }
    }, [crrToken, dispatch, message])

    return (
        <div className={styles.container_login}>
            <div className={styles.main}>
                <h5>Chào mừng đến với MindX LMS</h5>
                <p>Quản lý công việc, teamwork và nhiều hơn nữa</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className={styles.fs_12}>
                            <span>Email</span>
                        </Form.Label>
                        <Input type="email" name="email" placeholder="Email" size="large" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors.email && touched.email && <p className="error">{errors.email}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className={styles.fs_12}>
                            <span>Mật khẩu</span>
                            <Link href={'/auth/forgot-password'} className={styles.clr_base}>
                                <span className={styles.fw_600}>Quên mật khẩu?</span>
                            </Link>
                        </Form.Label>
                        <Input.Password name="password" placeholder="Password" size="large" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors.password && touched.password && <p className="error">{errors.password}</p>}
                    </Form.Group>
                    <Button
                        className={styles.btn_login}
                        htmlType="submit"
                        loading={crrToken.isLoading}
                    >
                        Đăng nhập
                    </Button>
                    <div className={styles.form}>
                        <span className={styles.txt}>Chưa có tài khoản?</span>
                        <Link href={'/auth/form-register'} className={styles.clr_base}>
                            <span className={styles.fw_600}>Đăng ký tài khoản</span>
                        </Link>
                    </div>
                </Form>
            </div>
        </div >
    )
}

export default Login;