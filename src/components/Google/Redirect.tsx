import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Obj } from '@/global/interface';
import { useGoogleRedirect } from '@/utils/hooks';
import styles from '@/styles/Google.module.scss';

const Redirect = () => {
    const router = useRouter();
    const queryRouter = router.query;
    const googleRedirect = useGoogleRedirect();
    const getGoogleRedirectResponse = googleRedirect.data.response as Obj;
    useEffect(() => {
        const getAuthedGoogle = localStorage.getItem('authGoogle');
        if (!getAuthedGoogle) {
            googleRedirect.query({
                query: {
                    code: queryRouter.code
                }
            });
        }
    }, []);
    useEffect(() => {
        if (getGoogleRedirectResponse) {
            if (googleRedirect.data.success) {
                const getCallbackUrl = localStorage.getItem('callbackUrl') as string;
                localStorage.setItem('authGoogle', '1');
                window.location.href = `${window.location.origin}${getCallbackUrl ?? '/'}`;
                localStorage.removeItem('callbackUrl');
            }
        }
    }, [googleRedirect.data]);
    return (
        <div className={styles.googleRedirect}>
            <h1>{googleRedirect.data?.success ? `${getGoogleRedirectResponse?.message}` : 'Đang xác thực Google...'} </h1>
        </div>
    )
}

export default Redirect;