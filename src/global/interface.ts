import React from "react";
import { ComponentPage, KEY_ICON } from "./enum";
import { TableColumnsType } from "antd";

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
    key: string;
    keyIcon?: KEY_ICON;
    showIcon?: boolean;
    indexRoute: string;
    disable?: boolean;
    replaceTitle?: React.ReactElement | string;
    noReplaceTitle?: boolean;
    component: ComponentPage;
    notRouting?: boolean;
}
export interface Columns extends TableColumnsType<Record<string, unknown>> {

}
export interface RowData extends Record<string, unknown> {
    key: string;
}
export interface BaseInterfaceHookReducer {
    data: Obj | Action;
    query?: (params: string | Array<string> | Obj) => void;
}