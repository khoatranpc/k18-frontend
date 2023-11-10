import React, { useEffect, useRef, useState } from 'react';
import { Button, Tooltip } from 'antd';
import Link from 'next/link';
import { Columns, Obj, RowData } from '@/global/interface';
import { formatDatetoString } from '@/utils';
import { useGetCandidateOnboard, useGetClautidForCandidateOnboard, useGetFeedbackClautid } from '@/utils/hooks';
import Loading from '@/components/loading';
import Table from '@/components/Table';
import { ClassForm } from '@/global/enum';
import ModalCustomize from '@/components/ModalCustomize';
import Feedback from './Feedback';
import styles from '@/styles/Recruitment/Candidate.module.scss';

const class1: Obj = {};
const class2: Obj = {};
const FeedbackClautid = () => {
    const candidateInfo = useGetCandidateOnboard();
    const getCandidateInfo = (candidateInfo.data.response?.data as Array<Obj>)?.[0];
    const [showModalFeedback, setShowModalFeedback] = useState<{
        show: boolean,
        data: Obj,
        countTime: number,
        isCreate?: boolean
    }>({
        show: false,
        data: {},
        countTime: 0,
        isCreate: false
    });
    const candidateClautid = useGetClautidForCandidateOnboard();
    const getCandidateClautid = candidateClautid.data.response?.data as Obj;

    const feedbackClautid = useGetFeedbackClautid();
    const getFeedbackClautid = feedbackClautid.data.response?.data as Array<Obj>;

    const tempList: Obj[] = [];
    for (const key in getCandidateClautid) {
        if (key.includes("First")) {
            class1[key.split("First")[0]] = getCandidateClautid[key];
        } else if (key.includes("Second")) {
            class2[key.split("Second")[0]] = getCandidateClautid[key];
        }
    }

    tempList.push(class1, class2);
    tempList.forEach((item, idx) => {
        item['feedback'] = getFeedbackClautid?.[idx];
    });
    const rowData: RowData[] = tempList.map((item, idx) => {
        return {
            ...item,
            key: idx.toString()
        }
    });
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
            title: 'Feedback',
            dataIndex: 'feedback',
            render(value, record, index) {
                return <div className={`${styles.cell} ${value ? styles.completed : styles.pending}`} onClick={() => {
                    if (value) {
                        setShowModalFeedback({
                            show: true,
                            data: record,
                            countTime: index,
                            isCreate: false
                        });
                    }
                }}>{value ? 'Hoàn thành' : 'Chưa có dữ liệu'}</div>
            },
            onCell() {
                return {
                    className: "text-center"
                }
            }
        },
        {
            title: 'Hành động',
            className: "text-center",
            dataIndex: 'feedback',
            render(value, record, index) {
                return value ? <div className={`${styles.cell} ${styles.completed}`}>Hoàn thành</div> :
                    <div>
                        <Button size="small" onClick={() => {
                            setShowModalFeedback({
                                show: true,
                                data: record,
                                countTime: index,
                                isCreate: true
                            });
                        }}>Thực hiện</Button>
                        <Button size="small">Cập nhật</Button>
                    </div>
            },
        },
    ];
    useEffect(() => {
        candidateClautid.query({
            query: {
                candidateId: getCandidateInfo._id
            }
        });
    }, []);
    useEffect(() => {
        if (candidateClautid.data.response && candidateClautid.data.response) {
            feedbackClautid.query({
                query: {
                    listCandidateId: [getCandidateInfo._id].toString(),
                    listClassId: [getCandidateClautid.classIdFirst._id, getCandidateClautid.classIdSecond._id].toString()
                }
            });
        }
    }, [candidateInfo.data.response, candidateClautid.data.response]);
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
            {
                showModalFeedback &&
                <ModalCustomize
                    modalHeader={<h2>Feedback buổi dự thính</h2>}
                    show={showModalFeedback.show}
                    onHide={() => {
                        setShowModalFeedback({
                            ...showModalFeedback,
                            show: false,
                        });
                    }}
                >
                    <Feedback
                        isCreate={showModalFeedback.isCreate}
                        closeModel={() => {
                            setShowModalFeedback({
                                ...showModalFeedback,
                                show: false,
                            });
                        }}
                        dataClass={showModalFeedback.data}
                        countTime={showModalFeedback.countTime}
                    />
                </ModalCustomize>
            }
        </div>
    )
}

export default FeedbackClautid;