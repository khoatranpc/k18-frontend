import React from 'react';

interface Props {
    children: React.ReactNode;
}
const EmptyLayout = (props: Props) => {
    return (
        <div>{props.children}</div>
    )
}

export default EmptyLayout;