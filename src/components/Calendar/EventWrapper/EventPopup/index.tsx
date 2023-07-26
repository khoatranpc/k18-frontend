import React from 'react';
import { MapIconKey } from '@/global/icon';
import { ComponentPage, KEY_ICON, ROLE_TEACHER, STATUS_CLASS } from '@/global/enum';
import SelectLocation from '@/components/SelectLocation';
import { EventCalendar, Obj } from '@/global/interface';
import CombineRoute from '@/global/route';
import { formatDatetoString, getWeekday } from '@/utils';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import ModalCustomize from '@/components/ModalCustomize';
import { StatusEvent, getColor } from '../../Note/styles';
import { getStringStatusEvent } from '../../Note';
import SelectInputNumber from '@/components/SelectInputNumber';
import SelectRole from '@/components/SelectRole';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import TitleHeader from '@/components/ManagerClass/TitleHeader';
import { TabDetailClass } from '@/components/ManagerClass/Detail';
import styles from '@/styles/Calendar.module.scss';
import { mapRoleToString } from '@/global/init';

interface Props {
    show: boolean;
    event: EventCalendar;
    status: StatusEvent;
    isTeacherCalendar?: boolean;
    onHide?: () => void;
}
const EventPopup = (props: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const recordData = props.event.resource;
    const handleSwitchRouterClassDetail = () => {
        const payloadRoute: PayloadRoute = {
            payload: {
                component: ComponentPage.OVERVIEW,
                route: CombineRoute['TE']['MANAGER']['DETAILCLASS'],
                replaceTitle: <TitleHeader tabDetail={TabDetailClass.OVERVIEW} editTitle title={(recordData?.classSessionId as unknown as Obj).classId.codeClass as string} dateStart={formatDatetoString(new Date(recordData?.classSessionId.classId.dayRange.start as Date), 'dd/MM/yyyy')} statusClass={recordData?.classSessionId.classId.status as STATUS_CLASS} />,
                title: '',
                hasBackPage: true
            }
        }
        dispatch(initDataRoute(payloadRoute));
        router.push(`/te/manager/class/detail/${recordData?.classSessionId.classId._id}`)
    }
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
                    <h2 className={`title`} onClick={() => {
                        if (props.isTeacherCalendar) {
                            handleSwitchRouterClassDetail()
                        }
                    }}>{props.event.title}</h2>
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
                                            title={recordData?.classSessionId.locationId.locationCode || ''}
                                            sizeButton='small'
                                            className={styles.pickLocationEvent}
                                            selectClassName={styles.selectLocation}
                                        />
                                    </span>
                                    <span className={styles.icon}>
                                        {MapIconKey[KEY_ICON.CLOCK]} Buổi số: <SelectInputNumber value={recordData?.classSessionId.sessionNumber as number} onSelect={(e, key) => {
                                            console.log(e);
                                        }} />
                                    </span>
                                </div>
                                <div className={styles.flex}>
                                    <span className={styles.icon}>
                                        {MapIconKey[KEY_ICON.ROLE]} Role: <SelectRole size="small" title={mapRoleToString[recordData?.role as ROLE_TEACHER]} />
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