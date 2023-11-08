import React, { useEffect } from 'react';
import { Obj } from '@/global/interface';
import { useGetCandidateOnboard, useGetClautidForCandidateOnboard } from '@/utils/hooks';
import Loading from '@/components/loading';
import styles from '@/styles/Recruitment/Candidate.module.scss';
import Link from 'next/link';

const FeedbackClautid = () => {
    const candidateInfo = useGetCandidateOnboard();
    const getCandidateInfo = (candidateInfo.data.response?.data as Array<Obj>)?.[0];

    const candidateClautid = useGetClautidForCandidateOnboard();
    const getCandidateClautid = candidateClautid.data.response?.data as Obj;

    console.log(getCandidateClautid);
    useEffect(() => {
        candidateClautid.query({
            query: {
                candidateId: getCandidateInfo._id
            }
        })
    }, []);

    return (
        <div className={styles.feedbackClautid}>
            {candidateClautid.data.isLoading || !getCandidateClautid
                ? <Loading /> :
                <>
                    <p>Xem và đăng ký lớp dự thính tại: <Link href={'/candidate/class-running'} target="_blank"><b>Link</b></Link></p>
                    {!getCandidateClautid?.classIdFirst && <p className="error">Bạn chưa đăng ký lịch dự thính lần 1</p>}
                    {!getCandidateClautid?.classIdSecond && <p className="error">Bạn chưa đăng ký lịch dự thính lần 2</p>}
                </>
            }
        </div>
    )
}

export default FeedbackClautid;