import React from 'react';
import dynamic from 'next/dynamic';
import { PositionTe, ROLE, ROLE_USER } from '@/global/enum';
import Loading from '@/components/loading';

const getArrayRole = [...Object.values(PositionTe), ...Object.values(ROLE_USER), ...Object.values(ROLE)];
const CreatePage = (componentDirectString: string, role: typeof getArrayRole, layout: (props: any) => JSX.Element) => {
    const DynamicComponent = dynamic(() => import(`@/components/${componentDirectString}`), {
        ssr: false,
        loading: () => <Loading isCenterScreen />
    })
    const Page = () => {
        return (
            <DynamicComponent />
        )
    }
    Page.Layout = layout;
    Page.Role = role;
    return Page;
};
export default CreatePage;
