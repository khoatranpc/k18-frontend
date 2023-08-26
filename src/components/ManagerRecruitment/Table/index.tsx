import React, { useContext } from 'react'
import { EyeOutlined } from '@ant-design/icons';
import { Columns, RowData } from '@/global/interface';
import { formatDatetoString } from '@/utils';
import { ContextRecruitment } from '../context';
import Table from '@/components/Table';
import Popup from '../Popup';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const TableRecruitment = () => {
    const columns: Columns = [
        {
            key: 'TIME',
            title: 'Thời gian ứng tuyển',
            dataIndex: 'time',
            render(value, record) {
                return <div className={styles.viewDetail}>
                    {formatDatetoString(value)}
                    <EyeOutlined
                        className={styles.icon}
                        onClick={() => {
                            modal.update({
                                ...modal.config,
                                isShow: true,
                                isCreate: false,
                                title: `Thông tin ứng viên: ${record.fullName as string}`
                            })
                        }}
                    />
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
            dataIndex: 'courseRegister'
        },
        {
            key: 'CONTACT',
            title: 'Liên hệ',
            dataIndex: 'contact'
        },
        {
            key: 'PROGRESS',
            title: 'Trạng thái',
            dataIndex: 'progress'
        },
        {
            key: 'RESULT',
            title: 'Kết quả',
            dataIndex: 'result'
        },
        {
            key: 'LASTUPDATE',
            title: 'Cập nhật',
            dataIndex: 'updatedAt',
            render(value) {
                return formatDatetoString(value);
            }
        },
        {
            key: 'CV',
            title: 'CV',
            dataIndex: 'linkCv',
            render(value) {
                return <a target="_blank" style={{ color: 'blue' }} href={value}>{value}</a>
            }
        },
    ];
    const rowData: RowData[] = [
        {
            key: '1',
            time: new Date(),
            fullName: 'Nguyễn Võ Mộng Du',
            courseRegister: 'Data',
            contact: '07653213',
            progress: 'Đang xử lý',
            result: 'Trượt',
            updatedAt: new Date(),
            linkCv: 'Link'
        },
    ];
    const { modal } = useContext(ContextRecruitment);
    return (
        <div className={styles.tableView}>
            <Table
                disableDefaultPagination
                columns={columns}
                rowData={rowData}
                enablePaginationAjax
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