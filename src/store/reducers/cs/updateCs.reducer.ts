import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { UPDATE_CS } from "../actions";
import { METHOD } from "@/global/enum";
import { createAction } from "@reduxjs/toolkit";

export const queryUpdateCs = createRequest(UPDATE_CS, '/api/v1/cs/$params', METHOD.PUT);
const updateCs = createSliceReducer('updateCs', queryUpdateCs);

export const clearUpdateCs = createAction<void, string>(`${updateCs.name}/clear`);
export default updateCs.reducer;