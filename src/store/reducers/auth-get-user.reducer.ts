import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { State } from "@/global/interface";
import { METHOD } from "@/global/enum";
import { GET_TOKEN_LOGIN } from "./actions";
import { createAction } from "@reduxjs/toolkit";

export const queryToken = createRequest(GET_TOKEN_LOGIN, '/api/v1/account', METHOD.POST);

const getToken = createSliceReducer('userInfo', queryToken, {
    clear: (state: State) => {
        state.state.response = null;
    }
});

export const clearToken = createAction<void, string>(`${getToken.name}/clear`);
export default getToken.reducer;