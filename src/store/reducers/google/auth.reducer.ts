import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { GOOGLE_AUTH } from "../actions";

export const queryGoogleAuth = createRequest(GOOGLE_AUTH, '/api/v1/google/auth', METHOD.GET);
const googleAuth = createSliceReducer('googleAuth', queryGoogleAuth);
export const clearGoogleAuth = createAction<void, string>(`${googleAuth.name}/clear`);
export default googleAuth.reducer;