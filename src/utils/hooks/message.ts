import { clearMessage, openMessage } from "@/store/reducers/global-reducer/message";
import { useDispatch } from "react-redux";

const useHookMessage = () => {
    const dispatch = useDispatch();
    const objectMessage = {
        open: (payload: {
            content: string;
            type: 'success' | 'error' | 'warining' | 'info' | 'loading'
        }, msPendingClose?: number) => {
            dispatch(openMessage({
                content: payload.content,
                type: payload.type
            }))
            setTimeout(() => {
                dispatch(clearMessage());
            }, msPendingClose || 2500)
        },
        close: () => {
            dispatch(clearMessage());
        }
    }
    return objectMessage;
};
export {
    useHookMessage
}