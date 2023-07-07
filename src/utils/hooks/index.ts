import { useDispatch, useSelector } from "react-redux";
import { Action, Obj, State } from "@/global/interface";
import { RootState } from "@/store";
import { queryGetListCourse } from "@/store/reducers/course/listCourse.reducer";
import { queryGetLocations } from "@/store/reducers/location/localtion.reducer";
import { queryGetCurrentBookTeacher } from "@/store/reducers/class/bookTeacher.reducer";

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
    const dispatch = useDispatch();
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
    const dispatch = useDispatch();
    const queryLocations = () => {
        dispatch(queryGetLocations());
    }
    return {
        locations: locations.response as Obj,
        queryLocations
    }
}
const useQueryBookTeacher = (action: 'GET') => {
    const dispatch = useDispatch();
    const dataGet = useSelector((state: RootState) => (state.bookTeacher as State).state);
    switch (action) {
        case 'GET':
            const queryGet = (idRecordBookTeacher: string) => {
                const payload: Action = {
                    payload: {
                        query: {
                            params: [idRecordBookTeacher]
                        }
                    }
                }
                return dispatch(queryGetCurrentBookTeacher(payload));
            }
            return { dataGet, queryGet };
    }
}
export {
    useGetListClass,
    useGetTimeSchedule,
    useGetListCourse,
    useGetLocations,
    useQueryBookTeacher
}