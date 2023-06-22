import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { ROLE_USER } from '@/global/enum';
import { Obj, State } from '@/global/interface';
import { RootState } from '@/store';
import { tabForRole } from './tab';
import logo from '@/assets/imgs/mindx.png';
import styles from '@/styles/ContainerPage.module.scss';
import RoleProtect from '@/components/RoleProtect';
import PageHeader from '@/components/PageHeader';

interface Props {
    children: React.ReactElement;
}

const ContainerPage = (props: Props) => {
    const crrUser = useSelector((state: RootState) => (state.crrUserInfo as State).state);
    const crrRole = (crrUser.response as Obj)?.data.roleAccount as ROLE_USER;
    const mappingTab = tabForRole[crrRole];
    return (
        <div className={styles.containerPage}>
            <div className={`${styles.navTab} ${styles.bgWhite}`}>
                <div className={styles.logo}>
                    <Image src={logo} alt='' className={styles.imgLogo} />
                </div>
                {
                    mappingTab?.map((item) => {
                        return <div className={styles.tab} key={item.key}>
                            {item.icon}
                            <span>{item.title}</span>
                        </div>;
                    })
                }
            </div >
            <div className={styles.mainColumn}>
                <PageHeader />
                <div className={`${styles.mainChild} ${styles.bgWhite}`}>
                    <RoleProtect roleProtect={crrRole}>
                        {props.children}
                    </RoleProtect>
                </div>
            </div>

        </div >
    )
}

export default ContainerPage;