import { createContext } from "react";

const ContextRecruitment = createContext<{
    modal: {
        config: {
            isShow: boolean;
            isCreate: boolean;
            title?: string;
        }
        update: ({
            isShow,
            isCreate,
            title
        }: {
            isShow: boolean;
            isCreate: boolean;
            title?: string;
        }) => void;
    }
}>({
    modal: {
        config: {
            isShow: false,
            isCreate: false,
            title: 'Thông tin',
        },
        update({ isShow,
            isCreate,
            title }) { }
    }
});
export {
    ContextRecruitment
}