import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { useHandleDrawer } from '@/utils/hooks';
import CollectionTest from './CollectionTest';
import styles from '@/styles/Test.module.scss';

const Synthetic = () => {
    const drawer = useHandleDrawer();
    const router = useRouter();
    const handleOpenForm = () => {
        drawer.open({
            open: true,
            componentDirection: 'Test/FormCollectionTest',
            props: {
                courseLevelId: router.query.couyrseLevelId as string,
                courseId: router.query.courseId as string
            },
            title: 'Tạo tập kiểm tra'
        });
    }
    return (
        <div className={styles.containerSynthetic}>
            <div className={styles.tool}>
                <Button size="small" onClick={() => {
                    handleOpenForm();
                }}>Thêm bộ câu hỏi</Button>
            </div>
            <div className={styles.content}>
                <CollectionTest />
                <CollectionTest />
                <CollectionTest />
                <CollectionTest />
                <CollectionTest />
                <CollectionTest />
                <CollectionTest />
                <CollectionTest />
                <CollectionTest />
                <CollectionTest />
                <CollectionTest />
                <CollectionTest />
                <CollectionTest />
                <CollectionTest />
                <CollectionTest />
            </div>
        </div>
    )
}

export default Synthetic