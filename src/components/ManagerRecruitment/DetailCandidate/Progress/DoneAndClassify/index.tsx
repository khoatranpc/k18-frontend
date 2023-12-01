import React, { useEffect, useState } from 'react';
import { MenuProps } from 'antd';
import { Obj } from '@/global/interface';
import { useGetDetailCandidate, useGetDetailCourse, useUpdateCandidate } from '@/utils/hooks';
import Dropdown from '@/components/Dropdown';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const Done = () => {
    const crrCandidate = useGetDetailCandidate();
    const getDataCandidate = crrCandidate.data.response?.data as Obj;
    const crrCourse = useGetDetailCourse();
    const getCourse = crrCourse.data.response?.data as Obj;
    const updateCandidate = useUpdateCandidate();
    const [levelClassify, setLevelClassify] = useState<string>(getDataCandidate?.classifyLevel || '');
    const getListLevel: MenuProps['items'] = (getCourse?.courseLevel as Obj[])?.map((item) => {
        return {
            key: item._id,
            label: item.levelCode
        }
    });
    const getCurrentClassify = (getListLevel?.find(item => item?.key === levelClassify)) as Obj;
    useEffect(() => {
        if (getDataCandidate) {
            crrCourse.query(getDataCandidate.courseApply._id as string);
        }
    }, []);
    useEffect(() => {
        if (levelClassify) {
            updateCandidate.query({
                body: {
                    classifyLevel: levelClassify
                },
                params: [getDataCandidate._id as string]
            })
        }
    }, [levelClassify]);
    useEffect(() => {
        if (updateCandidate.data.response) {
            updateCandidate.clear?.();
        }
    }, [updateCandidate.data]);
    return (
        <div className={styles.doneAndClassify}>
            <h2>Hoàn tất quá trình xử lý ứng viên</h2>
            <p>Phân loại cấp độ: </p>
            <div className={styles.selectCourse}>
                <b>{getCourse?.courseName}</b>
                <Dropdown
                    loading={updateCandidate.data.isLoading}
                    icon
                    sizeButton="small"
                    trigger='click'
                    onClickItem={(e) => {
                        setLevelClassify(e.key);
                    }}
                    listSelect={getListLevel}
                    title={getCurrentClassify?.label || 'Chọn cấp độ'}
                />
            </div>

        </div>
    )
}

export default Done;