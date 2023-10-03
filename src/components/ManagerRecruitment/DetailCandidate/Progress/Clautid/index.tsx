import React, { useState } from 'react';
import { ClassForm } from '@/global/enum';
import { Columns, RowData } from '@/global/interface';
import Tick from '@/icons/Tick';
import { formatDatetoString } from '@/utils';
import { configColumns } from './config';
import UnCheck from '@/icons/UnCheck';
import CalendarAdd from '@/icons/CalendarAdd';
import Table from '@/components/Table';
import Expand from '@/icons/Expand';
import ModalCustomize from '@/components/ModalCustomize';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const Clautid = () => {

    const columns: Columns = configColumns();
    const columnsTablePopup: Columns = configColumns(true);
    const rowData: RowData[] = [
        {
            key: '123',
            codeClass: 'C4EJS143',
            joinDate: new Date(),
            form: ClassForm.ONLINE,
            lessonContent: 'Học về cái gì ấy, k rõ',
            commentST: 'Dạy tương đối tốt, good,goodododododo,ạy tương đối tốt, good,goodododododo,ạy tương đối tốt, good,goodododododo',
            commentMT: 'Dạy tương đối tốt, good, ạy tương đối tốt, good,goodododododo,ạy tương đối tốt, good,goodododododo',
            commentTextbook: 'Thực hành hơi chán, kém chuyên nghiejep , ạy tương đối tốt, good,goodododododo,ạy tương đối tốt, good,goodododododoƒ'
        },
        {
            key: '123',
            codeClass: 'C4EJS143',
            joinDate: new Date(),
            form: ClassForm.ONLINE,
            lessonContent: 'Học về cái gì ấy, k rõ',
            commentST: 'Dạy tương đối tốt, good,goodododododo,ạy tương đối tốt, good,goodododododo,ạy tương đối tốt, good,goodododododo',
            commentMT: 'Dạy tương đối tốt, good, ạy tương đối tốt, good,goodododododo,ạy tương đối tốt, good,goodododododo',
            commentTextbook: 'Thực hành hơi chán, kém chuyên nghiejep , ạy tương đối tốt, good,goodododododo,ạy tương đối tốt, good,goodododododoƒ'
        },
    ];
    const [modalFeedback, setModalFeedback] = useState<boolean>(false);
    return (
        <div className={`${styles.roundClautid} ${styles.infoRound}`}>
            <div className={styles.handleClautid}>
                <h2>Dự thính</h2>
                <div className={styles.classClautid}>
                    <p>Đăng ký dự thính</p>
                    <div className={styles.classRegister}>
                        <div className={styles.class}>
                            <span>Lớp: C4EJS143 - {formatDatetoString(new Date(), 'dd/MM/yyyy')} - Online <Tick className={`${styles.iconCheck} ${styles.checked}`} /></span>
                        </div>
                        <div className={styles.class}>
                            <span>Lớp: C4EJS143 - {formatDatetoString(new Date(), 'dd/MM/yyyy')} - Offline <UnCheck className={`${styles.iconCheck} ${styles.unChecked}`} /></span>
                        </div>
                    </div>
                </div>
                <div className={styles.function}>
                    <span className={styles.handleSchedule} style={{ cursor: 'pointer' }}>
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
            <div className={styles.table}>
                <Expand className={styles.iconExpand} onClick={() => {
                    setModalFeedback(true);
                }} />
                <Table
                    className={styles.tableData}
                    disableDefaultPagination
                    hasFixedColumn
                    columns={columns}
                    rowData={rowData}
                />
            </div>
            {modalFeedback && <ModalCustomize
                show={modalFeedback}
                size="xl"
                onHide={() => {
                    setModalFeedback(false);
                }}
                modalHeader={<p></p>}
            >
                <Table
                    className={styles.tableData}
                    disableDefaultPagination
                    hasFixedColumn
                    columns={columnsTablePopup}
                    rowData={rowData}
                />
            </ModalCustomize>}
        </div>
    )
}

export default Clautid;