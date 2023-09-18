import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { Button, DatePicker, Input, MenuProps, Radio } from 'antd';
import { getStringByLevelTechnique, getStringObjectTeach, mapRoleToString } from '@/global/init';
import dayjs from 'dayjs';
import { Obj } from '@/global/interface';
import { Education, LevelTechnique, ObjectTeach, ROLE_TEACHER, ResourseApply, ResultInterview, StatusProcessing } from '@/global/enum';
import { useCreateCandidate, useGetListCourse } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import Dropdown from '@/components/Dropdown';
import SelectInputNumber from '@/components/SelectInputNumber';
import SelectLevelTechnique from '@/components/SelectLevelTechnique';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const listObjectTeach: MenuProps['items'] = [
    {
        key: ObjectTeach.K12,
        label: getStringObjectTeach[ObjectTeach.K12]
    },
    {
        key: ObjectTeach.K18,
        label: getStringObjectTeach[ObjectTeach.K18]
    },
];
const roleRegister: MenuProps['items'] = [
    {
        key: ROLE_TEACHER.ST,
        label: mapRoleToString[ROLE_TEACHER.ST]
    },
    {
        key: ROLE_TEACHER.MT,
        label: mapRoleToString[ROLE_TEACHER.MT]
    },
    {
        key: ROLE_TEACHER.SP,
        label: mapRoleToString[ROLE_TEACHER.SP]
    },
];
const validationSchema = yup.object({
    timeApply: yup.date().required('Thiếu thời gian ứng tuyển!'),
    dob: yup.date().required('Thiếu ngày tháng năm sinh!'),
    linkCv: yup.string().required('Thiếu link CV!'),
    fullName: yup.string().required('Thiếu họ và tên ứng viên!'),
    phoneNumber: yup.string().required('Thiếu số điện thoại!'),
    jobPosition: yup.string().required('Thiếu vị trí công việc!'),
    courseApply: yup.string().required('Thiếu khối ứng tuyển!'),
    currentAddress: yup.string().required('Thiếu địa chỉ hiện tại!'),
    technique: yup.string().required('Thiếu công nghệ sử dụng!'),
    email: yup.string().email('Không đúng định dạng email').required('Thiếu email!'),
});
const initValues = {
    fullName: '',
    timeApply: '',
    courseApply: '',
    currentAddress: '',
    graduatedUniversity: false,
    education: Education.BACHELOR,
    specializedIt: true,
    teacherCertification: false,
    phoneNumber: '',
    levelTechnique: LevelTechnique.FRESHER,
    linkFacebook: '',
    email: '',
    roleApply: ROLE_TEACHER.MT,
    dob: '',
    note: '',
    resourseApply: ResourseApply.FB,
    objectExpTeach: ObjectTeach.K18,
    linkCv: '',
    expTimeTech: 0,
    scoreSoftsSkill: 0,
    technique: '',
    jobPosition: '',
    expTimeTeach: 0,
    statusProcess: StatusProcessing.NOPROCESS,
    result: ResultInterview.PENDING,
    createdAt: new Date(),
    updatedAt: new Date()
}
const CreateCandidate = () => {
    const createCandidate = useCreateCandidate();
    const message = useHookMessage();
    const { values, errors, touched, setValues, setFieldValue, setTouched, handleBlur, handleChange, handleSubmit, handleReset } = useFormik({
        initialValues: initValues,
        validationSchema,
        onSubmit(values) {
            createCandidate.query(values);
        }
    });
    const listCourse = useGetListCourse();
    const getListCourseSelect = (listCourse.listCourse?.data as Array<Obj>)?.map((item) => {
        return {
            key: item._id,
            label: item.courseName
        }
    });
    const handleBlurDropdown = (open: boolean, field: keyof typeof values) => {
        if (!open && !touched[field]) {
            setTouched({
                ...touched,
                [field]: true
            });
        }
    };
    const getCrrCourse = (value: string) => {
        const findCourse = (listCourse.listCourse?.data as Array<Obj>)?.find((item) => {
            return item._id === value
        });
        return findCourse
    };
    useEffect(() => {
        listCourse.queryListCourse();
    }, []);
    useEffect(() => {
        if (createCandidate.data.response) {
            message.open({
                type: createCandidate.data.success ? 'success' : 'error',
                content: createCandidate.data.success ? 'Thêm ứng viên thành công!' : createCandidate.data.response.message as string
            });
            createCandidate.clear();
            if (createCandidate.data.success) {
                handleReset(null);
            }
            message.close(undefined);
        }
    }, [createCandidate]);
    return (
        <div className={styles.createCandidate}>
            <Form onSubmit={handleSubmit} className={styles.flex}>
                <div className={styles.itemColumn}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Họ tên <span className="error">*</span></Form.Label>
                        <Input type="text" name="fullName" placeholder="Họ tên" value={values.fullName} size="middle" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors.fullName && touched.fullName && <p className="error">{errors.fullName}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Thời gian ứng tuyển <span className="field_required">*</span></Form.Label>
                        <br />
                        <DatePicker
                            onBlur={handleBlur}
                            size="middle"
                            name='timeApply'
                            value={values.timeApply ? dayjs(new Date(values.timeApply)) : null}
                            onChange={(value: any) => {
                                const getDate = value?.$d || null;
                                setFieldValue('timeApply', getDate);
                            }}
                            format={'DD/MM/YYYY'}
                            rootClassName={styles.popUpDatePicker} />
                        {errors.timeApply && touched.timeApply && <p className="error">{errors.timeApply}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Số ĐT <span className="error">*</span></Form.Label>
                        <Input type="text" name="phoneNumber" placeholder="Số điện thoại" value={values.phoneNumber} size="middle" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors.phoneNumber && touched.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Email <span className="error">*</span></Form.Label>
                        <Input type="email" name="email" placeholder="example@gmail.com" value={values.email} size="middle" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors.email && touched.email && <p className="error">{errors.email}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Năm sinh <span className="field_required">*</span></Form.Label>
                        <br />
                        <DatePicker
                            placeholder="Ngày tháng năm sinh"
                            onBlur={handleBlur}
                            size="middle"
                            name='dob'
                            value={values.dob ? dayjs(new Date(values.dob)) : null}
                            onChange={(value: any) => {
                                const getDate = value?.$d || null;
                                setFieldValue('dob', getDate);
                            }}
                            format={'DD/MM/YYYY'}
                            rootClassName={styles.popUpDatePicker}
                        />
                        {errors.dob && touched.dob && <p className="error">{errors.dob}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Địa chỉ <span className="error">*</span></Form.Label>
                        <Input type="text" size="middle" name="currentAddress" value={values.currentAddress} onChange={handleChange} onBlur={handleBlur} />
                        {errors.currentAddress && touched.currentAddress && <p className="error">{errors.currentAddress}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Link facebook</Form.Label>
                        <Input type="text" size="middle" name="linkFacebook" value={values.linkFacebook} onChange={handleChange} onBlur={handleBlur} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Link CV <span className="error">*</span></Form.Label>
                        <Input type="text" size="middle" name="linkCv" value={values.linkCv} onChange={handleChange} onBlur={handleBlur} />
                        {errors.linkCv && touched.linkCv && <p className="error">{errors.linkCv}</p>}
                    </Form.Group>
                </div>
                <div className={styles.itemColumn}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Tốt nghiệp đại học <span className="error">*</span></Form.Label>
                        <br />
                        <Radio.Group defaultValue={values.graduatedUniversity} onChange={handleChange} name="graduatedUniversity">
                            <Radio value={true}>Đã tốt nghệp</Radio>
                            <Radio value={false}>Chưa tốt nghệp</Radio>
                        </Radio.Group>
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Chuyên ngành <span className="error">*</span></Form.Label>
                        <br />
                        <Radio.Group defaultValue={values.specializedIt} onChange={handleChange} name="specializedIt">
                            <Radio value={true}>IT</Radio>
                            <Radio value={false}>Khác</Radio>
                        </Radio.Group>
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Học vấn <span className="error">*</span></Form.Label>
                        <br />
                        <Radio.Group defaultValue={values.education} onChange={handleChange} name="education">
                            <Radio value={Education.BACHELOR}>Cử nhân</Radio>
                            <Radio value={Education.ENGINEER}>Kỹ sư</Radio>
                            <Radio value={Education.MASTER}>Thạc sĩ</Radio>
                            <Radio value={Education.DOCTOR}>Tiến sĩ</Radio>
                        </Radio.Group>
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Kinh nghiệm giảng dạy <span className="field_required">*</span></Form.Label>
                        <SelectInputNumber
                            min={0}
                            className={styles.selectExp}
                            value={Number(values.expTimeTeach)}
                            onSelect={(e) => {
                                setFieldValue('expTimeTeach', Number(e.key));
                            }}
                            onChange={(number) => {
                                setFieldValue('expTimeTeach', number);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Đối tượng giảng dạy</Form.Label>
                        <Dropdown
                            className={`${styles.courseRegister}`}
                            trigger="click"
                            listSelect={listObjectTeach}
                            sizeButton="small"
                            title={getStringObjectTeach[values.objectExpTeach as ObjectTeach]}
                            onClickItem={e => {
                                setFieldValue('objectExpTeach', e.key as string);
                            }}
                            icon
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Chứng chỉ NVSP</Form.Label>
                        <br />
                        <Radio.Group defaultValue={values.teacherCertification} onChange={handleChange} name="teacherCertification">
                            <Radio value={true}>Đã có</Radio>
                            <Radio value={false}>Chưa có</Radio>
                        </Radio.Group>
                    </Form.Group>
                </div>
                <div className={styles.itemColumn}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Vị trí ứng tuyển<span className="field_required">*</span></Form.Label>
                        <Dropdown
                            className={styles.selectResourse}
                            trigger="click"
                            listSelect={roleRegister}
                            sizeButton="small"
                            title={mapRoleToString[values.roleApply as ROLE_TEACHER]}
                            icon
                            onClickItem={(e) => {
                                setFieldValue('roleApply', e.key as string);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Khối ứng tuyển <span className="field_required">*</span></Form.Label>
                        <Dropdown
                            onOpenChange={(e) => {
                                handleBlurDropdown(e, 'courseApply');
                            }}
                            className={`${styles.courseRegister}`}
                            trigger="click"
                            listSelect={getListCourseSelect}
                            sizeButton="small"
                            title={getCrrCourse(values.courseApply as string)?.courseName as string || ''}
                            icon
                            onClickItem={(e) => {
                                setFieldValue('courseApply', e.key as string);
                            }}
                        />
                        {errors.courseApply && touched.courseApply && !values.courseApply && <p className="error">{errors.courseApply}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Công nghệ sử dụng <span className="field_required">*</span></Form.Label>
                        <Input value={values.technique} size="middle" name="technique" onChange={handleChange} onBlur={handleBlur} />
                        {errors.technique && touched.technique && <p className="error">{errors.technique}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Vị trí công việc <span className="field_required">*</span></Form.Label>
                        <Input value={values.jobPosition} size="middle" name="jobPosition" onChange={handleChange} onBlur={handleBlur} />
                        {errors.jobPosition && touched.jobPosition && <p className="error">{errors.jobPosition}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Trình độ <span className="field_required">*</span></Form.Label>
                        <SelectLevelTechnique
                            size="small"
                            title={getStringByLevelTechnique[values.levelTechnique as LevelTechnique]}
                            className={styles.levelTechnique}
                            onSelect={(e) => {
                                setFieldValue('levelTechnique', e.key);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Số năm kinh nghiệm <span className="field_required">*</span></Form.Label>
                        <SelectInputNumber
                            value={Number(values.expTimeTech || 0)}
                            min={0}
                            step={0.5}
                            className={styles.selectExp}
                            onSelect={(e) => {
                                setFieldValue('expTimeTech', Number(e.key));
                            }}
                            onChange={(number) => {
                                setFieldValue('expTimeTech', number);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Kỹ năng mềm <span className="field_required">*</span></Form.Label>
                        <SelectInputNumber
                            max={5}
                            min={0}
                            value={Number(values.scoreSoftsSkill)}
                            onSelect={(e) => {
                                setFieldValue('scoreSoftsSkill', Number(e.key));
                            }}
                            onChange={(number) => {
                                setFieldValue('scoreSoftsSkill', number);
                            }}
                            className={styles.selectExp}
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Ghi chú</Form.Label>
                        <Input.TextArea style={{ resize: 'none' }} rows={2} value={values.note} size="middle" name="note" onChange={handleChange} onBlur={handleBlur} />
                    </Form.Group>
                    <div className={styles.btn}>
                        <Button size="small" htmlType="submit" loading={createCandidate.data.isLoading}>Tạo</Button>
                        <Button size="small" disabled={createCandidate.data.isLoading}>Cancel</Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default CreateCandidate;