import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { uuid } from '@/utils';
import { Action, EventCalendar, Obj } from '@/global/interface';
import Calendar from '@/components/Calendar';
import { StatusEvent } from '@/components/Calendar/Note/styles';
import { ROLE_TEACHER } from '@/global/enum';
import { useTeacherTimeSchedule } from '@/utils/hooks';

const enddate = new Date();
enddate.setDate((new Date()).getDate() + 4);

const Schedule = () => {
    const timeSchedule = useTeacherTimeSchedule();
    const router = useRouter();
    useEffect(() => {
        if (!timeSchedule.listSchedule.response) {
            const payload: Action = {
                payload: {
                    query: {
                        query: {
                            year: 2023,
                            month: 7,
                            option: 'MONTH'
                        },
                        params: [router.query.teacherId as string]
                    }
                }
            }
            timeSchedule.queryGetListTeacherSchedule(payload);
        }
    }, []);
    const mapScheduleForCalendar: EventCalendar[] = (timeSchedule.listSchedule.response?.data as Array<Obj>)?.map((item) => {
        const currentDateSchedule = new Date((item.classSessionId as Obj).date as Date);
        // set start time:
        const getTimeStart = (((item.classSessionId as Obj).weekdayTimeScheduleId)?.start as string).split(' ')[0];
        currentDateSchedule.setHours(Number(getTimeStart.split('h')[0]));
        currentDateSchedule.setMinutes(Number(getTimeStart.split('h')[1]));
        const timeStart = new Date(currentDateSchedule);

        const getTimeEnd = (((item.classSessionId as Obj).weekdayTimeScheduleId)?.end as string).split(' ')[0];
        currentDateSchedule.setHours(Number(getTimeEnd.split('h')[0]));
        currentDateSchedule.setMinutes(Number(getTimeEnd.split('h')[1]));

        const timeEnd = new Date(currentDateSchedule);
        console.log(item);
        return {
            id: item._id,
            allDay: false,
            end: timeEnd,
            start: timeStart,
            title: item.classSessionId.classId.codeClass,
            status: item.checked,
            resource: {
                // statusClass: item.
            }
        }
    }) || [];
    return (
        <div className="h-100">
            <Calendar
                listEvent={mapScheduleForCalendar}
                enabledCalendarCard
                enabledCalendarNote
                isTeacherCalendar
            />
        </div>
    )
}

export default Schedule;