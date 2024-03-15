import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_TIME_SCHEDULE } from "../actions";

export const queryUpdateTimeSchedule = createRequest(QUERY_UPDATE_TIME_SCHEDULE, '/api/v1/time-schedule/$params', METHOD.PUT);
const updateTimeSchedule = createSliceReducer("createTimeSchedule", queryUpdateTimeSchedule);

export const clearUpdateTimeSchedule = createAction<void, string>(`${updateTimeSchedule.name}/clear`);
export default updateTimeSchedule.reducer;