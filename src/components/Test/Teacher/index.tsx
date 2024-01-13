import React from 'react';
import { useRouter } from 'next/router';
import student from '@/assets/imgs/student.png';
import { Button } from 'antd';
import Skip from '@/icons/Skip';
import Image from 'next/image';
import styles from '@/styles/Test.module.scss';

const Teacher = () => {
    const router = useRouter();
    return (
        <div className={styles.teacherQuizz}>
            <div className={styles.title}>
                <h1>Kiểm tra lớp: {router.query.codeClass as string}</h1>
                <div className={styles.infoBase}>
                    <p>Thời gian: 5p</p>
                    <p>Số câu hỏi: 10</p>
                    <Button>Bắt đầu</Button>
                </div>
            </div>
            <div className={styles.listStudent}>
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, idx) => {
                    return <div key={idx} className={styles.student}>
                        <Image src={student} alt='' width={50} height={50} />
                        <span>Trần Đăng Khoa</span>
                    </div>
                })}
            </div>
            {/* <div className={styles.question}>
                <div className={styles.action}>
                    <span className={styles.countingTime}>20s</span>
                    <span className={styles.skipButton}><Skip /></span>
                </div>
                <div className={styles.contentQuestion}>
                    <div className={styles.blockTitleQuestion}>
                        Câu 1. HTML là gì?
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Teacher;