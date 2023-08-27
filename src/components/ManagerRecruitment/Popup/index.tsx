import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { Button, DatePicker, Input, MenuProps, TabsProps } from 'antd';
import { Form } from 'react-bootstrap';
import { LevelTechnique, ObjectTeach, ROLE_TEACHER, ResourseApply, StatusProcessing } from '@/global/enum';
import { getStringByLevelTechnique, getStringObjectTeach, getStringResourseApply, getStringStatusProcess, mapRoleToString } from '@/global/init';
import { useGetDetailCandidate, useGetListCourse } from '@/utils/hooks';
import ModalCustomize from '@/components/ModalCustomize';
import Tabs from '@/components/Tabs';
import SelectLevelTechnique from '@/components/SelectLevelTechnique';
import Dropdown from '@/components/Dropdown';
import SelectInputNumber from '@/components/SelectInputNumber';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss'
import { Obj } from '@/global/interface';

interface Props {
    isCreate?: boolean;
    show: boolean;
    onHide?: () => void;
    title?: string;
}

const listSelectResourse: MenuProps['items'] = [
    {
        key: ResourseApply.FB,
        label: getStringResourseApply[ResourseApply.FB],
    },
    {
        key: ResourseApply.LKD,
        label: getStringResourseApply[ResourseApply.LKD],
    },
    {
        key: ResourseApply.RF,
        label: getStringResourseApply[ResourseApply.RF],
    },
    {
        key: ResourseApply.AN,
        label: getStringResourseApply[ResourseApply.AN]
    }
];
const statusProcessing: MenuProps['items'] = [
    {
        key: StatusProcessing.PROCESSING,
        label: getStringStatusProcess[StatusProcessing.PROCESSING]
    },
    {
        key: StatusProcessing.NOPROCESS,
        label: getStringStatusProcess[StatusProcessing.NOPROCESS]
    },
    {
        key: StatusProcessing.DONE,
        label: getStringStatusProcess[StatusProcessing.DONE]
    }
];
const mailingProcessing: MenuProps['items'] = [
    {
        key: 'UNDONE',
        label: 'Chưa gửi'
    },
    {
        key: 'DONE',
        label: 'Đã gửi'
    }
];
const resultProcessing: MenuProps['items'] = [
    {
        key: 'PASS',
        label: 'Đạt'
    },
    {
        key: 'NOTPASS',
        label: 'Trượt'
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
]
const listObjectTeach: MenuProps['items'] = [
    {
        key: ObjectTeach.K12,
        label: getStringObjectTeach[ObjectTeach.K12]
    },
    {
        key: ObjectTeach.K18,
        label: getStringObjectTeach[ObjectTeach.K18]
    },
]
const Popup = (props: Props) => {
    const candidate = useGetDetailCandidate();
    const firstMounted = useRef(true);
    const listCourse = useGetListCourse();
    const { values, errors, touched, handleChange, handleSubmit, handleBlur, setValues, setFieldValue } = useFormik({
        initialValues: {
            fullName: '',
            timeApply: '',
            courseApply: '',
            subject: '',
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
            qualifications: '',
            technique: '',
            expTimeTeach: 0,
            statusProcess: StatusProcessing.NOPROCESS,
            sendMail: false,
            dateInterview: '',
            linkMeet: '',
            result: '',
            createdAt: '',
            updatedAt: ''
        },
        onSubmit(value) {
            console.log(value);
        }
    });
    const getListCourseSelect = (listCourse.listCourse.data as Array<Obj>)?.map((item) => {
        return {
            key: item._id,
            label: item.courseName
        }
    })
    const getCrrCourse = (value: string) => {
        const findCourse = (listCourse.listCourse.data as Array<Obj>).find((item) => {
            return item._id === value
        });
        return findCourse
    }
    const tabsForm: TabsProps['items'] = [
        {
            key: 'RECRUIMENT',
            label: 'Thông tin tuyển dụng',
            children: <div className={styles.infoResourse}>
                <div className={styles.left}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Thời gian ứng tuyển</Form.Label>
                        <br />
                        <DatePicker
                            onBlur={handleBlur}
                            size="small"
                            name='timeAplly'
                            value={values.timeApply ? dayjs(new Date(values.timeApply)) : null}
                            onChange={(value: any) => {
                                const getDate = value?.$d || new Date();
                                setFieldValue('timeApply', getDate);
                            }}
                            format={'DD/MM/YYYY'}
                            rootClassName={styles.popUpDatePicker} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Vị trí</Form.Label>
                        {/* pending handle change */}
                        <Dropdown
                            className={styles.selectResourse}
                            trigger="click"
                            listSelect={roleRegister}
                            sizeButton="small"
                            title={mapRoleToString[values.roleApply as ROLE_TEACHER]}
                            icon
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Nguồn ứng tuyển</Form.Label>
                        {/* pending handle change */}
                        <Dropdown
                            className={styles.selectResourse}
                            trigger="click"
                            listSelect={listSelectResourse}
                            sizeButton="small"
                            title={getStringResourseApply[values.resourseApply as ResourseApply]}
                            icon
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Link CV:</Form.Label>
                        <Input type="text" size="small" name="linkCv" value={values.linkCv} onChange={handleChange} onBlur={handleBlur} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Ghi chú</Form.Label>
                        <Input.TextArea value={values.note} name="note" onChange={handleChange} />
                    </Form.Group>
                </div>
                <div className={styles.right}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Năm sinh</Form.Label>
                        <br />
                        <DatePicker
                            onBlur={handleBlur}
                            size="small"
                            name='dob'
                            value={values.dob ? dayjs(new Date(values.dob)) : null}
                            onChange={(value: any) => {
                                const getDate = value?.$d || new Date();
                                setFieldValue('dob', getDate);
                            }}
                            format={'DD/MM/YYYY'}
                            rootClassName={styles.popUpDatePicker}
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Số điện thoại</Form.Label>
                        <Input type="text" size="small" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Link facebook</Form.Label>
                        <Input type="text" size="small" name="linkFacebook" value={values.linkFacebook} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Email</Form.Label>
                        <Input type="text" size="small" onChange={handleChange} name="email" value={values.email} onBlur={handleBlur} />
                    </Form.Group>
                </div>
            </div>
        },
        {
            key: 'SKILL',
            label: 'Kỹ năng',
            children: <div className={styles.skill}>
                <div className={styles.left}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Khối ứng tuyển</Form.Label>
                        <Dropdown
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
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Số năm kinh nghiệm</Form.Label>
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
                        <Form.Label>Trình độ</Form.Label>
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
                        <Form.Label>Kỹ năng mềm</Form.Label>
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
                        <Form.Label>Kinh nghiệm giảng dạy</Form.Label>
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
                        <Form.Label>Đối tượng giảng dạy</Form.Label>
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
                </div>
                <div className={styles.right}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Bằng cấp/Chứng chỉ</Form.Label>
                        <Input.TextArea value={values.qualifications} name="qualificationss" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Công nghệ sử dụng</Form.Label>
                        <Input.TextArea value={values.technique} name="technique" onChange={handleChange} />
                    </Form.Group>
                    <Button className={styles.mrAuto}>Đánh giá</Button>
                </div>
            </div>
        },
        {
            key: 'PROCESSING',
            label: 'Tiến độ xử lý',
            children: <div className={styles.processing}>
                <div className={styles.left}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Trạng thái</Form.Label>
                        <Dropdown
                            className={`${styles.statusProcessing}`}
                            trigger="click"
                            listSelect={statusProcessing}
                            sizeButton="small"
                            title={getStringStatusProcess[values.statusProcess as StatusProcessing]}
                            icon
                            onClickItem={(e) => {
                                setFieldValue('statusProcess', e.key as string);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Gửi mail</Form.Label>
                        <Dropdown
                            className={`${styles.statusProcessing}`}
                            trigger="click"
                            listSelect={mailingProcessing}
                            sizeButton="small"
                            title={values.sendMail ? 'Đã gửi' : 'Chưa gửi'}
                            icon
                            onClickItem={(e) => {
                                if (e.key === 'UNDONE') {
                                    setFieldValue('sendMail', false);
                                } else {
                                    setFieldValue('sendMail', true);
                                }
                            }}
                        />
                    </Form.Group>
                </div>
                <div className={styles.right}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Lịch PV</Form.Label>
                        <br />
                        <DatePicker
                            className=''
                            size="small"
                            value={values.dateInterview ? dayjs(new Date(values.dateInterview)) : null}
                            onChange={(value: any) => {
                                const getDate = value?.$d || null;
                                setFieldValue('dateInterview', getDate);
                            }}
                            format={'DD/MM/YYYY'}
                            rootClassName={styles.popUpDatePicker}
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Link meet</Form.Label>
                        <Input type="text" size="small" value={values.linkMeet} name="linkMeet" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Kết quả</Form.Label>
                        <Dropdown
                            className={`${styles.statusProcessing}`}
                            trigger="click"
                            listSelect={resultProcessing}
                            sizeButton="small"
                            title="Đang xử lý"
                            icon
                        />
                    </Form.Group>
                    {props.isCreate && <Button htmlType="submit">Tạo</Button>}
                </div>
            </div>
        }
    ];
    useEffect(() => {
        if (candidate.data.response && candidate.data.response.data && firstMounted.current && !props.isCreate) {
            firstMounted.current = false;
            setValues({
                ...candidate.data.response.data as any
            });
        }
    }, [candidate]);
    useEffect(() => {
        if (!listCourse.listCourse && !listCourse.success) {
            listCourse.queryListCourse();
        }
    }, [listCourse]);
    return (
        <div className={styles.popup}>
            <ModalCustomize
                onHide={props.onHide}
                show={props.show}
                centered
                modalHeader={<h2>{props.title}</h2>}
            >
                <div className={styles.contentPopup}>
                    <Form className={styles.form} onSubmit={handleSubmit}>
                        <Tabs
                            className={styles.tabList}
                            listItemTab={tabsForm}
                        />
                    </Form>
                </div>
            </ModalCustomize>
        </div>
    )
}

export default Popup;