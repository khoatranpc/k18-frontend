import React from 'react';
import Link from 'next/link';
import { Obj } from '@/global/interface';
import CombineRoute from '@/global/route';
import { getColorFromStatusClass, mapStatusToString } from '@/global/init';
import { KEY_ICON, STATUS_CLASS } from '@/global/enum';
import { MapIconKey } from '@/global/icon';
import { useDetailClass } from '@/utils/hooks';
import styles from '@/styles/class/TitleHeader.module.scss';

interface Props {
    codeClass: string;
    statusClass: STATUS_CLASS;
    dateStart: string;
}
const TitleHeader = (props: Props) => {
    const detailClass = useDetailClass('GET');
    return (
        <div className={styles.titleHeader}>
            <span className={`${styles.codeClass} display-block`}>{props.codeClass}</span>
            <span className={`${styles.statusClass}`} style={{ backgroundColor: getColorFromStatusClass[(detailClass.data.response?.data as Obj)?.status as STATUS_CLASS || props.statusClass], fontWeight: '500' }}>
                {mapStatusToString[(detailClass.data.response.data as Obj)?.status as STATUS_CLASS] || mapStatusToString[props.statusClass]}
            </span>
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