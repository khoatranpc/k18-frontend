import React from 'react';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON, ROLE_TEACHER } from '@/global/enum';
import SelectLocation from '@/components/SelectLocation';
import { EventCalendar } from '@/global/interface';
import { formatDatetoString, getWeekday } from '@/utils';
import { mapRoleToString } from '@/global/init';
import ModalCustomize from '@/components/ModalCustomize';
import { StatusEvent, getColor } from '../../Note/styles';
import { getStringStatusEvent } from '../../Note';
import SelectInputNumber from '@/components/SelectInputNumber';
import styles from '@/styles/Calendar.module.scss';
import SelectRole from '@/components/SelectRole';

interface Props {
    show: boolean;
    event: EventCalendar;
    status: StatusEvent;
    isTeacherCalendar?: boolean;
    onHide?: () => void;
}
const EventPopup = (props: Props) => {
    // console.log(props.event.recource);
    // console.log(props.event);
    return (
        <div className={styles.eventPopup}>
            <ModalCustomize
                onHide={props.onHide}
                centered
                modalHeader={<div></div>}
                dialogClassName={`${styles.dialog} dialogEventPopUp`}
                backdropClassName={styles.backdrop}
                show={props.show}
            >
                <div className={`contentEventPopup`}>
                    <h2 className={`title`}>{props.event.title}</h2>
                    <div
                        className={`statusEvent`}
                        style={{ backgroundColor: getColor[props.status] }}
                    >
                        {getStringStatusEvent[props.status]}
                    </div>
                    <div className={`timeSchedule ${styles.mb12} ${styles.timeSchedule}`}>
                        <span className={styles.iconCalendar}>
                            {MapIconKey[KEY_ICON.TIMESCHEDULE]}
                            <span className={styles.dateTime}>
                                {getWeekday((props.event.start.getDay()))},   {formatDatetoString(props.event.start, 'dd/MM/yyyy')}
                            </span>
                        </span>
                        {!props.event.allDay && <span className={styles.timeHour}>{formatDatetoString(props.event.start, 'HH:mm a')}-{formatDatetoString(props.event.end, 'HH:mm a')}</span>}
                    </div>
                    <div className={styles.bodyContent}>
                        {props.isTeacherCalendar && !props.event.allDay &&
                            <div className={styles.forTeacher}>
                                <div className={styles.flex}>
                                    <span className={`${styles.icon} ${styles.flexRow}`}>
                                        {/* {MapIconKey[KEY_ICON.LOCATION]} {props.event.resource?.location} */}
                                        {MapIconKey[KEY_ICON.LOCATION]} Cơ sở: <SelectLocation
                                            sizeButton='small'
                                            className={styles.pickLocationEvent}
                                            selectClassName={styles.selectLocation}
                                        />
                                    </span>
                                    <span className={styles.icon}>
                                        {MapIconKey[KEY_ICON.CLOCK]} Buổi số: <SelectInputNumber value={props.event.resource?.classSession as number} onSelect={(e, key) => {
                                            console.log(e);
                                        }} />
                                    </span>
                                </div>
                                <div className={styles.flex}>
                                    <span className={styles.icon}>
                                        {/* {MapIconKey[KEY_ICON.ROLE]} Role: {mapRoleToString[props.event.resource?.role as ROLE_TEACHER]} */}
                                        {MapIconKey[KEY_ICON.ROLE]} Role: <SelectRole size="small" />
                                    </span>
                                    <span className={styles.icon}>
                                        {MapIconKey[KEY_ICON.HOURGLASS]} Số giờ chấm công: {props.event.resource?.timeChecked}h
                                    </span>
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </ModalCustomize>
        </div>
    )
}

export default EventPopup;