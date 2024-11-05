import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";

export const querySendLark = createRequest('QUERY_SEND_LARK', '/api/v1/lark', METHOD.POST);
const sendLark = createSliceReducer('sendLark', querySendLark);

export default sendLark.reducer;