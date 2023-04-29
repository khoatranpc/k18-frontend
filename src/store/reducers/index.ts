import message from './global-reducer/message';
import test from './test.reducer';
import queryGetTokenUser from './auth-get-user.reducer';

const rootReducer = {
    test: test,
    message: message,
    token: queryGetTokenUser
};
export default rootReducer;