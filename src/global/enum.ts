export enum METHOD {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}
export enum ROLE_TEACHER {
    SP = 'SP',
    MT = 'MT',
    ST = 'ST'
}
export enum ROLE_USER {
    TE = 'TE',
    TC = 'TEACHER'
}
export enum KEY_ICON {
    OV = 'OV',
    RCM = 'RCM',
    TC = 'TC',
    HTS = 'HTS',
    CR = 'CR',
    FD = 'FD',
    MS = 'MS',
    CL = 'CL',
    ST = 'ST',
    IF = 'IF',
    SRCH = 'SRCH',
    ML = 'ML',
    PL = 'PL',
    EP = 'EP',
    PLCR = 'PLCR',
    DOT3VT = 'DOT3VT',
    DOT3HT = 'DOT3HT',
    SORT = 'SORT',
    CHEVRONU = 'CHEVRONU',
    CHEVROND = 'CHEVROND',
    CHEVRONR = 'CHEVRONR',
    CHEVRONRL = 'CHEVRONRL',
    CHEVRONL = 'CHEVRONL',
    ARROWL = 'ARROWL',
    HTSL = 'HTSL',
    PLB = 'PLB',
    FBK = 'FBK',
    ZOOM = 'ZOOM',
    DRIVE = 'DRIVE',
    RELOAD = 'RELOAD',
    LOCATION = 'LOCATION',
    EDIT = 'EDIT',
    CLOCK = 'CLOCK',
    TICK = 'TICK',
    CHEVRONLCAL = 'CHEVRONLCAL',
    TIMESCHEDULE = 'TIMESCHEDULE',
    ROLE = 'ROLE',
    HOURGLASS = 'HOURGLASS',
    TEACHER_MALE = 'TEACHER_MALE',
    TEACHER_FEMALE = 'TEACHER_FEMALE',
}
export enum STATUS_CLASS {
    RUNNING = 'RUNNING',
    DROP = 'DROP',
    PREOPEN = 'PREOPEN',
    FINISH = 'FINISH'
}
export enum TypeCount {
    INCR = 'INCR',
    DECR = 'DECR'
}
export enum ComponentPage {
    OVERVIEW = 'OVERVIEW',
    CLASS = 'CLASS',
    DETAILCLASS = 'DETAILCLASS',
    RECRUITMENT = 'RECRUITMENT',
    RECRUITMENT_DETAIL_CANDIDATE = 'RECRUITMENT_DETAIL_CANDIDATE',
    TEACHERS = 'TEACHERS',
    MANAGER_CLASS = 'MANAGER_CLASS',
    MANAGER_COURSE = 'MANAGER_COURSE',
    SAVE = 'SAVE',
    MANAGER_FEEDBACK = 'MANAGER_FEEDBACK',
    CALENDAR = 'CALENDAR',
    SETTING = 'SETTING',
    HELP = 'HELP',
    WELCOME = 'WELCOME',
    LOCATION = 'LOCATION',
    TIMESCHEDULE = 'TIMESCHEDULE',
    TEACHER = 'TEACHER',
    TEACHER_DETAIL = 'TEACHER_DETAIL',
    ATTENDANCE_TEACHER_CLASS = 'ATTENDANCE_TEACHER_CLASS'
}

export enum ClassForm {
    HYBRID = 'HYBRID',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
}
export enum Weekday {
    T2 = 'T2',
    T3 = 'T3',
    T4 = 'T4',
    T5 = 'T5',
    T6 = 'T6',
    T7 = 'T7',
    CNB = 'CN',
}
export enum Gender {
    M = 'M',
    FM = 'FM',
    NA = 'NA'
}
export enum ObjectTeach {
    K18 = 'K18',
    K12 = 'K12'
}
export enum StatusProcessing {
    // no process
    NOPROCESS = 'NOPROCESS',
    // processing
    PROCESSING = 'PROCESSING',
    // DONE
    DONE = 'DONE'
}
export enum ResourseApply {
    FB = 'FB',
    LKD = 'LKD',
    RF = 'RF',
    AN = 'AN'
}
export enum ResultInterview {
    PASS = 'PASS',
    NOTPASS = 'NOTPASS',
    PENDING = 'PENDING'
}
export enum LevelTechnique {
    INTERN = 'INTERN',
    FRESHER = 'FRESHER',
    JUNIOR = 'JUNIOR',
    MIDDLE = 'MIDDLE',
    SENIOR = 'SENIOR',
    LEADER = 'LEADER'
}
export enum Education {
    BACHELOR = 'BACHELOR',
    ENGINEER = 'ENGINEER',
    // thạc sĩ
    MASTER = 'MASTER',
    // tiến sĩ
    DOCTOR = 'DOCTOR'
}