import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { VERIFY_TOKEN_FOR_GET_INFO } from "./actions";
import { METHOD } from "@/global/enum";
import { State } from "@/global/interface";
import { createAction } from "@reduxjs/toolkit";

export const queryGetCrrUserInfo: any = createRequest(VERIFY_TOKEN_FOR_GET_INFO, '/api/v1/auth/personal-info', METHOD.GET);
const getCrrUserInfo = createSliceReducer('crrUserInfo', queryGetCrrUserInfo, {
    logout: (state: State) => {
        state.state.response = null;
    }
});

export const logout = createAction<void, string>(`${getCrrUserInfo.name}/logout`);
export default getCrrUserInfo.reducer;