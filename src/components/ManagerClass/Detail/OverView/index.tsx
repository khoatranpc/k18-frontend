import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Popover } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Obj } from '@/global/interface';
import { KEY_ICON, ROLE_TEACHER, STATUS_CLASS, Weekday } from '@/global/enum';
import { MapIconKey } from '@/global/icon';
import { getColorFromStatusClass, getOrderWeekday, mapStatusToString } from '@/global/init';
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
    // logic call api not equal current data in reducer with router
    useLayoutEffect(() => {
        const crrStoreDetailClass = detailClass.data.response?.data._id as string;
        const crrClassId = router.query.classId as string;
        if (crrStoreDetailClass !== crrClassId) {
            detailClass.query!(crrClassId);
            bookTeacherRQ.query!(router.query.classId as string);
        }
    }, []);
    const dataOverView: Array<ItemOverView> = useMemo(() => {
        const dtSt: { teacherId: string; fullName: string; groupNumber: number }[] = [];
        const listMT: Obj[] = [];
        const dtMt: {
            teacherId: string;
            fullName: string;
            locationId: string;
            group: number;
            roleRegister: ROLE_TEACHER
        }[] = [];

        const locationDt: Obj[] = [];
        const dataDetailClass = detailClass.data.response as Obj;
        const ST = (((bookTeacherRQ.data as Obj)?.response as Obj)?.data as Array<Obj>)?.filter((item) => {
            const getTeacherRegister = item.teacherRegister as Array<Obj>;
            const crrST = getTeacherRegister.find((req) => {
                return req.accept === true && (req.roleRegister as ROLE_TEACHER) === ROLE_TEACHER.ST
            });
            locationDt.push({
                ...item.locationId,
                groupNumber: item.groupNumber,
            });
            if (!crrST) {
                const teacherMtSp = getTeacherRegister.find((req) => {
                    return req.accept === true && ((req.roleRegister as ROLE_TEACHER) === ROLE_TEACHER.SP || (req.roleRegister as ROLE_TEACHER) === ROLE_TEACHER.MT)
                })
                if (teacherMtSp) {
                    listMT.push({
                        ...teacherMtSp,
                        location: item.locationId._id,
                        groupNumber: item.groupNumber
                    });
                }
            }
            return crrST;
        }) || [];
        listMT.forEach((item) => {
            dtMt.push({
                teacherId: item.idTeacher._id as string,
                fullName: item.idTeacher.fullName as string,
                locationId: item.location as string,
                group: item.groupNumber as number,
                roleRegister: item.roleRegister as ROLE_TEACHER
            })
        });

        ST.forEach((item) => {
            (item.teacherRegister as Array<Obj>).forEach((tc) => {
                dtSt.push({
                    teacherId: tc.idTeacher._id as string,
                    fullName: tc.idTeacher.fullName as string,
                    groupNumber: item.groupNumber as number
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
                    value: [formatDatetoString((((detailClass.data.response as Obj)?.data as Obj)?.dayRange?.start as string) || new Date(), 'dd/MM/yyyy')]
                },
                {
                    title: 'Cơ sở',
                    value: locationDt.map((item, index) => {
                        const tcInLocation = dtMt.filter((tc) => {
                            return tc.locationId === item._id && tc.group === item.groupNumber;
                        });
                        const stInLocation = getSt.filter((record) => {
                            return record.groupNumber === item.groupNumber;
                        })
                        return <span key={index}>
                            {`Nhóm ${item.groupNumber} - ${item.locationCode as string}`}
                            <Popover
                                content={
                                    <div>
                                        {tcInLocation.map((record, idx) => {
                                            return <span key={idx}>
                                                {record.roleRegister}-{record.fullName}
                                            </span>
                                        })
                                        }
                                        {
                                            stInLocation.map((record, idx) => {
                                                return <span key={idx}>
                                                    {ROLE_TEACHER.ST}-{record.fullName}
                                                </span>
                                            })
                                        }
                                        {
                                            tcInLocation.length === 0 && stInLocation.length == 0 && <span><u>Ôi, chưa có GV nào hết!</u></span>
                                        }
                                    </div>
                                }
                            >
                                <sup className={styles.supI} style={{ cursor: 'pointer', width: '5px', fontSize: '-0.25em', marginLeft: '2px' }}>
                                    <InfoCircleOutlined style={{ color: '#BB0409' }} />
                                </sup>
                            </Popover>
                        </span>
                    })
                },
                {
                    title: 'Trạng thái',
                    value: [<span className="display-block status" key={uuid()} style={{ backgroundColor: getColorFromStatusClass[dataDetailClass?.data?.status as STATUS_CLASS || STATUS_CLASS.PREOPEN] }}>{mapStatusToString[dataDetailClass?.data?.status as STATUS_CLASS || STATUS_CLASS.PREOPEN]}</span>]
                },
                {
                    title: 'Lịch học',
                    value: [...(dataDetailClass?.data.timeSchedule as Array<Obj>) || []]?.sort((a, b) => {
                        return getOrderWeekday[a.weekday as Weekday] - getOrderWeekday[b.weekday as Weekday] || 0;
                    }).map((item) => {
                        return `${item.weekday}: ${String(item.start).replace(/\s/g, '').slice(0, String(item.start).length - 3)}-${String(item.end).replace(/\s/g, '').slice(0, String(item.end).length - 3)}`
                    })
                },
                {
                    title: 'Khoá',
                    value: [`${dataDetailClass?.data.courseId.courseName}-${dataDetailClass?.data.courseLevelId.levelCode}`]
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
    }, [bookTeacherRQ, detailClass]);
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