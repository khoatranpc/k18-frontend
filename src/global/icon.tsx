import React from "react";
import Image from "next/image";
import { KEY_ICON } from "./enum";
import iconOverView from '@/assets/svgs/icon-overview.svg';
import iconGroupUser from '@/assets/svgs/icon-groupuser.svg';
import iconTeacher from '@/assets/svgs/icon-teacher.svg';
import iconCourse from '@/assets/svgs/icon-course.svg';
import iconFolder from '@/assets/svgs/icon-folder.svg';
import iconCalendar from '@/assets/svgs/icon-calendar.svg';
import iconMessage from '@/assets/svgs/icon-message.svg';
import iconSetting from '@/assets/svgs/icon-setting.svg';
import iconInfo from '@/assets/svgs/icon-info.svg';
import iconHatStudent from '@/assets/svgs/icon-hatStudent.svg';
import iconSearch from '@/assets/svgs/icon-search.svg';
import iconMail from '@/assets/svgs/icon-mail.svg';
import iconPlus from '@/assets/svgs/icon-plus.svg';
import iconExport from '@/assets/svgs/icon-export.svg';
import iconPlusRed from '@/assets/svgs/icon-plusRed.svg';
import iconDotVertical from '@/assets/svgs/icon-dotVertical.svg';
import iconDotHorizotal from '@/assets/svgs/icon-dot3Horizontal.svg';
import iconSort from '@/assets/svgs/icon-sort.svg';
import iconChevronUp from '@/assets/svgs/icon-chevronUp.svg';
import iconChevronDown from '@/assets/svgs/icon-chevronDown.svg';
import iconChevronRight from '@/assets/svgs/icon-chevronRight.svg';
import iconChevronLeft from '@/assets/svgs/icon-chevronLeft.svg';
import iconArrowLeft from '@/assets/svgs/icon-arrowLeft.svg';
import iconHatStudentLight from '@/assets/svgs/icon-hatStudent-light.svg';
import iconChevronRightLight from '@/assets/svgs/icon-chevronRight-light.svg';
import iconPlusBold from '@/assets/svgs/icon-plusBold.svg';
import iconFacebook from '@/assets/svgs/icon-facebook.svg';
import iconZoom from '@/assets/svgs/icon-zoom.svg';
import iconDrive from '@/assets/svgs/icon-drive.svg';
import iconReload from '@/assets/svgs/icon-reload.svg';
import iconLocation from '@/assets/svgs/icon-location.svg';

const MapIconKey: Record<KEY_ICON, React.ReactElement> = {
    OV: <Image alt="" src={iconOverView} />,
    RCM: <Image alt="" src={iconGroupUser} />,
    TC: <Image alt="" src={iconTeacher} />,
    HTS: <Image alt="" src={iconHatStudent} />,
    CR: <Image alt="" src={iconCourse} />,
    FD: <Image alt="" src={iconFolder} />,
    MS: <Image alt="" src={iconMessage} />,
    CL: <Image alt="" src={iconCalendar} />,
    ST: <Image alt="" src={iconSetting} />,
    IF: <Image alt="" src={iconInfo} />,
    SRCH: <Image alt="" src={iconSearch} />,
    ML: <Image alt="" src={iconMail} />,
    PL: <Image alt="" src={iconPlus} />,
    EP: <Image alt="" src={iconExport} />,
    PLCR: <Image alt="" src={iconPlusRed} />,
    DOT3VT: <Image alt="" src={iconDotVertical} />,
    DOT3HT: <Image alt="" src={iconDotHorizotal} />,
    SORT: <Image alt="" src={iconSort} />,
    CHEVRONU: <Image alt="" src={iconChevronUp} />,
    CHEVROND: <Image alt="" src={iconChevronDown} />,
    CHEVRONR: <Image alt="" src={iconChevronRight} />,
    CHEVRONL: <Image alt="" src={iconChevronLeft} />,
    CHEVRONRL: <Image alt="" src={iconChevronRightLight} />,
    ARROWL: <Image alt="" src={iconArrowLeft} />,
    HTSL: <Image alt="" src={iconHatStudentLight} />,
    PLB: <Image alt="" src={iconPlusBold} />,
    FBK: <Image alt="" src={iconFacebook} />,
    ZOOM: <Image alt="" src={iconZoom} />,
    DRIVE: <Image alt="" src={iconDrive} />,
    RELOAD: <Image alt="" src={iconReload} />,
    LOCATION: <Image alt="" src={iconLocation} />,
}
export {
    MapIconKey
}