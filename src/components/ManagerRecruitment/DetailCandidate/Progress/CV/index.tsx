import React from 'react';
import IconArrowView from '@/icons/IconArrowView';
import Comment from './Comment';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

interface Props {

}

const CV = (props: Props) => {
    return (
        <div className={styles.roundCv}>
            <div className={styles.infoCv}>
                <h2>Vòng CV</h2>
                <div className={styles.linkCv}>
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
            <div className={styles.comments}>
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </div>
        </div>
    )
}

export default CV;