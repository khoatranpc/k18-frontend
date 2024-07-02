import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CREATE_TEACHER } from "../actions";
import { METHOD } from "@/global/enum";
import { createAction } from "@reduxjs/toolkit";
export const queryCreateTeacher = createRequest(QUERY_CREATE_TEACHER, "/api/v1/teacher/create", METHOD.POST)
const createTeacher = createSliceReducer("createTeacher", queryCreateTeacher);


export const clearCreateTeacher = createAction(`${createTeacher.name}/clear`)

export default createTeacher.reducer;