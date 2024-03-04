import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { GOOGLE_REDIRECT } from "../actions";

export const queryGoogleRedirect = createRequest(GOOGLE_REDIRECT, '/api/v1/google/redirect', METHOD.GET);
const googleRedirect = createSliceReducer('googleRedirect', queryGoogleRedirect);
export const clearGoogleRedirect = createAction<void, string>(`${googleRedirect.name}/clear`);
export default googleRedirect.reducer;