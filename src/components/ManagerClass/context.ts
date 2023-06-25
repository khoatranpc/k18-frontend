import { createContext } from "react";

export interface FieldFilter {
    key: string;
    value: any;
    title: string;
}
const ManagerClassContext = createContext<{
    crrKeyTab: string;
    listFieldFilter: Array<FieldFilter>;
    setContext: (data: {
        crrKeyTab: string;
        listFieldFilter: Array<{
            key: string;
            value: any;
        }>;
    }) => void;
}>({
    crrKeyTab: '',
    listFieldFilter: [],
    setContext(data) { }
});
export default ManagerClassContext;