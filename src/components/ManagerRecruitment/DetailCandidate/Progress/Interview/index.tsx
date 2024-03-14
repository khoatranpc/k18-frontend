import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { Obj } from '@/global/interface';
import { RoundProcess } from '@/global/enum';
import { formatDatetoString } from '@/utils';
import { useGetDataRoundProcess, useGetDetailCandidate, useGoogleAuth, useUpdateDataProcessRoundCandidate } from '@/utils/hooks';
import ConfirmContext from '../context';
import CalendarAdd from '@/icons/CalendarAdd';
import ListComment from '../Comment';
import ModalCustomize from '@/components/ModalCustomize';
import SendingMail from '../SendingMail';
import CreateCalendar from '../CreateCalendar';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';
import { useHookMessage } from '@/utils/hooks/message';

interface Props {
    roundId?: string;
}
const Interview = (props: Props) => {
    const router = useRouter();
    const dataRoundProcess = useGetDataRoundProcess();
    const currentCandidate = useGetDetailCandidate();
    const message = useHookMessage();
    const googleAuth = useGoogleAuth();
    const getDataAuth = (googleAuth.data.response as Obj)?.data as Obj;
    const getCandidateId = router.query;

    const candidate = currentCandidate.data.response?.data as Obj;
    const getDataRoundProcess = (dataRoundProcess.data.response?.data as Array<Obj>)?.[0];
    const [modal, setModal] = useState<boolean>(false);

    const updateDataRoundProcessCandidate = useUpdateDataProcessRoundCandidate();

    const confirm = useContext(ConfirmContext);

    const handleModal = (pass?: boolean, type?: 'PASS' | 'FAIL') => {
        const getTitle = (pass ? <h3>Xác nhận <b className="passStep" style={{ fontSize: 'calc(1.3rem + 0.6vw)' }}>Đạt</b>!</h3> : <h3>Xác nhận <b className="failStep" style={{ fontSize: 'calc(1.3rem + 0.6vw)' }}>Trượt</b>!</h3>);
        confirm.handleModal?.(true, getTitle, type);
    }
    useEffect(() => {
        if (updateDataRoundProcessCandidate.data.response) {
            setModal(false);
        }
    }, [updateDataRoundProcessCandidate.data]);
    useEffect(() => {
        if (getDataAuth && !googleAuth.data.success || ((updateDataRoundProcessCandidate.data.response?.message as string)?.includes('No access, refresh token'))) {
            localStorage.removeItem('authGoogle');
            message.open({
                type: 'warning',
                content: 'Đã xảy ra lỗi đăng nhập Google, thực hiện lại thao tác để đăng nhập!'
            });
            googleAuth.clear?.();
            updateDataRoundProcessCandidate.clear?.();
            message.close();
        }
        else if (updateDataRoundProcessCandidate.data.response) {
            message.open({
                type: updateDataRoundProcessCandidate.data.success ? 'success' : 'error',
                content: updateDataRoundProcessCandidate.data.response?.message as string
            });
            updateDataRoundProcessCandidate.clear?.();
            message.close();
        }
        else {
            if (googleAuth.data.success && getDataAuth?.url) {
                localStorage.setItem('callbackUrl', router.asPath);
                window.location.href = getDataAuth.url;
            }
        }
    }, [googleAuth.data.response, updateDataRoundProcessCandidate.data]);
    return (
        <div className={styles.roundInterview}>
            <div className={`${styles.handleInterview} ${styles.infoRound}`}>
                <h2>Vòng phỏng vấn {getDataRoundProcess?.processed && (<sup style={{ color: !getDataRoundProcess?.result ? 'var(--light-red)' : 'var(--success)' }}>{!getDataRoundProcess?.processed ? 'Đang xử lý' : (getDataRoundProcess?.result ? 'Pass' : 'Failed')}</sup>)}</h2>
                <div className={styles.infoInterview}>
                    <p>Link meet: {getDataRoundProcess?.linkMeet as string ? <a href={getDataRoundProcess?.linkMeet || '#'} className="link" target="_blank">{getDataRoundProcess?.linkMeet}</a> : <span className="error">Chưa có link!</span>}</p>
                    <p>Thời gian: {getDataRoundProcess?.time as string ? formatDatetoString(new Date(getDataRoundProcess?.time as string), 'dd/MM/yyyy, HH:mm:a') : <span className="error">Chưa có lịch!</span>}</p>
                    <p>TE: {getDataRoundProcess?.te ? (`${getDataRoundProcess?.te.teName}-${getDataRoundProcess?.te.positionTe}${getDataRoundProcess?.te.courseId ? ` ${(getDataRoundProcess?.te.courseId as Obj[]).find(item => item._id === candidate.courseApply)?.courseName ?? ''}` : ''}`) : (<span className="error">Chưa có thông tin TE!</span>)}</p>
                </div>
                <div className={styles.function}>
                    <div className={styles.actions}>
                        <span className={styles.handleSchedule} onClick={() => {
                            if (!localStorage.getItem('authGoogle')) {
                                googleAuth.query({
                                    query: {
                                        callBackUrl: router.asPath
                                    }
                                });
                            } else {
                                setModal(true);
                            }
                        }}>
                            <CalendarAdd /> {getDataRoundProcess?.time ? ('Cập nhật') : ('Tạo lịch')}
                        </span>
                        <span className={styles.sentMail}>
                            <SendingMail pass={getDataRoundProcess?.result} round={RoundProcess.INTERVIEW} />
                        </span>
                    </div>
                    <div className={styles.handleStep}>
                        <Button
                            className={styles.btnHandleStep}
                            onClick={() => {
                                handleModal(false, 'FAIL');
                            }}
                        >
                            Trượt
                        </Button>
                        <Button
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
                }}
                centered
                modalHeader={
                    <div>
                        Tạo lịch phỏng vấn: <b>{candidate?.fullName as string}</b>
                    </div>
                }
                show={modal}
            >
                <CreateCalendar
                    handleModal={() => {
                        setModal(false);
                    }}
                    disabledLinkMeet
                    handleSubmit={(values) => {
                        updateDataRoundProcessCandidate.query({
                            params: [props.roundId as string],
                            body: {
                                ...values,
                                round: RoundProcess.INTERVIEW,
                                ...getCandidateId.candidateId ? {
                                    candidateId: getCandidateId.candidateId
                                } : {}
                            }
                        });
                    }}
                />
            </ModalCustomize>
        </div >
    )
}

export default Interview;