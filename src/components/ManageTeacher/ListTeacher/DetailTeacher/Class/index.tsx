import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Badge } from 'antd';
import { Columns, Obj, RowData } from '@/global/interface';
import { getColorFromStatusClass, getColorTeacherPoint, mapRoleToString, mapStatusToString } from '@/global/init';
import { ComponentPage, KEY_ICON, ROLE_TEACHER, STATUS_CLASS } from '@/global/enum';
import CombineRoute from '@/global/route';
import { MapIconKey } from '@/global/icon';
import { useClassTeacherRegister, useDispatchDataRouter, useGetListFeedback, useGetTimeSchedule } from '@/utils/hooks';
import { formatDatetoString } from '@/utils';
import Table from '@/components/Table';
import { getMatchingTimeSchedule } from './config';
import TitleHeader from '@/components/ManageClass/TitleHeader';
import { TabDetailClass } from '@/components/ManageClass/Detail';
import styles from '@/styles/teacher/DetailTeacher.module.scss';
import { EyeFilled } from '@ant-design/icons';

const Class = () => {
    const listClass = useClassTeacherRegister();
    const getListClass = useMemo(() => {
        return (listClass.data.response?.data as Array<Obj>) ?? []
    }, listClass.data.response);
    const listTimeSchedule = useGetTimeSchedule();
    const dispatchRouter = useDispatchDataRouter();
    const listFeedback = useGetListFeedback();
    const getListFeedback = listFeedback.data.response?.data?.list as Obj[] ?? [];
    const router = useRouter();

    const colums: Columns = [
        {
            key: 'CLASS',
            title: 'Lớp',
            dataIndex: 'classId',
            className: `${styles.codeClass}`,
            render(value) {
                return <span className='flex align-center' style={{ gap: '0.8rem' }}>{value?.codeClass || ''} <EyeFilled /></span>
            },
            onCell(record) {
                return {
                    onClick() {
                        router.push(`/te/manager/class/detail/${(record.classId as Obj)?._id as string}`);
                        const headerComponent = <TitleHeader tabDetail={TabDetailClass.OVERVIEW} editTitle title={(record.classId as Obj)?.codeClass as string} dateStart={formatDatetoString(new Date((record.classId as Obj)?.dayRange?.start as Date), 'dd/MM/yyyy')} statusClass={(record.classId as Obj)?.status as STATUS_CLASS} />;
                        dispatchRouter(CombineRoute['TE']['MANAGER']['DETAILCLASS'], (record.classId as Obj)?.codeClass as string, headerComponent, ComponentPage.DETAILCLASS, true);
                    }
                }
            },
        },
        {
            key: 'STATUS',
            title: 'Trạng thái',
            dataIndex: 'classId',
            render(value) {
                return <div className={styles.statusClass} style={{ backgroundColor: getColorFromStatusClass[value?.status as STATUS_CLASS] }}>
                    {mapStatusToString[value?.status as STATUS_CLASS] || ''}
                </div>;
            }
        },
        {
            key: 'GROUP',
            title: 'Nhóm',
            dataIndex: 'groupNumber',
            render(value, record) {
                return `Nhóm ${value} - ${(record.locationId as Obj)?.locationCode as string}`;
            }
        },
        {
            key: 'SCHEDULE',
            title: 'Lịch học',
            dataIndex: 'classId',
            render(value) {
                const getTimeScheduleData = getMatchingTimeSchedule(listTimeSchedule.data.response?.data as Array<Obj>, value?.timeSchedule as Array<Obj>)
                return getTimeScheduleData.map((item) => {
                    return <p key={item.order as number} style={{ margin: 0 }}>
                        - {item.weekday as string}, {item.start}-{item.end}
                    </p>
                });
            },
        },
        {
            key: 'ROLE',
            title: 'Vị trí',
            dataIndex: 'teacherRegister',
            className: 'text-center',
            render(value, record: Obj) {
                const getTeacher = (value as Array<Obj>)?.find((item) => {
                    return item.idTeacher === router.query.teacherId as string;
                });
                const classId = (record.classId as Obj)?._id as string;
                const fbClasses = getListFeedback.filter(item => {
                
                    return item.codeClass?._id === classId && item.groupNumer?.groupNumber === record.groupNumber
                });
                let tc = 0;
                if (fbClasses.length) {
                    fbClasses.forEach(item => {
                        tc += ((item.pointMT + item.pointST) / 2)
                    });
                }
                return <Badge
                    count={fbClasses.length ? Number(tc / fbClasses.length).toLocaleString(undefined, {
                        maximumFractionDigits: 2
                    }) : 0}
                    color={fbClasses.length ? getColorTeacherPoint(tc / fbClasses.length) : 'var(--base)'}
                >
                    <span className={styles.positionTeacher}>{getTeacher?.roleRegister as ROLE_TEACHER || ''}</span>
                </Badge>
            }
        },
        {
            key: 'ENROLL',
            title: 'Tham gia',
            dataIndex: 'teacherRegister',
            className: 'text-center',
            render(value) {
                const crrTeacher = (value as Array<Obj>)?.find((item) => {
                    return item.idTeacher === router.query.teacherId as string;
                });
                return <span className={styles.iconEnroll}>
                    {(crrTeacher?.enroll ? MapIconKey[KEY_ICON.TICK] : MapIconKey[KEY_ICON.CL]) || ''}
                </span>
            }
        }
    ];
    const rowData: RowData[] = getListClass.map((item) => {
        return {
            ...item,
            key: item._id as string,
        }
    })
    useEffect(() => {
        listClass.query(router.query.teacherId as string, ['_id', 'classId', 'dayRange', 'start', 'end', 'codeClass', 'timeSchedule', 'status', 'locationId', 'locationCode', 'locationDetail', 'groupNumber', 'teacherRegister', 'roleRegister', 'idTeacher', 'enroll']);
        if (!listTimeSchedule.data.response) {
            listTimeSchedule.query();
        }
    }, []);
    useEffect(() => {
        if (getListClass.length) {
            const getListClassId = getListClass.map(item => item._id);
            listFeedback.query(undefined, undefined, {
                listClass: getListClassId
            }, ['_id', 'pointST', 'pointMT', 'groupNumber', 'location']);
        }
    }, [getListClass]);
    return (
        <div className={styles.classRegister}>
            <Table
                bordered
                loading={listClass.data.isLoading}
                disableDefaultPagination
                enablePaginationAjax
                rowData={rowData}
                columns={colums}
            />
        </div>
    )
}

export default Class;