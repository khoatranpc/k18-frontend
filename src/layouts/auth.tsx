import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/auth/AuthLayout.module.scss';
import HumanCharacter from '@/assets/svgs/human-character.svg';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { State } from '@/global/interface';
import Loading from '@/components/loading';

interface Props {
    children?: React.ReactElement;
}

const AuthLayout = (props: Props) => {
    const router = useRouter();
    const crrToken = useSelector((state: RootState) => (state.token as State).state);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        if (localStorage.getItem('access_token') || (crrToken.response && crrToken.response.status)) {
            router.push('/');
        } else {
            setLoading(false);
        }
    }, [])
    return (
        <div className={styles.auth_layout}>
            {loading ? <Loading isCenterScreen /> : <>
                <div className={styles.bar_icon}>
                    <div className={styles.wall}>
                    </div>
                    <Image src={HumanCharacter} alt='' className={styles.human} />
                    <div className={styles.list_ac}>
                        <ul>
                            <li>© 2023 MindX Technology School</li>
                            <li>Privacy Policy</li>
                            <li>Term</li>
                            <li>Help</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.content_auth}>
                    {props.children}
                </div>
            </>
            }
        </div>
    )
}

export default AuthLayout;