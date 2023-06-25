import React from 'react';
import { Avatar, Badge, Input } from 'antd';
import useGetStateRouter from '@/utils/hocs/stateRouter';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import styles from '@/styles/ContainerPage.module.scss';

const PageHeader = () => {
    const stateRouter = useGetStateRouter();
    return (
        <div className={`${styles.pageHeader} ${styles.bgWhite} pageHeader`}>
            <div className={styles.titleHeader}>
                <h2>{stateRouter?.title as string}</h2>
            </div>
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
        </div>
    )
}

export default PageHeader