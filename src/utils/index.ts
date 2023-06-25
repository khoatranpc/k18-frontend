import { v4 as uid } from 'uuid';

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
export {
    uuid,
    listMonth
}