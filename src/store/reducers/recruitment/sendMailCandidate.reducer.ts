import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_SENDMAIL_CANDIDATE } from "../actions";

export const querySendMailCandidate = createRequest(QUERY_SENDMAIL_CANDIDATE, '/api/v1/mail/candidate', METHOD.POST);
const sendMailCandidate = createSliceReducer('sendMailCandidate', querySendMailCandidate);

export const clearSendmailCandidate = createAction(`${sendMailCandidate.name}/clear`);

export default sendMailCandidate.reducer;