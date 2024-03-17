import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { CREATE_TE } from "../actions";

export const queryCreateTe = createRequest(CREATE_TE, '/api/v1/te/new-te', METHOD.POST);
const createTe = createSliceReducer("createTe", queryCreateTe);

export const clearCreateTE = createAction<void, string>(`${createTe.name}/clear`);
export default createTe.reducer;