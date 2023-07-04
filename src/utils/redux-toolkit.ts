import { AsyncThunk, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "@/global/interface";
import { METHOD } from "@/global/enum";
import { initState } from "@/global/init-data";
import actionRequest from "./restApi";

interface Reducer {
    [k: string]: (state: any, action?: PayloadAction<any>) => void
}

const createRequest = (type: string, api: string, method: METHOD) => {
    return createAsyncThunk(type, async (action: Action | any) => {
        const rs = await actionRequest(api, method, action);
        return rs.data;
    })
}
const createSliceReducer = (nameState: string, asyncThunk?: AsyncThunk<any, Action | undefined, any> | undefined, reducers?: Reducer) => {
    return createSlice({
        initialState: initState,
        name: nameState,
        reducers: reducers || {},
        ...asyncThunk ? {
            extraReducers(builder) {
                builder.addCase(asyncThunk.pending, (state: any, _) => {
                    state.state = {
                        ...state.state,
                        isLoading: true,
                    }
                })
                builder.addCase(asyncThunk.fulfilled, (state: any, action) => {
                    state.state = {
                        isLoading: false,
                        response: {
                            ...action.payload,
                        },
                        success: action.payload.status
                    }
                })
                builder.addCase(asyncThunk.rejected, (state: any, _) => {
                    state.state = {
                        isLoading: false,
                        response: {
                            data: null,
                            message: 'Có lỗi xảy ra!',
                            status: false
                        },
                        success: false
                    }
                })
            },
        } : {}
    })
}
export {
    createRequest,
    createSliceReducer
};