import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Columns, Obj, RowData } from '@/global/interface';
import { mapRoleToString } from '@/global/init';
import { ROLE_TEACHER } from '@/global/enum';
import { useGetAttendanceTeacher } from '@/utils/hooks';
import useGetDataRoute from '@/utils/hooks/getDataRoute';
import { formatDatetoString, generateRowDataForMergeRowSingleField, uuid } from '@/utils';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import { AppDispatch } from '@/store';
import Table from '@/components/Table';
import SelectInputNumber from '@/components/SelectInputNumber';
import SelectRole from '@/components/SelectRole';
import styles from '@/styles/class/DetailClass.module.scss'

interface Props {
    onChangeSession?: (currentSession: number) => void;
}
const Attendace = (props: Props) => {
    const [sessionNumber, setSessionNumber] = useState<number>(1);
    const getCrrDataRoute = useGetDataRoute();
    const attendance = useGetAttendanceTeacher();
    const router = useRouter();
    const handleUpdateChecked = (classSessionId: string, teacherId: string) => {

    }
    const columns: Columns = [
        {
            title: 'Buổi',
            dataIndex: 'classSession',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            title: 'Ngày',
            dataIndex: 'date',
            render(value, record, index) {
                return value ? formatDatetoString(value as Date, 'dd/MM/yyyy') : '';
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            title: 'Nhóm',
            dataIndex: 'groupNumber',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            title: 'Cơ sở',
            dataIndex: 'location',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            title: 'Giáo viên',
            dataIndex: 'teachers',
            render(value, record, index) {
                return value ? value.teacher as string : ''
            },
        },
        {
            title: 'Vị trí',
            dataIndex: 'teachers',
            render(value) {
                return value ? <SelectRole size='small' title={mapRoleToString[value.role as ROLE_TEACHER]} /> : ''
            },
        },
        {
            title: 'Số giờ',
            dataIndex: 'teachers',
            className: 'text-center',
            render(value, record, index) {
                return value ? <SelectInputNumber className={styles.selectHours} inputClassName={styles.inputSelectHours} step={0.5} size='small' open={false} value={value.timeKeepingHours as number} /> : ''
            },
        },
        {
            title: 'Lương',
            dataIndex: 'teachers',
            render(value, record, index) {
                return value ? Number(value.salary).toLocaleString() : '';
            },
        },
        {
            title: 'Điểm danh',
            dataIndex: 'teachers',
            className: 'text-center',
            render(value, record, index) {
                return value ? <div className={styles.actionChecked}>
                    <CheckCircleOutlined className={`${value.checked ? styles.active : styles.deactive} ${styles.iconCheck}`} />
                    <CloseCircleOutlined className={`${!value.checked ? styles.active : styles.deactive} ${styles.iconCheck}`} />
                </div> : ''
            },
        }
    ];
    const rowData: RowData[] = (attendance.data.response?.data as Array<Obj>)?.map((item) => {
        console.log(item);
        return {
            key: item._id
        }
    }) || [];
    // const mapData = generateRowDataForMergeRowSingleField(rowData, 'teachers');
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const payloadRoute: PayloadRoute = {
            payload: {
                ...getCrrDataRoute,
                moreData: {
                    isAttendance: true,
                    currentSession: sessionNumber
                }
            }
        };
        dispatch(initDataRoute(payloadRoute));
        attendance.queryGetData(router.query.classId as string, sessionNumber)
    }, [sessionNumber]);
    return (
        <div className={styles.attendaceDetailClass}>
            <div className="listFilterBySession">
                <span className={styles.pickSession}>
                    Buổi <SelectInputNumber
                        onHandlerNumber={(type) => {
                            switch (type) {
                                case 'DECRE':
                                    if (sessionNumber > 1) setSessionNumber(sessionNumber - 1)
                                    break;
                                case 'INCRE':
                                    if (sessionNumber <= 15) setSessionNumber(sessionNumber + 1)
                                    break;
                            }
                        }}
                        value={sessionNumber}
                        onSelect={(e) => {
                            setSessionNumber(Number(e.key));
                            props.onChangeSession?.(Number(e.key));
                        }}
                        total={16}
                        formatLabel={(number) => {
                            return `Buổi ${number}`
                        }}
                    />
                </span>
            </div>
            <Table
                bordered
                disableDefaultPagination
                columns={columns}
                rowData={rowData}
            />
        </div>
    )
}

export default Attendace;