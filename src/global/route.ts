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
        },
        CALENDAR: '/te/calendar',
        SETTING: '/te/setting',
        HELP: '/te/help',
    }
};
export default CombineRoute;