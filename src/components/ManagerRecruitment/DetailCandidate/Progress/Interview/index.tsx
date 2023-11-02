import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { Form } from 'react-bootstrap';
import { Button, DatePicker, Input, TimePicker } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Obj } from '@/global/interface';
import { RoundProcess } from '@/global/enum';
import { formatDatetoString } from '@/utils';
import { useDebounce, useFindGetAllTe, useGetDataRoundProcess, useGetDetailCandidate, useUpdateDataProcessRoundCandidate } from '@/utils/hooks';
import ConfirmContext from '../context';
import CalendarAdd from '@/icons/CalendarAdd';
import Send from '@/icons/Send';
import ListComment from '../Comment';
import ModalCustomize from '@/components/ModalCustomize';
import Dropdown from '@/components/Dropdown';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';
import SendingMail from '../SendingMail';

interface Props {
    roundId?: string;
}
const validationSchema = yup.object({
    linkMeet: yup.string().required('Chưa có thông tin link meet!'),
    te: yup.string().required('Chưa có thông tin TE!'),
    time: yup.string().required('Chưa có thông tin thời gian!'),
});
const Interview = (props: Props) => {
    const router = useRouter();
    const dataRoundProcess = useGetDataRoundProcess();
    const currentCandidate = useGetDetailCandidate();
    const getCandidateId = router.query;

    const candidate = currentCandidate.data.response?.data as Obj;
    const getDataRoundProcess = (dataRoundProcess.data.response?.data as Array<Obj>)?.[0];
    const [modal, setModal] = useState<boolean>(false);

    const listTe = useFindGetAllTe();
    const getListTe = listTe.data.response?.data as Array<Obj> || [];
    const updateDataRoundProcessCandidate = useUpdateDataProcessRoundCandidate();

    const firstMount = useRef(true);
    const btnCancel = useRef<HTMLButtonElement>(null);

    const [valueFindTe, setValueFindTe] = useState<string>('');
    const debounce = useDebounce(valueFindTe, 500);

    const confirm = useContext(ConfirmContext);

    const handleModal = (pass?: boolean, type?: 'PASS' | 'FAIL') => {
        const getTitle = (pass ? <h3>Xác nhận <b className="passStep" style={{ fontSize: 'calc(1.3rem + 0.6vw)' }}>Đạt</b>!</h3> : <h3>Xác nhận <b className="failStep" style={{ fontSize: 'calc(1.3rem + 0.6vw)' }}>Trượt</b>!</h3>);
        confirm.handleModal?.(true, getTitle, type);
    }

    const { values, errors, touched, setFieldValue, handleChange, handleBlur, handleSubmit, setValues, handleReset } = useFormik({
        initialValues: {
            linkMeet: getDataRoundProcess?.linkMeet as string || '',
            time: getDataRoundProcess?.time as string || '',
            te: getDataRoundProcess?.te?._id as string || ''
        },
        validationSchema,
        onSubmit(values) {
            updateDataRoundProcessCandidate.query({
                params: [props.roundId as string],
                body: {
                    ...values,
                    round: RoundProcess.INTERVIEW,
                    ...getCandidateId.candidateId ? {
                        candidateId: getCandidateId.candidateId
                    } : {}
                }
            })
        }
    });
    useEffect(() => {
        if (firstMount.current) {
            if (getDataRoundProcess && getDataRoundProcess.time) {
                setValues({
                    linkMeet: getDataRoundProcess.linkMeet,
                    te: getDataRoundProcess.te._id,
                    time: getDataRoundProcess.time
                });
            }
            firstMount.current = false;
        }
    }, [getDataRoundProcess]);
    useEffect(() => {
        if (updateDataRoundProcessCandidate.data.response) {
            setModal(false);
        }
    }, [updateDataRoundProcessCandidate.data]);

    const getLabelChosenTe = useMemo(() => {
        const findTe = getListTe.find((item) => {
            return item._id === values.te;
        });
        if (!findTe) {
            if (getDataRoundProcess.te) {
                return `${getDataRoundProcess.te.teName}-${getDataRoundProcess.te.positionTe}${getDataRoundProcess.te.courseId ? ` ${getDataRoundProcess.te.courseId.courseName}` : ''}`;
            }
            return 'Không có Te nào được chọn!'
        };
        return `${findTe.teName}-${findTe.positionTe}${findTe.courseId ? ` ${findTe.courseId.courseName}` : ''}`;
    }, [values.te, getDataRoundProcess]);

    useEffect(() => {
        if (debounce) {
            listTe.query({
                query: {
                    fields: '_id,teName,positionTe,courseId,courseName,email',
                    findBy: 'email',
                    email: valueFindTe
                }
            });
        }
    }, [debounce]);
    return (
        <div className={styles.roundInterview}>
            <div className={`${styles.handleInterview} ${styles.infoRound}`}>
                <h2>Vòng phỏng vấn {getDataRoundProcess?.processed && (<sup style={{ color: !getDataRoundProcess?.result ? 'var(--light-red)' : 'var(--success)' }}>{getDataRoundProcess?.result ? 'Pass' : 'Failed'}</sup>)}</h2>
                <div className={styles.infoInterview}>
                    <p>Link meet: {getDataRoundProcess?.linkMeet as string ? <a href={getDataRoundProcess.linkMeet || '#'} className="link" target="_blank">{getDataRoundProcess?.linkMeet}</a> : <span className="error">Chưa có link!</span>}</p>
                    <p>Thời gian: {getDataRoundProcess?.time as string ? formatDatetoString(new Date(getDataRoundProcess.time as string), 'dd/MM/yyyy, HH:mm:a') : <span className="error">Chưa có lịch!</span>}</p>
                    <p>TE: {getDataRoundProcess?.te ? (`${getDataRoundProcess.te.teName}-${getDataRoundProcess.te.positionTe}${getDataRoundProcess.te.courseId ? ` ${getDataRoundProcess.te.courseId.courseName}` : ''}`) : (<span className="error">Chưa có thông tin TE!</span>)}</p>
                </div>
                <div className={styles.function}>
                    <div className={styles.actions}>
                        <span className={styles.handleSchedule} onClick={() => {
                            setModal(true);
                        }}>
                            <CalendarAdd /> {getDataRoundProcess?.time ? ('Cập nhật') : ('Tạo lịch')}
                        </span>
                        <span className={styles.sentMail}>
                            <SendingMail pass={getDataRoundProcess.result} round={RoundProcess.INTERVIEW} />
                        </span>
                    </div>
                    <div className={styles.handleStep}>
                        <Button
                            // disabled={getDataRoundProcess?.result}
                            className={styles.btnHandleStep}
                            onClick={() => {
                                handleModal(false, 'FAIL');
                            }}
                        >
                            Trượt
                        </Button>
                        <Button
                            // disabled={getDataRoundProcess?.result}
                            className={styles.btnHandleStep}
                            onClick={() => {
                                handleModal(true, 'PASS');
                            }}
                        >
                            Bước tiếp theo
                        </Button>
                    </div>
                </div>
            </div>
            <ListComment className={styles.comments} roundId={props.roundId} />
            <ModalCustomize
                onHide={() => {
                    setModal(false);
                    btnCancel.current?.click();
                }}
                centered
                modalHeader={
                    <div>
                        Tạo lịch phỏng vấn: <b>{candidate?.fullName as string}</b>
                    </div>
                }
                show={modal}
            >
                <div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>
                                Link meet <span className="error">*</span>
                            </Form.Label>
                            <Input size='small' name="linkMeet" value={values.linkMeet} onChange={handleChange} onBlur={handleBlur} />
                            {errors.linkMeet && touched.linkMeet && <p className="error">{errors.linkMeet}</p>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Thời gian <span className="error">*</span>
                            </Form.Label>
                            <br />
                            <DatePicker
                                onBlur={handleBlur}
                                name="time"
                                onChange={(value: Obj | any) => {
                                    setFieldValue('time', value?.$d || '')
                                }}
                                placeholder="Ngày PV"
                                popupClassName={styles.pickDate}
                                size='small'
                                value={values.time ? dayjs(new Date(values.time)) : null}
                                format={'DD-MM-YYYY'}
                            />
                            <br />
                            {values.time && <TimePicker
                                onChange={(value: Obj | any) => {
                                    if (value) {
                                        const hours = value?.$H;
                                        const minute = value?.$m;
                                        const currentInterviewDay = new Date(values.time);
                                        currentInterviewDay.setHours(hours);
                                        currentInterviewDay.setMinutes(minute);
                                        currentInterviewDay.setSeconds(0, 0);
                                        setFieldValue('time', new Date(currentInterviewDay));
                                    }
                                }}
                                value={values.time ? dayjs(new Date(values.time)) : null}
                                popupClassName={styles.pickDate}
                                format={"HH:mm"}
                                size="small"
                                placeholder="Giờ"
                            />}
                            {errors.time && touched.time && !values.time && <p className="error">{errors.time}</p>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                TE <span className="error">*</span>: {getLabelChosenTe}
                                {errors.te && touched.te && !values.te && <p className="error">{errors.te}</p>}
                            </Form.Label>
                            <Dropdown
                                listSelect={getListTe?.map((item) => {
                                    return {
                                        key: item._id as string,
                                        label: `${item.teName}-${item.positionTe}${item.courseId ? ` ${item.courseId.courseName}` : ''}`
                                    }
                                })}
                                trigger='click'
                                title={<Input
                                    onBlur={handleBlur}
                                    name='te'
                                    prefixCls={''}
                                    prefix={listTe.data.isLoading && <LoadingOutlined />}
                                    size="small"
                                    placeholder="Gõ email để tìm kiếm"
                                    onChange={(e) => {
                                        setValueFindTe(e.target.value);
                                    }}
                                />}
                                sizeButton="small"
                                onClickItem={(e) => {
                                    setFieldValue('te', e.key);
                                }}
                            />
                        </Form.Group>
                        <div className={styles.btnCreateScheduleInterview}>
                            <Button
                                disabled={dataRoundProcess.data.isLoading}
                                size="small"
                                onClick={(e) => {
                                    if (getDataRoundProcess && getDataRoundProcess.time) {
                                        handleReset(e);
                                    } else {
                                        setModal(false);
                                    }
                                }}
                                ref={btnCancel}
                            >{getDataRoundProcess && getDataRoundProcess.time ? 'Đặt lại' : 'Huỷ'}</Button>
                            <Button size="small" htmlType="submit" loading={dataRoundProcess.data.isLoading}>{getDataRoundProcess?.time ? ('Cập nhật') : ('Tạo lịch')}</Button>
                        </div>
                    </Form>
                </div>
            </ModalCustomize>
        </div >
    )
}

export default Interview;