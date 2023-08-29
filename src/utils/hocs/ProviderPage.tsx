import React from 'react';
import dynamic from 'next/dynamic';
import { ROLE_USER } from '@/global/enum';
import Loading from '@/components/loading';

const CreatePage = (dir: string, role: ROLE_USER, layout: (props: any) => JSX.Element) => {
    const DynamicComponent = dynamic(() => import(dir), {
        ssr: false,
        loading: () => <Loading />
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
