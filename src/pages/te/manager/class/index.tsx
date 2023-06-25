import React from 'react';
import dynamic from 'next/dynamic';
import { ROLE_USER } from '@/global/enum';
import ContainerPage from '@/layouts/containerPage/containerPage';
import Loading from '@/components/loading';

const DynamicComponent = dynamic(() => import('@/components/ManagerClass'), {
    ssr: false,
    loading: () => <Loading />
})
const ManagerClass = () => {
    return (
        <DynamicComponent />
    )
}

export default ManagerClass;
ManagerClass.Layout = ContainerPage;
ManagerClass.Role = ROLE_USER.TE;
