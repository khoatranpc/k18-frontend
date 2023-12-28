import React from 'react';
import { useRouter } from 'next/router';
import { Avatar, Badge, Input } from 'antd';
import { Obj } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { ComponentPage, KEY_ICON, ROLE } from '@/global/enum';
import CombineRoute from '@/global/route';
import useGetCrrUser from '@/utils/hooks/getUser';
import useGetStateRouter from '@/utils/hooks/stateRouter';
import styles from '@/styles/ContainerPage.module.scss';

const PageHeader = () => {
    const stateRouter = useGetStateRouter();
    const currentUser = useGetCrrUser()?.data as Obj;

    const router = useRouter();
    const handlePrevPage = () => {
        switch (stateRouter.component) {
            case ComponentPage.DETAILCLASS:
                if (currentUser?.roleAccount === ROLE.TEACHER) {
                    router.push(CombineRoute['TEACHER']['CLASS']);
                } else {
                    router.push(CombineRoute['TE']['MANAGER']['CLASS']);
                }
                break;
            case ComponentPage.TEACHER_DETAIL:
                router.push(CombineRoute['TE']['MANAGER']['TEACHER']);
                break;
            case ComponentPage.RECRUITMENT_DETAIL_CANDIDATE:
                router.push(CombineRoute['TE']['RECRUITMENT']);
                break;
            case ComponentPage.TE_STAFF:
                router.push(CombineRoute['TE']['MANAGER']['STAFF']);
                break;
            default:
                router.back();
                break;
        }
    }
    return (
        <div className={`${styles.pageHeader} ${styles.bgWhite} pageHeader`}>
            {
                <div className={styles.titleHeader}>
                    <h2>{stateRouter?.hasBackPage && <span className={styles.backPage} onClick={() => {
                        handlePrevPage();
                    }}>{MapIconKey[KEY_ICON.ARROWL]}</span>}
                        {stateRouter?.replaceTitle || stateRouter?.title}
                    </h2>
                </div>
            }
            <div className={styles.featFnc}>
                <Input className={styles.input} placeholder='Search' size='large' prefix={MapIconKey[KEY_ICON.SRCH]} />
                <div className="badge">
                    <Badge count={5} color='#F59638'>
                        <Avatar shape="square" size="large">
                            {MapIconKey[KEY_ICON.ML]}
                        </Avatar>
                    </Badge>
                </div>
            </div>
        </div >
    )
}

export default PageHeader