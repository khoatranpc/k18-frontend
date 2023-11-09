import React, { useEffect } from 'react';
import { Button, Tooltip } from 'antd';
import Link from 'next/link';
import { Columns, Obj, RowData } from '@/global/interface';
import { formatDatetoString } from '@/utils';
import { useGetCandidateOnboard, useGetClautidForCandidateOnboard } from '@/utils/hooks';
import Loading from '@/components/loading';
import styles from '@/styles/Recruitment/Candidate.module.scss';
import Table from '@/components/Table';
import { ClassForm } from '@/global/enum';

const class1: Obj = {};
const class2: Obj = {};
const FeedbackClautid = () => {
    const candidateInfo = useGetCandidateOnboard();
    const getCandidateInfo = (candidateInfo.data.response?.data as Array<Obj>)?.[0];

    const candidateClautid = useGetClautidForCandidateOnboard();
    const getCandidateClautid = candidateClautid.data.response?.data as Obj;
    const tempList = [];
    for (const key in getCandidateClautid) {
        if (key.includes("First")) {
            class1[key.split("First")[0]] = getCandidateClautid[key];
        } else if (key.includes("Second")) {
            class2[key.split("Second")[0]] = getCandidateClautid[key];
        }
    }
    tempList.push(class1, class2);
    const rowData: RowData[] = tempList.map((item, idx) => {
        return {
            ...item,
            key: idx.toString()
        }
    })
    const columns: Columns = [
        {
            title: 'Lớp',
            dataIndex: 'classId',
            render(value, record, index) {
                return value.codeClass
            },
        },
        {
            title: 'Ngày dự thính',
            dataIndex: 'time',
            render(value) {
                const getStringTime = formatDatetoString(value, "iiiiii, dd/MM/yyyy");
                return getStringTime;
            }
        },
        {
            title: 'Hình thức',
            dataIndex: 'form'
        },
        {
            title: 'Cơ sở',
            dataIndex: 'location',
            render(value, record) {
                return record.form === ClassForm.ONLINE ? <a>Zoom</a> : <p>{value.locationCode} <Tooltip title={value.locationDetail}><sup className={styles.sup}>i</sup></Tooltip></p>
            }
        },
        {
            title: 'Feedback buổi dự thính',
            dataIndex: 'feedback',
            render(value, record, index) {
                return value || 'Chưa có dữ liệu'
            },
        },
        {
            title: 'Trạng thái',
            className: "text-center",
            dataIndex: 'feedback',
            render(value, record, index) {
                return value ? "Hoàn thành" :
                    <div>
                        <Button size="small">Thực hiện</Button>
                        <Button size="small">Cập nhật</Button>
                    </div>
            },
        },
    ]
    useEffect(() => {
        candidateClautid.query({
            query: {
                candidateId: getCandidateInfo._id
            }
        });
    }, []);
    return (
        <div className={styles.feedbackClautid}>
            {candidateClautid.data.isLoading || !getCandidateClautid
                ? <Loading /> :
                <>
                    <p>Xem và đăng ký lớp dự thính tại: <Link href={'/candidate/class-running'} target="_blank"><b>Link</b></Link></p>
                    {!getCandidateClautid?.classIdFirst && <p className="error">Bạn chưa đăng ký lịch dự thính lần 1</p>}
                    {!getCandidateClautid?.classIdSecond && <p className="error">Bạn chưa đăng ký lịch dự thính lần 2</p>}
                    <Table
                        columns={columns}
                        disableDefaultPagination
                        rowData={rowData}
                    />
                </>
            }
        </div>
    )
}

export default FeedbackClautid;