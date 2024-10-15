import React, { useEffect, useState } from 'react';
import { Button, Collapse, Input, MenuProps, Radio } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import { Form } from 'react-bootstrap';
import ResizeObserver from 'react-resize-observer';
import * as yup from 'yup';
import { Obj } from '@/global/interface';
import { ROLE_TEACHER } from '@/global/enum';
import { useGetListCourse, useGetListGroupClassInFormFeedback, useListClassInFormFeedback, useResponseFeedbackForStudent } from '@/utils/hooks';
import { getClassResponsive } from '@/utils';
import { useHookMessage } from '@/utils/hooks/message';
import Loading from '@/components/loading';
import Dropdown from '@/components/Dropdown';
import Point from './Point';
import logo from '@/assets/imgs/mindx.png';
import styles from '@/styles/feedback/Feedback.module.scss';
import Face5Levels from '@/components/Face5Levels';

const { Panel } = Collapse;
const validationSchema = yup.object({
    codeClass: yup.string().required('Bạn cần chọn mã lớp!'),
    studentName: yup.string().required('Bạn chưa nhập tên!'),
    phoneNumber: yup.string().required('Bạn chưa nhập số điện thoại!'),
    course: yup.string().required('Bạn chưa chọn khoá học!'),
    groupNumber: yup.string().required('Bạn chưa chọn nhóm học tập!'),
});

let getRoleTeacher = '';
const FormFeedbackForStudent = () => {
    const [siderSize, setSiderSize] = useState<number>(0);

    const courses = useGetListCourse();
    const [step, setStep] = useState(1);
    const listClassInForm = useListClassInFormFeedback();
    const listGroupClass = useGetListGroupClassInFormFeedback();
    const getListCoures = (courses.listCourse as Obj)?.data as Array<Obj>;
    const responseFeedback = useResponseFeedbackForStudent();
    const message = useHookMessage();
    const { values, errors, touched, handleChange, handleBlur, setFieldValue, setErrors, setTouched, handleSubmit, handleReset } = useFormik({
        initialValues: {
            course: '',
            codeClass: '',
            studentName: '',
            phoneNumber: '',
            groupNumber: '',
            feedbackId: '',

            pointCxo: '',
            noteCxo: '',
            pointST: '',
            noteST: '',
            pointMT: '',
            noteMT: '',
            pointOb: '',
            noteOb: '',
            pointSyl: '',
            noteSyl: '',
            docDetail: '',

            teacherId: '',
            timeCollect: ''
        },
        validationSchema,
        onSubmit(values) {
            const calcTP = (getRoleTeacher === ROLE_TEACHER.ST) ?
                ((Number(values.pointST) + Number(values.pointMT)) / 2)
                :
                (values.pointMT);
            responseFeedback.query({
                ...values,
                teacherPoint: calcTP
            });
        }
    });
    useEffect(() => {
        if (!courses.listCourse) {
            courses.queryListCourse();
        }
    }, []);
    useEffect(() => {
        if (responseFeedback.data.response && !responseFeedback.data.success) {
            message.open({
                content: responseFeedback.data.response.message as string,
                type: 'error'
            });
            message.close(undefined, () => {
                responseFeedback.clear();
            });
        }
    }, [responseFeedback.data]);
    useEffect(() => {
        if (courses.listCourse && !values.course && courses.success) {
            setFieldValue('course', getListCoures[0]._id as string);
            listClassInForm.query(getListCoures[0].courseName as string);
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
    const listClass: MenuProps['items'] = (listClassInForm.data.response?.data as Array<Obj>)?.map((item) => {
        return {
            key: item._id,
            label: `${item.codeClass.codeClass}`,
            timecollect: item.time,
            classId: item.codeClass._id
        }
    }) || [];
    const listGroup: MenuProps['items'] = (listGroupClass.data.response?.data as Array<Obj>)?.map((item) => {
        const teacher = ((item.teacherRegister as Array<Obj>)?.[0])?.idTeacher;
        return {
            key: item._id,
            label: `Nhóm ${item.groupNumber} - ${item.locationId.locationCode}, MT: ${(item.teacherRegister as Array<Obj>)?.[0].idTeacher.fullName || ''}`,
            teacherid: teacher?._id,
            role: ((item.teacherRegister as Array<Obj>)?.[0])?.roleRegister
        }
    }) || [];
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
        moreEvaluate?: React.ReactNode;
        noteName: string;
    }[] = [
            {
                label: <span className='text-[1.6rem]'>Bạn đánh giá khả năng hỗ trợ và chăm sóc của <b className='text-[1.8rem]'>Quản lí lớp</b> tại MindX như thế nào?
                    <span className="field_required">*</span>
                </span>,
                name: 'pointCxo',
                value: values.pointCxo,
                noteName: 'noteCxo',
                isPoint: true,
                moreEvaluate: <div className='mt-[1.2rem] text-[0.8rem]'>
                    <Collapse size='small'>
                        <Panel key={"1"} header={<p className=''>Vui lòng chia sẻ cụ thể vấn đề bạn không hài lòng về <b>Quản lí lớp</b>?(Không yêu cầu)</p>}>
                            <div className="text-gray-700">
                                <p className="mb-2 italic"><span className="italic text-[1.2rem]">Gợi ý:</span></p>
                                <ul className="list-none list-inside italic">
                                    <li className='italic text-[1.2rem]'>- Thời gian thông báo các thông tin quan trọng (lịch khai giảng, lịch nghỉ, học bù, demo, ...)</li>
                                    <li className='italic text-[1.2rem]'>- Thời gian, cách thức hỗ trợ, giải đáp thắc mắc cho học viên (về các vấn đề bảo lưu, chuyển khóa chuyển lớp, xếp lịch demo,...)</li>
                                    <li className='italic text-[1.2rem]'>- Thời gian xử lý/ upload các video recording</li>
                                    <li className='italic text-[1.2rem]'>- Thời gian gửi phần thưởng/quà tặng demo</li>
                                </ul>
                            </div>
                        </Panel>
                    </Collapse>
                    <Input.TextArea style={{ resize: 'none' }} className='mt-[1.2rem]' name={'noteCxo'} defaultValue={values.noteCxo} onChange={handleChange} onBlur={handleBlur} />
                </div >
            },
            {
                label: <span className='text-[1.6rem]'>Bạn đánh giá <b className='text-[1.8rem]'>Cơ sở vật chất</b> tại MindX như thế nào?
                    <span className="field_required">*</span>
                </span>,
                name: 'pointOb',
                value: values.pointOb,
                noteName: 'noteOb',
                isPoint: true,
                moreEvaluate: <div className='mt-[1.2rem]'>
                    <Collapse size='small'>
                        <Panel key={"1"} header={<p>Vui lòng chia sẻ cụ thể vấn đề bạn không hài lòng về <b>Cơ sở vật chất</b>?(Không bắt buộc)</p>}>
                            <div className="text-gray-700">
                                <p className="mb-2"><span className="italic text-[1.2rem]">Gợi ý:</span></p>
                                <ul className="list-inside list-none text-[1.2rem]">
                                    <li className='italic text-[1.2rem]'>- Chất lượng phòng học (không gian, cách âm, mùi phòng, ...)</li>
                                    <li className='italic text-[1.2rem]'>- Thiết bị trong phòng (tivi, điều hòa, bàn ghế, ổ điện, bảng, bút lông)</li>
                                    <li className='italic text-[1.2rem]'>- Tiện ích chung (thang máy, bảo vệ, gửi xe, ...)</li>
                                    <li className='italic text-[1.2rem]'>- Wifi tại cơ sở</li>
                                    <li className='italic text-[1.2rem]'>- Vệ sinh tại cơ sở</li>
                                </ul>
                            </div>
                        </Panel>
                    </Collapse>
                    <Input.TextArea style={{ resize: 'none' }} className='mt-[1.2rem]' name={'noteOb'} defaultValue={values.noteOb} onChange={handleChange} onBlur={handleBlur} />
                </div>
            },
            {
                label: <span className='text-[1.6rem]'>Bạn đánh giá <b className='text-[1.8rem]'>Giảng viên</b> tại MindX như thế nào?
                    <span className="field_required">*</span>
                </span>,
                name: 'pointST',
                value: values.pointST,
                noteName: 'noteST',
                isPoint: true,
                moreEvaluate: <div className='mt-[1.2rem]'>
                    <Collapse size='small'>
                        <Panel key={"1"} header={<p>Vui lòng chia sẻ cụ thể vấn đề bạn không hài lòng về <b>Giảng viên</b>?(Không bắt buộc)</p>}>
                            <div className="text-gray-700">
                                <p className="mb-2 italic"><span className="italic text-[1.2rem]">Gợi ý:</span></p>
                                <ul className="list-none list-inside italic">
                                    <li className='italic text-[1.2rem]'>- Thời gian học</li>
                                    <li className='italic text-[1.2rem]'>- Phần chuẩn bị bài của Giáo viên</li>
                                    <li className='italic text-[1.2rem]'>- Khả năng giảng dạy</li>
                                    <li className='italic text-[1.2rem]'>- Tốc độ giảng bài và giọng nói của Giáo viên</li>
                                    <li className='italic text-[1.2rem]'>- Mức độ tương tác của Giáo viên</li>
                                    <li className='italic text-[1.2rem]'>- Mức độ hỗ trợ của Giáo viên khi học viên có thắc mắc</li>
                                </ul>
                            </div>
                        </Panel>
                    </Collapse>
                    <Input.TextArea style={{ resize: 'none' }} className='mt-[1.2rem]' name={'noteST'} defaultValue={values.noteST} onChange={handleChange} onBlur={handleBlur} />
                </div>
            },
            {
                label: <span className='text-[1.6rem]'>Bạn đánh giá <b className='text-[1.8rem]'>Mentor (Trợ giảng)</b> tại MindX như thế nào?
                    <span className="field_required">*</span>
                </span>,
                name: 'pointMT',
                value: values.pointMT,
                isPoint: true,
                noteName: 'noteMT',
                moreEvaluate: <div className='mt-[1.2rem]'>
                    <Collapse size='small'>
                        <Panel key={"1"} header={<p>Vui lòng chia sẻ cụ thể vấn đề bạn không hài lòng về <b>Mentor (Trợ giảng)</b>?(Không bắt buộc)</p>}>
                            <div className="text-gray-700">
                                <p className="mb-2 italic"><span className="italic text-[1.2rem]">Gợi ý:</span></p>
                                <ul className="list-none list-inside italic">
                                    <li className='italic text-[1.2rem]'>- Khả năng hướng dẫn thực hành của mentor (hướng dẫn đúng, đủ, phù hợp với trình độ và nhu cầu của học viên, ...)</li>
                                    <li className='italic text-[1.2rem]'>- Thái độ hướng dẫn, giải đáp thắc mắc của mentor về phần chuyên môn</li>
                                    <li className='italic text-[1.2rem]'>- Thời gian giải đáp thắc mắc của mentor</li>
                                    <li className='italic text-[1.2rem]'>- hời gian upload video thực hành của mentor</li>
                                </ul>
                            </div>
                        </Panel>
                    </Collapse>
                    <Input.TextArea style={{ resize: 'none' }} className='mt-[1.2rem]' name={'noteMT'} defaultValue={values.noteMT} onChange={handleChange} onBlur={handleBlur} />
                </div>
            },
            {
                label: <span className='text-[1.6rem]'>Bạn đánh giá <b className='text-[1.8rem]'>Chương trình đào tạo</b> tại MindX như thế nào?
                    <span className="field_required">*</span>
                </span>,
                name: 'pointSyl',
                value: values.pointSyl,
                noteName: 'noteSyl',
                isPoint: true,
                moreEvaluate: <div className='mt-[1.2rem]'>
                    <Collapse size='small'>
                        <Panel key={"1"} header={<p>Vui lòng chia sẻ cụ thể vấn đề bạn không hài lòng về <b>Chương trình đào tạo</b>? (Không bắt buộc)</p>}>
                            <div className="text-gray-700">
                                <p className="mb-2 italic"><span className="text-[1.2rem]">Gợi ý:</span></p>
                                <ul className="list-none list-inside italic">
                                    <li className='italic text-[1.2rem]'>- Tài liệu học tập (giáo trình, slide, bài tập)</li>
                                    <li className='italic text-[1.2rem]'>- Nội dung giảng dạy trong các buổi học</li>
                                    <li className='italic text-[1.2rem]'>- Hình thức/ kết quả demo cuối khóa</li>
                                    <li className='italic text-[1.2rem]'>- Lý do khác (điền rõ)</li>
                                </ul>
                            </div>
                        </Panel>
                    </Collapse>
                    <Input.TextArea style={{ resize: 'none' }} className='mt-[1.2rem]' name={'noteSyl'} defaultValue={values.noteSyl} onChange={handleChange} onBlur={handleBlur} />
                </div>
            },
            {
                label: <>
                    <span>Vui lòng chia sẻ thêm với MindX đánh giá cụ thể của bạn (Không bắt buộc):</span>
                </>,
                name: 'docDetail',
                value: values.docDetail,
                isPoint: false,
                noteName: 'noteDocDetail'
            },
        ];
    return (
        <div className={`${styles.formCollectStudent} formCollectionFeedback ${siderSize ? getClassResponsive(siderSize) : ''}`}>
            <ResizeObserver
                onResize={(rect) => {
                    setSiderSize(rect.width);
                }}
            />
            <div className={`${styles.logo} radius border w-50 mb-3`}>
                <Image src={logo} alt='' className={styles.imgLogo} />
            </div>
            {!responseFeedback.data.success ?
                (
                    <>
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
                                                                <Radio.Group
                                                                    optionType='button'
                                                                    className={styles.listRadio} value={values.course || getListCoures[0]._id as string} onChange={(e) => {
                                                                        setFieldValue('course', e.target.value);
                                                                        const findIdCourse = getListCoures.find((item) => item._id === e.target.value);
                                                                        listClassInForm.query(findIdCourse?.courseName);
                                                                        setFieldValue('codeClass', '');
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
                                                onClickItem={(e, _, item: any) => {
                                                    setFieldValue('codeClass', item.classId);
                                                    listGroupClass.query(item.classId as string);
                                                    setFieldValue('feedbackId', item.classId as string);
                                                    setFieldValue('timeCollect', item.timecollect);
                                                }}
                                                trigger='click'
                                                title={values.codeClass ? ((((listClass.find((item: any) => {
                                                    return (item?.classId === values.codeClass) as unknown as Obj;
                                                })) as Obj)?.label as string) || 'Chọn mã lớp') : 'Chọn mã lớp'}
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
                                                disabled={values.codeClass ? false : true}
                                                className={`${styles.dropdownSelect}`}
                                                listSelect={listGroup}
                                                onClickItem={(e, key) => {
                                                    const getTeacherId = (e.item as Obj)?.props.teacherid;
                                                    setFieldValue('teacherId', getTeacherId);
                                                    getRoleTeacher = (e.item as Obj)?.props.role as string;
                                                    setFieldValue('groupNumber', e.key);
                                                }}
                                                trigger='click'
                                                title={values.groupNumber ? (values.groupNumber ? (((listGroup.find(item => values.groupNumber === item?.key)) as Obj))?.label as string : 'Chọn nhóm') : 'Chọn nhóm'}
                                                icon
                                                onOpenChange={(open) => {
                                                    handleErrors(open, 'groupNumber');
                                                }}
                                            />
                                            {errors.groupNumber && touched.groupNumber && <p className="error">{errors.groupNumber}</p>}
                                            <small><i>Hãy chọn mã lớp theo học để lựa chọn nhóm học tập</i></small>
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
                                        <div className='flex justify-end'>
                                            <Button onClick={() => {
                                                getTouched(step);
                                            }}
                                                disabled={!values.codeClass || !values.course || !values.groupNumber || !values.phoneNumber || !values.studentName}
                                            >
                                                Tiếp tục
                                            </Button>
                                        </div>
                                    </>)
                                    :
                                    (
                                        // step 2
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
                                                        <div className='p-[1.2rem] rounded-md'>
                                                            <Form.Label>
                                                                {item.label}
                                                            </Form.Label>
                                                            {item.isPoint &&
                                                                <Point
                                                                    value={item.value}
                                                                    onChange={(value) => {
                                                                        setFieldValue(item.name, value);
                                                                    }}
                                                                />
                                                            }
                                                        </div>
                                                        {item.moreEvaluate}
                                                        {!item.isPoint && <Input.TextArea style={{ resize: 'none' }} placeholder="Câu trả lời của bạn" size="middle" value={item.value} name={item.name} onChange={handleChange} onBlur={handleBlur} />}
                                                        {errors[item.name as 'pointCxo' | 'pointST' | 'pointMT' | 'pointSyl' | 'docDetail'] && touched[item.name as 'pointCxo' | 'pointST' | 'pointMT' | 'pointSyl' | 'docDetail'] && <p className="error">{errors[item.name as 'pointCxo' | 'pointST' | 'pointMT' | 'pointSyl' | 'docDetail']}</p>}
                                                    </Form.Group>
                                                })
                                            }
                                            <div className='flex justify-end gap-[1.2rem]'>
                                                <Button onClick={() => {
                                                    setStep(1);
                                                }}>Quay trở lại</Button>
                                                <Button
                                                    disabled={!values.pointCxo || !values.pointMT || !values.pointOb || !values.pointST || !values.pointSyl}
                                                    htmlType="submit"
                                                    loading={responseFeedback.data.isLoading}
                                                    className={styles.submit}
                                                >
                                                    Gửi
                                                </Button>
                                            </div>
                                        </>
                                    )
                                }
                            </Form>
                        </div>
                    </>
                )
                :
                (
                    <div className="conGr">
                        <div className={`${styles.header} w-50 margin-auto bg-white mb-3 border`}>
                            <div className={`${styles.line}`}>
                            </div>
                            <div className={`${styles.contentTitle} pd-2`}>
                                <h1>Cảm ơn bạn đã phản hồi</h1>
                                <p>
                                    Chúng tôi rất cảm ơn bạn đã dành chút quỹ thời gian để gửi phản hồi! Mong rằng bạn sẽ tiếp tục có những buổi học có đầy ý nghĩa và nhiều sự trải nghiệm!
                                </p>
                                <small style={{ cursor: 'pointer' }}
                                    onClick={(e) => {
                                        responseFeedback.clear();
                                        handleReset(e);
                                        setStep(1);
                                    }}
                                >
                                    <u>Gửi câu trả lời khác!</u>
                                </small>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default FormFeedbackForStudent;