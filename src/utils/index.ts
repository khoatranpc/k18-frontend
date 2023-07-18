import { v4 as uid } from 'uuid';
import { format } from 'date-fns';
import { Obj, RowData } from '@/global/interface';
import { Weekday } from '@/global/enum';

const uuid = () => {
    return uid() as string;
}
const listMonth = () => {
    const list = [];
    for (let i = 1; i <= 12; i++) {
        const newMonth = {
            key: `MONTH_${i}`,
            title: `Tháng ${i}`
        }
        list.push(newMonth);
    }
    return list;
}
const sortByString = (forthStr: string, behindStr: string) => {
    if (forthStr > behindStr) {
        return 1
    }
    if (forthStr < behindStr) {
        return -1
    }
    return 0;
}
const logout = () => {
    localStorage.removeItem('access_token');
    window.location.assign('/auth/login');
}
const formatDatetoString = (date: Date | string | number, formatString?: string) => {
    return format(new Date(date), formatString || 'MM/dd/yyyy');
}

const generateRowDataForMergeRowSingleField = (data: Obj, fieldForMerge: string): RowData[] => {
    const mapping: RowData[] = [];
    data.forEach((element: Obj) => {
        const arr = (element[fieldForMerge] as Array<Obj>);
        if (arr.length !== 0) {
            arr!.forEach((item, crrIndex) => {
                const catchedRecord = {
                    ...element,
                    key: uuid(),
                    [fieldForMerge]: {
                        ...item
                    },
                    rowSpan: (element[fieldForMerge] as Array<Obj>).length !== 0 ? (crrIndex === 0 ? (element[fieldForMerge] as Array<Obj>).length : 0) : 1,
                    recordId: element._id as string
                };
                mapping.push(catchedRecord);
            });
        } else {
            const record = {
                ...element,
                key: uuid(),
                recordId: element._id as string
            }
            mapping.push(record);
        }
    });
    return mapping;
}
const getWeekday = (day: number) => {
    switch (day) {
        case 1:
            return Weekday.T2;
        case 2:
            return Weekday.T3;
        case 3:
            return Weekday.T4;
        case 4:
            return Weekday.T5;
        case 5:
            return Weekday.T6;
        case 6:
            return Weekday.T7;
        case 7:
            return Weekday.CNB;
        default:
            return -1
    }
}
export {
    uuid,
    listMonth,
    sortByString,
    logout,
    formatDatetoString,
    generateRowDataForMergeRowSingleField,
    getWeekday
}