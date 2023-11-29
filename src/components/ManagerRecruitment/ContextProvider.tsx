import React, { useState } from 'react';
import { useGetListDataRecruitment } from '@/utils/hooks';
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
    const listDataRecruitment = useGetListDataRecruitment();
    const [dataPaginationPage, setDataPaginationPage] = useState<{
        currentPage: number,
        currentTotalRowOnPage: number
    }>({
        currentPage: Number(listDataRecruitment.data.payload?.query?.query?.currentPage) || 1,
        currentTotalRowOnPage: Number(listDataRecruitment.data.payload?.query?.query?.recordOnPage) || 10
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
            },
            pagination: {
                data: dataPaginationPage,
                setDataPagination(data) {
                    setDataPaginationPage(data)
                },
            }
        }}>
            {props.children}
        </ContextRecruitment.Provider>
    )
}

export default ContextProvider;