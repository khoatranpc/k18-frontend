import { useSelector } from "react-redux";
import { State } from "@/global/interface";
import { RootState } from "@/store";

const useGetListClass = () => {
    const listClass = useSelector((state: RootState) => (state.listClass as State).state);
    return listClass;
};
export {
    useGetListClass
}