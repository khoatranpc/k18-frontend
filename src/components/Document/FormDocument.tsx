import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form } from 'react-bootstrap';
import { Button, Checkbox, Input } from 'antd';
import { Obj } from '@/global/interface';
import { useCreateDocument, useUpdateDocument } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import styles from '@/styles/Document.module.scss';

interface Props {
    doc?: Obj;
    isCreate?: Boolean;
}
const validationSchema = yup.object({
    docTitle: yup.string().required('Thiếu tiêu đề tài liệu!'),
    docDescribe: yup.string().required('Thiếu mô tả tài liệu!'),
});
const FormDocument = (props: Props) => {
    const message = useHookMessage();
    const createDocument = useCreateDocument();
    const updateDocument = useUpdateDocument();
    const { values, touched, errors, handleBlur, handleChange, handleReset, handleSubmit, setFieldValue } = useFormik({
        initialValues: props.doc ?? {},
        validationSchema,
        onSubmit(values) {
            if (!props.isCreate) {
                const mapValues = {
                    ...values
                }
                delete mapValues._id;
                updateDocument.query({
                    body: mapValues,
                    params: [props.doc?._id as string]
                })
            } else {
                createDocument.query({
                    body: values
                });
            }
        }
    });
    useEffect(() => {
        if (createDocument.data.response || updateDocument.data.response) {
            message.open({
                content: createDocument.data.response?.message as string ?? updateDocument.data.response?.message as string,
                type: (createDocument.data.success || updateDocument.data.success) ? 'success' : 'error'
            });
            if (updateDocument.data.response) {
                updateDocument.clear?.();
            }
            if (createDocument.data.response) {
                createDocument.clear?.();
            }
            message.close();
        }
    }, [createDocument.data, updateDocument.data]);
    return (
        <Form className={styles.form} onSubmit={handleSubmit}>
            <Form.Group className={styles.itemForm}>
                <Form.Label>Trạng thái:</Form.Label>
                <Checkbox.Group value={values.active ? ['ACTIVE'] : []} onChange={(checkedValue) => {
                    setFieldValue('active', checkedValue.includes('ACTIVE'));
                }}>
                    <Checkbox style={{ marginLeft: '0.4rem' }} value={'ACTIVE'}>Active</Checkbox>
                </Checkbox.Group>
            </Form.Group>
            <Form.Group className={styles.itemForm}>
                <Form.Label>Tiêu đề<span className='error'>*</span>:</Form.Label>
                <Input size="small" name="docTitle" value={values.docTitle} onChange={handleChange} onBlur={handleBlur} />
                {touched.docTitle && errors.docTitle && <p className="error">{errors.docTitle as string}</p>}
            </Form.Group>
            <Form.Group className={styles.itemForm}>
                <Form.Label>Mô tả<span className='error'>*</span>:</Form.Label>
                <Input size="small" name="docDescribe" value={values.docDescribe} onChange={handleChange} onBlur={handleBlur} />
                {touched.docDescribe && errors.docDescribe && <p className="error">{errors.docDescribe as string}</p>}
            </Form.Group>
            <Form.Group className={styles.itemForm}>
                <Form.Label>Link tài liệu:</Form.Label>
                <Input size="small" name="linkDoc" value={values.linkDoc} onChange={handleChange} onBlur={handleBlur} />
            </Form.Group>
            <div className={styles.btnAction}>
                <Button onClick={handleReset} disabled={createDocument.data.isLoading}>Reset</Button>
                <Button htmlType="submit" loading={createDocument.data.isLoading}>{!props.isCreate ? 'Cập nhật' : 'Tạo'}</Button>
            </div>
        </Form>
    )
}

export default FormDocument;