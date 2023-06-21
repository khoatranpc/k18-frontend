import { ComponentType, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Obj, State } from '@/global/interface';
import store, { RootState } from '@/store';
import Loading from '@/components/loading';
import { queryGetCrrUserInfo } from '@/store/reducers/user-info.reducer';

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
    const firstQuery = useRef<boolean>(true);
    useEffect(() => {
        setRouter(require('next/router'));
    }, [setRouter]);
    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (router) {
            if (crrToken.response && crrToken.response.status && !access_token) {
                localStorage.setItem('access_token', (crrToken.response.data as Obj)?.token as string);
            } else if (access_token) {
                //verify in here
                if (firstQuery.current) {
                    dispatch(queryGetCrrUserInfo());
                    firstQuery.current = false;
                }
            } else if ((!access_token || (!crrToken.response || (crrToken.response && !crrToken.response.status)))) {
                router.push('/auth/login');
                localStorage.removeItem('access_token');
            }
        }

        if (crrUser.response && crrUser.response.status) {
            setIsLoading(false);
        }
    }, [crrToken, setIsLoading, dispatch, router, crrUser]);
    if (isLoading) return <Loading isCenterScreen />;
    return props.children;
};

export default Auth;
