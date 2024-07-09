import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Obj } from '@/global/interface';
import { useListCs } from '@/utils/hooks';
import Overview from './Overview';
import styles from '@/styles/CS.module.scss';

const DetailCs = () => {
    const router = useRouter();
    const listCs = useListCs();
    const getListCs = (listCs.data.response?.data as Obj[] ?? []);
    const crrCs = getListCs.find(item => item._id === router.query.csId);
    useEffect(() => {
        if (!listCs.data.response?.data) {
            listCs.query();
        }
    }, []);
    return (
        <div className={styles.detailCs}>
            <Overview />
        </div>
    )
}

export default DetailCs;