import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_ROUND_CREATE_COMMENTS_CANDIDATE } from "../actions";
import { METHOD } from "@/global/enum";

export const queryCreateComment = createRequest(QUERY_ROUND_CREATE_COMMENTS_CANDIDATE, '/api/v1/recruitment/round/comment', METHOD.POST);
const createComment = createSliceReducer('createComment');
export default createComment.reducer;