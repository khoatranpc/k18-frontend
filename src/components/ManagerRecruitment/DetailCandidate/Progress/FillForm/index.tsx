import React from 'react';
import { Obj } from '@/global/interface';
import { useGetDetailCandidate } from '@/utils/hooks';

const FillForm = () => {
    const crrCandidate = useGetDetailCandidate();
    const getDataCandidate = crrCandidate.data.response?.data as Obj;

    return (
        <p style={{ textAlign: 'center' }}>{!getDataCandidate.fillForm ? "Ứng viên chưa điền Form thông tin giáo viên" : "Ứng viên đã điền Form thông tin giáo viên"}</p>
    )
}

export default FillForm;