import React, { useState } from 'react'
import Tabs from '../Tabs';
import { TabsProps } from 'antd';
import { Columns, RowData } from '@/global/interface';
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

const dataSource: RowData[] = [
    {
        key: 'eeeee',
        locationCode: 'HĐT',
        locationName: 'Hoàng Đạo Thuý',
        locationDetail: 'Tầng 4, Tòa B3.7 Hacinco, Hoàng Đạo Thúy, Quận Thanh Xuân, Hà Nội',
        locationArea: "Hà Nội"
    },
    {
        key: 'aaaa',
        locationCode: 'TC',
        locationName: 'Thành Công',
        locationDetail: 'Tầng 6, Tòa nhà Chigamex 22C Thành Công, Phường Thành Công, Quận Ba Đình, Hà Nội',
        locationArea: "Hà Nội"
    },
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

    const [openModal, setOpenModal] = useState<boolean>(false);

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
                enableFilter
            />
            <Table
                className={styles.tableMangerClass}
                columns={columns}
                rowData={dataSource}
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

