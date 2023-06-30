import { v4 as uid } from 'uuid';
import { format } from 'date-fns';

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
export {
    uuid,
    listMonth,
    sortByString,
    logout,
    formatDatetoString
}