import React, { createContext } from "react";
import { RoundProcess, TemplateMail } from "@/global/enum";
import { Obj } from "@/global/interface";

const ConfirmContext = createContext<{
    show?: boolean,
    round: RoundProcess,
    onConfirm: (round: RoundProcess, confirm: boolean, mailTemplate?: TemplateMail, payload?: Obj) => void;
    title?: React.ReactElement | string;
    handleModal?: (show?: boolean, title?: React.ReactElement | string, type?: 'PASS' | 'FAIL') => void;
    type?: 'PASS' | 'FAIL'
}>({
    show: false,
    onConfirm(round, confirm) { },
    title: "",
    handleModal(show, title, type) {
    },
    round: RoundProcess.CV,
    type: 'FAIL'
});
export default ConfirmContext;