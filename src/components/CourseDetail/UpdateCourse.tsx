import React, { useEffect } from 'react';
import { Button, Checkbox, Input } from 'antd';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Obj } from '@/global/interface';
import { useUpdateCourse } from '@/utils/hooks';
import styles from '@/styles/course/ManagerCourse.module.scss';
import { useHookMessage } from '@/utils/hooks/message';

const validationSchema = yup.object({
    courseTitle: yup.string().required('Bạn cần cung cấp tiêu đề khoá học!'),
    courseDescription: yup.string().required('Bạn cần mô tả khoá học!'),
    courseName: yup.string().required('Bạn cần cung cấp tên khoá học!'),
});
interface Props {
    currentCourse?: Obj
}
const UpdateCourse = (props: Props) => {
    const updateCourse = useUpdateCourse();
    const currentCourse = props.currentCourse;
    const message = useHookMessage();
    const { values, touched, errors, setValues, handleBlur, handleChange, handleReset, handleSubmit, setFieldValue } = useFormik({
        initialValues: currentCourse ?? {},
        validationSchema,
        onSubmit(values) {
            const mapValues = {
                ...values
            }
            delete mapValues._id;
            updateCourse.query(mapValues, currentCourse?._id as string);
        }
    });
    useEffect(() => {
        if (Object.keys(values).length === 0) {
            if (currentCourse) {
                setValues(currentCourse);
            }
        }
    }, []);
    useEffect(() => {
        if (updateCourse.data.response) {
            message.open({
                content: updateCourse.data.response.message as string,
                type: updateCourse.data.success ? 'success' : 'error'
            });
            updateCourse.clear?.();
            message.close();
        }
    }, [updateCourse.data]);
    return (
        <div className={styles.contentUdpateCourse}>
            <Form className={styles.form} onSubmit={handleSubmit}>
                <Form.Group className={styles.itemForm}>
                    <Form.Label>Link ảnh:</Form.Label>
                    <Input size="small" maxLength={100} name="courseImage" value={values.courseImage} onChange={handleChange} onBlur={handleBlur} />
                </Form.Group>
                <Form.Group className={styles.itemForm}>
                    <Form.Label>Trạng thái:</Form.Label>
                    <Checkbox.Group value={values.active ? ['ACTIVE'] : []} onChange={(checkedValue) => {
                        setFieldValue('active', checkedValue.includes('ACTIVE'));
                    }}>
                        <Checkbox style={{ marginLeft: '0.4rem' }} value={'ACTIVE'}>Active</Checkbox>
                    </Checkbox.Group>
                </Form.Group>
                <Form.Group className={styles.itemForm}>
                    <Form.Label>Tiêu đề khoá học<span className='error'>*</span> (Tối đa 100 ký tự):</Form.Label>
                    <Input size="small" maxLength={100} name="courseTitle" value={values.courseTitle} onChange={handleChange} onBlur={handleBlur} />
                    {touched.courseTitle && errors.courseTitle && <p className="error">{errors.courseTitle as string}</p>}
                </Form.Group>
                <Form.Group className={styles.itemForm}>
                    <Form.Label>Mô tả<span className='error'>*</span> (Tối đa 100 ký tự):</Form.Label>
                    <Input size="small" maxLength={100} name="courseDescription" value={values.courseDescription} onChange={handleChange} onBlur={handleBlur} />
                    {touched.courseDescription && errors.courseDescription && <p className="error">{errors.courseDescription as string}</p>}
                </Form.Group>
                <Form.Group className={styles.itemForm}>
                    <Form.Label>Tên khoá học<span className='error'>*</span>:</Form.Label>
                    <Input size="small" name="courseName" value={values.courseName} onChange={handleChange} onBlur={handleBlur} />
                    {touched.courseName && errors.courseName && <p className="error">{errors.courseName as string}</p>}
                </Form.Group>
                <Form.Group className={styles.itemForm}>
                    <Form.Label>Syllabus:</Form.Label>
                    <Input size="small" name="syllabus" value={values.syllabus} onChange={handleChange} onBlur={handleBlur} />
                </Form.Group>
                <div className={styles.btnAction}>
                    <Button onClick={handleReset} disabled={updateCourse.data.isLoading}>Reset</Button>
                    <Button htmlType="submit" loading={updateCourse.data.isLoading}>Cập nhật</Button>
                </div>
            </Form>
        </div>
    )
}

export default UpdateCourse;