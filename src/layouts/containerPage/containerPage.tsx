import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { KEY_ICON, ROLE_USER } from '@/global/enum';
import { Obj, State } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { AppDispatch, RootState } from '@/store';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import PageHeader from '@/components/PageHeader';
import { tabForRole } from './tab';
import logo from '@/assets/imgs/mindx.png';
import styles from '@/styles/ContainerPage.module.scss';

interface Props {
    children: React.ReactElement;
}

const ContainerPage = (props: Props) => {
    const crrUser = useSelector((state: RootState) => (state.crrUserInfo as State).state);
    const crrRole = (crrUser.response as Obj)?.data.roleAccount as ROLE_USER;
    const mappingTab = tabForRole[crrRole];
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const refRoute = useRef<PayloadRoute>({
        payload: {
            route: mappingTab?.[0]?.route,
            title: mappingTab?.[0]?.text,
            breadCrumb: [],
            icon: mappingTab?.[0]?.keyIcon
        }
    });
    useEffect(() => {
        if (refRoute.current.payload.route !== router.route) {
            const findTabRoute = mappingTab.find((item) => {
                return item.route === router.route;
            });
            if (findTabRoute) {
                refRoute.current.payload = {
                    route: findTabRoute.route,
                    title: findTabRoute.text,
                    breadCrumb: [],
                    icon: findTabRoute.keyIcon
                }
            } else {
                refRoute.current.payload = {
                    route: '/404',
                    title: 'Lỗi',
                    breadCrumb: [],
                }
            }
        }
        dispatch(initDataRoute(refRoute.current));
    }, [router.route]);
    return (
        <div className={styles.containerPage}>
            <div className={`${styles.navTab} ${styles.bgWhite}`}>
                <div className={styles.logo}>
                    <Image src={logo} alt='' className={styles.imgLogo} />
                </div>
                {
                    mappingTab?.map((item) => {
                        return <Link
                            key={item.key}
                            href={item.route}
                            className={`${router.route === item.route ? styles.active : ''}`}
                            onClick={() => {
                                refRoute.current = {
                                    payload: {
                                        ...refRoute.current.payload,
                                        route: item.route,
                                        title: item.text,
                                        icon: item.keyIcon
                                    }
                                }
                            }}
                        >
                            <div className={`${!item.key.includes('PN') ? styles.tab : styles.panel}`} key={item.key}>
                                {item.showIcon && MapIconKey[item.keyIcon as KEY_ICON]}
                                <span>{item.title}</span>
                            </div></Link>;
                    })
                }
            </div >
            <div className={styles.mainColumn}>
                <PageHeader />
                <div className={`${styles.mainChild} ${styles.bgWhite}`}>
                    {props.children}
                </div>
            </div>
        </div >
    )
}

export default ContainerPage;