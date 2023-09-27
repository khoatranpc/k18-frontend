import React from 'react';
import { Obj } from '@/global/interface';
import { useGetDetailCandidate } from '@/utils/hooks';
import IconArrowView from '@/icons/IconArrowView';
import ListComment from '../Comment';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const CV = () => {
    const crrCandidate = useGetDetailCandidate();
    const getDataCandidate = crrCandidate.data.response?.data as Obj;

    return (
        <div className={styles.roundCv}>
            <div className={styles.infoCv}>
                <h2>Vòng CV</h2>
                <div className={styles.linkCv} onClick={(() => {
                    window.open(`${getDataCandidate.linkCv}`, 'blank');
                })}>
                    Link CV <IconArrowView />
                </div>
                <div className={styles.handleStep}>
                    <button className={styles.btnHandleStep}>
                        Trượt
                    </button>
                    <button className={styles.btnHandleStep}>
                        Bước tiếp theo
                    </button>
                </div>
            </div>
            <ListComment className={styles.comments} />
        </div>
    )
}

export default CV;