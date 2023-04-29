import message from './global-reducer/message';
import test from './test.reducer';
import queryGetTokenUser from './auth-get-token.reducer';
import getCrrUserInfo from './user-info.reducer';

const rootReducer = {
    test: test,
    message: message,
    token: queryGetTokenUser,
    crrUserInfo: getCrrUserInfo
};
export default rootReducer;