import message from './global-reducer/message';
import test from './test.reducer';
import queryGetTokenUser from './auth-get-token.reducer';
import getCrrUserInfo from './user-info.reducer';
import courses from './course.reducer';
import registerPreTeacher from './registerPreTeacher.reducer';
import getDataRoute from './global-reducer/route';
import listClass from './class/listClass.reducer';
import listCourse from './course/listCourse.reducer';
import timeSchedule from './timeSchedule.reducer';
import createClass from './class/createClass.reducer';
import bookTeacher from './class/bookTeacher.reducer';
import addRequestBookTeacher from './class/addRequestBookTeacher.reducer';
import detailClass from './class/detailClass.reducer';
import handleTeacherInRecordBT from './class/handleTeacherInRecordBT.reducer';
import locations from './location/localtion.reducer';
import searchTeacher from './searchTeacher.reducer';
import classSession from './class/classSesesion.reducer';
import classTeacherPoint from './class/classTeacherPoint.reducer';
import updateClassBasicInfor from './class/updateClassBasicInfor.reducer';
import listTeacher from './teacher/listTeacher.reducer';
import teacherRegisterCourse from './teacher/teacherRegisterCourse.reducer';
import detailTeacher from './teacher/detailTeacher.reducer';
import teacherSchedule from './teacher/teacherSchedule.reducer';
import getClassTeacherRegister from './teacher/getClassTeacherRegister.reducer';
import preTeacher from './teacher/preTeacher.reducer';
import acceptPreTeacher from './teacher/acceptPreTeacher.reducer';
import attendanceTeacherInClassSession from './class/attendanceTeacherInClassSession.reducer';
import listClassActionFeedback from './feedback/listClass.reducer';
import updateClassForFeedback from './feedback/updateClassForFeedback.reducer';
import listClassInFormFeedback from './feedback/listClassInGetFeedback.reducer';
import listGroupClassInFormFeedback from './feedback/listGroupInFormFeedback.reducer';
import responseFeedback from './feedback/responseFeedback.reducer';
import listResponseFeedback from './feedback/listResponseFeedback.reducer';
import listResponseFeedbackForTeacher from './feedback/listResponseFeedbackForTeacher.reducer';
import recruitment from './recruitment/recruitment.reducer';
import detailCandidate from './recruitment/detailCandidate.reducer';

const rootReducer = {
    test: test,
    message: message,
    token: queryGetTokenUser,
    crrUserInfo: getCrrUserInfo,
    courses: courses,
    registerPreTeacher,
    getDataRoute,
    listClass,
    timeSchedule,
    listCourse,
    createClass,
    locations,
    bookTeacher,
    addRequestBookTeacher,
    detailClass,
    searchTeacher,
    handleTeacherInRecordBT,
    classSession,
    updateClassBasicInfor,
    listTeacher,
    teacherRegisterCourse,
    teacherSchedule,
    attendanceTeacherInClassSession,
    listClassActionFeedback,
    updateClassForFeedback,
    listClassInFormFeedback,
    listGroupClassInFormFeedback,
    responseFeedback,
    listResponseFeedback,
    detailTeacher,
    getClassTeacherRegister,
    preTeacher,
    acceptPreTeacher,
    listResponseFeedbackForTeacher,
    classTeacherPoint,
    recruitment,
    detailCandidate
};
export default rootReducer;