import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { LIST_SUBJECT } from "../actions";
import { METHOD } from "@/global/enum";

export const queryListSubjectCourse = createRequest(LIST_SUBJECT, '/api/v1/subject', METHOD.GET);

const listSubject = createSliceReducer('listSubject', queryListSubjectCourse);

export default listSubject;