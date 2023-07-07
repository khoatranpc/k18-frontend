import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_CURRENT_DATA_BOOK_TEACHER } from "../actions";
import { METHOD } from "@/global/enum";

export const queryGetCurrentBookTeacher: any = createRequest(QUERY_GET_CURRENT_DATA_BOOK_TEACHER, '/api/v1/book-teacher/$params', METHOD.GET);
const bookTeacher = createSliceReducer('bookTeacher', queryGetCurrentBookTeacher);
export default bookTeacher.reducer;