const CombineRoute = {
  EMPTY: "/empty",
  TE: {
    OVERVIEW: "/te/over-view",
    RECRUITMENT: "/te/manager/recruitment",
    CALENDAR_INTERVIEW: "/te/manager/calendar-interview",
    RECRUITMENT_DETAIL_CANDIDATE: "/te/manager/recruitment/[candidateId]",
    RECRUITMENT_CREATE_CANDIDATE: "/te/manager/recruitment/create-candidate",
    MANAGER: {
      CLASS: "/te/manager/class",
      REQUEST_CLASS: "/te/manager/class/request-class",
      DETAILCLASS: "/te/manager/class/detail/[classId]",
      SAVE: "/te/manager/save",
      FEEDBACK: "/te/manager/feedback",
      TEACHER: "/te/manager/teacher",
      DETAILTEACHER: "/te/manager/teacher/detail/[teacherId]",
      REQUEST_ONLEAVE: "/te/manager/teacher/request-on-leave",
      TEMPLATE_MAIL: "/te/manager/template-mail",
      STAFF: '/te/manager/staff',
      STAFF_INFO: '/te/manager/staff/[teId]',
      REPORT: '/te/manager/report',
      STORAGE: {
        DOCUMENT: '/te/manager/storage/document',
        COURSE: "/te/manager/storage/course",
        COURSE_DETAIL: "/te/manager/storage/course/[courseId]",
        TEST_COURSE: "/te/manager/storage/course/[courseId]/[courseLevelId]/test",
        TIME_WEEKDAY: '/te/manager/storage/time-weekday',
      }
    },
    MY_INFO: '/te/my-info',
    CALENDAR: "/te/calendar",
    SETTING: "/te/setting",
    HELP: "/te/help",
    LOCATION: "/te/location",
    AREA: "/te/area",
    TIMESCHEDULE: "/te/timeschedule",
    CS: {
      LIST: '/cs/list'
    }
  },
  TEACHER: {
    OVERVIEW: "/teacher/over-view",
    TEACHERINFO: "/teacher/teacher-info",
    RECRUITMENT: "/te/manager/recruitment",
    RECRUITMENT_DETAIL_CANDIDATE: "/te/manager/recruitment/[candidateId]",
    RECRUITMENT_CREATE_CANDIDATE: "/te/manager/recruitment/create-candidate",
    CLASS: "/teacher/class",
    COURSE: "/teacher/course",
    COURSE_DETAIL: "/teacher/course/[courseId]",
    DETAILCLASS: "/teacher/class/detail/[classId]",
    CALENDAR: "/teacher/calendar",
    SETTING: "/te/setting",
    HELP: "/te/help",
    LOCATION: "/teacher/location",
    TIMESCHEDULE: "/te/timeschedule",
    GENERAL_DOCUMENT: '/teacher/general-document',
    TEACHER_EVALUATE: '/teacher/evaluate'
  },
  CS: {
    LIST: '/cs/list',
    EXECUTIVE: '/cs/executive',
    CLASS: {
      LIST: '/cs/class',
      DETAIL: '/cs/class/[classId]',
      REQUEST: '/cs/class/request-class'
    },
    FEEDBACK: "/cs/feedback"
  }
};
export default CombineRoute;
