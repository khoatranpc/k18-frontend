import React from 'react';
import { useRouter } from 'next/router';
import { Obj } from '@/global/interface';

const Detail = () => {
    const router = useRouter();
    const getClassId = (router.query as Obj)!.classId;
    return (
        <div>Detail</div>
    )
}

export default Detail;