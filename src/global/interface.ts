import React from "react";
import { ComponentPage, KEY_ICON, PositionTe, ROLE_TEACHER, STATUS_CLASS } from "./enum";
import { TableColumnsType } from "antd";
import { StatusEvent } from "@/components/Calendar/Note/styles";

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
        fields?: Array<string> | string;
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
    component?: ComponentPage;
    positionTE?: PositionTe;
    notRouting?: boolean;
    className?: string;
}
export interface Columns extends TableColumnsType<Record<string, unknown>> {

}
export interface RowData extends Record<string, any> {
    key: string;
}
export interface BaseInterfaceHookReducer extends Obj {
    data: Obj | Action;
    query?: (params: string | Array<string> | Obj) => void;
}
export interface EventCalendar {
    id?: string;
    title: string,
    start: Date,
    end: Date,
    allDay: boolean;
    status?: StatusEvent;
    resource?: {
        /**
         * @description
         * Status class with enum STATUS_CLASS
         */
        statusClass?: STATUS_CLASS
        /**
         * @description
         * For Teacher schedule
         */
        location?: string,
        /**
         * @description
         * For Teacher schedule
        */
        classSession?: number,
        /**
          * @description
          * For Teacher schedule
        */
        role?: ROLE_TEACHER,
        /**
            * @description
            * For Teacher schedule
          */
        checked?: boolean,
        /**
          * @description
          * For Teacher schedule
        */
        timeChecked?: number,
        [key: string]: any
    };
    [key: string]: any
}