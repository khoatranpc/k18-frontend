import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Input } from 'antd';
import { Form } from 'react-bootstrap';
import { useCreateLevelCourse } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import ModalCustomize from '@/components/ModalCustomize';
import styles from '@/styles/course/ManagerCourse.module.scss';

interface Props {
    show?: boolean;
    isCreate?: boolean;

    levelId?: string;
    levelCode?: string;
    textBook?: string;
    levelName?: string;
    levelNumber?: number;
    courseId: string;
    onHide?: () => void;
}
const validationSchema = yup.object({
    levelCode: yup.string().required('Bạn cần nhập mã khoá mới!'),
    textBook: yup.string().required('Bạn cần nhập link giáo trình!'),
    levelName: yup.string().required('Bạn cần nhập tên khoá học!'),
})
const PopupLevel = (props: Props) => {
    const createLevelCourse = useCreateLevelCourse();
    const message = useHookMessage();
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            levelId: props.levelId || '',
            levelCode: props.levelCode || '',
            textBook: props.textBook || '',
            levelNumber: Number(props.levelNumber) || 1,
            levelName: props.levelName || '',
        },
        validationSchema,
        onSubmit(values) {
            console.log(values);
        }
    });

    return (
        <ModalCustomize
            show={props.show}
            onHide={props.onHide}
            modalHeader={<h2>{props.isCreate ? 'Thêm mới khoá học' : `Khoá học ${props.levelCode}`}</h2>}
        >
            <div className={styles.containerPopupLevel}>
                <Form onSubmit={handleSubmit}>
                    <p>Thứ tự: {values.levelNumber}</p>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Mã khoá học <span className="field_required">*</span></Form.Label>
                        <Input type="text" name="levelCode" value={values.levelCode} placeholder="Mã khoá học" size="small" onBlur={handleBlur} onChange={handleChange} className={styles.input} />
                        {errors.levelCode && touched.levelCode && <p className="error">{errors.levelCode}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Tên khoá học <span className="field_required">*</span></Form.Label>
                        <Input type="text" name="levelName" value={values.levelName} placeholder="Tên khoá học" size="small" onBlur={handleBlur} onChange={handleChange} className={styles.input} />
                        {errors.levelName && touched.levelName && <p className="error">{errors.levelName}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Giáo trình <span className="field_required">*</span></Form.Label>
                        <Input type="text" name="textBook" value={values.textBook} placeholder="Giáo trình" size="small" onBlur={handleBlur} onChange={handleChange} className={styles.input} />
                        {errors.textBook && touched.textBook && <p className="error">{errors.textBook}</p>}
                    </Form.Group>
                    <div className={styles.btn}>
                        <Button htmlType="submit" size="small">{props.isCreate ? 'Lưu' : 'Cập nhật'}</Button>
                    </div>
                </Form>
            </div>
        </ModalCustomize>
    )
}

export default PopupLevel;