import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_LIST_CLASS } from "../actions";
import { METHOD } from "@/global/enum";

export const queryGetListClass: any = createRequest(QUERY_GET_LIST_CLASS, '/api/v1/class', METHOD.GET);
const listClass = createSliceReducer('listClass', queryGetListClass);
export default listClass.reducer;