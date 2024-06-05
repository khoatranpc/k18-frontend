import React, { useEffect, useRef } from 'react';
import { Badge } from 'antd';
import { StatusProcessing } from '@/global/enum';
import { getStringStatusProcess } from '@/global/init';
import { getColorByStatusProcess, uuid } from '@/utils';
import { useGetListDataRecruitment } from '@/utils/hooks';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const ViewStatistic = () => {
    const listCandidate = useGetListDataRecruitment();
    const componentId = useRef(uuid());

    const listStatus = Object.keys(StatusProcessing).map((item) => {
        return {
            label: getStringStatusProcess[item as StatusProcessing],
            value: item
        }
    });
    useEffect(() => {
        listCandidate.query(undefined, undefined, ['_id', 'gender', 'result', 'roundProcess', 'courseApply', 'resourceApply', 'statusProcess', 'courseName', 'dob', 'createdAt', 'updatedAt', 'interviewDate', 'failCVDate'], {
            componentId: componentId.current
        });
    }, []);
    return (
        <div className={styles.viewStatistic}>
            {listStatus.map((item, idx) => {
                return <Badge
                    key={idx}
                    count={10}
                    color={getColorByStatusProcess[item.value as keyof typeof StatusProcessing]}
                >
                    <span
                        className={styles.titleStatus}
                    >
                        {item.label}
                    </span>
                </Badge>
            })}
        </div>
    )
}

export default ViewStatistic;