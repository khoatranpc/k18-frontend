import React from 'react';
import dynamic from 'next/dynamic';
import { ROLE_USER } from '@/global/enum';
import ContainerPage from '@/layouts/containerPage/containerPage';
import Loading from '@/components/loading';

const DynamicComponent = dynamic(() => import('@/components/ManagerTeacher/ListTeacher/DetailTeacher'), {
    ssr: false,
    loading: () => <Loading />
});
const DetailTeacher = () => {
    return (
        <DynamicComponent />
    )
}

export default DetailTeacher;
DetailTeacher.Layout = ContainerPage;
DetailTeacher.Role = ROLE_USER.TE;