import React, { useMemo } from 'react';
import { Components, DateLocalizer, Formats, NavigateAction, Calendar as ReactBigCalendar, View } from "react-big-calendar";
import { EventCalendar } from '@/global/interface';
import Toolbar from './Toolbar';
import styles from '@/styles/Calendar.module.scss';
import { getWeekday } from '@/utils';

interface Props {
    localizer: DateLocalizer;
    date: Date;
    onNavigate?: (newDate: Date, view: View, action: NavigateAction) => void;
    onClickDay?: (date: Date, view: View) => void;
    onView?: (view: View) => void;
}
const CardCalendar = (props: Props) => {
    const components: Components<EventCalendar, object> = useMemo(() => {
        return {
            toolbar: Toolbar,
        }
    }, []);
    const formats: Formats = useMemo(() => {
        return {
            monthHeaderFormat: (date, culture, localizer) => {
                return localizer?.format(date, 'MM yyyy', culture) as string;
            },
            weekdayFormat: (date: Date) => {
                return getWeekday(date.getDay(), true, true) as string;
            }
        }
    }, []);
    return (
        <div
            className={`${styles.cardCalendar} cardCalendar`}
            style={{
                width: '100%',
                height: '45%'
            }}>
            <ReactBigCalendar
                onNavigate={(newDate, view, action) => {
                    props.onNavigate?.(newDate, view, action);
                }}
                onView={(view) => {
                    props.onView?.(view);
                }}
                defaultDate={props.date}
                localizer={props.localizer}
                components={components}
                view='month'
                formats={formats}
                onDrillDown={props.onClickDay}
            />
        </div>
    )
}

export default CardCalendar;