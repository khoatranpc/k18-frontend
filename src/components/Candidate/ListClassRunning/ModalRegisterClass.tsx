import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, DatePicker, Input, MenuProps, Radio } from 'antd';
import { CloseOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { Action, Obj } from '@/global/interface';
import { ClassForm } from '@/global/enum';
import { queryGetListClass } from '@/store/reducers/class/listClass.reducer';
import { useDebounce, useGetCandidateOnboard, useGetClautidForCandidateOnboard, useGetListClass, useQueryBookTeacher, useRegisterClautid, useUpdateClassClautid } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import ModalCustomize from '@/components/ModalCustomize';
import Dropdown from '@/components/Dropdown';
import styles from '@/styles/Recruitment/Candidate.module.scss';


interface Props {
    title?: React.ReactElement<any, any>;
    showModal?: boolean;
    isUpdate?: boolean;
    classRegister?: Obj;
    handleShowModal?: (show: boolean) => void;
    class?: Obj;
    countTime?: number;
    recordRegisterClautidId?: string;
}
const ModalRegisterClass = (props: Props) => {
    const validationSchema = yup.object({
        date: yup.string().required('Bạn chưa chọn ngày dự thính!'),
        ...!props.isUpdate ? {
            emailCandidate: yup.string().required('Bạn chưa nhập email!')
        } : {},
        form: yup.string().required('Bạn chưa chọn hình thức dự thính!'),
        location: yup.string().required('Bạn chưa chọn hình thức dự thính!').when(["form"], (form, schema) => {
            if (form[0] === "OFFLINE") return schema.required('Bạn cần chọn cơ sở dự thính!');
            return schema.notRequired();
        }),
    });
    const listClass = useGetListClass();
    const getListClass = (listClass.response?.data as Obj)?.classes as Obj[];
    const registerClautid = useRegisterClautid();
    const candidateInfo = useGetCandidateOnboard();
    const getCandidateInfo = candidateInfo.data.response?.data as Obj;
    const bookTeacher = useQueryBookTeacher('GET');
    const updateClassClautidInfo = useUpdateClassClautid();
    const candidateClautid = useGetClautidForCandidateOnboard();

    const dispatch = useDispatch();
    const [searchClass, setSearchClass] = useState("");
    const [newClass, setNewClass] = useState({
        codeClass: "",
        id: ""
    });
    const debounceSearchClass = useDebounce(searchClass, 500);

    const message = useHookMessage();
    const getListLocationClass = (props.class?.recordBookTeacher as Array<Obj>)?.map((item) => {
        return item.locationId
    });

    const getLocation = props.isUpdate ? (bookTeacher.data?.response?.data as Array<Obj>)?.map((item) => {
        return item.locationId
    }) : getListLocationClass;

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            classId: props.classRegister ? props.classRegister?.classId?._id : (props.class?._id || ''),
            date: props.classRegister ? props.classRegister?.time as string : '',
            emailCandidate: getCandidateInfo && getCandidateInfo.email ? getCandidateInfo.email as string : '',
            form: props.classRegister ? props.classRegister?.form as string : '',
            location: props.classRegister ? props.classRegister?.location?._id as string : (ClassForm.ONLINE || '')
        },
        validationSchema,
        onSubmit(values) {
            if (!props.isUpdate) {
                if (values.location === ClassForm.ONLINE) {
                    const findIdOnline = getListLocationClass.find((item) => item.locationCode === ClassForm.ONLINE);
                    values.location = findIdOnline?._id;
                }
                registerClautid.query({
                    body: values
                });
            } else {
                const mapPayload = {
                    ...values,
                    countTime: props.countTime,
                    recordId: props.recordRegisterClautidId
                }
                updateClassClautidInfo.query({
                    body: mapPayload,
                    params: [props.recordRegisterClautidId as string]
                });
            }
        }
    });
    const handleQueryListClass = (codeClass: string) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        fields: ["_id", "codeClass"],
                        codeClass
                    }
                }
            }
        };
        dispatch(queryGetListClass(payload));
    }
    const options: MenuProps['items'] = getListClass?.map((item) => {
        return {
            label: item?.codeClass,
            key: item?._id
        }
    }) ?? [];
    const handleResetClass = () => {
        setNewClass({
            id: "",
            codeClass: ""
        });
        setFieldValue("classId", props.classRegister ? props.classRegister?.classId?._id : '')
    }
    useEffect(() => {
        if (updateClassClautidInfo.data.response && updateClassClautidInfo.data.success) {
            message.open({
                content: updateClassClautidInfo.data.response.message as string,
                type: updateClassClautidInfo.data.success ? 'success' : 'error'
            });
            updateClassClautidInfo.clear?.();
            candidateClautid.query({
                query: {
                    candidateId: getCandidateInfo._id
                }
            });
            message.close();
        }
    }, [updateClassClautidInfo.data]);

    useEffect(() => {
        if (registerClautid.data.response && registerClautid.data.success) {
            message.open({
                content: registerClautid.data.response.message as string,
                type: registerClautid.data.success ? 'success' : 'error'
            });
            registerClautid.clear?.();
            candidateClautid.query({
                query: {
                    candidateId: getCandidateInfo?._id
                }
            });
            message.close();
        }
    }, [registerClautid.data]);

    useEffect(() => {
        if (props.isUpdate && props.classRegister) {
            bookTeacher.query?.(props.classRegister?.classId?._id as string, ['locationId', 'locationCode', 'locationDetail']);
        }
    }, [props.isUpdate, props.classRegister]);
    useEffect(() => {
        if (debounceSearchClass) {
            handleQueryListClass(debounceSearchClass);
        }
    }, [debounceSearchClass]);
    return (
        <ModalCustomize
            show={props.showModal}
            onHide={() => {
                props.handleShowModal?.(false);
            }}
            modalHeader={props.title ? props.title : <h2>Đăng ký dự thính</h2>}
        >
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label><b>Lớp</b></Form.Label>
                    <br />
                    {props.isUpdate ? (props.classRegister ? <p style={{ display: 'flex', alignItems: 'start' }}>{props.classRegister?.classId?.codeClass}{newClass.codeClass ? ` -> ${newClass.codeClass}` : ""} {newClass.codeClass && <CloseOutlined style={{ cursor: 'pointer' }} onClick={handleResetClass} />}</p> : '') : props.class?.codeClass}
                    {props.isUpdate &&
                        <Dropdown
                            loading={listClass.isLoading}
                            listSelect={options}
                            trigger='click'
                            title={<div className={styles.inputLoading}>
                                <Input
                                    prefix={listClass.isLoading ? <LoadingOutlined /> : <SearchOutlined />}
                                    size="small"
                                    placeholder="Nhập mã lớp"
                                    onChange={(e) => {
                                        setSearchClass(e.target.value);
                                    }}
                                />
                            </div>
                            }
                            sizeButton="small"
                            onClickItem={(e) => {
                                if (e.key !== values.classId) {
                                    setNewClass({
                                        id: e.key,
                                        codeClass: (options.find((item: any) => item.key == e.key) as Obj)?.label as string
                                    });
                                    setFieldValue("classId", e.key);
                                }
                            }}
                        />
                    }
                </Form.Group>
                {
                    !props.isUpdate ? <Form.Group>
                        <Form.Label><b>Email <span className="error">*</span></b></Form.Label>
                        <Input size="small" name="emailCandidate" value={values.emailCandidate} onChange={handleChange} onBlur={handleBlur} />
                        {errors.emailCandidate && touched.emailCandidate && <p className="error">{errors.emailCandidate}</p>}
                    </Form.Group> : <Form.Group>
                        <Form.Label><b>Lần {Number(props.countTime)}</b></Form.Label>
                    </Form.Group>
                }
                <Form.Group>
                    <Form.Label><b>Ngày <span className="error">*</span></b></Form.Label>
                    <br />
                    <DatePicker
                        name="date"
                        value={values.date ? dayjs(new Date(values.date)) : null}
                        size="small"
                        onBlur={handleBlur}
                        onChange={(value) => {
                            const date = (value as Obj)?.$d;
                            setFieldValue('date', date);
                        }}
                        popupClassName={styles.pickDateRegister}
                        format={'DD/MM/YYYY'}
                    />
                    {errors.date && touched.date && <p className="error">{errors.date}</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label><b>Hình thức <span className="error">*</span></b></Form.Label>
                    <br />
                    <Radio.Group value={values.form} onChange={handleChange} name="form" onBlur={handleBlur}>
                        <Form.Label>
                            <Radio value="ONLINE" name="form" />Online
                        </Form.Label>
                        <br />
                        <Form.Label>
                            <Radio value="OFFLINE" name="form" />Offline
                        </Form.Label>
                    </Radio.Group>
                </Form.Group>
                {values.form === "OFFLINE" &&
                    <Form.Group>
                        <Form.Label><b>Cơ sở <span className="error">*</span></b></Form.Label>
                        <br />
                        <Radio.Group value={values.location} onChange={handleChange} name="location" onBlur={handleBlur}>
                            {getLocation?.map((item, idx) => {
                                return (
                                    item.locationCode !== "ONLINE" && <Form.Label key={idx}>
                                        <Radio value={item._id as string} />{item.locationCode}&nbsp;&nbsp;
                                    </Form.Label>
                                )
                            })}
                        </Radio.Group>
                    </Form.Group>
                }
                {errors.location && touched.location && <p className="error">{errors.location}</p>}

                <Button
                    size="small"
                    className={styles.btnRegister}
                    htmlType="submit"
                    loading={registerClautid.data.isLoading}
                >
                    {props.isUpdate ? 'Cập nhật' : 'Đăng ký'}
                </Button>
            </Form>
        </ModalCustomize>
    )
}

export default ModalRegisterClass;