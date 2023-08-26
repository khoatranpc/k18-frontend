import React, { useState } from 'react';
import { ContextRecruitment } from './context';

interface Props {
    children?: React.ReactElement;
}
const ContextProvider = (props: Props) => {
    const [configModal, setConfigModal] = useState<{
        isShow: boolean;
        isCreate: boolean;
        title?: string;
    }>({
        isShow: false,
        isCreate: false,
        title: 'Thông tin'
    });
    const handleSetConfigModal = ({ isShow, isCreate, title }: {
        isShow: boolean;
        isCreate: boolean;
        title?: string;
    }) => {
        setConfigModal({
            isCreate,
            isShow,
            title
        });
    }
    return (
        <ContextRecruitment.Provider value={{
            modal: {
                config: {
                    ...configModal
                },
                update: handleSetConfigModal,
            }
        }}>
            {props.children}
        </ContextRecruitment.Provider>
    )
}

export default ContextProvider;