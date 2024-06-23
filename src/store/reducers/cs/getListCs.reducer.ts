import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { LIST_CS } from "../actions";

export const queryListCs = createRequest(LIST_CS, '/api/v1/cs', METHOD.GET);
const listCs = createSliceReducer('listCs', queryListCs);

export default listCs.reducer;