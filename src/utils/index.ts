import { v4 as uid } from 'uuid';
import { format } from 'date-fns';
import { Obj, RowData } from '@/global/interface';

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
export {
    uuid,
    listMonth,
    sortByString,
    logout,
    formatDatetoString,
    generateRowDataForMergeRowSingleField
}