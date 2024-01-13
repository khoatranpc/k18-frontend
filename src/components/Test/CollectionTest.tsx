import React from 'react';
import { useRouter } from 'next/router';
import { Button, Image } from 'antd';
import { EyeTwoTone } from '@ant-design/icons';
import { Obj } from '@/global/interface';
import { LOGO } from '@/global/init-data';
import { useHandleDrawer } from '@/utils/hooks';
import styles from '@/styles/Test.module.scss';

interface Props {
    data?: Obj;
}
const CollectionTest = (props: Props) => {
    const drawer = useHandleDrawer();
    const router = useRouter();
    const handleOpenForm = () => {
        drawer.open({
            open: true,
            componentDirection: 'Test/CollectionQuestion',
            props: {
                courseLevelId: router.query.couyrseLevelId as string,
                courseId: router.query.courseId as string,
                collectionQuizId: props.data?._id as string,
            },
            title: <div className={styles.titleCollectioTest}>
                <span className={styles.title}>Câu hỏi kiểm tra</span>
                <div className={styles.button}>
                    <Button>Xoá</Button>
                </div>
            </div>,
            className: 'drawerCreateQuestion',
            rootClassName: 'drawerCreateQuestion',
            size: "large"
        });
    }
    return (
        <div className={styles.collectionTest}>
            <div className={styles.mainBlock}>
                <Image alt='' src={LOGO} />
                <div className={styles.content}>
                    <span className={styles.eye} onClick={() => {
                        handleOpenForm();
                    }}><EyeTwoTone /></span>
                    <p><b>{props.data?.title}</b></p>
                    <p>10 câu hỏi</p>
                    <Button size="small">Bắt đầu</Button>
                </div>
            </div>
        </div>
    )
}

export default CollectionTest;