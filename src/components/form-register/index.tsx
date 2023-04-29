import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Form } from 'react-bootstrap';
import { Input, DatePicker, Radio, Button } from 'antd';
import AuthLayout from '@/layouts/auth';
import iconArrowLeft from '@/assets/svgs/icon-arrow-left.svg';
import styles from '@/styles/auth/FormRegister.module.scss';

const FormRegister = () => {
    const [step, setStep] = useState<number>(1);
    const handleStep = (step: number, type: 'INCRE' | 'DECRE') => {
        if (type === 'INCRE') {
            switch (step) {
                case 1:
                    setStep(2);
                    break;
                case 2:
                    setStep(3);
                    break;
            }
        } else {
            switch (step) {
                case 3:
                    setStep(2);
                    break;
                case 2:
                    setStep(1);
                    break;
            }
        }
    }
    return (
        <div className={styles.form_collection_personal_infor}>
            <div className={styles.zone_arrow}>
                {step !== 1 && <Image
                    alt=''
                    src={iconArrowLeft}
                    className={styles.arrow}
                    onClick={() => {
                        handleStep(step, 'DECRE')
                    }}
                />}
            </div>
            <h5>{step === 1 ? 'Thông tin chung' :
                step === 2 ? 'Định danh cá nhân' :
                    'Bước cuối cùng'
            }</h5>
            <p>
                Điền form bên dưới để tạo tài khoản. Đã có tài khoản
                <Link href={'/auth/login'}><span className={styles.fw_600}>Đăng nhập</span></Link>
            </p>
            <div className={styles.step}>
                <ul>
                    <li className={step === 1 || step === 2 || step === 3 ? styles.active : ''}></li>
                    <li className={step === 2 || step === 3 ? styles.active : ''}></li>
                    <li className={step === 3 ? styles.active : ''}></li>
                </ul>
            </div>
            <Form className={styles.form}>
                <div className={styles.collection_input}>
                    {
                        step === 1 ? <>
                            <Form.Group className={styles.mb_24}>
                                <Form.Label className={styles.fs_12}>
                                    <span>Địa chỉ mail <span className="field_required">*</span></span>
                                </Form.Label>
                                <Input type="email" placeholder="abc@gmail.com" size="large" className={styles.input} />
                            </Form.Group>
                            <Form.Group className={styles.mb_24}>
                                <Form.Label className={styles.fs_12}>
                                    <span>Họ và tên <span className="field_required">*</span></span>
                                </Form.Label>
                                <Input type="text" placeholder="Nguyễn Văn A" size="large" className={styles.input} />
                            </Form.Group>
                            <Form.Group className={styles.mb_24}>
                                <Form.Label className={styles.fs_12}>
                                    <span>Số điện thoại <span className="field_required">*</span></span>
                                </Form.Label>
                                <Input type="text" placeholder="01234..." size="large" className={styles.input} />
                            </Form.Group>
                            <Form.Group className={styles.mb_24}>
                                <Form.Label className={styles.fs_12}>
                                    <span>Ngày tháng năm sinh <span className="field_required">*</span></span>
                                </Form.Label>
                                <DatePicker className={styles.input} placeholder='yy/mm/dd' />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className={styles.fs_12}>
                                    <span>Giới tính <span className="field_required">*</span></span>
                                </Form.Label>
                                <Radio.Group>
                                    <Radio value={"M"}>Nam</Radio>
                                    <Radio value={"FM"}>Nữ</Radio>
                                    <Radio value={"AN"}>Khác</Radio>
                                </Radio.Group>
                            </Form.Group>
                        </> : (
                            step === 2 ? <>
                                <Form.Group className={styles.mb_24}>
                                    <Form.Label className={styles.fs_12}>
                                        <span>Số CCCD <span className="field_required">*</span></span>
                                    </Form.Label>
                                    <Input type="text" placeholder="Nhập số CCCD 12 số" size="large" className={styles.input} />
                                </Form.Group>
                                <Form.Group className={styles.mb_24}>
                                    <Form.Label className={styles.fs_12}>
                                        <span>Ngày cấp <span className="field_required">*</span></span>
                                    </Form.Label>
                                    <DatePicker className={styles.input} placeholder='yy/mm/dd' />
                                </Form.Group>
                                <Form.Group className={styles.mb_24}>
                                    <Form.Label className={styles.fs_12}>
                                        <span>Nơi cấp <span className="field_required">*</span></span>
                                    </Form.Label>
                                    <Input type="text" placeholder="Cục cảnh sát..." size="large" className={styles.input} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={styles.fs_12}>
                                        <span>Khu vực sống <span className="field_required">*</span></span>
                                    </Form.Label>
                                    <Radio.Group className={styles.ant_radios}>
                                        <Radio value={"HN"}>Hà Nội</Radio>
                                        <Radio value={"DN"}>Đà Nẵng</Radio>
                                        <Radio value={"HCM"}>Hồ Chí Minh</Radio>
                                        <Radio value={"AN"}>Khác</Radio>
                                    </Radio.Group>
                                </Form.Group>
                            </> : (<>
                                <Form.Group className={styles.mb_24}>
                                    <Form.Label className={styles.fs_12}>
                                        <span>Trường Đại Học,Cao Đẳng / Ngành học <span className="field_required">*</span></span>
                                    </Form.Label>
                                    <Input type="text" placeholder="Đại Fọc FPT / Thiết kế đồ họa" size="large" className={styles.input} />
                                </Form.Group>
                                <Form.Group className={styles.mb_24}>
                                    <Form.Label className={styles.fs_12}>
                                        <span>Công việc / Nơi làm việc <span className="field_required">*</span></span>
                                    </Form.Label>
                                    <Input type="text" placeholder="Product Designer / MindX School" size="large" className={styles.input} />
                                </Form.Group>
                                <Form.Group className={styles.mb_24}>
                                    <Form.Label className={styles.fs_12}>
                                        <span>Địa chỉ hiện tại <span className="field_required">*</span></span>
                                    </Form.Label>
                                    <Input type="text" placeholder="71 Nguyễn Chí Thanh" size="large" className={styles.input} />
                                </Form.Group>
                                <Form.Group className={styles.mb_24}>
                                    <Form.Label className={styles.fs_12}>
                                        <span>Bắt đầu làm việc <span className="field_required">*</span></span>
                                    </Form.Label>
                                    <DatePicker className={styles.input} placeholder='yy/mm/dd' />
                                </Form.Group>
                                <Form.Group className={styles.mb_24}>
                                    <Form.Label className={styles.fs_12}>
                                        <span>Link CV (Portfolio) <span className="field_required">*</span></span>
                                    </Form.Label>
                                    <Input type="text" placeholder="https://..." size="large" className={styles.input} />
                                </Form.Group>
                            </>)
                        )
                    }
                </div>
                <Button
                    className={`${styles.btn_next} ${step === 2 ? styles.btn_step2 : ''}`}
                    onClick={() => {
                        handleStep(step, 'INCRE')
                    }}>
                    <span>
                        {step !== 3 ? 'Tiếp theo' : 'Đăng ký'}
                    </span>
                </Button>
            </Form>
        </div >
    )
}

export default FormRegister;
FormRegister.Layout = AuthLayout;