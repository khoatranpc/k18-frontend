import useGetDataRoute from '@/utils/hooks/getDataRoute';
import React from 'react';

interface Props {
}
const PriorityTeacher = (props: Props) => {
    const dataRoute = useGetDataRoute();
    console.log(dataRoute);
    return (
        <div>{ }</div>
    )
}

export default PriorityTeacher;