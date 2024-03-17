import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CREATE_TIME_SCHEDULE } from "../actions";

export const queryCreateTimeSchedule = createRequest(QUERY_CREATE_TIME_SCHEDULE, '/api/v1/time-schedule', METHOD.POST);
const createTimeSchedule = createSliceReducer("createTimeSchedule", queryCreateTimeSchedule);

export const clearCreateTimeSchedule = createAction<void, string>(`${createTimeSchedule.name}/clear`);
export default createTimeSchedule.reducer;