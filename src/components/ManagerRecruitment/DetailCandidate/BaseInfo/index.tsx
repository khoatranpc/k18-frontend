import React, { useEffect } from 'react';
import { Obj } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON, StatusProcessing } from '@/global/enum';
import { formatDatetoString } from '@/utils';
import { useGetDetailCandidate, usePredictCandidate } from '@/utils/hooks';
import IconArrowView from '@/icons/IconArrowView';
import { getStatusProcess } from '../../Table';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';
import { Button } from 'antd';

const BaseInfo = () => {
    const detailCandidate = (useGetDetailCandidate()).data.response?.data as Obj;
    const predictCandidate = usePredictCandidate();
    const getPredict = predictCandidate.data.response?.data as Obj;

    const handlePredictCandidate = () => {
        predictCandidate.query({
            params: [detailCandidate?._id as string]
        });
    }
    useEffect(() => {
        if (detailCandidate) {
            predictCandidate.query({
                params: [detailCandidate?._id as string]
            });
            return () => {
                predictCandidate.clear?.()
            }
        }
    }, [detailCandidate]);
    return (
        <div className={styles.containerBaseInfo}>
            <div className={styles.candidate}>
                <span className={styles.image}>
                    {MapIconKey[KEY_ICON.TEACHER_MALE]}
                </span>
                <h2>{detailCandidate?.fullName}</h2>
                <p>{detailCandidate?.levelTechnique}</p>
            </div>
            <div className={styles.info}>
                <div className={`${styles.item} ${styles.flex} `}>
                    <label className={`${styles.label}`}>
                        Chuyên môn
                    </label>
                    <span>{detailCandidate?.courseApply.courseName}</span>
                </div>
                <div className={`${styles.item}`}>
                    <label className={`${styles.label}`}>
                        Lý lịch nghề nghiệp
                    </label>
                    <br />
                    <span>{detailCandidate?.jobPosition}</span>
                </div>
                <div className={`${styles.item}`}>
                    <label className={`${styles.label}`}>
                        Trạng thái tuyển dụng
                    </label>
                    <br />
                    {getStatusProcess[detailCandidate?.statusProcess as StatusProcessing]}
                </div>
                <div className={`${styles.item}`}>
                    <label className={`${styles.label}`}>
                        Liên hệ
                    </label>
                    {
                        detailCandidate?.linkFacebook && <p className={styles.contact}>
                            Facebook
                            <IconArrowView onClick={(() => {
                                window.open(`${detailCandidate?.linkFacebook}`);
                            })} />
                        </p>
                    }
                    <p className={styles.contact}>
                        CV
                        <IconArrowView onClick={(() => {
                            window.open(`${detailCandidate?.linkCv}`, "blank");
                        })} />
                    </p>
                    <p className={styles.contact}>
                        {detailCandidate?.email}
                        <IconArrowView onClick={(() => {
                            window.open(`https://mail.google.com/mail/u/0/?tf=cm&fs=1&to=${detailCandidate?.email}&hl=vi`, "blank");
                        })} />
                    </p>
                </div>
                <div className={`${styles.item}`}>
                    <label className={`${styles.label}`}>
                        <span>Ứng tuyển:</span> <span className={styles.timeApplied}>{formatDatetoString(new Date(detailCandidate?.timeApply), 'dd/MM/yyyy')}</span>
                    </label>
                    <label className={`${styles.label}`}>
                        <span>Note tuyển dụng:</span> <span className={styles.timeApplied}>{detailCandidate?.note ? detailCandidate?.note : 'Không có'}</span>
                    </label>
                </div>
            </div>
            <div>
                <h2>Đánh giá</h2>
                <div className={styles.predict}>
                    <p>Chính xác: {Number(Number(getPredict?.accuracy as number || 0) * 100).toFixed(2)}%</p>
                    <p>Vị trí giảng dạy: </p>
                    <p>Cấp độ: {getPredict?.predict?.result as string}</p>
                    <Button loading={predictCandidate.data.isLoading} onClick={handlePredictCandidate}>Đánh giá</Button>
                </div>
            </div>
        </div>
    )
}

export default BaseInfo;