import React, { useMemo } from 'react';
import { Formats, Calendar as ReactBigCalendar, momentLocalizer, ToolbarProps } from 'react-big-calendar';
import moment from 'moment';
import { getWeekday } from '@/utils';
import Toolbar from './Toolbar';
import styles from '@/styles/Calendar.module.scss';

const localizer = momentLocalizer(moment) // or globalizeLocalizer

interface Props {
    className?: string;
}
const Calendar = (props: Props) => {
    const formats: Formats = useMemo(() => {
        return {
            weekdayFormat: (date: Date) => {
                return getWeekday(date.getDay(), true) as string;
            },
            monthHeaderFormat: (date, culture, localizer) => {
                return localizer?.format(date, 'MM yyyy', culture) as string;
            }
        }
    }, []);
    return (
        <div className={`${styles.calendar} calanderCustomize h-100 ${props.className ? props.className : ''}`}>
            <ReactBigCalendar
                localizer={localizer}
                formats={formats}
                components={{
                    toolbar: Toolbar
                }}
            />
        </div>
    )
}

export default Calendar;