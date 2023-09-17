import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { DatePicker, Input, MenuProps, Radio } from 'antd';
import dayjs from 'dayjs';
import { Obj } from '@/global/interface';
import { Education, LevelTechnique, ObjectTeach, ROLE_TEACHER, ResourseApply, ResultInterview, StatusProcessing } from '@/global/enum';
import { useGetListCourse } from '@/utils/hooks';
import Dropdown from '@/components/Dropdown';
import SelectInputNumber from '@/components/SelectInputNumber';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';
import { getStringObjectTeach, mapRoleToString } from '@/global/init';

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
const CreateCandidate = () => {
    const { values, errors, touched, setFieldValue, setTouched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
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
            expTimeTeach: 0,
            statusProcess: StatusProcessing.NOPROCESS,
            result: ResultInterview.PENDING,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        onSubmit(values) {
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
    return (
        <div className={styles.createCandidate}>
            <Form onSubmit={handleSubmit} className={styles.flex}>
                <div className={styles.itemColumn}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Họ tên <span className="error">*</span></Form.Label>
                        <Input type="text" name="fullName" placeholder="Họ tên" value={values.fullName} size="middle" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
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
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Email <span className="error">*</span></Form.Label>
                        <Input type="email" name="email" placeholder="example@gmail.com" value={values.email} size="middle" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
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
                        <Input type="text" size="middle" name="currentAddress" value={values.currentAddress} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Link facebook</Form.Label>
                        <Input type="text" size="middle" name="linkFacebook" value={values.linkFacebook} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Link CV <span className="error">*</span></Form.Label>
                        <Input type="text" size="middle" name="linkCv" value={values.linkCv} onChange={handleChange} />
                    </Form.Group>
                </div>
                <div className={styles.itemColumn}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Tốt nghiệp đại học</Form.Label>
                        <br />
                        <Radio.Group defaultValue={values.graduatedUniversity} onChange={handleChange} name="graduatedUniversity">
                            <Radio value={true}>Đã tốt nghệp</Radio>
                            <Radio value={false}>Chưa tốt nghệp</Radio>
                        </Radio.Group>
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Chuyên ngành</Form.Label>
                        <br />
                        <Radio.Group defaultValue={values.specializedIt} onChange={handleChange} name="specializedIt">
                            <Radio value={true}>IT</Radio>
                            <Radio value={false}>Khác</Radio>
                        </Radio.Group>
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Học vấn</Form.Label>
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
                        {/* pending handle change */}
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
                        <Input value={values.technique} size="middle" name="technique" onChange={handleChange} />
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
                </div>
            </Form>
        </div>
    )
}

export default CreateCandidate;