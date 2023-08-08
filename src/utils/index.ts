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
    return date ? format(new Date(date), formatString || 'MM/dd/yyyy') : '';
}

const generateRowDataForMergeRowSingleField = (data: Obj[], fieldForMerge: string): RowData[] => {
    const mapping: RowData[] = [];
    data.forEach((element: Obj) => {
        const arr = (element[fieldForMerge] as Array<Obj>);
        if (arr.length !== 0) {
            arr.forEach((item, crrIndex) => {
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
const getWeekday = (day: number, vi?: boolean, short?: boolean) => {
    if (short) {
        switch (day) {
            case 1:
                return "T2";
            case 2:
                return "T3";
            case 3:
                return "T4";
            case 4:
                return "T5";
            case 5:
                return "T6";
            case 6:
                return "T7";
            case 7:
                return "CN";
            default:
                return "CN"
        }
    } else if (!vi) {
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
    } else {
        switch (day) {
            case 1:
                return "TH 2";
            case 2:
                return "TH 3";
            case 3:
                return "TH 4";
            case 4:
                return "TH 5";
            case 5:
                return "TH 6";
            case 6:
                return "TH 7";
            case 7:
                return "CN";
            default:
                return "CN"
        }
    }
}
const formatNumberPhone = (str: string) => {
    let getString = '';
}
const getColor3Point = (point: number) => {
    const MAXPOINT = 5;
    const getRatePoint = Math.round(MAXPOINT / 2);
    if (point > getRatePoint) {
        return '#02bf34';
    } else if (2 < point && point <= getRatePoint) {
        return '#FF9902';
    }
    return '#CF575A';
}
export {
    uuid,
    listMonth,
    sortByString,
    logout,
    formatDatetoString,
    generateRowDataForMergeRowSingleField,
    getWeekday,
    getColor3Point
}