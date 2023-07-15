import { useDispatch, useSelector } from "react-redux";
import { Action, BaseInterfaceHookReducer, Obj, State } from "@/global/interface";
import { AppDispatch, RootState } from "@/store";
import { queryGetListCourse } from "@/store/reducers/course/listCourse.reducer";
import { queryGetLocations } from "@/store/reducers/location/localtion.reducer";
import { queryGetCurrentBookTeacher, updateListBookTeacher } from "@/store/reducers/class/bookTeacher.reducer";
import { clearAddRequest, queryAddRequestBookTeacher } from "@/store/reducers/class/addRequestBookTeacher.reducer";
import { queryDetailClass } from "@/store/reducers/class/detailClass.reducer";
import { clearStateHanldeTeacherInRecordBT, queryHandleTeacherInRecordBT } from "@/store/reducers/class/handleTeacherInRecordBT.reducer";
import { ROLE_TEACHER } from "@/global/enum";

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
        queryListCourse
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
export {
    useGetListClass,
    useGetTimeSchedule,
    useGetListCourse,
    useGetLocations,
    useQueryBookTeacher,
    useDetailClass,
    useHandleTeacherInRCBT
}