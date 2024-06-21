import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_LIST_BOOK_TEACHER } from "../actions";

export const queryGetBookTeacher = createRequest(QUERY_GET_LIST_BOOK_TEACHER, '/api/v1/book-teacher', METHOD.GET);
const getBookTeacher = createSliceReducer('getBookTeacher', queryGetBookTeacher);

export default getBookTeacher.reducer;