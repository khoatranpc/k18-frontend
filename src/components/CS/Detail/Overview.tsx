import React from 'react';
import { useRouter } from 'next/router';
import { Obj } from '@/global/interface';
import { useListCs } from '@/utils/hooks';
import styles from '@/styles/CS.module.scss';

const Overview = () => {
    const listCs = useListCs();
    const router = useRouter();
    const getListCs = (listCs.data.response?.data as Obj[] ?? []);
    const crrCs = getListCs.find(item => item._id === router.query.csId) ?? {};
    // console.log(crrCs);
    return (
        <div className={styles.overviewCs}>
            {/* <img src={crrCs.image} alt='' className={styles.csImage} />
            <p>CS: {crrCs.name}</p>
            <p>Số điện thoại: {crrCs.phoneNumber}</p> */}
        </div>
    )
}

export default Overview;