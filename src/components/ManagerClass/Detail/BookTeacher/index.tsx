import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Action, Columns, Obj, RowData } from '@/global/interface';
import { mapRoleToString } from '@/global/init';
import { ROLE_TEACHER } from '@/global/enum';
import { generateRowDataForMergeRowSingleField, uuid } from '@/utils';
import { useQueryBookTeacher } from '@/utils/hooks';
import Table from '@/components/Table';
import styles from '@/styles/class/BookTeacher.module.scss';

const BookTeacher = () => {
    const { dataGet, queryGet } = useQueryBookTeacher('GET');
    const router = useRouter();
    const columns: Columns = [
        {
            key: 'GROUP_NUMBER',
            dataIndex: 'groupNumber',
            title: 'Nhóm',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'LOCATION',
            dataIndex: 'locationId',
            title: 'Cơ sở',
            render(value) {
                return <div>{value?.locationCode} - {value?.locationDetail}</div>
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'TEACHER_REGISTER',
            dataIndex: 'teacherRegister',
            title: 'Giáo viên đăng ký',
            render(value) {
                return <div>{value?.idTeacher?.fullName || 'Thiếu'}</div>
            },
        },
        {
            key: 'ROLE',
            dataIndex: 'teacherRegister',
            title: 'Vị trí',
            render(value) {
                return <div>{mapRoleToString[value?.role as ROLE_TEACHER] || 'Thiếu'}</div>
            },
        },
        {
            key: 'STATUS',
            dataIndex: 'teacherRegister',
            title: 'Trạng thái',
            className: 'text-center',
            render(value) {
                return <div>{value.accept ? 'Duyệt' : 'Chưa duyệt'}</div>
            },
        },
    ]

    const rowData: RowData[] = ((dataGet?.response as Obj)?.data as Array<Obj>)?.map((item) => {
        return {
            key: uuid(),
            ...item
        }
    }) || [];
    useEffect(() => {
        queryGet(router.query.classId as string);
    }, []);
    return (
        <div className={styles.bookTeacher}>
            <Table
                className="hasMergeCell"
                bordered
                columns={columns}
                rowData={generateRowDataForMergeRowSingleField(rowData, 'teacherRegister')}
                disableDefaultPagination
                hanldeClickRow={(record) => {
                    console.log(record);
                }}
            />
        </div>
    )
}

export default BookTeacher;