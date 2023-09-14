import React from 'react';
import { formatDatetoString } from '@/utils';
import CalendarAdd from '@/icons/CalendarAdd';
import Comment from '../Comment';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const Interview = () => {
    return (
        <div className={styles.roundInterview}>
            <div className={styles.handleInterview}>
                <h2>Vòng phỏng vấn</h2>
                <div className={styles.infoInterview}>
                    <p>Link meet: <a href="#" className="link" target="_blank">httsp://meet.google.com/buo-kk-odas</a></p>
                    <p>Thời gian: {formatDatetoString(new Date(), 'dd/MM/yyyy, hh:mm-a')}</p>
                </div>
                <div className={styles.function}>
                    <span className={styles.handleSchedule}>
                        <CalendarAdd /> Tạo lịch
                    </span>
                    <div className={styles.handleStep}>
                        <button className={styles.btnHandleStep}>
                            Trượt
                        </button>
                        <button className={styles.btnHandleStep}>
                            Bước tiếp theo
                        </button>
                    </div>
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

export default Interview;