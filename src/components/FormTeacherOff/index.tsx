import React, { useEffect } from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Obj } from '@/global/interface';
import { useQueryBookTeacher } from '@/utils/hooks';
import SelectClass from './SelectClass';

const validationSchema = yup.object({
    email: yup.string().email('Email chưa đúng định dạng!').required('Bạn cần cung cấp email!'),
    name: yup.string().required('Bạn cần cung cấp tên!'),
    codeClass: yup.string().required('Bạn cần cung cấp mã lớp!'),
    group: yup.string().required('Bạn cần cung cấp thông tin nhóm dạy!'),
    date: yup.string().required('Bạn cần chọn ngày nghỉ!'),
    lessonNote: yup.string().required('Bạn cần cung cấp thông tin bài dạy!'),
});
const FormTeacherOff = () => {
    const groupClass = useQueryBookTeacher('GET');
    const getGroupClass: DefaultOptionType[] = (groupClass.data?.response?.data as Obj[])?.map((item) => {
        return {
            value: item._id,
            label: `Nhóm: ${item.groupNumber} - ${item.locationId?.locationCode}`
        }
    }) ?? []
    const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            codeClass: '',
            group: '',
            date: '',
            lessonNote: '',
            name: '',
        },
        validationSchema,
        onSubmit(values) {
        console.log("🚀 ~ onSubmit ~ values:", values)

        }
    });
    useEffect(() => {
        if (values.codeClass) {
            groupClass.query?.(values.codeClass as string);
        }
    }, [values.codeClass]);
    return (
        <div className="formTeacherOff min-h-[100vh] bg-[#ffe6e6]">
            <div className="content bg-[#ffffff] rounded-[3.8rem] w-[40vw] m-auto p-[2.4rem]">
                <div className="title mb-[1.2rem]">
                    <h1 className="text-center text-[3.6rem] font-bold mb-[1.2rem]">Mindx School - Yêu cầu nghỉ phép</h1>
                    <p className='text-center text-[1.8rem]'>Form thông tin dành cho giáo viên tại MindX</p>
                </div>
                <hr />
                <div className="process w-fit ml-[5.2rem] my-[1.2rem]">
                    <h2 className='text-[1.8rem] font-bold mb-[1.2rem]'>Quy trình thực hiện</h2>
                    <ul className='px-[3.6rem] list-decimal'>
                        <li>Điền Form thông tin xin off</li>
                        <li>Thông báo cho TE - Quản lý GV</li>
                        <li>Bàn giao lại thông tin lớp học cho giáo viên thay thế (Tài liệu, bài tập,...)</li>
                    </ul>
                    <h2 className='text-[1.8rem] font-bold my-[1.2rem]'>Chú ý</h2>
                    <ul className='px-[3.6rem] list-decimal'>
                        <li>Số buổi nghỉ tối đa của một lớp: 2</li>
                        <li>Cần thông báo trước: 36h</li>
                        <li>Chỉ đăng ký Off thông qua form này mới được tính hợp lệ</li>
                        <li>Mỗi lần điền là 1 buổi xin nghỉ, nếu muốn xin nghỉ nhiều, vui lòng điền nhiều lần</li>
                    </ul>
                </div>
                <hr />
                <div className="collectInf mt-[1.2rem]">
                    <h2 className='text-[1.8rem] text-center font-bold mb-[1.2rem]'>Đăng ký thông tin</h2>
                    <Form
                        onFinish={handleSubmit}
                        layout='vertical'
                    >
                        <Form.Item
                            label={"Email:"}
                            required
                            name="email"
                        >
                            <Input placeholder='Email của bạn' name='email' onChange={handleChange} />
                            {errors.email && touched.email && <p className='text-[red]'>{errors.email}</p>}
                        </Form.Item>
                        <Form.Item
                            label={"Họ tên:"}
                            required
                            name="name"
                        >
                            <Input placeholder='Họ tên' name='name' onChange={handleChange} />
                            {errors.name && touched.name && <p className='text-[red]'>{errors.name}</p>}
                        </Form.Item>
                        <hr className='my-[2.4rem]' />
                        <h2 className='text-[1.8rem] text-center font-bold mb-[1.2rem]'>Thông tin lớp xin nghỉ</h2>
                        <Form.Item
                            label={"Mã lớp:"}
                            required
                            name="codeClass"
                            initialValue={values.codeClass}
                        >
                            <SelectClass
                                onSelect={(value) => {
                                    setFieldValue('codeClass', value);
                                }}
                            />
                            {errors.codeClass && touched.name && <p className='text-[red]'>{errors.codeClass}</p>}
                        </Form.Item>
                        <Form.Item
                            label={<p> Nhóm: <br /><small>Hãy chọn lớp để hiển thị nhóm</small></p>}
                            required
                            name="group"
                        >
                            <Select
                                value={ values.group}
                                options={getGroupClass}
                                onChange={(value) => {
                                    setFieldValue('group', value);
                                }}
                            />
                            {errors.group && errors.group && <p className='text-[red]'>{errors.group}</p>}
                        </Form.Item>
                        <Form.Item
                            label={"Ngày"}
                            required
                            name="date"
                        >
                            <DatePicker
                                size='small'
                                placeholder='Ngày/Tháng/Năm'
                                format={'DD/MM/YYYY'} onChange={(value) => {
                                    setFieldValue('date', value?.toString() && new Date(value?.toString()));
                                }} />
                            {errors.date && touched.date && <p className='text-[red]'>{errors.date}</p>}
                        </Form.Item>
                        <Form.Item
                            label={"Buổi số, kiến thức:"}
                            required
                            name="lessonNote"
                        >
                            <Input.TextArea style={{ resize: 'none' }} placeholder='VD: Buổi 2, Python' name='lessonNote' onChange={handleChange} />
                            {errors.lessonNote && touched.lessonNote && <p className='text-[red]'>{errors.lessonNote}</p>}
                        </Form.Item>
                        <Form.Item
                            label={"Tài liệu đính kèm (nếu có):"}
                            name="note"
                        >
                            <Input.TextArea style={{ resize: 'none' }} name='note' />
                        </Form.Item>
                        <Form.Item>
                            <Button className="float-right" htmlType='submit' size='small'>Đăng ký</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default FormTeacherOff;