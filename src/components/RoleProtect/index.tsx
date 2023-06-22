import React from 'react';
import { Obj } from '@/global/interface';
import { ROLE_USER } from '@/global/enum';
import { useRouter } from 'next/router';

interface Props {
    children: React.ReactElement;
    roleProtect: ROLE_USER;
}
const RoleProtect = (props: Props) => {
    const crrRouteRole = ((props.children as Obj)?.type as Obj)?.Role;
    const router = useRouter();
    if (crrRouteRole !== props.roleProtect) {
        router.push('/404');
    }
    return (
        props.children
    )
}

export default RoleProtect;