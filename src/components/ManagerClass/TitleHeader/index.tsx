import React from 'react';
import styles from '@/styles/class/TitleHeader.module.scss';
import { KEY_ICON, STATUS_CLASS } from '@/global/enum';
import { getColorFromStatusClass, mapStatusToString } from '@/global/init';
import { MapIconKey } from '@/global/icon';
import Link from 'next/link';
import CombineRoute from '@/global/route';
interface Props {
    codeClass: string;
    statusClass: STATUS_CLASS;
    dateStart: string;
}
const TitleHeader = (props: Props) => {
    return (
        <div className={styles.titleHeader}>
            <span className={`${styles.codeClass} display-block`}>{props.codeClass}</span>
            <span className={`${styles.statusClass}`} style={{ backgroundColor: getColorFromStatusClass[props.statusClass] }}>{mapStatusToString[props.statusClass]}</span>
            <div className={styles.breadCrumb}>
                <span className={`${styles.dateStart} color-placeholder`}>{props.dateStart}</span>
                <span>{MapIconKey[KEY_ICON.HTSL]}</span>
                <Link className="color-placeholder" href={CombineRoute['TE']['MANAGER']['CLASS']}>Lớp học</Link>
                <span>{MapIconKey[KEY_ICON.CHEVRONRL]}</span>
                <span>{props.codeClass}</span>
            </div>
        </div>
    )
}

export default TitleHeader;