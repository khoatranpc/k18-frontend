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
import locations from './location/localtion.reducer';

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
    detailClass
};
export default rootReducer;