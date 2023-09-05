import React, { useEffect } from 'react';
import { Obj } from '@/global/interface';
import { useGetDetailCourse } from '@/utils/hooks';
import ModalCustomize from '@/components/ModalCustomize';
import styles from '@/styles/course/ManagerCourse.module.scss';

interface Props {
    show?: boolean;
    courseId: string;
    onHide?: () => void;
}

const PopupDetailCourse = (props: Props) => {
    const detailCourse = useGetDetailCourse();
    useEffect(() => {
        detailCourse.query(props.courseId);
    }, []);
    return (
        <ModalCustomize
            loading={!detailCourse.data.response || detailCourse.data.isLoading}
            show={props.show}
            modalHeader={<h2>Thông tin khối {(detailCourse.data.response?.data as Obj)?.courseName as string}</h2>}
            onHide={props.onHide}
        >
            <div className={styles.contentDetailCourse}>

            </div>
        </ModalCustomize>
    )
}

export default PopupDetailCourse;