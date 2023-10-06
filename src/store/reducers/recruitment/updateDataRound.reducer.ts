import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_INFO_ROUND_PROCESS_CANDIDATE } from "../actions";

export const queryUpdateDataRoundProcessCandidate = createRequest(QUERY_UPDATE_INFO_ROUND_PROCESS_CANDIDATE, '/api/v1/recruitment/round/$params', METHOD.PUT);
const updateDataRoundProcessCandidate = createSliceReducer('updateDataRoundProcessCandidate', queryUpdateDataRoundProcessCandidate);
export default updateDataRoundProcessCandidate.reducer;