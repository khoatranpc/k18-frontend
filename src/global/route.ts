const CombineRoute = {
    EMPTY: '/empty',
    TE: {
        OVERVIEW: '/te/over-view',
        RECRUITMENT: '/te/recruitment',
        MANAGER: {
            CLASS: '/te/manager/class',
            DETAILCLASS: '/te/manager/class/detail/[classId]',
            COURSE: '/te/manager/course',
            SAVE: '/te/manager/save',
            FEEDBACK: '/te/manager/feedback',
            TEACHER: '/te/manager/teacher',
            TEACHERRANK: '/te/manager/teacher/rank',
            TEACHERSALARY: '/te/manager/teacher/salary',
            DETAILTEACHER: '/te/manager/teacher/detail/[teacherId]'
        },
        CALENDAR: '/te/calendar',
        SETTING: '/te/setting',
        HELP: '/te/help',
        LOCATION: '/te/location',
        TIMESCHEDULE: '/te/timeschedule',
    }
};
export default CombineRoute;