import React, { useEffect, useState } from 'react';
import { Button, Input, MenuProps, Radio } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { useGetListCourse } from '@/utils/hooks';
import { Obj } from '@/global/interface';
import Loading from '@/components/loading';
import Dropdown from '@/components/Dropdown';
import Point from './Point';
import logo from '@/assets/imgs/mindx.png';
import styles from '@/styles/feedback/Feedback.module.scss';

const validationSchema = yup.object({
    codeClass: yup.string().required('Bạn cần chọn mã lớp!'),
    studentName: yup.string().required('Bạn chưa nhập tên!'),
    phoneNumber: yup.string().required('Bạn chưa nhập số điện thoại!'),
    course: yup.string().required('Bạn chưa chọn khoá học!'),
    groupNumber: yup.string().required('Bạn chưa chọn nhóm học tập!'),
    pointCxo: yup.number().required('Bạn chưa chọn điểm quản lý!'),
    pointST: yup.number().required('Bạn chưa chọn điểm giảng viên!'),
    pointMT: yup.number().required('Bạn chưa chọn điểm mentor!'),
    pointOb: yup.number().required('Bạn chưa chọn điểm cơ sở vật chất!'),
    pointSyl: yup.number().required('Bạn chưa chọn điểm Chương trình đào tạo!'),
    docDetail: yup.string().required('Vui lòng chia sẻ thêm về cảm nhận!'),
});

const FormFeedbackForStudent = () => {
    const courses = useGetListCourse();
    const [step, setStep] = useState(1);
    const getListCoures = (courses.listCourse as Obj)?.data as Array<Obj>;
    const { values, errors, touched, handleChange, isValid, handleBlur, setFieldValue, setErrors, setTouched, handleSubmit, handleReset } = useFormik({
        initialValues: {
            course: '',
            codeClass: '',
            studentName: '',
            phoneNumber: '',
            groupNumber: '',

            pointCxo: '',
            pointST: '',
            pointMT: '',
            pointOb: '',
            pointSyl: '',
            docDetail: ''
        },
        validationSchema,
        onSubmit(values) {
            console.log(values);
        }
    });
    useEffect(() => {
        if (!courses.listCourse) {
            courses.queryListCourse();
        }
    }, []);
    // missing logic call data class matching course
    useEffect(() => {
        if (courses.listCourse && !values.course && courses.success) {
            setFieldValue('course', getListCoures[0]._id as string)
        }
    }, [courses.listCourse, values]);
    const handleErrors = (open: boolean, field: 'codeClass' | 'groupNumber') => {
        if (!open && !values[field]) {
            setTouched({
                ...touched,
                [field]: true
            });
            setErrors({
                ...errors,
                [field]: field === 'codeClass' ? 'Bạn cần chọn mã lớp!' : 'Bạn chưa chọn nhóm học tập!'
            });
        } else if (open && values[field]) {
            delete touched[field];
            delete errors[field];
            setTouched({
                ...touched
            });
            setErrors({
                ...errors
            });
        }
    };
    const listClass: MenuProps['items'] = [
        {
            key: '129323',
            label: 'TC-C4EJS148'
        }
    ];
    const listGroup: MenuProps['items'] = [
        {
            key: '9',
            label: 'Nhóm 1- HĐT'
        }
    ];
    const getTouched = (step: number) => {
        if (step === 1) {
            if (Object.keys(touched).length === 0) {
                const touchedField = {
                    course: true,
                    codeClass: true,
                    studentName: true,
                    phoneNumber: true,
                    groupNumber: true
                };
                setTouched(touchedField);
            } else {
                setStep(2);
            }
        } else {
            if (Object.keys(touched).length === 0) {
                const touchedField = {
                    pointCxo: true,
                    pointST: true,
                    pointMT: true,
                    pointOb: true,
                    pointSyl: true,
                    docDetail: true
                }
                setTouched({
                    ...touched,
                    ...touchedField
                });
            }
        }
    };

    const listPoint: {
        name: string;
        label: React.ReactNode;
        value: number | string;
        isPoint: boolean;
    }[] = [
            {
                label: <span>Bạn đánh giá khả năng hỗ trợ và chăm sóc của <b>Quản lí lớp</b> tại MindX như thế nào?
                    <span className="field_required">*</span>
                </span>,
                name: 'pointCxo',
                value: values.pointCxo,
                isPoint: true
            },
            {
                label: <span>Bạn đánh giá <b>Cơ sở vật chất</b> tại MindX như thế nào?
                    <span className="field_required">*</span>
                </span>,
                name: 'pointOb',
                value: values.pointOb,
                isPoint: true
            },
            {
                label: <span>Bạn đánh giá <b>Giảng viên</b> tại MindX như thế nào?
                    <span className="field_required">*</span>
                </span>,
                name: 'pointST',
                value: values.pointST,
                isPoint: true
            },
            {
                label: <span>Bạn đánh giá <b>Mentor (Trợ giảng)</b> tại MindX như thế nào?
                    <span className="field_required">*</span>
                </span>,
                name: 'pointMT',
                value: values.pointMT,
                isPoint: true
            },
            {
                label: <span>Bạn đánh giá <b>Chương trình đào tạo</b> tại MindX như thế nào?
                    <span className="field_required">*</span>
                </span>,
                name: 'pointSyl',
                value: values.pointSyl,
                isPoint: true
            },
            {
                label: <>
                    <span>Vui lòng chia sẻ thêm với MindX đánh giá cụ thể của bạn:
                        <span className="field_required">*</span>
                    </span>
                    <br />
                    <small>
                        <b>
                            <i>
                                Gợi ý:
                            </i>
                        </b>
                    </small>
                </>,
                name: 'docDetail',
                value: values.docDetail,
                isPoint: false
            },
        ];
    return (
        <div className={styles.formCollectStudent}>
            <div className={`${styles.logo} radius border w-50 mb-3`}>
                <Image src={logo} alt='' className={styles.imgLogo} />
            </div>
            <div className={`${styles.header} w-50 margin-auto bg-white mb-3 border`}>
                <div className={`${styles.line}`}>
                </div>
                <div className={`${styles.contentTitle} pd-2`}>
                    <h1>MINDX | KHẢO SÁT TRẢI NGHIỆM HỌC VIÊN</h1>
                    <p>
                        Với tinh thần cầu thị, MindX rất muốn ghi nhận <b>đánh giá tổng quan chất lượng khóa học của Học viên</b> mà chúng tôi đem lại. Để nâng cao chất lượng, MindX rất mong Học viên sẽ có một chút thời gian để hoàn thành khảo sát này.
                    </p>
                </div>
            </div>
            <div className={`${styles.form} w-50 margin-auto`}>
                <Form onSubmit={handleSubmit}>
                    {step === 1 ?
                        (<>
                            <Form.Group className={`${styles.mb_24} ${styles.group} ${styles.fieldInput} pd-2 radius border`}>
                                <Form.Label>
                                    <span>Tên bạn là gì <span className="field_required">*</span></span>
                                </Form.Label>
                                <Input status={errors.studentName && touched.studentName ? 'error' : ''} type="text" alt='' name="studentName" placeholder="Câu trả lời của bạn" size="middle" className={styles.input} value={values.studentName} onChange={handleChange} onBlur={handleBlur} />
                                {errors.studentName && touched.studentName && <p className="error">{errors.studentName}</p>}
                            </Form.Group>
                            <Form.Group className={`${styles.mb_24} ${styles.group} ${styles.fieldInput} pd-2 radius border`}>
                                <Form.Label>
                                    <span>Số điện thoại của bạn <span className="field_required">*</span></span>
                                </Form.Label>
                                <small>
                                    <b>
                                        <i>MindX cam kết bảo mật thông tin Học viên và chỉ sử dụng trong trường hợp liên hệ hỗ trợ!</i>
                                    </b>
                                </small>
                                <Input status={errors.phoneNumber && touched.phoneNumber ? 'error' : ''} type="text" alt='' name="phoneNumber" value={values.phoneNumber} placeholder="Câu trả lời của bạn" size="middle" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                                {errors.phoneNumber && touched.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                            </Form.Group>
                            <Form.Group className={`${styles.mb_24} ${styles.group} ${styles.fieldInput} pd-2 radius border`}>
                                <Form.Label>
                                    <span>Học phần đang theo học <span className="field_required">*</span></span>
                                </Form.Label>
                                {
                                    (!courses.listCourse || courses.loading) ? <Loading /> :
                                        (
                                            (getListCoures)?.length > 0 ?
                                                (
                                                    <Radio.Group className={styles.listRadio} value={values.course || getListCoures[0]._id as string} onChange={(e) => {
                                                        setFieldValue('course', e.target.value)
                                                    }}>
                                                        {
                                                            getListCoures?.map((item) => {
                                                                return <Radio
                                                                    key={item._id as string}
                                                                    value={item._id as string}
                                                                    name='courseName'
                                                                >
                                                                    {item.courseName as string}
                                                                </Radio>
                                                            })
                                                        }
                                                    </Radio.Group>
                                                )
                                                :
                                                ('Chưa có dữ liệu! Liên hệ với quản lý để được hỗ trợ!')
                                        )
                                }
                            </Form.Group>

                            <Form.Group className={`${styles.mb_24} ${styles.group} ${styles.fieldInput} pd-2 radius border`}>
                                <Form.Label>
                                    <span>Mã lớp <span className="field_required">*</span></span>
                                </Form.Label>
                                <Dropdown
                                    className={`${styles.dropdownSelect}`}
                                    listSelect={listClass}
                                    onClickItem={(e) => {
                                        setFieldValue('codeClass', e.key);
                                    }}
                                    trigger='click'
                                    title={values.codeClass ? values.codeClass : 'Chọn mã lớp'}
                                    icon
                                    onOpenChange={(open) => {
                                        handleErrors(open, 'codeClass');
                                    }}
                                />
                                {errors.codeClass && touched.codeClass && <p className="error">{errors.codeClass}</p>}
                            </Form.Group>
                            <Form.Group className={`${styles.mb_24} ${styles.group} ${styles.fieldInput} pd-2 radius border`}>
                                <Form.Label>
                                    <span>Nhóm học tập <span className="field_required">*</span></span>
                                </Form.Label>
                                <Dropdown
                                    className={`${styles.dropdownSelect}`}
                                    listSelect={listGroup}
                                    onClickItem={(e, key) => {
                                        setFieldValue('groupNumber', e.key);
                                    }}
                                    trigger='click'
                                    title={values.groupNumber ? values.groupNumber : 'Chọn nhóm'}
                                    icon
                                    onOpenChange={(open) => {
                                        handleErrors(open, 'groupNumber');
                                    }}
                                />
                                {errors.groupNumber && touched.groupNumber && <p className="error">{errors.groupNumber}</p>}
                            </Form.Group>
                            <div className={`${styles.mb_24} ${styles.group} ${styles.fieldInput} pd-2 radius border`}>
                                <b>
                                    <i>
                                        Call Center Hotline: 02477710666
                                        <br />
                                        Email Head Office: cxo.ho@mindx.edu.vn
                                    </i>
                                </b>
                            </div>
                            <div>
                                <Button onClick={() => {
                                    getTouched(step);
                                }}
                                    disabled={!values.codeClass || !values.course || !values.groupNumber || !values.phoneNumber || !values.studentName}
                                >
                                    Tiếp tục
                                </Button>
                                <Button onClick={handleReset} className={styles.reset}>Xoá hết câu trả lời</Button>
                            </div>
                        </>)
                        :
                        (
                            <>
                                <div className={`${styles.header} margin-auto bg-white mb-3 border`}>
                                    <div className={`${styles.line} ${styles.line2}`}>
                                        <h2>ĐÁNH GIÁ TỔNG QUAN CHẤT LƯỢNG KHÓA HỌC</h2>
                                    </div>
                                    <div className={`${styles.contentTitle} pd-2 ${styles.contentTitle2}`}>
                                        <p>
                                            Nội dung khảo sát bao gồm các câu hỏi về <b>chất lượng dịch vụ, đội ngũ giảng dạy, chương trình đào tạo</b> để MindX tiếp tục cải thiện. Hãy đánh dấu <b>mức độ hoàn thành</b> vào ô tương ứng theo <b> &quot;Biểu điểm thang 5&quot;</b> như sau:
                                        </p>
                                        <ol>
                                            <b className={styles.point}><li> Rất không hài lòng</li></b>
                                            <b className={styles.point}><li> không hài lòng</li></b>
                                            <b className={styles.point}><li> Bình thường</li></b>
                                            <b className={styles.point}><li> Hài lòng</li></b>
                                            <b className={styles.point}><li> Rất hài lòng</li></b>
                                        </ol>
                                    </div>
                                </div>
                                {
                                    listPoint.map((item: any, idx) => {
                                        return <Form.Group key={idx} className={`${styles.mb_24} ${styles.group} ${styles.fieldInput} pd-2 radius border`}>
                                            <Form.Label>
                                                {/* <span>Bạn đánh giá khả năng hỗ trợ và chăm sóc của <b>Quản lí lớp</b> tại MindX như thế nào?
                                                    <span className="field_required">*</span>
                                                </span> */}
                                                {item.label}
                                            </Form.Label>
                                            {item.isPoint ?
                                                <Point
                                                    value={item.value}
                                                    onChange={(value) => {
                                                        setFieldValue(item.name, value);
                                                    }}
                                                />
                                                :
                                                <Input type="text" alt='' placeholder="Câu trả lời của bạn" size="middle" className={styles.input} value={item.value} name={item.name} onChange={handleChange} onBlur={handleBlur} />
                                            }
                                            {errors[item.name as 'pointCxo' | 'pointST' | 'pointMT' | 'pointSyl' | 'docDetail'] && touched[item.name as 'pointCxo' | 'pointST' | 'pointMT' | 'pointSyl' | 'docDetail'] && <p className="error">{errors[item.name as 'pointCxo' | 'pointST' | 'pointMT' | 'pointSyl' | 'docDetail']}</p>}
                                        </Form.Group>
                                    })
                                }
                                <div>
                                    <Button onClick={() => {
                                        setStep(1);
                                    }}>Quay trở lại</Button>
                                    <Button
                                        disabled={!values.pointCxo || !values.pointMT || !values.pointOb || !values.pointST || !values.pointSyl || !values.docDetail}
                                        htmlType="submit"
                                    >
                                        Gửi
                                    </Button>
                                    <Button onClick={(e) => {
                                        handleReset(e);
                                        setStep(1);
                                    }} className={styles.reset}>Xoá hết câu trả lời</Button>
                                </div>
                            </>
                        )
                    }
                </Form>
            </div>
        </div>
    )
}

export default FormFeedbackForStudent;