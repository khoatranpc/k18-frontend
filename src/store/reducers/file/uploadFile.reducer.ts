import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPLOAD_FILE } from "../actions";
import { METHOD } from "@/global/enum";

export const queryUploadFile = createRequest(QUERY_UPLOAD_FILE, '/api/v1/upload', METHOD.POST);
const uploadFile = createSliceReducer('uploadFile', queryUploadFile);
export default uploadFile.reducer;