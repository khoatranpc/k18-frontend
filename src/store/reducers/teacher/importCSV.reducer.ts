import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { TEACHER_IMPORT_CSV } from "../actions";

export const queryImportCSV = createRequest(TEACHER_IMPORT_CSV, '/api/v1/teacher/import', METHOD.POST);
const teacherImportCSV = createSliceReducer('teacherImportCSV', queryImportCSV);

export const clearTeacherIpmortCSV = createAction(`${teacherImportCSV.name}/clear`);
export default teacherImportCSV.reducer;