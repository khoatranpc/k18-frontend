import React from 'react';
import Link from 'next/link';
import { Obj } from '@/global/interface';
import { useGetCandidateOnboard } from '@/utils/hooks';
import styles from '@/styles/Recruitment/Candidate.module.scss';

const FillForm = () => {
    const candidateInfo = useGetCandidateOnboard();
    const getCandidateInfo = (candidateInfo.data.response?.data as Array<Obj>)?.[0];
    return (
        <div className={styles.FillForm}>
            {!getCandidateInfo?.fillForm ?
                <h2>
                    Thực hiện điền form thông tin tại: <Link href={"https://docs.google.com/forms/d/e/1FAIpQLSfLulutQMadFzKp9N1CYDywPeg48OO-fhE8KzWR6ZBe5CPkow/viewform"}>Link</Link>
                    <small>Ứng viên vui lòng sử dụng email đăng ký với MindX để điền form</small>
                </h2>
                :
                <h1>Bạn đã hoàn thành</h1>}
        </div>
    )
}

export default FillForm;