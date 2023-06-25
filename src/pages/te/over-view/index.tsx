import React from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/loading';
import ContainerPage from '@/layouts/containerPage/containerPage';
import { ROLE_USER } from '@/global/enum';

const DynamicComponent = dynamic(() => import('@/components/OverView'), {
    ssr: false,
    loading: () => <Loading />
})
const OverView = () => {
    return (
        <DynamicComponent />
    )
}

export default OverView;
OverView.Layout = ContainerPage;
OverView.Role = ROLE_USER.TE;