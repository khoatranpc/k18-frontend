import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { UPDATE_ACCOUNT } from "../actions";

export const queryUpdateAccount = createRequest(UPDATE_ACCOUNT, '/api/v1/account/$params', METHOD.PUT)
const updateAccount = createSliceReducer("updateAccount", queryUpdateAccount);
export const clearUpdateAccount = createAction<void, string>(`${updateAccount.name}/clear`);
export default updateAccount.reducer;