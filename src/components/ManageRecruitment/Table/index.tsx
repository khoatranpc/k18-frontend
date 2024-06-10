import React, { memo, useContext, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Columns, Obj, RowData } from '@/global/interface';
import { ComponentPage, RoundProcess, StatusProcessing } from '@/global/enum';
import { getColorByResultInterview, getLabelRoundProcess } from '@/global/init';
import { formatDatetoString } from '@/utils';
import { useGetListDataRecruitment } from '@/utils/hooks';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import { ContextRecruitment } from '../context';
import Table from '@/components/Table';
import CombineRoute from '@/global/route';
import NoProgress from '@/components/NoPress';
import Processing from '@/components/Processing';
import ProcessDone from '@/components/ProcessDone';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

export const getStatusProcess: Record<StatusProcessing, React.ReactElement> = {
    DONE: <ProcessDone />,
    NOPROCESS: <NoProgress />,
    PROCESSING: <Processing />
}
interface Props {
    isSearching: boolean;
    listDataRecruitment: ReturnType<typeof useGetListDataRecruitment>;
    componentId: string;
}

interface HigherTable {
    isSearching: boolean;
}

const TableRecruitment = (props: Props) => {
    const { pagination, isSearch } = useContext(ContextRecruitment);
    const router = useRouter();
    const dispatch = useDispatch();
    const listDataRecruitment = props.listDataRecruitment;
    const rowData: RowData[] = ((listDataRecruitment.data.response?.data as Obj)?.listData as Array<Obj>)?.map((item) => {
        return {
            key: item._id,
            ...item
        }
    });

    const columns: Columns = [
        {
            key: 'TIME',
            title: 'Thời gian ứng tuyển',
            dataIndex: 'timeApply',
            render(value, record) {
                return <div className={styles.viewDetail}>
                    {formatDatetoString(value, 'dd/MM/yyyy')}
                </div>;
            },
            fixed: 'left',
            width: 150
        },
        {
            key: 'FULLNAME',
            title: 'Họ và tên',
            dataIndex: 'fullName',
            fixed: 'left',
            width: 170
        },
        {
            key: 'COURSE_REGISTER',
            title: 'Bộ môn',
            dataIndex: 'courseApply',
            className: 'text-center',
            render(value) {
                return value ? <div className={styles.subject} style={{ backgroundColor: value.color, width: '100%' }}>
                    {value.courseName}
                </div> : ''
            },
            fixed: 'left',
            width: 150
        },
        {
            key: 'CONTACT',
            title: 'Liên hệ',
            render(_, record: Obj) {
                return <div>
                    {record.phoneNumber && <p>{record.phoneNumber}</p>}
                    {record.email && <p>{record.email}</p>}
                </div>
            },
            width: 300
        },
        {
            key: 'CV',
            title: 'CV',
            className: 'text-center',
            children: [
                {
                    key: 'RSCV',
                    title: 'Kết quả',
                    dataIndex: 'processCV',
                    className: 'text-center',
                    width: 100,
                    render(value) {
                        return value ? <div
                            style={{
                                backgroundColor: getColorByResultInterview[
                                    value?.processed ? (
                                        value?.result ? 'PASS' : 'NOTPASS'
                                    ) : ('PENDING')
                                ]
                            }}
                            className={styles.result}
                        >
                            <span className={styles.result}>{!value.processed ? 'Chưa xử lý' : (value?.result ? 'Đạt' : 'Trượt')}</span>
                        </div > : '-'
                    }
                },
                {
                    key: 'RSM',
                    title: 'TT Mail',
                    dataIndex: 'processCV',
                    className: 'text-center',
                    width: 100,
                    render(value) {
                        return !value?.result ? <div
                            className={styles.result}
                            style={{
                                backgroundColor: getColorByResultInterview[value?.sentMail ? 'PASS' : 'NOTPASS']
                            }}
                        >
                            <span>{value?.sentMail ? 'Đã gửi' : 'Chưa gửi'}</span>
                        </div> : '-'
                    }
                }
            ],
        },
        {
            key: 'INTERVIEW',
            title: 'Phỏng vấn',
            className: 'text-center',
            children: [
                {
                    key: 'RSIT',
                    title: 'Kết quả',
                    dataIndex: 'processInterview',
                    className: 'text-center',
                    width: 100,
                    render(value) {
                        return value ? <div
                            style={{
                                backgroundColor: getColorByResultInterview[
                                    value?.processed ? (
                                        value?.result ? 'PASS' : 'NOTPASS'
                                    ) : ('PENDING')
                                ]
                            }}
                            className={styles.result}
                        >
                            <span className={styles.result}>{!value.processed ? 'Chưa xử lý' : (value?.result ? 'Đạt' : 'Trượt')}</span>
                        </div > : '-'
                    }
                },
                {
                    key: 'RSM',
                    title: 'TT Mail',
                    dataIndex: 'processInterview',
                    className: 'text-center',
                    width: 100,
                    render(value) {
                        return value ? <div
                            className={styles.result}
                            style={{
                                backgroundColor: getColorByResultInterview[value?.mailResultSent ? 'PASS' : 'NOTPASS']
                            }}
                        >
                            <span>{value?.mailResultSent ? 'Đã gửi' : 'Chưa gửi'}</span>
                        </div> : '-'
                    }
                }
            ],
        },
        {
            key: 'PROCESSING',
            title: 'Vòng hiện tại',
            dataIndex: 'roundProcess',
            render(value) {
                return <div>{getLabelRoundProcess[value as RoundProcess]}</div>
            },
            width: 90
        },
        {
            key: 'PROGRESS',
            title: 'Trạng thái xử lý',
            dataIndex: 'statusProcess',
            render(value) {
                return <div className={styles.statusProcess}>
                    {getStatusProcess[value as StatusProcessing]}
                </div> || ''
            },
            width: 150
        },
        {
            key: 'CV',
            title: 'CV',
            dataIndex: 'linkCv',
            render(value) {
                return <a target="_blank" style={{ color: 'blue' }} href={value}>Link</a>
            },
            fixed: 'right',
            width: 50
        },
    ];
    const handleRedirectDetail = (candidateId: string) => {
        const routerPayload: PayloadRoute = {
            payload: {
                component: ComponentPage.RECRUITMENT_DETAIL_CANDIDATE,
                route: CombineRoute['TE']['RECRUITMENT_DETAIL_CANDIDATE'],
                title: 'Chi tiết ứng viên',
                hasBackPage: true,
                replaceTitle: 'Chi tiết ứng viên',
            }
        };
        router.push(`/te/manager/recruitment/${candidateId}`);
        dispatch(initDataRoute(routerPayload));
    }
    return (
        <div className={styles.tableView}>
            <Table
                heightToScroll={600}
                hasFixedColumn
                disableDefaultPagination
                columns={columns}
                rowData={rowData}
                enablePaginationAjax
                loading={listDataRecruitment.data.isLoading}
                hanldeClickRow={(record) => {
                    handleRedirectDetail(record._id as string);
                }}
                onChangeDataPagination={(data) => {
                    pagination.setDataPagination(data);
                }}
                crrPage={pagination.data.currentPage}
                rowOnPage={pagination.data.currentTotalRowOnPage}
                showSizePage
                maxPage={(listDataRecruitment.data.response?.data as Obj)?.totalPage as number ?? 1}
            />
        </div>
    )
}

const MemoTableRecruitment = memo(TableRecruitment, (prevProps, nextProps) => {
    if (
        (nextProps.listDataRecruitment.data.payload?.query?.query?.componentId === nextProps.componentId)
        ||
        (prevProps.listDataRecruitment.data.payload?.query?.query?.componentId && nextProps.listDataRecruitment.data.payload?.query?.query?.componentId && prevProps.listDataRecruitment.data.payload?.query?.query?.componentId === nextProps.listDataRecruitment.data.payload?.query?.query?.componentId)) {
        return false;
    }
    return true;
});

const BoundaryTable = (props: HigherTable) => {
    const listDataRecruitment = useGetListDataRecruitment();
    const { pagination, conditionFilter, tableComponentId } = useContext(ContextRecruitment);
    const getDataPagination = pagination.data;

    const queryListData = (recordOnPage: number, page: number) => {
        listDataRecruitment.query(recordOnPage, page, ['_id', 'fullName', 'courseName', 'createdAt', 'updatedAt', 'email', 'phoneNumber', 'linkFacebook', 'linkCv', 'result', 'statusProcess', 'timeApply', 'roundProcess', 'sendMail', 'color'], {
            ...conditionFilter.condition,
            componentId: tableComponentId
        });
    }
    useEffect(() => {
        const getPayloadQuery = listDataRecruitment.data.payload;
        if (!props.isSearching) {
            if ((
                (getPayloadQuery &&
                    (
                        Number(getPayloadQuery?.query?.query?.recordOnPage) !== getDataPagination.currentTotalRowOnPage
                        || (Number(getPayloadQuery?.query?.query?.currentPage) !== getDataPagination.currentPage)
                    )
                ))
            ) {
                queryListData(getDataPagination.currentTotalRowOnPage, getDataPagination.currentPage);
            }
        }
    }, [pagination.data, listDataRecruitment.data.payload, props.isSearching]);
    return <MemoTableRecruitment isSearching={props.isSearching} listDataRecruitment={listDataRecruitment} componentId={tableComponentId} />;
}
export default BoundaryTable;