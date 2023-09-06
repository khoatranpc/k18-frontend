import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CREATE_LEVEL_COURSE } from "../actions";

export const queryCreateLevelCourse = createRequest(QUERY_CREATE_LEVEL_COURSE, '/api/v1/course/level', METHOD.POST);
const createLevelCourse = createSliceReducer('createLevelCourse', queryCreateLevelCourse);
export default createLevelCourse.reducer;