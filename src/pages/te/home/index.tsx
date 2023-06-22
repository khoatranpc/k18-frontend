import React from 'react'
import { ROLE_USER } from '@/global/enum';
import useGetCrrUser from '@/utils/hocs/getUser';
import ContainerPage from '@/layouts/containerPage/containerPage';

const Home = () => {
    const crrUser = useGetCrrUser();
    console.log(crrUser);
    return (
        <div>Home for te</div>
    )
}

export default Home;
Home.Layout = ContainerPage;
Home.Role = ROLE_USER.TE;