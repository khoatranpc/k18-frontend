import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { EyeOutlined } from '@ant-design/icons';
import { Columns, Obj, RowData } from '@/global/interface';
import { ComponentPage, ResultInterview, StatusProcessing } from '@/global/enum';
import { getColorByResultInterview, getStringResultInterview, getStringStatusProcess } from '@/global/init';
import { formatDatetoString, getColorByCourseName, getColorByStatusProcess } from '@/utils';
import { useGetDetailCandidate, useGetListDataRecruitment } from '@/utils/hooks';
import { ContextRecruitment } from '../context';
import Table from '@/components/Table';
import Popup from '../Popup';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import CombineRoute from '@/global/route';

const TableRecruitment = () => {
    const { modal } = useContext(ContextRecruitment);
    const router = useRouter();
    const dispatch = useDispatch();
    const candidate = useGetDetailCandidate();
    const listDataRecruitment = useGetListDataRecruitment();
    const rowData: RowData[] = ((listDataRecruitment.data.response?.data as Obj)?.listData as Array<Obj>)?.map((item) => {
        return {
            key: item._id,
            ...item
        }
    })
    useEffect(() => {
        // pending logic with pagination
        listDataRecruitment.query(10, 1, ['_id', 'fullName', 'courseName', 'createdAt', 'updatedAt', 'email', 'phoneNumber', 'linkFacebook', 'linkCv', 'result', 'statusProcess', 'timeApply']);
    }, []);
    const columns: Columns = [
        {
            key: 'TIME',
            title: 'Thời gian ứng tuyển',
            dataIndex: 'timeApply',
            render(value, record) {
                return <div className={styles.viewDetail}>
                    {formatDatetoString(value, 'dd/MM/yyyy')}
                    {/* <EyeOutlined
                        className={styles.icon}
                        onClick={() => {
                            // modal.update({
                            //     ...modal.config,
                            //     isShow: true,
                            //     isCreate: false,
                            //     title: `Thông tin ứng viên: ${record.fullName as string}`
                            // });
                            // candidate.query([record._id as string]);
                        }}
                    /> */}
                </div>;
            }
        },
        {
            key: 'FULLNAME',
            title: 'Họ và tên',
            dataIndex: 'fullName'
        },
        {
            key: 'COURSE_REGISTER',
            title: 'Bộ môn',
            dataIndex: 'courseApply',
            render(value) {
                return <div className={styles.subject} style={{ backgroundColor: getColorByCourseName[value.courseName] }}>
                    {value.courseName}
                </div> || ''
            }
        },
        {
            key: 'CONTACT',
            title: 'Liên hệ',
            render(_, record: Obj) {
                return <div>
                    {record.phoneNumber && <p>{record.phoneNumber}</p>}
                    {record.email && <p>{record.email}</p>}
                    {record.linkFacebook && <p>{record.linkFacebook}</p>}
                </div>
            }
        },
        {
            key: 'PROGRESS',
            title: 'Trạng thái',
            dataIndex: 'statusProcess',
            render(value) {
                return <div className={styles.statusProcess} style={{ backgroundColor: getColorByStatusProcess[value as StatusProcessing] }}>
                    {getStringStatusProcess[value as StatusProcessing]}
                </div> || ''
            },
        },
        {
            key: 'RESULT',
            title: 'Kết quả',
            dataIndex: 'result',
            render(value, record) {
                return <div className={styles.result} style={{
                    backgroundColor: getColorByResultInterview[value as ResultInterview]
                }} >
                    {getStringResultInterview[value as ResultInterview]}
                </div >
            }
        },
        {
            key: 'LASTUPDATE',
            title: 'Cập nhật',
            dataIndex: 'updatedAt',
            render(value) {
                return formatDatetoString(value, 'dd/MM/yyyy');
            }
        },
        {
            key: 'CV',
            title: 'CV',
            dataIndex: 'linkCv',
            render(value) {
                return <a target="_blank" style={{ color: 'blue' }} href={value}>Link</a>
            }
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
                disableDefaultPagination
                columns={columns}
                rowData={rowData}
                enablePaginationAjax
                loading={listDataRecruitment.data.isLoading}
                hanldeClickRow={(record) => {
                    handleRedirectDetail(record._id as string);
                }}
            />
            {
                modal.config.isShow && <Popup
                    show={modal.config.isShow}
                    isCreate={modal.config.isCreate}
                    onHide={() => {
                        modal.update({
                            ...modal.config,
                            isShow: false
                        })
                    }}
                    title={modal.config.title}
                />
            }
        </div>
    )
}

export default TableRecruitment;