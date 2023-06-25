import React from "react";
import { createAction } from "@reduxjs/toolkit";
import { State } from "@/global/interface";
import { KEY_ICON } from "@/global/enum";
import { createSliceReducer } from "@/utils/redux-toolkit";

export interface StateRoute {
    route: string;
    title: string;
    breadCrumb?: Array<{
        title: string;
        route: string;
    }>;
    icon?: KEY_ICON;
}
export interface PayloadRoute {
    payload: StateRoute;
}
const getDataRoute = createSliceReducer('dataRoute', undefined, {
    init: (state: State, action?: PayloadRoute) => {
        state.state = {
            ...state.state,
            response: {
                ...(action ? action.payload : {})
            }
        }
    }
});
export const initDataRoute = createAction<PayloadRoute, string>(`${getDataRoute.name}/init`);
export default getDataRoute.reducer;
