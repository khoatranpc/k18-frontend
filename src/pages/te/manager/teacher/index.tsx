import React from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/loading';
import ContainerPage from '@/layouts/containerPage/containerPage';
import { ROLE_USER } from '@/global/enum';

const DynamicComponent = dynamic(() => import('@/components/ManagerTeacher'), {
    ssr: false,
    loading: () => <Loading />
});

const ManagerTeacher = () => {
    return (
        <DynamicComponent />
    )
}

export default ManagerTeacher;
ManagerTeacher.Layout = ContainerPage;
ManagerTeacher.Role = ROLE_USER.TE;