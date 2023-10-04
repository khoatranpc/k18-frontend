import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Obj } from '@/global/interface';
import { RoundProcess } from '@/global/enum';
import { getLabelRoundProcess } from '@/global/init';
import { useGetDataRoundComments, useGetDataRoundProcess, useGetDetailCandidate } from '@/utils/hooks';
import ConfirmContext from './context';
import Step from '@/components/Step';
import WaitingProcess from './WaitingProcess';
import CV from './CV';
import Interview from './Interview';
import Clautid from './Clautid';
import Test from './Test';
import PopupConfirm from './PopupConfirm';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const getStepByRound: Record<RoundProcess, number> = {
    CV: 0,
    INTERVIEW: 1,
    CLAUTID: 2,
    CLASSIFY: 3,
    TEST: 4,
    DONE: 5
}

const listRound = [{
    round: RoundProcess.CV,
    title: 'Vòng CV'
}, {
    round: RoundProcess.INTERVIEW,
    title: 'Phỏng vấn'
}, {
    round: RoundProcess.CLAUTID,
    title: 'Dự thính'
}, {
    round: RoundProcess.TEST,
    title: 'Dạy thử'
}, {
    round: RoundProcess.CLASSIFY,
    title: 'Phân loại'
}];
const Progress = () => {
    const [step, setStep] = useState<RoundProcess>(RoundProcess.CV);
    const router = useRouter();
    const crrCandidate = useGetDetailCandidate();
    const getDataCandidate = crrCandidate.data.response?.data as Obj;

    const dataRoundProcess = useGetDataRoundProcess();
    const getDataRoundProcess = dataRoundProcess.data.response?.data as Array<Obj>;
    const getDataRound = getDataRoundProcess?.[0] as Obj;
    const roundComments = useGetDataRoundComments();

    const [confirmModal, setConfirmModal] = useState<{
        show?: boolean,
        title?: React.ReactElement | string;
        type?: 'PASS' | 'FAIL'
    }>({
        show: false,
        title: "",
        type: 'FAIL'
    });
    const handleModal = (show?: boolean, title?: React.ReactElement | string, type?: 'PASS' | 'FAIL') => {
        setConfirmModal({
            show,
            title,
            type
        });
    }
    const ContentRoundProgess: Record<RoundProcess, React.ReactElement> = {
        CV: <CV roundId={getDataRound?._id as string} />,
        CLAUTID: <Clautid />,
        CLASSIFY: <>Phân loại</>,
        INTERVIEW: <Interview />,
        TEST: <Test />,
        DONE: <></>
    };
    useEffect(() => {
        dataRoundProcess.query(RoundProcess.CV, [router.query.candidateId as string]);
    }, []);
    useEffect(() => {
        if (!dataRoundProcess.data.isLoading) {
            if (getDataRoundProcess?.length !== 0) {
                roundComments.query(getDataRound?._id as string, ['roundId', 'teId', '_id', 'teName', 'positionTe', 'courseId', 'content', 'createdAt', 'updatedAt']);
            }
        }
    }, [dataRoundProcess.data]);
    const handleClickStep = (step: RoundProcess) => {
        setStep(() => {
            dataRoundProcess.query(step, [router.query.candidateId as string]);
            return step;
        });
    };
    return (
        <ConfirmContext.Provider value={{
            ...confirmModal,
            onConfirm(round, result) {
                // pending call api
                setConfirmModal({
                    ...confirmModal,
                    show: false
                });
                console.log(result);
            },
            handleModal,
            round: step
        }}>
            <div className={styles.progress}>
                <Step
                    currentStep={getStepByRound[getDataCandidate?.roundProcess as RoundProcess] || 0}
                    labelPlacement="vertical"
                    items={
                        listRound.map((item, index) => {
                            return {
                                description: <p key={index} className={styles.round} onClick={() => {
                                    handleClickStep(item.round);
                                }}>{item.title}</p>
                            }
                        })
                    }
                />
                <div className={styles.content}>
                    {!dataRoundProcess.data.isLoading && (dataRoundProcess.data.response?.data as Array<Obj>)?.length !== 0 ? ContentRoundProgess[step] : <WaitingProcess isLoading={dataRoundProcess.data.isLoading} />}
                </div>
            </div>
            <PopupConfirm
                show={confirmModal.show}
                title={confirmModal.title}
            >
                <div>
                    <p>Xác nhận ứng viên <b>{getDataCandidate.fullName as string}</b> {confirmModal.type === 'PASS' ? 'đạt' : 'trượt'} vòng {getLabelRoundProcess[step]}!</p>
                </div>
            </PopupConfirm>
        </ConfirmContext.Provider>
    )
}

export default Progress;