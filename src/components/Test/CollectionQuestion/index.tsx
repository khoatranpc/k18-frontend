import React from 'react';
import Question from './Question';
import styles from '@/styles/Test.module.scss';

interface Props {
    courseLevelId: string;
    courseId: string;
    isCreate: boolean;
}
const CollectionQuestion = (props: Props) => {
    return (
        <div className={styles.collectionQuestion}>
            <div className={styles.contentQuestion}>
                <Question isCreate={props.isCreate} />
            </div>
        </div>
    )
}

export default CollectionQuestion;