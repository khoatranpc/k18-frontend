import React from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/loading';
import ContainerPage from '@/layouts/containerPage/containerPage';
import { ROLE_USER } from '@/global/enum';

const DynamicComponent = dynamic(() => import("@/components/Location"), {
    ssr: false,
    loading: () => <Loading />
});

const Location = () => {
    return (
        <DynamicComponent />
    )
}

export default Location;
Location.Layout = ContainerPage;
Location.Role = ROLE_USER.TE;