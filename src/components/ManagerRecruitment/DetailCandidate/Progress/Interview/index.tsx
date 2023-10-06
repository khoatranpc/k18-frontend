import React from 'react';
import { Button } from 'antd';
import { Obj } from '@/global/interface';
import { formatDatetoString } from '@/utils';
import { useGetDataRoundProcess } from '@/utils/hooks';
import CalendarAdd from '@/icons/CalendarAdd';
import ListComment from '../Comment';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const Interview = () => {
    const dataRoundProcess = useGetDataRoundProcess();
    const getDataRoundProcess = (dataRoundProcess.data.response?.data as Array<Obj>)?.[0];
    return (
        <div className={styles.roundInterview}>
            <div className={`${styles.handleInterview} ${styles.infoRound}`}>
                <h2>Vòng phỏng vấn</h2>
                <div className={styles.infoInterview}>
                    <p>Link meet: {getDataRoundProcess?.[0]?.linkMeet ? <a href="#" className="link" target="_blank">{getDataRoundProcess?.[0].linkMeet}</a> : <span className="error">Chưa có link!</span>}</p>
                    <p>Thời gian: {getDataRoundProcess?.[0]?.time ? formatDatetoString(new Date(), 'dd/MM/yyyy, HH:mm-a') : <span className="error">Chưa có lịch!</span>}</p>
                </div>
                <div className={styles.function}>
                    <span className={styles.handleSchedule}>
                        <CalendarAdd /> Tạo lịch
                    </span>
                    <div className={styles.handleStep}>
                        <Button disabled={getDataRoundProcess?.result} className={styles.btnHandleStep}>
                            Trượt
                        </Button>
                        <Button disabled={getDataRoundProcess?.result} className={styles.btnHandleStep}>
                            Bước tiếp theo
                        </Button>
                    </div>
                </div>
            </div>
            <ListComment className={styles.comments} />
        </div>
    )
}

export default Interview;