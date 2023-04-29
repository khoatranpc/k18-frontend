import { createAction } from "@reduxjs/toolkit";
import { Obj, State } from "@/global/interface";
import { createSliceReducer } from "@/utils/redux-toolkit";

const message = createSliceReducer('message', undefined, {
    openMessage(state: State, action) {
        state.state.response = action?.payload;
    },
    clearMessage(state: State) {
        state.state.response = null;
    }
});
export const openMessage = createAction<Obj, string>(`${message.name}/openMessage`);
export const clearMessage = createAction<void, string>(`${message.name}/clearMessage`);
export default message.reducer;