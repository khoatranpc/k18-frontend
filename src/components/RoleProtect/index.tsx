import React from 'react';
import { useRouter } from 'next/router';
import { Obj } from '@/global/interface';
import { ROLE_USER } from '@/global/enum';
import useGetCrrUser from '@/utils/hocs/getUser';

interface Props {
    children: React.ReactElement;
    roleProtect: ROLE_USER;
}
const RoleProtect = (props: Props) => {
    const crrRouteRole = ((props.children as Obj)?.type as Obj)?.Role;
    const crrUser = useGetCrrUser();
    const router = useRouter();
    if (crrUser && crrRouteRole !== props.roleProtect) {
        router.push('/404');
    }
    return (
        props.children
    )
}

export default RoleProtect;