import { ComponentType, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Obj, State } from '@/global/interface';
import store, { RootState } from '@/store';
import Loading from '@/components/loading';
import { queryGetCrrUserInfo } from '@/store/reducers/user-info.reducer';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const Auth = (props: P) => {
        const [router, setRouter] = useState<Obj>();
        const [isNull, setIsNull] = useState<boolean>(false);
        const { ...rest } = props;
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
                if (access_token) {
                    //verify in here
                    if (firstQuery.current) {
                        dispatch(queryGetCrrUserInfo());
                        firstQuery.current = false;
                    }
                }
                else if ((!access_token || (!crrToken.response || (crrToken.response && !crrToken.response.status)))) {
                    router.push('/auth/login');
                    localStorage.removeItem('access_token');
                    setIsNull(false);
                }
            }
            if (crrUser.response && crrUser.response.status) {
                setIsNull(false);
            }
        }, [crrToken, setIsNull, dispatch, router, crrUser]);
        if (isNull) return null;
        return router && crrUser.response && crrUser.response.status ? <WrappedComponent {...rest as P} /> : <Loading isCenterScreen/>;
    };

    return Auth;
};

export default withAuth;
