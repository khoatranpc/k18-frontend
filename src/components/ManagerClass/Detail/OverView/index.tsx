import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Popover } from 'antd';
import { Obj } from '@/global/interface';
import { KEY_ICON, ROLE_TEACHER, STATUS_CLASS } from '@/global/enum';
import { MapIconKey } from '@/global/icon';
import { getColorFromStatusClass, mapStatusToString } from '@/global/init';
import { formatDatetoString, uuid } from '@/utils';
import { useDetailClass, useQueryBookTeacher } from '@/utils/hooks';
import BlockNotifi from './BlockNotifi';
import styles from '@/styles/class/DetailClass.module.scss';

export interface ItemOverView {
    title: string;
    data: Array<{
        title: string;
        value: Array<number | string | React.ReactNode>;
    }>;
}

const OverView = () => {
    const router = useRouter();
    const bookTeacherRQ = useQueryBookTeacher('GET');
    const detailClass = useDetailClass('GET');
    useEffect(() => {
        if (!(bookTeacherRQ.data as Obj).response) {
            bookTeacherRQ.query!(router.query.classId as string);
        }
    }, []);
    console.log(detailClass);
    const dataOverView: Array<ItemOverView> = useMemo(() => {
        const dtSt: { teacherId: string; fullName: string; }[] = [];
        const listMT: Obj[] = [];
        const dtMt: { teacherId: string; fullName: string; }[] = [];

        const locationDt: Obj[] = [];

        // pending logic filter mentor with accept=true
        const ST = (((bookTeacherRQ.data as Obj)?.response as Obj)?.data as Array<Obj>)?.filter((item) => {
            const getTeacherRegister = item.teacherRegister as Array<Obj>;
            const crrST = getTeacherRegister.find((req) => {
                return req.accept === true && (req.roleRegister as ROLE_TEACHER) === ROLE_TEACHER.ST
            });
            // console.log(item);
            locationDt.push({
                ...item.locationId,
                groupNumber: item.groupNumber,
                tc: ''
            });
            if (!crrST) {
                listMT.push(item);
            }
            return crrST;
        }) || [];
        listMT.forEach((item) => {
            (item.teacherRegister as Array<Obj>).map((tc) => {
                dtMt.push({
                    teacherId: tc.idTeacher._id as string,
                    fullName: tc.idTeacher.fullName as string
                })
            })
        });

        ST.forEach((item) => {
            (item.teacherRegister as Array<Obj>).forEach((tc) => {
                dtSt.push({
                    teacherId: tc.idTeacher._id as string,
                    fullName: tc.idTeacher.fullName as string
                })
            });
        });
        const getSt = dtSt.filter((item, index) => {
            return dtSt.findIndex((el) => el.teacherId === item.teacherId) === index;
        });
        const getMt = dtMt.filter((item, index) => {
            return dtMt.findIndex((el) => el.teacherId === item.teacherId) === index;
        });

        // nhân sự
        const dataPersonnel: ItemOverView = {
            title: 'Nhân sự',
            data: [
                {
                    title: 'Giảng viên',
                    value: getSt.map((item) => item.fullName as string) as Array<string>
                },
                {
                    title: 'Mentor',
                    value: getMt.map((item) => item.fullName as string)
                },
                {
                    title: 'Assistant',
                    value: ['Ngọc Tân', 'Ngọc Tân', 'Ngọc Tân', 'Ngọc Tân', 'Ngọc Tân', 'Ngọc Tân']
                },
                {
                    title: 'Team phụ trách',
                    value: ['18+ HCM']
                },
                {
                    title: 'CXO',
                    value: ['Thanh Bách', 'Châu Pha']
                }
            ]
        };

        // hành chính
        const dataADM = {
            title: 'Hành chính',
            data: [
                {
                    title: 'Ngày khai giảng',
                    value: [formatDatetoString(new Date(((detailClass.data.response as Obj)?.data as Obj)?.dayRange.start as string))]
                },
                {
                    title: 'Cơ sở',
                    value: locationDt.map((item) => {
                        console.log(item);
                        return <span>
                            {`Nhóm ${item.groupNumber} - ${item.locationCode as string}`}
                            <Popover
                                content={<span>
                                    GV|MT{ }
                                </span>}
                            >
                                <sup className={styles.supI}>i</sup>
                            </Popover>
                        </span>
                    })
                },
                {
                    title: 'Trạng thái',
                    value: [<span className="display-block status" key={uuid()} style={{ backgroundColor: getColorFromStatusClass[STATUS_CLASS.RUNNING] }}>{mapStatusToString[STATUS_CLASS.RUNNING]}</span>]
                },
                {
                    title: 'Lịch học',
                    value: ['T2: 19h15-22h15', 'T6: 14h-17h']
                },
                {
                    title: 'Khoá',
                    value: ['PMX']
                },
                {
                    title: 'Địa điểm',
                    value: ['Hà Nội']
                },
                {
                    title: 'Hình thức học',
                    value: ['Hybrid']
                }
            ]
        };
        const dataOverView = [
            dataPersonnel,
            dataADM,
            {
                title: 'Học viên',
                data: [
                    {
                        title: 'Sĩ số ban đầu',
                        value: ['42']
                    },
                    {
                        title: 'Sĩ số active',
                        value: ['39']
                    },
                    {
                        title: 'Số học viên hoàn tất',
                        value: ['39']
                    },
                    {
                        title: 'Số học viên chuyển lớp',
                        value: ['3']
                    }
                ]
            },
            {
                title: 'Lịch học',
                data: []
            }
        ];
        return dataOverView;
    }, [bookTeacherRQ.data]);
    return (
        <div className={`${styles.overViewDetailClass} ${styles.flex1} overViewDetaiClass`}>
            <div className={`${styles.colLeft} col`}>
                {dataOverView.map((item, index) => {
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