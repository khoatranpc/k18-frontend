import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Input, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteFilled } from '@ant-design/icons';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHookMessage } from '@/utils/hooks/message';
import { toastify, uuid } from '@/utils';
import { AppDispatch, RootState } from '@/store';
import { clearCreateClass, queryCreateClass } from '@/store/reducers/class/createClass.reducer';
import { Action, Columns, Obj, State } from '@/global/interface';
import { useGetLocations, useGetTimeSchedule } from '@/utils/hooks';
import SelectCourse from '@/components/SelectCourse';
import PickTimeSchedule from '@/components/PickTimeSchedule';
import Table from '@/components/Table';
import SelectLocation from '@/components/SelectLocation';
import styles from '@/styles/class/CreateClass.module.scss';

interface Props {
    onReceive?: (status: boolean) => void;
    isUpdate?: boolean;
}
const validationSchema = yup.object({
    codeClass: yup.string().required('Bạn chưa nhập mã lớp!'),
    courseId: yup.string().required('Bạn chưa chọn khoá học!'),
    courseLevelId: yup.string().required('Bạn chưa có cấp độ của khoá học!'),
    dayStart: yup.string().required('Bạn chưa chọn ngày khai giảng!'),
    dayEnd: yup.string().required('Bạn chưa chọn ngày kết thúc!'),
    timeOnce: yup.object().required('Bạn chưa chọn ngày học!'),
    timeTwice: yup.object().required('Bạn chưa chọn ngày học!'),
});
const CreateClass = (props: Props) => {
    const listTimeSchedule = useGetTimeSchedule();
    const dispatch = useDispatch<AppDispatch>();
    const { locations } = useGetLocations();
    const message = useHookMessage();
    const createClass = useSelector((state: RootState) => (state.createClass as State).state);
    const initValues: Obj = {
        codeClass: '',
        courseId: '',
        courseLevelId: '',
        dayStart: '',
        dayEnd: '',
        timeOnce: '',
        timeTwice: '',
        expectedGroup: []
    }
    const { values, errors, touched, setFieldValue, handleSubmit, handleChange, handleBlur, setTouched, setErrors } = useFormik({
        initialValues: initValues,
        validationSchema,
        onSubmit(values) {
            const mapDataforRequest: Action = {
                payload: {
                    query: {
                        body: {
                            courseId: values.courseId,
                            courseLevelId: values.courseLevelId,
                            codeClass: values.codeClass,
                            dayRange: {
                                start: values.dayStart,
                                end: values.dayEnd
                            },
                            timeSchedule: [
                                values.timeOnce,
                                values.timeTwice
                            ],
                            bookTeacher: values.expectedGroup
                        }
                    }
                }
            };
            if ((values.expectedGroup as Obj[]).length) {
                if ((values.expectedGroup as Obj[])!.some(item => !item.locationId)) {
                    toastify('Một số thông tin cơ sở chưa được chọn!', {
                        type: 'error'
                    });
                }
                if ((values.expectedGroup as Obj[])!.some(item => !item.totalStudents)) {
                    toastify('Một số thông tin họ sinh dự kiến chưa hoàn thiện!', {
                        type: 'error'
                    });
                }
                dispatch(queryCreateClass(mapDataforRequest));
            } else {
                toastify('Thông tin dự kiến nhóm học chưa hoàn thiện!', {
                    type: 'error'
                });
            }
        }
    });

    const handleDeleteGroup = (index: number) => {
        if (!props.isUpdate) {
            (values.expectedGroup as Obj[])!.splice(index, 1);
            setFieldValue('expectedGroup', [...values.expectedGroup]);
        }
    }
    const handleChangeDataBookTeacher = (field: string, value: string | number, index: number) => {
        values.expectedGroup[index][field] = value;
    }
    const columns: Columns = [
        {
            key: 'STT',
            title: 'STT',
            dataIndex: 'groupNumber',
            render(value, __, index) {
                return <div>
                    Nhóm <InputNumber<number>
                        size="small"
                        value={value}
                        onChange={(value) => {
                            handleChangeDataBookTeacher('groupNumber', value as number ?? 0, index);
                        }}
                    />
                </div>;
            }
        },
        {
            key: 'LOCATION',
            title: 'Cơ sở *',
            dataIndex: 'locationId',
            width: 70,
            render(value, _, index) {
                return <SelectLocation
                    sizeButton="small"
                    title={(locations?.data as Array<Obj>)?.find(item => item._id === value)?.locationCode as string ?? 'Chọn'}
                    onSelectLocation={(locationId) => {
                        handleChangeDataBookTeacher('locationId', locationId ?? '', index);
                        setFieldValue('expectedGroup', [...values.expectedGroup]);
                    }}
                />
            }
        },
        {
            key: 'HVDK',
            title: 'Số HV (dự kiến) *',
            width: 150,
            dataIndex: 'totalStudents',
            className: 'text-center',
            render(value, _, index) {
                return <InputNumber<number>
                    style={{ margin: 'auto' }}
                    size="small"
                    value={value}
                    min={0}
                    onChange={(data) => {
                        handleChangeDataBookTeacher('totalStudents', data as number, index);
                    }}
                />
            }
        },
        {
            key: 'NOTE',
            title: 'Lưu ý',
            dataIndex: 'note',
            render(value, _, index) {
                return <Input.TextArea
                    size="small"
                    style={{ resize: 'none' }}
                    value={value}
                    onChange={(e) => {
                        handleChangeDataBookTeacher('note', e.target.value ?? '', index);
                    }}
                />
            }
        },
        {
            key: 'ACTION',
            title: 'Hành động',
            className: 'text-center',
            width: 90,
            render(_, __, index) {
                return <Button
                    size="small"
                    style={{ display: 'flex', alignItems: 'center', margin: 'auto', borderColor: 'var(--base)' }}
                    onClick={() => {
                        handleDeleteGroup(index);
                    }}
                >
                    <DeleteFilled style={{ color: 'var(--base)' }} />
                </Button>
            }
        }
    ];
    useEffect(() => {
        if (createClass && !createClass.isLoading && createClass.response) {
            if (createClass.success) {
                message.open({
                    content: 'Tạo lớp thành công!',
                    type: 'success'
                }, 2000);
            }
            else {
                message.open({
                    content: createClass.response.message as string,
                    type: 'error'
                }, 2000);
            }
            dispatch(clearCreateClass());
            setTimeout(() => {
                message.close()
            }, 2000);
        }
    }, [createClass, dispatch]);
    return (
        <div className={styles.containerCreateClass}>
            <Form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.partSideLeft}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Mã lớp: <span className="error">*</span></Form.Label>
                        <Input type="text" name="codeClass" value={values.codeClass} onBlur={handleBlur} onChange={handleChange} placeholder="Mã lớp" size="small" className={styles.input} />
                        {errors.codeClass && touched.codeClass && <p className="error">{errors.codeClass as string}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Khoá học:  <span className="error">*</span></Form.Label>
                        <SelectCourse
                            onChange={(dataSelect) => {
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
                        {errors.courseId && errors.courseId && touched.courseId && <p className="error">{errors.courseId as string}</p>}
                        {errors.courseLevelId && errors.courseLevelId && touched.courseLevelId && <p className="error">{errors.courseLevelId as string}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Thời gian học (dự kiến): <span className="error">*</span></Form.Label>
                        <div className="hihi">
                            <RangePicker
                                format={"DD/MM/YYYY"}
                                size="small"
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
                            {errors.dayStart && errors.dayStart && touched.dayStart && <p className="error">{errors.dayStart as string}</p>}
                            {errors.dayEnd && errors.dayEnd && touched.dayEnd && < p className="error">{errors.dayEnd as string}</p>}
                        </div>
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Lịch học: <span className="error">*</span></Form.Label>
                        {(!(values.timeOnce as unknown as Obj)?._id || !(values.timeTwice as unknown as Obj)?._id) && < p className="error">Đừng quên chọn lịch học trong tuần nhé!</p>}
                        <div className={styles.day}>
                            <div className="day1">
                                <label>Ngày 1: <span className={styles.dayTime}>{(values.timeOnce as unknown as Obj)?.label}</span></label>
                                <PickTimeSchedule
                                    size="small"
                                    className={styles.weekday}
                                    onClickItem={(e) => {
                                        const findItem = (listTimeSchedule.data.response?.data as Array<Obj>)?.find((item) => item._id === e.key);
                                        setFieldValue('timeOnce', {
                                            _id: e.key,
                                            label: `${findItem!.weekday}: ${findItem!.start}-${findItem!.end}`
                                        });
                                        delete errors.timeOnce;
                                        setErrors({
                                            ...errors,
                                        });
                                    }}
                                />
                            </div>
                            <div className="day2">
                                <label>Ngày 2: <span className={styles.dayTime}>{(values.timeTwice as unknown as Obj)?.label}</span></label>
                                <PickTimeSchedule
                                    size="small"
                                    className={styles.weekday}
                                    onClickItem={(e) => {
                                        const findItem = (listTimeSchedule.data.response?.data as Array<Obj>)?.find((item) => item._id === e.key);
                                        setFieldValue('timeTwice', {
                                            _id: e.key,
                                            label: `${findItem!.weekday}: ${findItem!.start}-${findItem!.end}`
                                        });
                                        delete errors.timeTwice;
                                        setErrors({
                                            ...errors,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </Form.Group>
                </div>
                <div className={styles.partSideRight}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>
                            CXO:
                        </Form.Label>
                        <Input type="text" size="small" />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>
                            Cơ sở BU:
                        </Form.Label>
                        <Input type="text" size="small" />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>
                            Nhóm dự kiến: <span className="error">*</span><small>(ít nhất một nhóm)</small>
                        </Form.Label>
                        <Button
                            size="small"
                            style={{ float: 'right' }}
                            onClick={() => {
                                const newLc = {
                                    key: uuid(),
                                    groupNumber: (values.expectedGroup as Obj[]).length + 1
                                };
                                values.expectedGroup.push(newLc as unknown as Obj);
                                setFieldValue('expectedGroup', [...values.expectedGroup]);
                            }}
                        >
                            Thêm
                        </Button>
                        <Table
                            disableDefaultPagination
                            bordered
                            columns={columns}
                            rowData={[...values.expectedGroup]}
                        />
                    </Form.Group>
                    <Button loading={createClass.isLoading} size="small" htmlType='submit' className={styles.btnCreateClass}>Lưu</Button>
                </div>
            </Form>
        </div>
    )
}

export default CreateClass;