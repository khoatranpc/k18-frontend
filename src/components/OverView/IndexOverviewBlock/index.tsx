import React, { useEffect, useState } from 'react';
import { Obj } from '@/global/interface';
import { ROLE_TEACHER } from '@/global/enum';
import { useGetListCourse, useListTeacher, useTeacherRegisterCourse } from '@/utils/hooks';
import ChartColumn from './ChartColumn';
import IconArrowView from '@/icons/IconArrowView';
import { getListTeacherIdOfCourse } from './config';
import styles from '@/styles/Overview.module.scss';

export enum TypeOverView {
    'TEACHER' = 'TEACHER',
    'TEACHERPOINT' = 'TEACHERPOINT',
    'CLASS' = 'CLASS',
    'RANKSALARY' = 'RANKSALARY'
}
const getTitleTotal: Record<TypeOverView, string> = {
    CLASS: 'Lớp học',
    RANKSALARY: 'Trung bình',
    TEACHER: 'Giáo viên',
    TEACHERPOINT: 'Điểm GV'
}
interface Props {
    title?: string;
    type?: TypeOverView;
    children?: React.ReactNode;
}

const IndexOverViewBlock = (props: Props) => {
    const listTeacher = useListTeacher() as Obj;
    const getListTeacher = listTeacher.listTeacher?.response?.data?.listTeacher as Obj[] || [];
    const countTeacher: Record<ROLE_TEACHER, number> = {
        MT: 0,
        SP: 0,
        ST: 0
    }
    const listCourse = useGetListCourse();
    const teacherApplyCourse = useTeacherRegisterCourse();
    const getListTeacherApplyCourse = teacherApplyCourse.listData.response?.data as Obj[] || [];
    const teacherByCourse: Obj = {};
    const getListCourse = (listCourse.listCourse?.data as Obj[]);
    const listTeacherStatistic = [];
    const listTeacherApplyCourse: Record<string, string[]> = (props.type === TypeOverView.TEACHERPOINT || props.type === TypeOverView.RANKSALARY) ? getListTeacherIdOfCourse(getListCourse, getListTeacherApplyCourse) : {};
    if (props.type === TypeOverView.TEACHERPOINT || props.type === TypeOverView.RANKSALARY) {
        for (const key in listTeacherApplyCourse) {
            teacherByCourse[key] = 0;
            teacherByCourse[`count${key}`] = 0;
        }
        for (const key in listTeacherApplyCourse) {
            const element = listTeacherApplyCourse[key];
            for (let i = 0; i < element.length; i++) {
                const teacherId = element[i];
                const currentTeacher = getListTeacher?.find((item) => item._id === teacherId);
                if (props.type === TypeOverView.TEACHERPOINT) {
                    teacherByCourse[key] += currentTeacher?.teacherPoint || 0;
                    teacherByCourse[`count${key}`] += (currentTeacher?.teacherPoint ? 1 : 0);
                } else {
                    const getSalaryPH = currentTeacher?.salaryPH as Obj[];
                    if (getSalaryPH && getSalaryPH.length) {
                        const getCurrentSalary = getSalaryPH[getSalaryPH.length - 1].rank as number;
                        teacherByCourse[key] += getCurrentSalary || 0;
                        teacherByCourse[`count${key}`] += (getCurrentSalary ? 1 : 0);
                    }
                }
            }
        }
        for (const key in teacherByCourse) {
            if (!key.includes('count')) {
                const getCrrCourse = getListCourse?.find((item) => {
                    return item._id === key;
                });
                if (getCrrCourse) {
                    const newRecordColumn = {
                        name: getCrrCourse.courseName,
                        y: Number(Number(teacherByCourse[key] / teacherByCourse[`count${key}`] || 0).toFixed(2))
                    };
                    listTeacherStatistic.push(newRecordColumn);
                }
            }
        }
    }
    const evulate = {
        totalTeacherpoint: 0,
        countTeacherpoint: 0,
        totalSalary: 0,
        countHasSalary: 0
    }
    getListTeacher.forEach((item) => {
        if (item.roleIsMT) {
            countTeacher['MT']++;
        }
        if (item.roleIsST) {
            countTeacher['ST']++;
        }
        if (item.roleIsSP) {
            countTeacher['SP']++;
        }
        const listSalary = (item.salaryPH as Obj[]) || [];
        if (item.teacherPoint) {
            evulate['totalTeacherpoint'] += (item.teacherPoint);
            evulate['countTeacherpoint']++;
        }
        if (((listSalary)[listSalary.length - 1]?.rank)) {
            evulate['totalSalary'] += Number(((listSalary)[listSalary.length - 1]?.rank) || 0);
            evulate['countHasSalary']++;
        }
    });
    const listTotalTeacher = [
        {
            name: ROLE_TEACHER.ST,
            y: countTeacher.ST
        },
        {
            name: ROLE_TEACHER.MT,
            y: countTeacher.MT
        },
        {
            name: ROLE_TEACHER.SP,
            y: countTeacher.SP
        },
    ];
    const dataColumn: Record<TypeOverView, Obj[]> = {
        CLASS: [],
        RANKSALARY: listTeacherStatistic,
        TEACHER: listTotalTeacher,
        TEACHERPOINT: listTeacherStatistic
    }
    const mapGetTotal: Record<TypeOverView, number | string> = {
        CLASS: 0,
        RANKSALARY: Number(evulate.totalSalary / evulate.countHasSalary).toLocaleString() || 0,
        TEACHER: getListTeacher.length.toLocaleString(),
        TEACHERPOINT: Number(evulate.totalTeacherpoint / evulate.countTeacherpoint).toFixed(2) || 0
    }
    useEffect(() => {
        if (props.type === TypeOverView.TEACHER) {
            listTeacher.query?.(undefined, undefined, {
                fields: ['_id', 'roleIsMT', 'roleIsST', 'roleIsSP', 'teacherPoint', 'salaryPH', 'area']
            });
        }
    }, []);
    useEffect(() => {
        if (!teacherApplyCourse.listData.response && !teacherApplyCourse.listData.isLoading) {
            if (getListTeacher.length !== 0) {
                const getListTeacherId = getListTeacher.map((item) => item._id as string);
                teacherApplyCourse.query(getListTeacherId);
            }
        }
    }, [teacherApplyCourse.listData.response, getListTeacher]);
    return (
        <div className={styles.indexOverviewBlock}>
            <div className={styles.title}>
                <span>{props.title}</span>
                <IconArrowView />
            </div>
            <div className={styles.content}>
                <div className={`${styles.flex} ${styles.teacher}`}>
                    <div className={`${styles.item} ${styles.total}`}>
                        <span>
                            {
                                mapGetTotal[props.type as TypeOverView]
                            }
                        </span>
                        <span>{getTitleTotal[props.type as TypeOverView]}</span>
                    </div>
                </div>
                <ChartColumn data={dataColumn[props.type as TypeOverView]} type={props.type} />
            </div>
        </div>
    )
}

export default IndexOverViewBlock;