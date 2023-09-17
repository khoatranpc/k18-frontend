import React, { useState } from 'react';
import Step from '@/components/Step';
import CV from './CV';
import Interview from './Interview';
import Clautid from './Clautid';
import Test from './Test';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

enum RoundProgress {
    CV = 'CV',
    INTERVIEW = 'INTERVIEW',
    CLAUDIT = 'CLAUTID',
    TEST = 'TEST',
    CLASSIFY = 'CLASSIFY'
}

const Progress = () => {
    const [step, setStep] = useState<RoundProgress>(RoundProgress.CV);
    const ContentRoundProgess: Record<RoundProgress, React.ReactElement> = {
        CV: <CV />,
        CLAUTID: <Clautid />,
        CLASSIFY: <>Phân loại</>,
        INTERVIEW: <Interview />,
        TEST: <Test />
    };
    const handleClickStep = (step: RoundProgress) => {
        setStep(step);
    };
    return (
        <div className={styles.progress}>
            <Step
                currentStep={1}
                labelPlacement="vertical"
                items={[
                    {
                        description: <p className={styles.round} onClick={() => {
                            handleClickStep(RoundProgress.CV);
                        }}>Vòng CV</p>,
                    },
                    {
                        description: <p className={styles.round} onClick={() => {
                            handleClickStep(RoundProgress.INTERVIEW);
                        }}>Vòng phỏng vấn</p>
                    },
                    {
                        description: <p className={styles.round} onClick={() => {
                            handleClickStep(RoundProgress.CLAUDIT);
                        }}>Dự thính</p>
                    },
                    {
                        description: <p className={styles.round} onClick={() => {
                            handleClickStep(RoundProgress.TEST);
                        }}>Kiểm tra dạy thử</p>
                    },
                    {
                        description: <p className={styles.round}
                            onClick={() => {
                                handleClickStep(RoundProgress.TEST);
                            }}>Phân loại</p>
                    }
                ]}
            />
            <div className={styles.content}>
                {ContentRoundProgess[step]}
            </div>
        </div>
    )
}

export default Progress;