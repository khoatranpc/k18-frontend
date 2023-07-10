import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Obj, State } from '@/global/interface';
import store, { RootState } from '@/store';
import Loading from '@/components/loading';
import { queryGetCrrUserInfo } from '@/store/reducers/user-info.reducer';
import { openMessage } from '@/store/reducers/global-reducer/message';

interface Props {
    children: React.ReactElement;
}
// const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
const Auth = (props: Props) => {
    const [router, setRouter] = useState<Obj>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { dispatch } = store;
    const crrToken = useSelector((state: RootState) => (state.token as State).state);
    const crrUser = useSelector((state: RootState) => (state.crrUserInfo as State).state);
    useEffect(() => {
        setRouter(require('next/router'));
    }, [setRouter]);
    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            dispatch(queryGetCrrUserInfo());
        } else {
            localStorage.removeItem('access_token');
        }
    }, [dispatch]);
    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (router) {
            if (crrToken.response && crrToken.response.status && !access_token) {
                localStorage.setItem('access_token', (crrToken.response.data as Obj)?.token as string);
            } else if ((!access_token || ((crrToken.response && !crrToken.response.status)))) {
                router.push('/auth/login');
                localStorage.removeItem('access_token');
            }
        }
        if (router && crrUser.response && !crrUser.response.status && crrUser.response.message === 'token expired!') {
            router.push('/auth/login');
            localStorage.removeItem('access_token');
            dispatch(openMessage({
                type: 'error',
                content: 'Hết hạn đăng nhập! Vui lòng đăng nhập lại.'
            }))
        }
        // missing logic expired token
        if (crrUser.response && crrUser.response.status) {
            setIsLoading(false);
        }
    }, [crrToken, setIsLoading, dispatch, router, crrUser]);
    if (isLoading) return <Loading isCenterScreen />;
    return props.children;
};

export default Auth;
