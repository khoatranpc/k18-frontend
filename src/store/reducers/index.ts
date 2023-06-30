import message from './global-reducer/message';
import test from './test.reducer';
import queryGetTokenUser from './auth-get-token.reducer';
import getCrrUserInfo from './user-info.reducer';
import courses from './course.reducer';
import registerPreTeacher from './registerPreTeacher.reducer';
import getDataRoute from './global-reducer/route';
import listClass from './class/listClass.reducer';

const rootReducer = {
    test: test,
    message: message,
    token: queryGetTokenUser,
    crrUserInfo: getCrrUserInfo,
    courses: courses,
    registerPreTeacher,
    getDataRoute,
    listClass
};
export default rootReducer;