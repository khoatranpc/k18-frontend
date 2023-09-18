import React from 'react';
import { Obj } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import { formatDatetoString } from '@/utils';
import { useGetDetailCandidate } from '@/utils/hooks';
import IconArrowView from '@/icons/IconArrowView';
import InProgressing from '@/components/Processing';
import Loading from '@/components/loading';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const BaseInfo = () => {
    const detailCandidate = (useGetDetailCandidate()).data.response?.data as Obj;
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
                    <InProgressing />
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
                        <span>Ứng tuyển</span> <span className={styles.timeApplied}>{formatDatetoString(new Date())}</span>
                    </label>

                </div>
            </div>
        </div>
    )
}

export default BaseInfo;