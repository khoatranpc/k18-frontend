import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action, BaseInterfaceHookReducer, Obj, State } from "@/global/interface";
import { AppDispatch, RootState } from "@/store";
import { queryGetListCourse } from "@/store/reducers/course/listCourse.reducer";
import { queryGetLocations } from "@/store/reducers/location/localtion.reducer";
import { queryGetCurrentBookTeacher, updateListBookTeacher } from "@/store/reducers/class/bookTeacher.reducer";
import { clearAddRequest, queryAddRequestBookTeacher } from "@/store/reducers/class/addRequestBookTeacher.reducer";
import { queryDetailClass } from "@/store/reducers/class/detailClass.reducer";
import { clearStateHanldeTeacherInRecordBT, queryHandleTeacherInRecordBT } from "@/store/reducers/class/handleTeacherInRecordBT.reducer";
import { ComponentPage, ROLE_TEACHER } from "@/global/enum";
import { queryClassSession } from "@/store/reducers/class/classSesesion.reducer";
import { clearUpdatedDataClassBasicInfor, queryUpdateClassBasicInfor } from "@/store/reducers/class/updateClassBasicInfor.reducer";
import { queryGetListTeacher } from "@/store/reducers/teacher/listTeacher.reducer";
import { queryTeacherRegisterCourse } from "@/store/reducers/teacher/teacherRegisterCourse.reducer";
import { queryTeacherSchedule } from "@/store/reducers/teacher/teacherSchedule.reducer";
import { queryAttendanceTeacherInClassSession } from "@/store/reducers/class/attendanceTeacherInClassSession.reducer";
import { queryListClassFeedbackView } from "@/store/reducers/feedback/listClass.reducer";
import { clearResUpdateClassForFeedback, queryUpdateClassForFeedback } from "@/store/reducers/feedback/updateClassForFeedback.reducer";
import { queryGetListClassInFormFeedback } from "@/store/reducers/feedback/listClassInGetFeedback.reducer";
import { queryGetListGroupClassInFormFeedback } from "@/store/reducers/feedback/listGroupInFormFeedback.reducer";
import { clearResponseFeedback, queryResponseFeedback } from "@/store/reducers/feedback/responseFeedback.reducer";
import { queryGetListResponseFeedback } from "@/store/reducers/feedback/listResponseFeedback.reducer";
import { PayloadRoute, initDataRoute } from "@/store/reducers/global-reducer/route";
import { queryDetailTeacher } from "@/store/reducers/teacher/detailTeacher.reducer";
import { queryGetClassTeacherRegister } from "@/store/reducers/teacher/getClassTeacherRegister.reducer";
import { queryPreTeacher } from "@/store/reducers/teacher/preTeacher.reducer";
import { queryAcceptPreTeacher, clear as clearAcceptPreTeacher } from "@/store/reducers/teacher/acceptPreTeacher.reducer";
import { queryListResponseFeedbackForTeacher } from "@/store/reducers/feedback/listResponseFeedbackForTeacher.reducer";
import { queryClassTeacherPoint } from "@/store/reducers/class/classTeacherPoint.reducer";
import { queryGetListDataRecruitment } from "@/store/reducers/recruitment/recruitment.reducer";

const useGetListClass = () => {
    const listClass = useSelector((state: RootState) => (state.listClass as State).state);
    return listClass;
};
const useGetTimeSchedule = () => {
    const listTimeSchedule = useSelector((state: RootState) => (state.timeSchedule as State).state);
    return listTimeSchedule.response as Obj;
}
const useGetListCourse = () => {
    const listCourse = useSelector((state: RootState) => (state.listCourse as State).state);
    const dispatch = useDispatch<AppDispatch>();
    const queryListCourse = () => {
        dispatch(queryGetListCourse());
    }
    return {
        listCourse: listCourse.response as Obj,
        queryListCourse,
        loading: listCourse.isLoading,
        success: listCourse.success
    };
}
const useGetLocations = () => {
    const locations = useSelector((state: RootState) => (state.locations as State).state);
    const dispatch = useDispatch<AppDispatch>();
    const queryLocations = () => {
        dispatch(queryGetLocations());
    }
    return {
        locations: locations.response as Obj,
        queryLocations
    }
}
const useQueryBookTeacher = (action: 'GET' | 'ADD'): {
    data?: Obj;
    query?: (params: string | Array<Obj>) => void;
    update?: (data: Obj, action: 'PUT' | 'DELETE' | 'UPDATE') => void;
    clear?: () => void;
} => {
    const dispatch = useDispatch<AppDispatch>();
    const dataGet = useSelector((state: RootState) => (state.bookTeacher as State).state);
    const dataAdd = useSelector((state: RootState) => (state.addRequestBookTeacher as State).state);
    switch (action) {
        case 'GET':
            const queryGet = (params: string | Array<Obj>) => {
                const payload: Action = {
                    payload: {
                        query: {
                            params: [params as string],
                            query: {
                                fields: ['_id', 'classId', 'locationId', 'locationCode', 'locationDetail', 'groupNumber', 'teacherRegister', 'fullName', 'roleRegister', 'accept']
                            }
                        }
                    }
                }
                return dispatch(queryGetCurrentBookTeacher(payload));
            }
            return { data: dataGet, query: queryGet };
        case 'ADD':
            const queryAdd = (listRequest: Array<Obj> | string) => {
                const payload: Action = {
                    payload: {
                        query: {
                            body: {
                                listRequest
                            }
                        }
                    }
                };
                return dispatch(queryAddRequestBookTeacher(payload));
            }
            const clear = () => {
                return dispatch(clearAddRequest());
            }
            const update = (data: Obj, action: 'PUT' | 'DELETE' | 'UPDATE') => {
                if (action === 'PUT') {
                    return dispatch(updateListBookTeacher(data));
                }
            }
            return {
                data: dataAdd,
                query: queryAdd,
                clear,
                update
            }
    }
}
const useDetailClass = (action: 'GET' | 'ADD' | 'UPDATE' | 'CLEAR'): BaseInterfaceHookReducer => {
    const detailClass = useSelector((state: RootState) => (state.detailClass as State).state);
    const dispatch = useDispatch<AppDispatch>();
    switch (action) {
        case 'GET':
            return {
                data: detailClass,
                query(params) {
                    const payload: Action = {
                        payload: {
                            query: {
                                params: [params as string]
                            }
                        }
                    }
                    dispatch(queryDetailClass(payload));
                },
            }
    }
    return {
        data: detailClass
    }
}
const useHandleTeacherInRCBT = () => {
    const dataHandle = useSelector((state: RootState) => (state.handleTeacherInRecordBT as State).state);
    const dispatch = useDispatch();
    const query = (payload: Action) => {
        dispatch(queryHandleTeacherInRecordBT(payload));
    }
    const clear = () => {
        dispatch(clearStateHanldeTeacherInRecordBT());
    }
    const removeTeacher = (teacherId: string, requestId: string) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        options: 'REMOVE',
                        idTeacher: teacherId
                    },
                    params: [requestId]
                }
            }
        }
        dispatch(queryHandleTeacherInRecordBT(payload));
    }
    const update = (teacherId: string, updateTeacherId: string, role: ROLE_TEACHER, accept: boolean, requestId: string) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        options: 'UPDATE',
                        idTeacher: teacherId,
                        role,
                        updateTeacherId,
                        accept
                    },
                    params: [requestId]
                }
            }
        }
        dispatch(queryHandleTeacherInRecordBT(payload));
    }
    return {
        dataHandle,
        query,
        clear,
        removeTeacher,
        update
    }
}

const useClassSession = () => {
    const classSession = useSelector((state: RootState) => (state.classSession as State).state);
    const dispatch = useDispatch();

    const queryGetClassSession = (classId: string, fields?: Array<string>) => {
        const payload: Action = {
            payload: {
                query: {
                    params: [classId],
                    query: {
                        fields
                    }
                }
            }
        }
        dispatch(queryClassSession(payload));
    }
    return {
        classSession,
        queryGetClassSession
    }
};

const useUpdateClassBasicInfor = () => {
    const updated = useSelector((state: RootState) => (state.updateClassBasicInfor as State).state);
    const dispatch = useDispatch();

    const handleUpdate = (payload: Action) => {
        dispatch(queryUpdateClassBasicInfor(payload));
    }
    const clear = () => {
        dispatch(clearUpdatedDataClassBasicInfor());
    }
    return {
        updated,
        handleUpdate,
        clear
    }
}

const useListTeacher = () => {
    const listTeacher = useSelector((state: RootState) => (state.listTeacher as State).state);
    const dispatch = useDispatch();
    const query = (recordOnPage?: number, currentPage?: number, query?: Obj) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        recordOnPage,
                        currentPage,
                        ...query
                    }
                }
            }
        }
        dispatch(queryGetListTeacher(payload));
    }
    return {
        listTeacher,
        query
    }
}

const useTeacherRegisterCourse = () => {
    const listData = useSelector((state: RootState) => (state.teacherRegisterCourse as State).state);
    const dispatch = useDispatch();
    const query = (listTeacherId: Array<string>) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        listTeacherId
                    }
                }
            }
        }
        dispatch(queryTeacherRegisterCourse(payload));
    }
    return {
        listData,
        query
    }
}

const useTeacherTimeSchedule = () => {
    const listSchedule = useSelector((state: RootState) => (state.teacherSchedule as State).state);
    const dispatch = useDispatch();
    const queryGetListTeacherSchedule = (payload: Action) => {
        dispatch(queryTeacherSchedule(payload));
    }
    return {
        listSchedule,
        queryGetListTeacherSchedule
    }
}

const useGetAttendanceTeacher = () => {
    const data = useSelector((state: RootState) => (state.attendanceTeacherInClassSession as State).state);
    const dispatch = useDispatch();
    const queryGetData = (classId: string, sessionNumber: number) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        classId,
                        sessionNumber,
                        fields: ['checked', 'classSessionId', 'classId', 'date', 'isOH', 'ran', 'sessionNumber', '_id', 'teacherId', 'fullName', 'role', 'checked', 'locationId']
                    }
                }
            }
        }
        dispatch(queryAttendanceTeacherInClassSession(payload));
    }
    return {
        data,
        queryGetData
    }
}

const useGetListClassFeedback = () => {
    const data = useSelector((state: RootState) => (state.listClassActionFeedback as State).state);
    const dispatch = useDispatch();
    const query = (month: number, fields?: Array<string>, filter?: Obj) => {
        if (month > 13 || month < 1) return;
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        month,
                        fields,
                        ...filter
                    }
                }
            }
        }
        dispatch(queryListClassFeedbackView(payload));
    }
    return {
        data,
        query
    }
}
const useDebounce = (state: any, delayTime?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(state);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(state), delayTime || 500)
        return () => {
            clearTimeout(timer)
        }
    }, [state, delayTime]);
    return debouncedValue;
};
const useUpdateClassFeedback = () => {
    const data = useSelector((state: RootState) => (state.updateClassForFeedback as State).state);
    const dispatch = useDispatch();
    const query = (feedbackId: string, field: string, value: boolean) => {
        const payload: Action = {
            payload: {
                query: {
                    body: {
                        [field]: value,
                    },
                    params: [feedbackId]
                }
            }
        }
        dispatch(queryUpdateClassForFeedback(payload));
    }
    const clear = () => {
        dispatch(clearResUpdateClassForFeedback());
    }
    return {
        success: data.success,
        query,
        clear
    }
}

const useListClassInFormFeedback = () => {
    const data = useSelector((state: RootState) => (state.listClassInFormFeedback as State).state);
    const dispatch = useDispatch();
    const query = (courseName: string) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        courseName
                    }
                }
            }
        }
        dispatch(queryGetListClassInFormFeedback(payload));
    }
    return {
        data,
        query
    }
}
const useGetListGroupClassInFormFeedback = () => {
    const data = useSelector((state: RootState) => (state.listGroupClassInFormFeedback as State).state);
    const dispatch = useDispatch();
    const query = (classId: string) => {
        const payload: Action = {
            payload: {
                query: {
                    params: [classId]
                }
            }
        }
        dispatch(queryGetListGroupClassInFormFeedback(payload));
    };
    return {
        data,
        query
    }
}
const useResponseFeedbackForStudent = () => {
    const data = useSelector((state: RootState) => (state.responseFeedback as State).state);
    const dispatch = useDispatch();
    const query = (body: Obj) => {
        const payload: Action = {
            payload: {
                query: {
                    body
                }
            }
        }
        dispatch(queryResponseFeedback(payload));
    };
    const clear = () => {
        dispatch(clearResponseFeedback());
    }
    return {
        data,
        query,
        clear
    }
}
const useGetListFeedback = () => {
    const data = useSelector((state: RootState) => (state.listResponseFeedback as State).state);
    const dispatch = useDispatch();
    const query = (rowOnPage?: number, currentPage?: number, query?: Obj) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        fields: ['_id', 'studentName', 'phoneNumber', 'course', 'courseName', 'codeClass', 'courseId', 'groupNumber', 'groupNumber', 'pointCxo', 'pointST', 'pointMT', 'pointOb', 'pointSyl', 'docDetail', 'createdAt', 'time', 'feedbackId', 'time', 'teacherRegister'],
                        recordOnPage: rowOnPage,
                        currentPage,
                        ...query
                    }
                }
            }
        };
        dispatch(queryGetListResponseFeedback(payload));
    }
    return {
        data,
        query
    }
}
const useDispatchDataRouter = () => {
    const dispatch = useDispatch();
    return (combineRoute: string, title: string, replaceTitle: React.ReactElement | string, componentPage?: ComponentPage, hasBackPage?: boolean, moreData?: Obj) => {
        const payloadRouteFeedback: PayloadRoute = {
            payload: {
                route: combineRoute,
                title: title,
                replaceTitle: replaceTitle,
                hasBackPage: !!hasBackPage,
                component: componentPage,
                moreData
            }
        };
        dispatch(initDataRoute(payloadRouteFeedback));
    }
}
const useGetTeacherDetail = () => {
    const data = useSelector((state: RootState) => (state.detailTeacher as State).state);
    const dispatch = useDispatch();
    const query = (teacherId: string, fields: Array<string>) => {
        const payload: Action = {
            payload: {
                query: {
                    params: [teacherId],
                    query: {
                        fields
                    }
                }
            }
        }
        dispatch(queryDetailTeacher(payload));
    }
    return {
        data,
        query
    }
}
const useClassTeacherRegister = () => {
    const data = useSelector((state: RootState) => (state.getClassTeacherRegister as State).state);
    const dispatch = useDispatch();
    const query = (teacherId: string, fields?: string[]) => {
        const payload: Action = {
            payload: {
                query: {
                    params: [teacherId],
                    query: {
                        fields
                    }
                }
            }
        }
        dispatch(queryGetClassTeacherRegister(payload));
    }
    return {
        data,
        query
    }
}
const useGetPreTeacher = () => {
    const data = useSelector((state: RootState) => (state.preTeacher as State).state);
    const dispatch = useDispatch();

    const query = (recordOnPage: number, currentPage: number, fields?: string[]) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        recordOnPage,
                        currentPage,
                        fields
                    }
                }
            }
        }
        dispatch(queryPreTeacher(payload));
    }
    return {
        data,
        query
    }
}
const useAcceptPreTeacher = () => {
    const data = useSelector((state: RootState) => (state.acceptPreTeacher as State).state);
    const dispatch = useDispatch();
    const query = (teacherId: string) => {
        const payload: Action = {
            payload: {
                query: {
                    params: [teacherId]
                }
            }
        }
        dispatch(queryAcceptPreTeacher(payload));
    }
    const clear = () => {
        dispatch(clearAcceptPreTeacher());
    }
    return {
        data,
        query,
        clear,
    }
}
const useGetListFeedbackResponseForTeacher = () => {
    const data = useSelector((state: RootState) => (state.listResponseFeedbackForTeacher as State).state);
    const dispatch = useDispatch();
    const query = (teacherId: string, fields?: Array<string>) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        teacherId,
                        fields
                    }
                }
            }
        };
        dispatch(queryListResponseFeedbackForTeacher(payload));
    };
    return {
        data,
        query
    }
}
const useGetClassTeacherPonit = () => {
    const data = useSelector((state: RootState) => (state.classTeacherPoint as State).state);
    const dispatch = useDispatch();
    const query = (listClassId: string[]) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        listClassId: listClassId.toString()
                    }
                }
            }
        };
        dispatch(queryClassTeacherPoint(payload));
    };
    return {
        data,
        query
    }
}
const useGetListDataRecruitment = () => {
    const data = useSelector((state: RootState) => (state.recruitment as State).state);
    const dispatch = useDispatch();
    const query = (recordOnPage: number, currentPage: number, fields?: string[]) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        recordOnPage,
                        currentPage,
                        fields
                    }
                }
            }
        }
        dispatch(queryGetListDataRecruitment(payload));
    }
    return {
        data,
        query
    }
}
export {
    useGetListClass,
    useGetTimeSchedule,
    useGetListCourse,
    useGetLocations,
    useQueryBookTeacher,
    useDetailClass,
    useHandleTeacherInRCBT,
    useClassSession,
    useUpdateClassBasicInfor,
    useListTeacher,
    useTeacherRegisterCourse,
    useTeacherTimeSchedule,
    useGetAttendanceTeacher,
    useGetListClassFeedback,
    useDebounce,
    useUpdateClassFeedback,
    useListClassInFormFeedback,
    useGetListGroupClassInFormFeedback,
    useResponseFeedbackForStudent,
    useGetListFeedback,
    useDispatchDataRouter,
    useGetTeacherDetail,
    useClassTeacherRegister,
    useGetPreTeacher,
    useAcceptPreTeacher,
    useGetListFeedbackResponseForTeacher,
    useGetClassTeacherPonit,
    useGetListDataRecruitment
}