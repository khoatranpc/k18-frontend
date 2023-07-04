import { useDispatch, useSelector } from "react-redux";
import { Obj, State } from "@/global/interface";
import { RootState } from "@/store";
import { queryGetListCourse } from "@/store/reducers/course/listCourse.reducer";

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
export {
    useGetListClass,
    useGetTimeSchedule,
    useGetListCourse
}