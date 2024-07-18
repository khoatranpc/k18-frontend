import React, { memo, useEffect, useRef } from 'react';
import { Columns, Obj } from '@/global/interface';
import { useListClass, useUpdateClassBasicInfor } from '@/utils/hooks';
import { HookReducer, uuid } from '@/utils';
import Table from '@/components/Table';
import styles from "@/styles/class/Class.module.scss";

interface Props {
    componentId: string;
    listClass: HookReducer;
    date: string | number | any;
}

const DashboardClass = (props: Props) => {
    const columns: Columns = [
        {
            key: 'TITLE',
            title: "Dasboard",
            children: [
                {
                    key: 'MONTHS',
                    title: 'Tháng',
                    dataIndex: 'month',
                    className: 'text-center',
                    onCell() {
                        return {
                            className: 'bold'
                        }
                    }
                },
                {
                    key: 'TOTALCLASS',
                    title: 'Tổng lớp',
                    dataIndex: 'totalClass',
                    className: 'text-center',
                    onCell() {
                        return {
                            className: 'bold'
                        }
                    }
                },
                {
                    key: 'PER',
                    title: 'Tỉ lệ',
                    className: 'text-center',
                    onCell() {
                        return {
                            className: 'bold'
                        }
                    },
                    render(_, record: Obj) {
                        return <div style={{ height: '100%' }}>{record.ttAc}/{record.ttRQ}</div>
                    }
                }
            ]
        },
    ];
    const listClass = props.listClass;
    const getListClass = listClass.data.response?.data?.classes as Obj[] || [];
    let totalRequestBT = (0);
    let totalAcceptTc = (0);
    getListClass.map((item) => {
        const bt = item.recordBookTeacher as Obj[];
        totalRequestBT += (bt?.length || 0);
        bt.map(tc => {
            const getTCR = tc.teacherRegister as Obj[];
            if (getTCR) {
                getTCR.map((rc) => {
                    if (rc.accept) totalAcceptTc++;
                })
            }
        })
    });
    const dataSource = [
        {
            month: props.date ? new Date(props.date).getMonth() + 1 : 'Tất cả',
            totalClass: getListClass?.length ?? 0,
            ttAc: totalAcceptTc,
            ttRQ: totalRequestBT
        }
    ];
    return (
        <div className={styles.miniDashboard}>
            <Table
                className={styles.tableMiniDashboard}
                size='small'
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                bordered
            />
        </div>
    )
}
const MiniDashboard = memo(DashboardClass, (prevProps, nextProps) => {
    const getPrevComponentId = prevProps.componentId;
    const nextComponentId = nextProps.listClass.data.componentId;
    if ((getPrevComponentId === nextComponentId)) return false;
    return true;
});
interface PropsDashboard {
    month: string | number | any;
}
const BoundaryMiniDashBoard = (props: PropsDashboard) => {
    const listClass = useListClass();
    const componentId = useRef(uuid());
    const updatedClass = useUpdateClassBasicInfor();
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
        }
        else {
            listClass.query({
                query: {
                    ...props.month ? { date: props.month } : {},
                    isDelete: false
                },
            }, componentId.current);
        }
    }, [props.month, updatedClass.updated.response]);
    return <MiniDashboard componentId={componentId.current} listClass={listClass} date={props.month} />
}


export default BoundaryMiniDashBoard;