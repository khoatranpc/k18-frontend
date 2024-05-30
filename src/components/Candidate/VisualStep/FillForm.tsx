import React from 'react';
import { Obj } from '@/global/interface';
import { useGetCandidateOnboard } from '@/utils/hooks';
import styles from '@/styles/Recruitment/Candidate.module.scss';

const FillForm = () => {
    const candidateInfo = useGetCandidateOnboard();
    const getCandidateInfo = candidateInfo.data.response?.data as Obj;
    return (
        <div className={styles.FillForm}>
            {!getCandidateInfo?.fillForm ?
                <div style={{ fontSize: '2.2rem' }}>
                    <p>Thực hiện điền form thông tin tại</p>
                    <div className={styles.linkWrapper}>
                        <a href={"https://docs.google.com/forms/d/e/1FAIpQLSfLulutQMadFzKp9N1CYDywPeg48OO-fhE8KzWR6ZBe5CPkow/viewform"}>
                            <button className={styles.button64} ><span>LINK</span></button>
                        </a>

                    </div>
                    <small>Ứng viên vui lòng sử dụng email đăng ký với MindX để điền form</small>
                </div>
                :
                <h1>Bạn đã hoàn thành</h1>}
        </div>
    )
}

export default FillForm;