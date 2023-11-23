import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Input } from 'antd';
import { Form } from 'react-bootstrap';
import { PositionTe } from '@/global/enum';
import { useComparePositionTE, useCreateLevelCourse, useUpdateLevelCourse } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import ModalCustomize from '@/components/ModalCustomize';
import styles from '@/styles/course/ManagerCourse.module.scss';

interface Props {
    show?: boolean;
    isCreate?: boolean;

    levelId?: string;
    levelCode?: string;
    textbook?: string;
    levelName?: string;
    levelNumber?: number;
    courseId: string;
    onHide?: () => void;
}
const validationSchema = yup.object({
    levelCode: yup.string().required('Bạn cần nhập mã khoá mới!'),
    textbook: yup.string().required('Bạn cần nhập link giáo trình!'),
    levelName: yup.string().required('Bạn cần nhập tên khoá học!'),
})
const PopupLevel = (props: Props) => {
    const createLevelCourse = useCreateLevelCourse();
    const updateLevelCourse = useUpdateLevelCourse();
    const hasRole = useComparePositionTE(PositionTe.LEADER, PositionTe.QC, PositionTe.ASSISTANT);
    const message = useHookMessage();
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            levelId: props.levelId || '',
            levelCode: props.levelCode || '',
            textbook: props.textbook || '',
            levelNumber: Number(props.levelNumber) || 1,
            levelName: props.levelName || '',
            courseId: props.courseId || ''
        },
        validationSchema,
        onSubmit(values) {
            if (hasRole) {
                if (props.isCreate) {
                    createLevelCourse.query(values);
                } else {
                    const data = {
                        levelCode: values.levelCode,
                        textbook: values.textbook,
                        levelNumber: values.levelNumber,
                        levelName: values.levelName
                    }
                    updateLevelCourse.query(data, values.levelId);
                }
            }
        }
    });
    useEffect(() => {
        return () => {
            createLevelCourse.clear();
        }
    }, []);
    useEffect(() => {
        if (createLevelCourse.data.response) {
            message.open({
                content: createLevelCourse.data.response.message as string,
                type: createLevelCourse.data.success ? 'success' : 'error'
            });
            message.close(undefined, () => {
                createLevelCourse.clear();
            });
        }
    }, [createLevelCourse.data]);
    useEffect(() => {
        if (updateLevelCourse.data.response) {
            message.open({
                content: updateLevelCourse.data.response.message as string,
                type: updateLevelCourse.data.success ? 'success' : 'error'
            });
            message.close(undefined, () => {
                updateLevelCourse.clear();
            });
        }
    }, [updateLevelCourse.data]);
    return (
        <ModalCustomize
            loading={createLevelCourse.data.isLoading}
            show={props.show}
            onHide={props.onHide}
            modalHeader={<h2>{props.isCreate ? 'Thêm mới khoá học' : `Khoá học ${props.levelCode}`}</h2>}
        >
            <div className={styles.containerPopupLevel}>
                <Form onSubmit={handleSubmit}>
                    {
                        (<Form.Group className={styles.mb_24}>
                            <Form.Label>Thứ tự <span className="field_required">*</span></Form.Label>
                            <Input type="text" name="levelNumber" value={values.levelNumber} placeholder="STT" size="small" onBlur={handleBlur} onChange={handleChange} className={styles.input} />
                        </Form.Group>
                        )
                    }
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
                        <Input type="text" name="textbook" value={values.textbook} placeholder="Giáo trình" size="small" onBlur={handleBlur} onChange={handleChange} className={styles.input} />
                        {errors.textbook && touched.textbook && <p className="error">{errors.textbook}</p>}
                    </Form.Group>
                    {
                        hasRole &&
                        <div className={styles.btn}>
                            <Button
                                htmlType="submit"
                                size="small"
                                loading={props.isCreate ? createLevelCourse.data.isLoading : (updateLevelCourse.data.isLoading)}
                            >
                                {props.isCreate ? 'Lưu' : 'Cập nhật'}
                            </Button>
                        </div>
                    }
                </Form>
            </div>
        </ModalCustomize>
    )
}

export default PopupLevel;