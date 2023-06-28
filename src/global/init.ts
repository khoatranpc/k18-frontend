import { StateRoute } from "@/store/reducers/global-reducer/route";
import { STATUS_CLASS } from "./enum";

const statusClass: Record<STATUS_CLASS, STATUS_CLASS> = {
    RUNNING: STATUS_CLASS.RUNNING,
    DROP: STATUS_CLASS.DROP,
    FINISH: STATUS_CLASS.FINISH,
    PREOPEN: STATUS_CLASS.PREOPEN
}
const fieldFilter = {
    SUBJECT: 'SUBJECT',
    STATUS: 'STATUS',
    CODE_CLASS_LEVEL: 'CODE_CLASS_LEVEL',
    STYLE: 'STYLE',
    TEACHER: 'TEACHER',
    OPEN_SCHEDULE: 'OPEN_SCHEDULE',
    TIME_SCHEDULE: 'TIME_SCHEDULE'
};
const mapStatusToString: Record<STATUS_CLASS, string> = {
    RUNNING: 'Đang học',
    DROP: 'Huỷ',
    FINISH: 'Kết thúc',
    PREOPEN: 'Sắp mở'
};
const getColorFromStatusClass: Record<STATUS_CLASS, string> = {
    RUNNING: '#00FF00',
    DROP: '#CF575A',
    FINISH: '#B4A7D6',
    PREOPEN: '#FF9902'
}
export {
    statusClass,
    fieldFilter,
    mapStatusToString,
    getColorFromStatusClass
}