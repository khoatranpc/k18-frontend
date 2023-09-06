import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { Button, Input } from 'antd';
import * as yup from 'yup';
import { Obj } from '@/global/interface';
import { useGetDetailCourse } from '@/utils/hooks';
import ModalCustomize from '@/components/ModalCustomize';
import PopupLevel from '../PopupLevel';
import styles from '@/styles/course/ManagerCourse.module.scss';

interface Props {
    courseId: string;
    show?: boolean;
    onHide?: () => void;
}
const validationSchema = yup.object({
    courseName: yup.string().required('Bạn cần cung cấp tên khối học!'),
    syllabus: yup.string().required('Bạn cần cung cấp lộ trình học!'),
});
const PopupDetailCourse = (props: Props) => {
    const detailCourse = useGetDetailCourse();
    const [isCreateLevel, setIsCreateLevel] = useState<{
        show: boolean;
        courseId: string
    }>({
        show: false,
        courseId: ''
    });

    const { values, errors, touched, handleSubmit, handleBlur, handleChange, setFieldValue, setValues } = useFormik({
        initialValues: {
            courseName: '',
            syllabus: '',
            _id: ''
        }, validationSchema,
        onSubmit(values) {
            console.log(values);
        }
    });
    useEffect(() => {
        detailCourse.query(props.courseId);
    }, []);
    useEffect(() => {
        if (detailCourse.data.response) {
            setFieldValue('courseName', (detailCourse.data.response.data as Obj)?.courseName);
            setFieldValue('syllabus', (detailCourse.data.response.data as Obj)?.syllabus);
            setFieldValue('_id', (detailCourse.data.response.data as Obj)?._id);
        }
    }, [detailCourse.data.response]);
    return (
        <ModalCustomize
            show={props.show}
            onHide={props.onHide}
            modalHeader={<h2>Khối {(detailCourse.data.response?.data as Obj)?.courseName}</h2>}
            loading={!detailCourse.data.response || detailCourse.data.isLoading}
        >
            <div className={styles.containerPopupDetailCourse}>
                <Form
                    onSubmit={handleSubmit}
                >
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Khối <span className="field_required">*</span></Form.Label>
                        <Input type="text" name="courseName" value={values.courseName} placeholder="Khối" size="small" onBlur={handleBlur} onChange={handleChange} className={styles.input} />
                        {errors.courseName && touched.courseName && <p className="error">{errors.courseName}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Lộ trình <span className="field_required">*</span></Form.Label>
                        <Input type="text" name="syllabus" value={values.syllabus} placeholder="Syllabus" size="small" onBlur={handleBlur} onChange={handleChange} className={styles.input} />
                        {errors.syllabus && touched.syllabus && <p className="error">{errors.syllabus}</p>}
                    </Form.Group>
                    <div className={styles.btn}>
                        <Button size="small" onClick={() => {
                            setIsCreateLevel({
                                show: true,
                                courseId: props.courseId
                            })
                        }}>Thêm khoá</Button>
                        <Button htmlType="submit" size="small">Lưu</Button>
                    </div>
                </Form>
                {
                    isCreateLevel && <PopupLevel
                        isCreate
                        courseId={props.courseId}
                        show={isCreateLevel.show}
                        onHide={() => {
                            setIsCreateLevel({
                                show: false,
                                courseId: ''
                            });
                        }}
                    />
                }
            </div>
        </ModalCustomize>
    )
}

export default PopupDetailCourse;