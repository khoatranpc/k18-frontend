import React, { useState } from 'react';
import { Obj } from '@/global/interface';
import { useGetCandidateOnboard } from '@/utils/hooks';
import Step from '@/components/Step';
import FillForm from './FillForm';
import styles from '@/styles/Recruitment/Candidate.module.scss';
import { RoundProcess } from '@/global/enum';
import FeedbackClautid from '../FeedbackClautid';

const VisualStep = () => {
    const candidateInfo = useGetCandidateOnboard();

    const getCandidateInfo = (candidateInfo.data.response?.data as Array<Obj>)?.[0];
    const getStep = () => {
        if (getCandidateInfo) {
            if (!getCandidateInfo.fillForm) return 0;
            if (getCandidateInfo.roundProcess === RoundProcess.CLAUTID) return 1;

        }
        return 0;
    }
    const getStepComponent: Record<string, React.ReactElement> = {
        '0': <FillForm />,
        '1': <FeedbackClautid />
    };
    return (
        <div className={styles.visualizeStep}>
            <Step
                className={styles.step}
                currentStep={getStep()}
                labelPlacement="vertical"
                items={[
                    {
                        title: 'Form thông tin',
                    },
                    {
                        title: 'Dự thính',
                    },
                    {
                        title: 'Dạy thử',
                    },
                ]} />
            <div className={styles.content}>
                {getStepComponent[getStep().toString()]}
            </div>
        </div>
    )
}

export default VisualStep;