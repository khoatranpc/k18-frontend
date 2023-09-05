import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Input } from 'antd';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { Obj } from '@/global/interface';
import { useCreateCourse } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import ModalCustomize from '@/components/ModalCustomize';
import styles from '@/styles/course/ManagerCourse.module.scss';

interface Props {
    isCreate?: boolean;
    title?: string;
    show?: boolean;
    onHide?: () => void;
}
const validationSchema = yup.object({
    courseName: yup.string().required('Bạn chưa nhập tên khoá!'),
    syllabus: yup.string().required('Bạn chưa nhập link lộ trình!'),
    levelCode: yup.string().required('Bạn chưa nhập mã khoá học!'),
    levelName: yup.string().required('Bạn chưa nhập tên khoá học!'),
    textBook: yup.string().required('Bạn chưa nhập link giáo trình!')
});
const Popup = (props: Props) => {
    const [step, setStep] = useState(false);
    const message = useHookMessage();
    const createCourse = useCreateCourse();
    const { values, errors, touched, handleSubmit, handleBlur, handleChange } = useFormik({
        initialValues: {
            courseName: '',
            syllabus: '',

            levelCode: '',
            levelName: '',
            textBook: ''
        },
        validationSchema,
        onSubmit(value) {
            console.log(value);
        }
    });
    const handleCreateCourse = (body: Obj) => {
        createCourse.query(body);
    }
    useEffect(() => {
        if (createCourse.data.response) {
            if (!createCourse.data.success) {
                createCourse.clear();
            } else {
                setStep(true);
            }
            message.open({
                content: createCourse.data.response.message as string,
                type: createCourse.data.success ? 'success' : 'error'
            });
            message.close();
        }
        return () => {
            createCourse.clear();
        }
    }, [createCourse.data.response]);
    return (
        <div className={styles.popupManagerCourse}>
            <ModalCustomize
                show={props.show}
                modalHeader={<h2>{props.title}</h2>}
                onHide={props.onHide}
            >
                <div className={styles.contenModalCourse}>
                    <Form
                        onSubmit={handleSubmit}
                    >
                        {
                            !step ? <>
                                <Form.Group className={styles.mb_24}>
                                    <Form.Label>Khối <span className="field_required">*</span></Form.Label>
                                    <Input type="text" value={values.courseName} name="courseName" onChange={handleChange} onBlur={handleBlur} placeholder="Nhập khối mới" size="small" className={styles.input} />
                                    {errors.courseName && touched.levelName && <p className="error">{errors.courseName}</p>}
                                </Form.Group>
                                <Form.Group className={styles.mb_24}>
                                    <Form.Label>Lộ trình <span className="field_required">*</span></Form.Label>
                                    <Input type="text" value={values.syllabus} name="syllabus" onChange={handleChange} onBlur={handleBlur} placeholder="VD: https://syllabus.com" size="small" className={styles.input} />
                                    {errors.syllabus && touched.syllabus && <p className="error">{errors.syllabus}</p>}
                                </Form.Group>
                            </> :
                                <>
                                    <Form.Group className={styles.mb_24}>
                                        <Form.Label>Mã <span className="field_required">*</span></Form.Label>
                                        <Input type="text" value={values.levelCode} name="levelCode" onChange={handleChange} onBlur={handleBlur} placeholder="VD:C4E" size="small" className={styles.input} />
                                        {errors.levelCode && touched.levelCode && <p className="error">{errors.levelCode}</p>}
                                    </Form.Group>
                                    <Form.Group className={styles.mb_24}>
                                        <Form.Label>Tên <span className="field_required">*</span></Form.Label>
                                        <Input type="text" value={values.levelName} name="levelName" onChange={handleChange} onBlur={handleBlur} size="small" className={styles.input} />
                                        {errors.levelName && touched.levelName && <p className="error">{errors.levelName}</p>}
                                    </Form.Group>
                                    <Form.Group className={styles.mb_24}>
                                        <Form.Label>Giáo trình <span className="field_required">*</span></Form.Label>
                                        <Input type="text" value={values.textBook} name="textBook" onChange={handleChange} onBlur={handleBlur} size="small" className={styles.input} />
                                        {errors.textBook && touched.textBook && <p className="error">{errors.textBook}</p>}
                                    </Form.Group>
                                </>
                        }
                        <div className={styles.divBtn}>
                            {
                                step && <Button size="small" onClick={() => {
                                    setStep(false);
                                }}>
                                    Trước
                                </Button>
                            }
                            <Button
                                size="small"
                                htmlType={step ? "submit" : "button"}
                                loading={!step ? (createCourse.data.isLoading) : (false)}
                                disabled={!(values.courseName && values.syllabus)}
                                onClick={() => {
                                    if (!step) {
                                        if (values.courseName && values.syllabus && !createCourse.data.success) {
                                            handleCreateCourse({
                                                courseName: values.courseName,
                                                syllabus: values.syllabus
                                            })
                                        }
                                        if (createCourse.data.success) {
                                            setStep(true);
                                        }
                                    }
                                }}
                            >
                                {step ? 'Tạo khoá' : (!createCourse.data.success ? 'Tạo khối' : 'Tiếp')}
                            </Button>
                        </div>
                    </Form>
                </div>
            </ModalCustomize>
        </div>
    )
}

export default Popup;