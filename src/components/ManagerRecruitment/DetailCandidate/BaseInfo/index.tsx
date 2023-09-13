import React from 'react';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import { formatDatetoString } from '@/utils';
import IconArrowView from '@/icons/IconArrowView';
import InProgressing from '@/components/Progressing';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const BaseInfo = () => {
    return (
        <>
            <div className={styles.candidate}>
                <span className={styles.image}>
                    {MapIconKey[KEY_ICON.TEACHER_MALE]}
                </span>
                <h2>Nguyễn Văn Cường</h2>
                <p>Junior</p>
            </div>
            <div className={styles.info}>
                <div className={`${styles.item} ${styles.flex} `}>
                    <label className={`${styles.label}`}>
                        Chuyên môn
                    </label>
                    <span>UIUX</span>
                </div>
                <div className={`${styles.item}`}>
                    <label className={`${styles.label}`}>
                        Lý lịch nghề nghiệp
                    </label>
                    <br />
                    <span>Seinor Designer</span>
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
                    <p className={styles.contact}>
                        Facebook
                        <IconArrowView onClick={(() => {
                            console.log('clickƒ');
                        })} />
                    </p>
                    <p className={styles.contact}>
                        CV
                        <IconArrowView onClick={(() => {
                            console.log('clickƒ');
                        })} />
                    </p>
                    <p className={styles.contact}>
                        khoatranpc603@gmail.com
                        <IconArrowView onClick={(() => {
                            window.open(`https://mail.google.com/mail/u/0/?tf=cm&fs=1&to=${`khoatranpc603@gmail.com`}&hl=vi`)
                        })} />
                    </p>
                </div>
                <div className={`${styles.item}`}>
                    <label className={`${styles.label}`}>
                        <span>Ứng tuyển</span> <span className={styles.timeApplied}>{formatDatetoString(new Date())}</span>
                    </label>

                </div>
            </div>
        </>
    )
}

export default BaseInfo;