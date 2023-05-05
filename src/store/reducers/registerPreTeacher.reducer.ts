import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_REGISTER_PRETEACHER } from "./actions";
import { METHOD } from "@/global/enum";

export const queryRegisterPreTeacher = createRequest(QUERY_REGISTER_PRETEACHER, '/api/v1/pre-teacher', METHOD.POST);
const registerPreTeacher = createSliceReducer('registerFormCollection', queryRegisterPreTeacher);
export default registerPreTeacher.reducer;