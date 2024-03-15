import React, { useEffect, useRef, useState } from 'react';
import { Button, Input } from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Obj, RowData } from '@/global/interface';
import { useDebounce, useGetPreTeacher } from '@/utils/hooks';
import Table from '@/components/Table';
import { getConfigColumns } from './config';
import styles from '@/styles/teacher/DetailTeacher.module.scss';

const WaitingAccept = () => {
    const columns = getConfigColumns();
    const listPreTeacher = useGetPreTeacher();
    const [email, setEmail] = useState<string>('');
    const firstMounted = useRef<boolean>(true);
    const debounce = useDebounce(email, 500);
    const getListPreteacher = listPreTeacher.data.response;
    const rowData: RowData[] = ((listPreTeacher.data.response as Obj)?.data?.list as Array<Obj>)?.map((item) => {
        return {
            ...item,
            key: item._id as string
        }
    });
    const handleQueryListTeacher = (recordOnPage?: number, currentPage?: number, email?: string) => {
        listPreTeacher.query(recordOnPage, currentPage, ["_id", "dateStartWork", "fullName", "email", "phoneNumber", "role", "facebookLink", "area", "name", "address", "CVfile", "coursesRegister", "idCourse", "levelHandle"], email);
    }
    useEffect(() => {
        if (!firstMounted.current) {
            handleQueryListTeacher(getListPreteacher?.data?.recordOnPage ?? 10, getListPreteacher?.data?.currentPage ?? 1, email);
        } else {
            firstMounted.current = false;
        }
    }, [debounce]);
    useEffect(() => {
        if (!getListPreteacher) {
            handleQueryListTeacher(10, 1);
        }
    }, []);
    return (
        <div className={styles.waitingAccept}>
            <div className={styles.toolbar}>
                <Input prefix={<SearchOutlined />} className={styles.input} placeholder="Nhập email để tìm kiếm" onChange={(e) => {
                    setEmail(e.target.value);
                }} />
                <Button onClick={() => {
                    handleQueryListTeacher(getListPreteacher?.data?.recordOnPage ?? 10, getListPreteacher?.data?.currentPage ?? 1);
                }}>
                    <ReloadOutlined />
                </Button>
            </div>
            <Table
                loading={listPreTeacher.data.isLoading}
                disableDefaultPagination
                columns={columns}
                rowData={getListPreteacher?.data?.currentPage && rowData}
                rowOnPage={getListPreteacher?.data?.recordOnPage ?? 10}
                showSizePage
                onChangeDataPagination={(data) => {
                    handleQueryListTeacher(data.currentTotalRowOnPage, data.currentPage);
                }}
                enablePaginationAjax={!email}
                crrPage={getListPreteacher?.data?.currentPage ?? 1}
                maxPage={getListPreteacher?.data?.totalPage ?? 1}
            />
        </div>
    )
}

export default WaitingAccept;