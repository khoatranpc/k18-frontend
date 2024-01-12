import React from 'react';
import { useRouter } from 'next/router';
import { Button, Image } from 'antd';
import { EyeTwoTone } from '@ant-design/icons';
import { LOGO } from '@/global/init-data';
import { useHandleDrawer } from '@/utils/hooks';
import styles from '@/styles/Test.module.scss';

const CollectionTest = () => {
    const drawer = useHandleDrawer();
    const router = useRouter();
    const handleOpenForm = () => {
        drawer.open({
            open: true,
            componentDirection: 'Test/CollectionQuestion',
            props: {
                courseLevelId: router.query.couyrseLevelId as string,
                courseId: router.query.courseId as string,
                isCreate: true
            },
            title: <div className={styles.titleCollectioTest}>
                <span className={styles.title}>Câu hỏi kiểm tra</span>
                <div className={styles.button}>
                    <Button>Xoá</Button>
                    <Button>Lưu</Button>
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
                    <p><b>Buổi 1: HTML</b></p>
                    <p>10 câu hỏi</p>
                    <Button size="small">Bắt đầu</Button>
                </div>
            </div>
        </div>
    )
}

export default CollectionTest;