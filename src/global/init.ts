import { ClassForm, Gender, ROLE_TEACHER, STATUS_CLASS, Weekday } from "./enum";

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
const getClassForm: Record<ClassForm, string> = {
    HYBRID: 'Hybrid',
    OFFLINE: 'Offline',
    ONLINE: 'Online'
}
const getOrderWeekday: Record<Weekday, number> = {
    T2: 1,
    T3: 2,
    T4: 3,
    T5: 4,
    T6: 5,
    T7: 6,
    CN: 7,
}
const mapRoleToString: Record<ROLE_TEACHER, string> = {
    MT: 'Mentor',
    SP: 'Suppoter',
    ST: 'Super Teacher'
}
const getStringGender: Record<Gender, string> = {
    M: 'Nam',
    FM: 'Nữ',
    NA: 'Khác'
}
export {
    statusClass,
    fieldFilter,
    mapStatusToString,
    getColorFromStatusClass,
    getClassForm,
    getOrderWeekday,
    mapRoleToString,
    getStringGender
}