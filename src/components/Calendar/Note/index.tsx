import React from 'react';
import { Checkbox } from 'antd';
import { StatusEvent } from './styles';
import styles from '@/styles/Calendar.module.scss';

interface Props {

}
export const getStringStatusEvent: Record<StatusEvent, string> = {
    ACTIVE: 'Đang thực hiện',
    DAYOFF: 'Lịch nghỉ',
    FINISH: 'Đã kết thúc',
    FREE: 'Lịch rảnh'
}
const listNote = [
    {
        title: 'Đang thực hiện',
        key: 'ACTIVE',
        color: StatusEvent.ACTIVE
    },
    {
        title: 'Đã kết thúc',
        key: 'FINISH',
        color: StatusEvent.FINISH
    },
    {
        title: 'Lịch rảnh',
        key: 'FREE',
        color: StatusEvent.FREE
    },
    {
        title: 'Lịch nghỉ',
        key: 'DAYOFF',
        color: StatusEvent.DAYOFF
    },
]
const NoteCalendar = (props: Props) => {
    return (
        <div className={styles.noteCalendar}>
            <div className={styles.addBtn}>
                <button>
                    Thêm lịch
                </button>
            </div>
            <div className={styles.listNote}>
                {listNote.map((item) => {
                    return <div className={`${styles.note} ${item.color}`} key={item.key}>
                        <Checkbox children={item.title} />
                    </div>
                })}
            </div>
        </div>
    )
}

export default NoteCalendar;