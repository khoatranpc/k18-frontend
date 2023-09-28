import React, { useContext } from 'react';
import { Obj } from '@/global/interface';
import { useGetDetailCandidate } from '@/utils/hooks';
import IconArrowView from '@/icons/IconArrowView';
import ListComment from '../Comment';
import ConfirmContext from '../context';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const CV = () => {
    const crrCandidate = useGetDetailCandidate();
    const getDataCandidate = crrCandidate.data.response?.data as Obj;
    const confirm = useContext(ConfirmContext);

    const handleModal = (pass?: boolean, type?: 'PASS' | 'FAIL') => {
        const getTitle = (pass ? <h3>Xác nhận <b className="passStep" style={{ fontSize: 'calc(1.3rem + 0.6vw)' }}>Đạt</b>!</h3> : <h3>Xác nhận <b className="failStep" style={{ fontSize: 'calc(1.3rem + 0.6vw)' }}>Trượt</b>!</h3>);
        confirm.handleModal?.(true, getTitle, type);
    }
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
                    <button className={styles.btnHandleStep} onClick={() => {
                        handleModal(false, 'FAIL');
                    }}>
                        Trượt
                    </button>
                    <button className={styles.btnHandleStep} onClick={() => {
                        handleModal(true, 'PASS');
                    }}>
                        Bước tiếp theo
                    </button>
                </div>
            </div>
            <ListComment className={styles.comments} />
        </div>
    )
}

export default CV;