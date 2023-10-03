import React from 'react';
import { formatDatetoString } from '@/utils';
import CalendarAdd from '@/icons/CalendarAdd';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';
import ListComment from '../Comment';

const Test = () => {
    return (
        <div className={styles.roundTest}>
            <div className={`${styles.handleTest} ${styles.infoRound}`}>
                <h2>Vòng kiểm tra dạy thử</h2>
                <div className={styles.infoRoundTest}>
                    <p>Link meet: <a href="#" className="link" target="_blank">httsp://meet.google.com/buo-kk-odas</a></p>
                    <p>Thời gian: {formatDatetoString(new Date(), 'dd/MM/yyyy, HH:mm-a')}</p>
                    <p>Tài liệu: <a href="#" className="link" target="_blank">https://notion.syllabus.com</a></p>
                </div>
                <div className={styles.function}>
                    <span className={`${styles.handleCalendar} link`}>
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
            <ListComment className={styles.comments} />
        </div>
    )
}

export default Test;