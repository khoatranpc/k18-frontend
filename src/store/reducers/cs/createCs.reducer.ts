import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { CREATE_CS } from "../actions";

export const queryCreateCs = createRequest(CREATE_CS, '/api/v1/cs', METHOD.POST);
const createCs = createSliceReducer('createCs', queryCreateCs);
export const clearCreateCs = createAction<void, string>(`${createCs.name}/clear`);
export default createCs.reducer;