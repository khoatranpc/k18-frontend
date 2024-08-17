import React, { useEffect } from 'react';
import { Button, DatePicker, Form, Input, Radio } from 'antd';
import { useFormik } from 'formik';
import { useGetLocations } from '@/utils/hooks';
import { Obj } from '@/global/interface';
import Loading from '../loading';
import { ROLE_TEACHER } from '@/global/enum';

const FormTeacherOff = () => {
    const location = useGetLocations();
    const getLocation = (location.locations?.data as Obj[])?.filter(item => item.active) ?? [];

    const { } = useFormik({
        initialValues: {},
        onSubmit(values) {

        }
    });
    useEffect(() => {
        if (!location.locations) {
            location.queryLocations();
        }
    }, []);
    return (
        <div className="formTeacherOff min-h-[100vh] bg-[#ffe6e6]">
            <div className="content bg-[#ffffff] rounded-[3.8rem] w-[35vw] m-auto p-[2.4rem]">
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
                        layout='vertical'
                    >
                        <Form.Item
                            label={"Email:"}
                            required
                            rules={[{ required: true, message: 'Vui lòng nhập email hợp lệ!', type: 'email' }]}
                            name="email"
                        >
                            <Input placeholder='Email của bạn' name='email' />
                        </Form.Item>
                        <Form.Item
                            label={"Họ tên:"}
                            required
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên của bạn!', type: 'string' }]}
                            name="name"
                        >
                            <Input placeholder='Họ tên' name='name' />
                        </Form.Item>
                        <hr className='my-[2.4rem]' />
                        <h2 className='text-[1.8rem] text-center font-bold mb-[1.2rem]'>Thông tin lớp xin nghỉ</h2>
                        <Form.Item
                            label={"Mã lớp:"}
                            required
                            rules={[{ required: true, message: 'Vui lòng nhập mã lớp!', type: 'string' }]}
                            name="codeClass"
                        >
                            <Input placeholder='VD: TC-DA45' name='codeClass' />
                        </Form.Item>
                        <Form.Item
                            label={"Vị trí:"}
                            required
                            rules={[{ required: true, message: 'Vui lòng chọn vị trí giảng dạy!', type: 'string' }]}
                            name="position"
                        >
                            <Radio.Group className='flex justify-around'>
                                <Radio value={`${ROLE_TEACHER.ST}`}>Giảng viên</Radio>
                                <Radio value={`${ROLE_TEACHER.MT}`}>Mentor</Radio>
                                <Radio value={`ST, MT`}>Giảng viên + Mentor</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label={"Nhóm:"}
                            required
                            rules={[{ required: true, message: 'Vui lòng cung cấp nhóm dạy!', type: 'string' }]}
                            name="groupNumber"
                        >
                            <Input placeholder='VD: Nhóm 1' name='groupNumber' />
                        </Form.Item>
                        <Form.Item
                            label={"Cơ sở:"}
                            required
                            rules={[{ required: true, message: 'Vui lòng chọn cơ sở của nhóm', type: 'string' }]}
                            name="location"
                        >

                            {
                                ((!getLocation.length && !location.state.isLoading) || location.state.isLoading) ? <Loading /> : (
                                    <Radio.Group className='flex flex-col gap-[1.2rem] pl-[1.2rem]'>
                                        {
                                            getLocation.map(item => {
                                                return <Radio key={item._id as string} value={item._id}>{item.locationDetail}</Radio>
                                            })
                                        }
                                    </Radio.Group>
                                )
                            }
                        </Form.Item>
                        <Form.Item
                            label={"Ngày"}
                            required
                            rules={[{ required: true, message: 'Vui lòng cung cấp ngày xin nghỉ!', type: 'string' }]}
                            name="date"
                        >
                            <DatePicker size='small' placeholder='D/M/Y' format={'DD/MM/YYYY'} />
                        </Form.Item>
                        <Form.Item
                            label={"Buổi số, kiến thức:"}
                            required
                            rules={[{ required: true, message: 'Vui lòng cung cấp thông tin buổi nghỉ!', type: 'string' }]}
                            name="lessonNote"
                        >
                            <Input.TextArea style={{ resize: 'none' }} placeholder='VD: Buổi 2, Python' name='lessonNote' />
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