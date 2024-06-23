import React, { useEffect } from 'react';
import * as yup from 'yup';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { useFormik } from 'formik';
import { Obj } from '@/global/interface';
import { useCreateCs, useGetArea, useListCs, useUpdateCs } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import styles from '@/styles/CS.module.scss';

interface Props {
    isCreate?: boolean;
    csId?: string;
}


const FormCS = (props: Props) => {
    const area = useGetArea();
    const getListArea = area.data.response?.data as Obj[] ?? [];
    const message = useHookMessage();
    const createCs = useCreateCs();
    const listCs = useListCs();
    const getListCs = (listCs.data.response?.data as Obj[] ?? []);
    const crrCs = getListCs.find(item => item._id === props.csId) ?? {};
    const updateCs = useUpdateCs();

    const initValues = props.isCreate ? {
        active: true,
        name: '',
        email: '',
        password: '',
        area: '',
        phoneNumber: ''
    } : crrCs;
    const validationSchema = yup.object({
        name: yup.string().required('Chưa nhập tên CS!'),
        email: yup.string().required('Chưa nhập email!'),
        ...props.isCreate ? { password: yup.string().required('Chưa nhập mật khẩu!') } : {},
        area: yup.string().required('Chưa chọn cơ sở quản lý!'),
    });
    const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue, setFieldTouched } = useFormik({
        initialValues: initValues,
        validationSchema,
        onSubmit(values) {
            if (props.isCreate) {
                createCs.query({
                    body: values
                });
            } else {
                const payload: Obj = {
                    ...values
                }
                delete payload._id;
                updateCs.query({
                    body: payload,
                    params: [values._id]
                });
            }
        }
    });
    useEffect(() => {
        if (!area.data.response?.data) {
            area.query();
        }
    }, []);
    useEffect(() => {
        if (createCs.data.response || updateCs.data.response) {
            message.open({
                content: createCs.data.response?.message as string || updateCs.data.response?.message as string,
                type: (createCs.data.success || updateCs.data.success) ? 'success' : 'error'
            });
            createCs.clear?.();
            updateCs.clear?.();
            message.close();
        }
    }, [createCs.data.response, updateCs.data.response]);
    return (
        <div className={styles.formInfoCS}>
            <Form onFinish={handleSubmit}>
                <Form.Item>
                    <label>Trạng thái:</label>
                    <br />
                    <Checkbox checked={values.active} onChange={(e) => {
                        setFieldValue('active', e.target.checked);
                    }}>
                        Hoạt động
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <label>Tên<sup className='error'>*</sup>:</label>
                    <Input size="small" name='name' defaultValue={values.name} onBlur={handleBlur} onChange={handleChange} />
                    {touched.name && errors.name && <p className='error'>{errors.name as string}</p>}
                </Form.Item>
                <Form.Item>
                    <label>SĐT:</label>
                    <Input size="small" name='phoneNumber' defaultValue={values.phoneNumber} onBlur={handleBlur} onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                    <label>Email<sup className='error'>*</sup>:</label>
                    <Input size="small" name='email' defaultValue={values.email} onBlur={handleBlur} onChange={handleChange} />
                    {touched.email && errors.email && <p className='error'>{errors.email as string}</p>}
                </Form.Item>
                <Form.Item>
                    <label>Mật khẩu{props.isCreate ? <sup className='error'>*</sup> : ''}:</label>
                    <Input.Password size="small" name='password' onBlur={handleBlur} onChange={handleChange} />
                    {touched.password && errors.password && <p className='error'>{errors.password as string}</p>}
                </Form.Item>
                <Form.Item>
                    <label>area<sup className='error'>*</sup>:</label>
                    <Select
                        size="small"
                        onChange={(value) => {
                            setFieldValue('area', value);
                        }}
                        defaultValue={values.area?._id ?? values.area}
                        options={getListArea.map((item) => {
                            return {
                                value: item._id,
                                label: item.name
                            }
                        })}
                        loading={area.data.isLoading}
                        onBlur={() => {
                            setFieldTouched('area', true);
                        }}
                    />
                    {touched.area && errors.area && <p className='error'>{errors.area as string}</p>}
                </Form.Item>
                <div>
                    <Button size="small" htmlType="submit" loading={createCs.data.isLoading || updateCs.data.isLoading}>Lưu</Button>
                </div>
            </Form>
        </div>
    )
}

export default FormCS;