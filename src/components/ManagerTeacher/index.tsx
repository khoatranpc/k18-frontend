import useGetDataRoute from '@/utils/hooks/getDataRoute';
import React from 'react';

const ManagerTeacher = () => {
    const routerState = useGetDataRoute();
    console.log(routerState);
    return (
        <div>ManagerTeacher</div>
    )
}

export default ManagerTeacher;