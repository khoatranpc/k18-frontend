import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { VERIFY_TOKEN_FOR_GET_INFO } from "./actions";
import { METHOD } from "@/global/enum";

export const queryGetCrrUserInfo = createRequest(VERIFY_TOKEN_FOR_GET_INFO, '/api/v1/auth/personal-info', METHOD.GET);
const getCrrUserInfo = createSliceReducer('crrUserInfo', queryGetCrrUserInfo);

export default getCrrUserInfo.reducer;