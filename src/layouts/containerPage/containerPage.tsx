import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Dropdown, MenuProps } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ComponentPage, KEY_ICON, ROLE_USER } from '@/global/enum';
import { Obj, State } from '@/global/interface';
import CombineRoute from '@/global/route';
import { MapIconKey } from '@/global/icon';
import useGetDataRoute from '@/utils/hooks/getDataRoute';
import { logout } from '@/utils';
import { AppDispatch, RootState } from '@/store';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import PageHeader from '@/components/PageHeader';
import { tabForRole } from './tab';
import Empty from '@/components/Empty';
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
    const routeStore = useGetDataRoute();

    const badgeMoreAction: MenuProps['items'] = [
        {
            key: 'LOG_OUT',
            label: 'Đăng xuất',
            onClick() {
                logout();
            }
        }
    ]
    const refRoute = useRef<PayloadRoute>({
        payload: {
            route: mappingTab?.[0]?.route,
            title: mappingTab?.[0]?.title as React.ReactElement,
            icon: mappingTab?.[0]?.keyIcon,
            component: mappingTab?.[0]?.component
        }
    });
    useEffect(() => {
        if (refRoute.current.payload.route !== router.route) {
            const findTabRoute = mappingTab?.find((item) => {
                return item.indexRoute === router.route;
            });
            if (router.route === '/') {
                refRoute.current.payload = {
                    route: '/',
                    title: 'Chào mừng đến với hệ thống',
                    hasBackPage: false,
                    component: ComponentPage.WELCOME
                }
            } else {
                if (findTabRoute) {
                    refRoute.current.payload = {
                        route: findTabRoute.indexRoute,
                        title: findTabRoute.title as React.ReactElement,
                        icon: findTabRoute.keyIcon,
                        replaceTitle: findTabRoute.noReplaceTitle ?
                            findTabRoute.title as React.ReactElement : routeStore?.replaceTitle as React.ReactElement,
                        hasBackPage: findTabRoute.noReplaceTitle ? false : true,
                        moreData: findTabRoute.noReplaceTitle ? undefined : routeStore?.moreData,
                        component: findTabRoute.component
                    }
                } else {
                    refRoute.current.payload = {
                        route: CombineRoute['EMPTY'],
                        title: 'Lỗi' as unknown as React.ReactElement,
                        replaceTitle: 'Lỗi' as unknown as React.ReactElement,
                        hasBackPage: false,
                        moreData: undefined,
                        component: undefined
                    };
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
                <div className={styles.listTabLink}>
                    {
                        mappingTab?.map((item) => {
                            return !item.disable && <Link
                                key={item.key}
                                href={item.route}
                                className={`${router.route === item.route ? styles.active : ''}`}
                                onClick={(e) => {
                                    if (item.notRouting) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                <div className={`${!item.key.includes('PN') ? styles.tab : styles.panel}`} key={item.key}>
                                    {item.showIcon && MapIconKey[item.keyIcon as KEY_ICON]}
                                    <span>{item.title}</span>
                                </div></Link>;
                        })
                    }
                </div>
                <div className={styles.badge}>
                    <Avatar size='large' />
                    <div className={styles.user}>
                        <p>Nguyễn Văn A</p>
                        <span className={styles.role}>Leader</span>
                    </div>
                    <Dropdown menu={{ items: badgeMoreAction }} placement="top">
                        <span className={styles.moreAction}>
                            {MapIconKey[KEY_ICON.DOT3VT]}
                        </span>
                    </Dropdown>
                </div>
            </div >
            <div className={styles.mainColumn}>
                <PageHeader />
                <div className={`${styles.mainChild} ${styles.bgWhite}`}>
                    {routeStore?.route === '/empty' ? <Empty /> : props.children}
                </div>
            </div>
        </div >
    )
}

export default ContainerPage;