import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { Popover, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Action, Obj, Query } from '@/global/interface';
import { KEY_ICON, ROLE_TEACHER, STATUS_CLASS, Weekday } from '@/global/enum';
import { MapIconKey } from '@/global/icon';
import { getColorFromStatusClass, getOrderWeekday, mapStatusToString } from '@/global/init';
import { formatDatetoString, getWeekday, uuid } from '@/utils';
import { useClassSession, useDetailClass, useQueryBookTeacher, useUpdateClassBasicInfor } from '@/utils/hooks';
import BlockNotifi from './BlockNotifi';
import PickTimeSchedule from '@/components/PickTimeSchedule';
import { configDataClassSession } from './dataConfig';
import Dropdown from '@/components/Dropdown';
import SelectCourse from '@/components/SelectCourse';
import styles from '@/styles/class/DetailClass.module.scss';

export interface ItemOverView {
    title: string;
    data: Array<{
        title: string;
        value: Array<number | string | React.ReactNode>;
    }>;
    key?: string;
}

const OverView = () => {
    const router = useRouter();
    const bookTeacherRQ = useQueryBookTeacher('GET');
    const detailClass = useDetailClass('GET');
    const classSession = useClassSession();
    const updatedClassBasicInfor = useUpdateClassBasicInfor();

    const handleUpdateClassInfo = (query: Query) => {
        const payload: Action = {
            payload: {
                query: {
                    ...query,
                    params: [router.query.classId as string]
                }
            }
        }
        updatedClassBasicInfor.handleUpdate(payload);
    }
    const getDataClassSession = useMemo(() => {
        return configDataClassSession(classSession.classSession.response as Record<string, unknown>)
    }, [classSession.classSession]);
    useEffect(() => {
        if (!(bookTeacherRQ.data as Obj).response) {
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
                const teacherMtSp = getTeacherRegister.filter((req) => {
                    return (req.accept === true && (req.roleRegister as ROLE_TEACHER) !== ROLE_TEACHER.ST)
                }).map((record) => {
                    return {
                        ...record,
                        location: item.locationId._id,
                        groupNumber: item.groupNumber
                    }
                })
                if (teacherMtSp) {
                    listMT.push(...teacherMtSp);
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
            ],
        };
        // hành chính
        const dataADM = {
            title: 'Hành chính',
            data: [
                {
                    title: 'Ngày khai giảng',
                    value: [
                        <DatePicker
                            key={uuid()}
                            value={dayjs(new Date(detailClass.data.response?.data.dayRange.start as Date))}
                            placeholder="Chọn ngày"
                            format={'DD-MM-YYYY'}
                            onChange={(value) => {
                                if (value && detailClass.data.response?.data.status === STATUS_CLASS.PREOPEN) {
                                    const getValue = (value as unknown as Obj)?.$d as Date;
                                    const mapDayStart = new Date(getValue);
                                    const mapDayEnd = new Date(getValue);
                                    mapDayEnd.setDate(mapDayEnd.getDate() + 53);
                                    handleUpdateClassInfo({
                                        body: {
                                            dayRange: {
                                                start: mapDayStart,
                                                end: mapDayEnd
                                            }
                                        }
                                    });
                                }
                            }}
                        />
                    ]
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
                                                {tcInLocation.length > 1 && <br />}
                                            </span>
                                        })
                                        }
                                        {
                                            stInLocation.map((record, idx) => {
                                                return <span key={idx}>
                                                    {ROLE_TEACHER.ST}-{record.fullName}
                                                    {stInLocation.length > 1 && <br />}
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
                    value: [
                        <Dropdown
                            key={uuid()}
                            activeKey={dataDetailClass?.data?.status as STATUS_CLASS}
                            activeClass={styles.activeStatus}
                            className={styles.handleStatus}
                            trigger='click'
                            title={<span className="display-block status" key={uuid()} style={{ backgroundColor: getColorFromStatusClass[dataDetailClass?.data?.status as STATUS_CLASS || STATUS_CLASS.PREOPEN] }}>{mapStatusToString[dataDetailClass?.data?.status as STATUS_CLASS || STATUS_CLASS.PREOPEN]}</span>}
                            listSelect={
                                [
                                    {
                                        key: STATUS_CLASS.RUNNING,
                                        label: mapStatusToString[STATUS_CLASS.RUNNING],
                                    },
                                    {
                                        key: STATUS_CLASS.PREOPEN,
                                        label: mapStatusToString[STATUS_CLASS.PREOPEN]
                                    },
                                    {
                                        key: STATUS_CLASS.FINISH,
                                        label: mapStatusToString[STATUS_CLASS.FINISH]
                                    },
                                    {
                                        key: STATUS_CLASS.DROP,
                                        label: mapStatusToString[STATUS_CLASS.DROP]
                                    },
                                ]
                            }
                            onClickItem={(e) => {
                                if (e.key as STATUS_CLASS !== dataDetailClass?.data?.status as STATUS_CLASS) {
                                    const query: Query = {
                                        body: {
                                            status: e.key
                                        }
                                    }
                                    handleUpdateClassInfo(query);
                                }
                            }}
                        />
                    ]
                },
                {
                    title: 'Giờ học',
                    value: [...(dataDetailClass?.data.timeSchedule as Array<Obj>) || []]?.sort((a, b) => {
                        return getOrderWeekday[a.weekday as Weekday] - getOrderWeekday[b.weekday as Weekday] || 0;
                    }).map((item, idx) => {
                        return <PickTimeSchedule
                            value={idx === 0 ? getWeekday(new Date(dataDetailClass?.data.dayRange.start as Date).getDay() || -1) as string : ''}
                            hasFilterByValue={idx === 0}
                            onClickItem={(e) => {
                                console.log(e);
                            }}
                            key={idx}
                            className={styles.pickTimeSchedule}
                            title={`${item.weekday}: ${String(item.start).replace(/\s/g, '').slice(0, String(item.start).length - 3)}-${String(item.end).replace(/\s/g, '').slice(0, String(item.end).length - 3)}`}
                        />
                    })
                },
                {
                    title: 'Khoá',
                    value: [
                        <SelectCourse
                            key={uuid()}
                            shortLabelItem
                            courseId={dataDetailClass?.data.courseId._id as string}
                            courseLevelId={dataDetailClass?.data.courseLevelId._id as string}
                            label={`${dataDetailClass?.data.courseId.courseName}-${dataDetailClass?.data.courseLevelId.levelCode}`}
                            onChange={(data) => {
                                if (data.courseId && data.levelId) {
                                    handleUpdateClassInfo({
                                        body: {
                                            courseId: data.courseId,
                                            courseLevelId: data.levelId
                                        }
                                    })
                                }
                            }}
                            defaultValue={`${dataDetailClass?.data.courseId.courseName}-${dataDetailClass?.data.courseLevelId.levelCode}`}
                        />
                    ]
                },
                {
                    title: 'Địa điểm',
                    value: ['Hà Nội']
                },
                {
                    title: 'Hình thức học',
                    value: [`${detailClass.data.response?.data.classForm as string}`]
                }
            ],
            key: 'adm'
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
                data: getDataClassSession.map((item, idx) => {
                    return {
                        title: `Buổi ${item.sessionNumber}: ${getWeekday((new Date(item.date as Date)).getDay())} - ${formatDatetoString(item.date as Date, 'dd/MM')}`,
                        value: []
                    }
                })
            }
        ];
        return dataOverView;
    }, [bookTeacherRQ, detailClass, getDataClassSession]);
    // logic call api not equal current data in reducer with router
    useLayoutEffect(() => {
        const crrStoreDetailClass = detailClass.data.response?.data._id as string;
        const crrClassId = router.query.classId as string;
        if (crrStoreDetailClass !== crrClassId) {
            detailClass.query!(crrClassId);
            bookTeacherRQ.query!(router.query.classId as string);
        }
    }, []);

    useEffect(() => {
        const crrStoreDetailClass = detailClass.data.response?.data._id as string;
        const crrClassId = router.query.classId as string;

        if (!classSession.classSession.response || (crrStoreDetailClass !== crrClassId)) {
            classSession.queryGetClassSession(router.query.classId as string);
        }
    }, []);

    useEffect(() => {
        if (updatedClassBasicInfor.updated.response) {
            updatedClassBasicInfor.clear();
            detailClass.query!(router.query.classId as string);
        }
    }, [updatedClassBasicInfor]);

    return (
        <div className={`${styles.overViewDetailClass} ${styles.flex1} overViewDetaiClass`}>
            <div className={`${styles.colLeft} col`}>
                {dataOverView.map((item, index) => {
                    return <div className={styles.row} key={index}>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.content}>
                            <div className={`${styles.parent} gridCol`}>
                                {item.data.map((data, idx) => {
                                    return <div
                                        className={`${styles.itemContent} ${index === 2 ? ((idx + 1 === item.data.length) ? `div5` : '') : `div${idx + 1}`}`}
                                        key={idx}
                                    >
                                        <p className="hover color-base">
                                            {data.title}
                                        </p>
                                        {data.value.map((value, crrIdxValue) => {
                                            return <span key={crrIdxValue} className={styles.text}>{value} {item.key !== 'adm' && <br />}</span>
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
        </div >
    )
}

export default OverView;