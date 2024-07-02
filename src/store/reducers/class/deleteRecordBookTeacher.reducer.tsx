import { createAction } from "@reduxjs/toolkit";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_DELETE_DATA_BOOK_TEACHER } from "../actions";
import { METHOD } from "@/global/enum";

export const queryDeleteRecordBookTeacher = createRequest(QUERY_DELETE_DATA_BOOK_TEACHER, '/api/v1/book-teacher/$params', METHOD.DELETE);
const deleteRecordBookTeacher = createSliceReducer('deleteRecordBookTeacher', queryDeleteRecordBookTeacher);

export const clearDeleteRecordBookTeacher = createAction<void, string>(`${deleteRecordBookTeacher.name}/clear`);
export default deleteRecordBookTeacher.reducer;