import React, { useState } from 'react';
import BaseInfo from './BaseInfo';
import Progress from './Progress';
import IconBoard from '@/icons/IconBoard';
import IconFeedbackBorder from '@/icons/IconFeedbackBorder';
import IconEdit2 from '@/icons/IconEdit2';
import IconWhitePlus from '@/icons/IconWhitePlus';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

enum TabMain {
    PROGRESS = 'PROGRESS',
    FEEDBACK = 'FEEDBACK'
}

const DetailCandidate = () => {
    const [tabMain, setTabMain] = useState<TabMain>(TabMain.PROGRESS);

    const contentTabMain: Record<TabMain, React.ReactElement> = {
        FEEDBACK: <>Feedback</>,
        PROGRESS: <Progress />
    }
    return (
        <div className={styles.detailCandidate}>
            <div className={styles.baseInfo}>
                <BaseInfo />
            </div>
            <div className={styles.progressInfo}>
                <div className={styles.headerFunction}>
                    <div className={styles.tab}>
                        <button className={`${tabMain === TabMain.PROGRESS ? styles.active : ''}`}
                            onClick={() => {
                                setTabMain(TabMain.PROGRESS);
                            }}
                        >
                            <IconBoard /> Tiến triển
                        </button>
                        <button className={`${tabMain === TabMain.FEEDBACK ? styles.active : ''}`}
                            onClick={() => {
                                setTabMain(TabMain.FEEDBACK);
                            }}
                        >
                            <IconFeedbackBorder /> Ghi chú
                        </button>
                    </div>
                    <div className={styles.btnFunction}>
                        <button>
                            <IconEdit2 /> Chỉnh sửa
                        </button>
                        <button>
                            <IconWhitePlus /> Tạo tài khoản
                        </button>
                    </div>
                </div>
                <div className={styles.mainContent}>
                    {contentTabMain[tabMain]}
                </div>
            </div>
        </div>
    )
}

export default DetailCandidate;