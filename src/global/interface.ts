import React from "react";
import { KEY_ICON } from "./enum";

export interface Action {
    type?: string;
    isLoading?: boolean;
    componentId?: string;
    payload?: {
        success?: string;
        failed?: string;
        query?: Query
    },
    response?: Record<string, unknown> | null;
    success?: boolean;
}
export interface State {
    state: Action
}
export interface Obj {
    [k: string]: {} | undefined | any;
}
export interface Query {
    body?: Obj;
    query?: {
        [k: string]: {} | undefined | any;
        fields?: Array<string>;
    };
    params?: Array<string>;
}
export interface TabRoute {
    route: string;
    title: React.ReactElement | string;
    text: string;
    key: string;
    keyIcon?: KEY_ICON;
    showIcon?: boolean;
}