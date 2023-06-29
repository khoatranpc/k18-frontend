import React from 'react';
import { hardDataOverView } from './data';
import styles from '@/styles/class/DetailClass.module.scss';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import BlockNotifi from './BlockNotifi';

export interface ItemOverView {
    title: string;
    data: Array<{
        title: string;
        value: Array<number | string | React.ReactNode>;
    }>;
}
const cell6 = new Array(6);
const OverView = () => {
    return (
        <div className={`${styles.overViewDetailClass} ${styles.flex1} overViewDetaiClass`}>
            <div className={`${styles.colLeft} col`}>
                {hardDataOverView.map((item, index) => {
                    return <div className={styles.row} key={index}>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.content}>
                            <div className={`${styles.parent} gridCol`}>
                                {item.data.map((data, idx) => {
                                    return <div className={`${styles.itemContent} ${index === 2 ? ((idx + 1 === item.data.length) ? `div5` : '') : `div${idx + 1}`}`} key={idx}>
                                        <p>{data.title}</p>
                                        {data.value.map((value, crrIdxValue) => {
                                            return <span key={crrIdxValue} className={styles.text}>{value}<br /></span>
                                        })}
                                    </div>
                                })}
                            </div>

                        </div>
                    </div>
                })}
            </div>
            <div className={`${styles.colRight} ${styles.colNotifi} col`}>
                <div className={styles.titleNotif}>
                    <span className='display-block'>Thông báo</span>
                    <span className={styles.iconPlus}>{MapIconKey[KEY_ICON.PLB]}</span>
                </div>
                <div className={styles.contentNotifi}>
                    <BlockNotifi className={styles.item} content='Học bài đi anh chị em ơi' dateUpdate='02/12' title='Thuyết trình cuối khoá' />
                    <BlockNotifi className={styles.item} content='Học bài đi anh chị em ơi' dateUpdate='02/12' title='Thuyết trình cuối khoá' />
                    <BlockNotifi className={styles.item} content='Học bài đi anh chị em ơi' dateUpdate='02/12' title='Thuyết trình cuối khoá' />
                    <BlockNotifi className={styles.item} content='Học bài đi anh chị em ơi' dateUpdate='02/12' title='Thuyết trình cuối khoá' />
                    <BlockNotifi className={styles.item} content='Học bài đi anh chị em ơi' dateUpdate='02/12' title='Thuyết trình cuối khoá' />
                    <BlockNotifi className={styles.item} content='Học bài đi anh chị em ơi' dateUpdate='02/12' title='Thuyết trình cuối khoá' />
                    <BlockNotifi className={styles.item} content='Học bài đi anh chị em ơi' dateUpdate='02/12' title='Thuyết trình cuối khoá' />
                    <BlockNotifi className={styles.item} content='Học bài đi anh chị em ơi' dateUpdate='02/12' title='Thuyết trình cuối khoá' />
                    <BlockNotifi className={styles.item} content='Học bài đi anh chị em ơi' dateUpdate='02/12' title='Thuyết trình cuối khoá' />
                    <BlockNotifi className={styles.item} content='Học bài đi anh chị em ơi' dateUpdate='02/12' title='Thuyết trình cuối khoá' />
                </div>
                <div className={` ${styles.combineLink}`}>
                    <div className={styles.link}>{MapIconKey[KEY_ICON.FBK]} Nhóm Facebook</div>
                    <div className={styles.link}>{MapIconKey[KEY_ICON.ZOOM]} Link Zoom</div>
                    <div className={styles.link}>{MapIconKey[KEY_ICON.DRIVE]} Link Record lớp</div>
                </div>
            </div>
        </div>
    )
}

export default OverView;