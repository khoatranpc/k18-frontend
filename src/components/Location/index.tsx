import React, { useEffect, useState } from 'react'
import Tabs from '../Tabs';
import { TabsProps } from 'antd';
import { Columns, Obj, RowData } from '@/global/interface';
import { useGetLocations } from '@/utils/hooks';
import ToolBar from '../Tabs/ToolBar';
import ModalCustomize from '../ModalCustomize';
import Table from '../Table';
import CreateLocation from './CreateLocation';
import ManagerLocationContext from './context';
import styles from '@/styles/class/Class.module.scss';


const area: TabsProps['items'] = [
    {
        key: 'ALL_Location',
        label: 'Tất cả',
    },
    {
        key: 'HN',
        label: `Hà Nội`,
    },
    {
        key: 'HCM',
        label: `Hồ Chí Minh`,
    },
    {
        key: 'ĐN',
        label: `Đà Nẵng`,
    },
]
const columns: Columns = [
    {
        key: 'locationCode',
        dataIndex: 'locationCode',
        title: 'Mã cơ sở',

    },
    {
        key: 'locationName',
        dataIndex: 'locationName',
        title: 'Tên cơ sở',

    },
    {
        key: 'locationDetail',
        dataIndex: 'locationDetail',
        title: 'Địa chỉ',
    },
    {
        key: 'locationArea',
        dataIndex: 'locationArea',
        title: 'Khu Vực',

    }
];


const Location = () => {

    const [storeManagerLocation, setStoreManagerLocation] = useState<{
        crrKeyTab: string;
        listFieldFilter: Array<{
            key: string;
            value: any;
        }>
    }>({
        crrKeyTab: area[0].key,
        listFieldFilter: [],
    });
    const locations = useGetLocations();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const rowData: RowData[] = (locations.locations?.data as Obj[])?.map((item) => {
        return {
            key: item._id as string,
            ...item
        }
    })
    useEffect(() => {
        locations.queryLocations();
    }, []);
    return (
        <div >
            <Tabs listItemTab={area} activeKey={storeManagerLocation.crrKeyTab} onClickTab={(key) => {
                setStoreManagerLocation({
                    ...storeManagerLocation,
                    crrKeyTab: key
                })
            }} />
            <ToolBar
                context={ManagerLocationContext}
                listFilter={[]}
                createButton
                exportCSVButton
                onClickCreateButton={() => {
                    setOpenModal(true);
                }}
                iconReload
                // enableFilter
            />
            <Table
                loading={locations.state.isLoading}
                className={styles.tableMangerClass}
                columns={columns}
                rowData={rowData}
                enableRowSelection
                disableDefaultPagination
            />
            {
                openModal && <ModalCustomize
                    show={openModal}
                    modalHeader={<h2>Thêm cơ sở</h2>}
                    onHide={() => {
                        setOpenModal(false);
                    }}
                    size='lg'
                >
                    <CreateLocation />
                </ModalCustomize>
            }
        </div>
    )
}

export default Location;

