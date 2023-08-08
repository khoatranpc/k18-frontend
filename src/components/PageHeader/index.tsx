import React from 'react';
import { useRouter } from 'next/router';
import { Avatar, Badge, Input } from 'antd';
import useGetStateRouter from '@/utils/hooks/stateRouter';
import { MapIconKey } from '@/global/icon';
import { ComponentPage, KEY_ICON } from '@/global/enum';
import CombineRoute from '@/global/route';
import styles from '@/styles/ContainerPage.module.scss';

const PageHeader = () => {
    const stateRouter = useGetStateRouter();
    const router = useRouter();
    const handlePrevPage = () => {
        switch (stateRouter.component) {
            case ComponentPage.DETAILCLASS:
                router.push(CombineRoute['TE']['MANAGER']['CLASS']);
                break;
            case ComponentPage.TEACHER_DETAIL:
                router.push(CombineRoute['TE']['MANAGER']['TEACHER']);
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