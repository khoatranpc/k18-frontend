import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Input, MenuProps } from 'antd';
import { useDispatch } from 'react-redux';
import { DatePicker } from 'antd';
import viVN from 'antd/es/date-picker/locale/vi_VN';
const { RangePicker } = DatePicker;
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useGetTimeSchedule } from '@/utils/hooks';
import { AppDispatch } from '@/store';
import { queryGetListTimeSchedule } from '@/store/reducers/timeSchedule.reducer';
import Dropdown from '@/components/Dropdown';
import { Obj } from '@/global/interface';
import SelectCourse from '@/components/SelectCourse';
import styles from '@/styles/class/CreateClass.module.scss';

interface Props {
    onReceive?: (status: boolean) => void;
}
const validationSchema = yup.object({
    codeClass: yup.string().required('Bạn chưa nhập mã lớp!'),
    courseId: yup.string().required('Bạn chưa chọn khoá học!'),
    courseLevelId: yup.string().required('Bạn chưa có cấp độ của khoá học!'),
    dayStart: yup.string().required('Bạn chưa chọn ngày khai giảng!'),
    dayEnd: yup.string().required('Bạn chưa chọn ngày kết thúc!'),
});
const CreateClass = (props: Props) => {
    const listTimeSchedule = useGetTimeSchedule();
    const listSelect: MenuProps['items'] = (listTimeSchedule?.data as Array<Obj>)?.map((item) => {
        return {
            key: item._id as string,
            label: <span>{item.weekday as string}: {item.start as string}-{item.end as string}</span>,
        }
    }) || [];
    const { values, errors, touched, setFieldValue, handleSubmit, handleChange, handleBlur, setTouched, setErrors } = useFormik({
        initialValues: {
            codeClass: '',
            courseId: '',
            courseLevelId: '',
            dayStart: '',
            dayEnd: '',
            timeOnce: {},
            timeTwice: {},
        },
        validationSchema,
        onSubmit(values) {
            console.log(values);
        }
    });
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (!listTimeSchedule) {
            dispatch(queryGetListTimeSchedule());
        }
    }, [listTimeSchedule, dispatch, queryGetListTimeSchedule]);
    return (
        <div className={styles.containerCreateClass}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className={styles.mb_24}>
                    <Form.Label>Mã lớp:</Form.Label>
                    <Input type="text" name="codeClass" value={values.codeClass} onBlur={handleBlur} onChange={handleChange} placeholder="Mã lớp" size="middle" className={styles.input} />
                    {errors.codeClass && touched.codeClass && <p className="error">{errors.codeClass}</p>}
                </Form.Group>
                <Form.Group className={styles.mb_24}>
                    <Form.Label>Khoá học:</Form.Label>
                    <SelectCourse onChange={(dataSelect) => {
                        setFieldValue('courseId', dataSelect.courseId);
                        setFieldValue('courseLevelId', dataSelect.levelId);
                    }}
                        onBlur={(value) => {
                            setTouched({
                                ...touched,
                                courseId: true,
                                courseLevelId: true,
                            });
                            if (value.courseId && value.levelId) {
                                delete errors.courseId;
                                delete errors.courseLevelId;
                                setErrors({
                                    ...errors
                                });
                            }
                        }}
                    />
                    {errors.courseId && errors.courseId && touched.courseId && <p className="error">{errors.courseId}</p>}
                    {errors.courseLevelId && errors.courseLevelId && touched.courseLevelId && <p className="error">{errors.courseLevelId}</p>}
                </Form.Group>
                <Form.Group className={styles.mb_24}>
                    <Form.Label>Thời gian học:</Form.Label>
                    <div className="hihi">
                        <RangePicker
                            locale={viVN}
                            className={styles.rangePickerDropdown}
                            placeholder={['Ngày KG', 'Ngày KT']}
                            onChange={(value) => {
                                const dataDate = value as Array<Obj>;
                                setFieldValue('dayStart', dataDate?.[0]?.$d as Date);
                                setFieldValue('dayEnd', dataDate?.[1]?.$d as Date);
                            }}
                            onBlur={(e) => {
                                setTouched({
                                    ...touched,
                                    dayStart: true,
                                    dayEnd: true
                                })
                                if (values.dayStart && values.dayEnd) {
                                    delete errors.dayStart;
                                    delete errors.dayEnd;
                                }
                            }}
                        />
                        {errors.dayStart && errors.dayStart && touched.dayStart && <p className="error">{errors.dayStart}</p>}
                        {errors.dayEnd && errors.dayEnd && touched.dayEnd && < p className="error">{errors.dayEnd}</p>}
                    </div>
                </Form.Group>
                <Form.Group className={styles.mb_24}>
                    <Form.Label>Lịch học:</Form.Label>
                    {!(values.timeOnce as Obj)?._id && !(values.timeTwice as Obj)?._id && < p className="error">Đừng quên chọn lịch học trong tuần nhé!</p>}
                    <div className={styles.day}>
                        <div className="day1">
                            <label>Ngày 1: <span className={styles.dayTime}>{(values.timeOnce as Obj)?.label}</span></label>
                            <Dropdown
                                className={styles.weekday}
                                trigger='click'
                                listSelect={listSelect}
                                title='Chọn lịch'
                                keyIndex='weekdayOnce'
                                onClickItem={(e) => {
                                    const findItem = (listTimeSchedule?.data as Array<Obj>)?.find((item) => item._id === e.key);
                                    setFieldValue('timeOnce', {
                                        _id: e.key,
                                        label: `${findItem!.weekday}: ${findItem!.start}-${findItem!.end}`
                                    })
                                }}
                            />
                        </div>
                        <div className="day2">
                            <label>Ngày 2: <span className={styles.dayTime}>{(values.timeTwice as Obj)?.label}</span></label>
                            <Dropdown
                                className={styles.weekday}
                                trigger='click'
                                listSelect={listSelect}
                                keyIndex='weekdayTwice'
                                title='Chọn lịch'
                                onClickItem={(e) => {
                                    const findItem = (listTimeSchedule?.data as Array<Obj>)?.find((item) => item._id === e.key);
                                    setFieldValue('timeTwice', {
                                        _id: e.key,
                                        label: `${findItem!.weekday}: ${findItem!.start}-${findItem!.end}`
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <Button htmlType='submit'>Tạo lớp</Button>
                </Form.Group>
            </Form>
        </div >
    )
}

export default CreateClass;