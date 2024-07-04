import React, { useEffect } from 'react';
import { Button } from 'antd';
import { Obj } from '@/global/interface';
import { toastify } from '@/utils';
import { useCreateTeacher, useGetDetailCandidate, useUpdateCandidate } from '@/utils/hooks';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';


const FillForm = () => {
    const updateCandidate = useUpdateCandidate();
    const crrCandidate = useGetDetailCandidate();
    const createTeacher = useCreateTeacher();
    const getDataCandidate = crrCandidate.data.response?.data as Obj;
    const handleCreateInfoTeacher = () => {
        const getCourseApply = getDataCandidate?.courseApply?._id;
        const getLevelRg = getDataCandidate?.courseApply?.courseLevel as Obj[];
        const mapCourseRc = {
            idCourse: getCourseApply,
            levelHandle: getLevelRg
        }
        const getData = {
            email: getDataCandidate?.email,
            fullName: getDataCandidate?.fullName,
            facebookLink: getDataCandidate?.linkFacebook,
            roles: ['MT'],
            phoneNumber: getDataCandidate?.phoneNumber,
            coursesRegister: [mapCourseRc],
        }
        createTeacher.query({
            body: getData
        });
    }
    useEffect(() => {
        if (createTeacher.data.response) {
            toastify(createTeacher.data.success ? 'Tạo thông tin giáo viên thành công' : `Tạo thông tin giáo viên thất bại ${createTeacher.data.response?.message as string}`, {
                type: createTeacher.data.success ? 'success' : 'error'
            });
            if (createTeacher.data.success) {
                updateCandidate.query({
                    params: [getDataCandidate._id],
                    body: {
                        fillForm: true
                    }
                });
            }
            createTeacher.clear?.();
        }
        if (updateCandidate.data.response) {
            toastify(updateCandidate.data.success ? 'Cập nhật ứng viên thành công!' : updateCandidate.data.response?.message as string, {
                type: updateCandidate.data.success ? 'success' : 'error'
            });
            updateCandidate.clear?.();
        }
    }, [createTeacher.data.response, crrCandidate.data.response, updateCandidate.data.response]);
    return (
        <div className={styles.fillFormCandidateProcess}>
            <p style={{ textAlign: 'center' }}>{!getDataCandidate.fillForm ? "Ứng viên chưa điền Form thông tin giáo viên" : "Ứng viên đã điền Form thông tin giáo viên"}</p>
            {!getDataCandidate.fillForm && <Button size='small' onClick={handleCreateInfoTeacher} style={{ color: 'var(--base)', borderColor: 'var(--base)' }} loading={updateCandidate.data.isLoading || createTeacher.data.isLoading}>Tạo thông tin nhanh</Button>}
        </div>
    )
}

export default FillForm;