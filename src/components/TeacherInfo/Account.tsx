import { Button, Input } from 'antd';
import React from 'react';
import { Form } from 'react-bootstrap';
import { Obj } from '@/global/interface';
import useGetCrrUser from '@/utils/hooks/getUser';
import styles from '@/styles/teacher/TeacherInfo.module.scss';

const Account = () => {
    const currentUser = useGetCrrUser()?.data as Obj;

    return (
        <Form className={styles.FormAccount}>
            <Form.Group>
                <Form.Label>Email: {currentUser?.idAccount?.email as string}</Form.Label>
            </Form.Group>
            <Form.Group>
                <Form.Label>Mật khẩu</Form.Label>
                <Input />
            </Form.Group>
            <Form.Group>
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <Input />
            </Form.Group>
            <div className={styles.btnAccount}>
                <Button>Reset</Button>
                <Button>Cập nhật</Button>
            </div>
        </Form>
    )
}

export default Account;