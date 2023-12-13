import { ClassForm, Gender, LevelTechnique, ObjectTeach, PositionTe, ROLE_TEACHER, Region, ResourceApply, ResultInterview, RoundProcess, STATUS_CLASS, StatusProcessing, TemplateMail, Weekday } from "./enum";

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
    SP: 'Supporter',
    ST: 'Super Teacher'
}
const getStringGender: Record<Gender, string> = {
    MALE: 'Nam',
    FEMALE: 'Nữ',
    NA: 'Khác'
}
const getColorTeacherPoint = (teacherPoint: number) => {
    if (teacherPoint >= 2 && teacherPoint < 4) {
        return '#FF9902'
    } else if (teacherPoint >= 4) {
        return '#13734B'
    } else if (teacherPoint > 0 && teacherPoint < 2) {
        return '#CF575A'
    }
}
const getStringObjectTeach: Record<ObjectTeach, string> = {
    K12: 'Kid & teen',
    K18: '18+'
}
const getStringStatusProcess: Record<StatusProcessing, string> = {
    DONE: 'Đã xử lý',
    NOPROCESS: 'Chưa xử lý',
    PROCESSING: 'Đang xử lý'
}
const getStringResourceApply: Record<ResourceApply, string> = {
    AN: 'Khác',
    FB: "Facebook",
    LKD: "Linkedin",
    RF: 'Gợi ý (tham khảo)',
    TCV: 'Top CV'
}
const getStringResultInterview: Record<ResultInterview, string> = {
    NOTPASS: 'Trượt',
    PASS: 'Đạt',
    PENDING: 'Đợi xử lý'
}
const getColorByResultInterview: Record<ResultInterview, string> = {
    NOTPASS: '#C00000',
    PASS: '#69A84F',
    PENDING: '#F1C233'
}
const getStringByLevelTechnique: Record<LevelTechnique, string> = {
    INTERN: 'Intern',
    FRESHER: 'Fresher',
    JUNIOR: 'Junior',
    MIDDLE: 'Middle',
    SENIOR: 'Senior',
    LEADER: 'Leader'
}
const getLabelRoundProcess: Record<RoundProcess, string> = {
    CV: 'CV',
    CLASSIFY: 'Đánh giá',
    CLAUTID: 'Dự thính',
    DONE: 'Xong',
    INTERVIEW: 'Phỏng vấn',
    TEST: 'Dạy thử'
}
const getLabelPositionTe: Record<PositionTe, string> = {
    ASSISTANT: 'Trợ lý',
    HR: 'HR',
    LEADER: 'Leader',
    QC: 'QC'
}
const getLabelMailTemplate: Record<TemplateMail, string> = {
    FAILCV: 'Fail CV',
    FAILINTERVIEW: ' Fail PV',
    NOCONNECT: 'Không liên hệ được',
    PASSINTERVIEW: 'Pass PV'
}
const getLabelRegion: Record<Region, string> = {
    MB: 'Miền Bắc',
    MT: 'Miền Trung',
    MN: 'Miền Nam',
    ONL: 'Online'
}
export {
    statusClass,
    fieldFilter,
    mapStatusToString,
    getColorFromStatusClass,
    getClassForm,
    getOrderWeekday,
    mapRoleToString,
    getStringGender,
    getStringObjectTeach,
    getStringStatusProcess,
    getStringResourceApply,
    getStringResultInterview,
    getColorByResultInterview,
    getStringByLevelTechnique,
    getLabelRoundProcess,
    getLabelPositionTe,
    getLabelMailTemplate,
    getColorTeacherPoint,
    getLabelRegion
}