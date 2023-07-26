import React, { useState } from 'react';
import { EventWrapperProps } from 'react-big-calendar';
import { EventCalendar } from '@/global/interface';
import { formatDatetoString } from '@/utils';
import { StatusEvent, getColor } from '../Note/styles';
import EventPopup from './EventPopup';
import styles from '@/styles/Calendar.module.scss';

interface Props extends EventWrapperProps<EventCalendar> {
    isTeacherCalendar?: boolean;
}
const EventWrapper = (props: Props) => {
    // console.log(props.isTeacherCalendar);
    const [eventPopup, setEventPopup] = useState<{
        show: boolean;
        idEvent: string
    }>({
        show: false,
        idEvent: props.event.id as string
    });
    return (
        <>
            <div
                className={`${styles.eventWrapper} ${props.event.allDay ? styles.allDay : ''} ${eventPopup.show && eventPopup.idEvent === props.event.id ? styles.showModal : ''} eventWrapper`}
                style={{ backgroundColor: props.event.allDay ? getColor[props.event.status as StatusEvent] : '', top: `${props.style?.top}%`, width: `${props.style?.width}%`, height: `${props.style?.height}%` }}
                onClick={() => {
                    setEventPopup({
                        ...eventPopup,
                        show: true
                    });
                }}
            >
                <div className={styles.title}>
                    {
                        props.event.allDay ? props.event.title :
                            <div className={styles.workEachTime}>
                                <button className={styles.status} style={{ backgroundColor: getColor[props.event.status as StatusEvent] }}></button>
                                <span className={styles.timeWorkTitle}>
                                    {formatDatetoString(props.event.start, 'HH:mm a')}
                                    <span className={styles.titleUnit}>{props.event.title}</span>
                                </span>
                            </div>
                    }
                </div>
            </div>
            {
                eventPopup.show && eventPopup.idEvent === props.event.id && <EventPopup
                    isTeacherCalendar={props.isTeacherCalendar}
                    onHide={() => {
                        setEventPopup({
                            ...eventPopup,
                            show: false
                        });
                    }}
                    event={props.event}
                    show={eventPopup.show}
                    status={StatusEvent.ACTIVE}
                />
            }
        </>
    )
}

export default EventWrapper;