import Image from "next/image";
import { ROLE_USER } from "@/global/enum";
import { TabRoute } from "@/global/interface";

import iconOverView from '@/assets/svgs/icon-overview.svg';
import iconGroupUser from '@/assets/svgs/icon-groupuser.svg';
import iconTeacher from '@/assets/svgs/icon-teacher.svg';
import iconCourse from '@/assets/svgs/icon-course.svg';
import iconFolder from '@/assets/svgs/icon-folder.svg';
import iconCalendar from '@/assets/svgs/icon-calendar.svg';
import iconMessage from '@/assets/svgs/icon-message.svg';
import iconSetting from '@/assets/svgs/icon-setting.svg';
import iconInfo from '@/assets/svgs/icon-info.svg';

const tabForRole: Record<ROLE_USER, Array<TabRoute>> = {
    TE: [
        {
            title: 'Tổng quan',
            route: '/',
            text: 'Tổng quan',
            icon: <Image alt="" src={iconOverView} />,
            key: 'OVER_VIEW'
        },
        {
            title: 'Tuyển dụng',
            route: '/',
            text: 'Tuyển dụng',
            key: 'RECRUITMENT',
            icon: <Image alt="" src={iconGroupUser} />
        },
        {
            title: 'Giáo viên',
            route: '/',
            text: 'Giáo viên',
            key: 'TEACHERS',
            icon: <Image alt="" src={iconTeacher} />
        },
        {
            title: 'Khoá học',
            route: '/',
            text: 'Khoá học',
            icon: <Image alt="" src={iconCourse} />,
            key: 'COURSES'
        },
        {
            title: 'Lưu trữ',
            route: '/',
            text: 'Lưu trữ',
            icon: <Image alt="" src={iconFolder} />,
            key: 'SAVE'
        },
        {
            title: 'Feed back',
            route: '/',
            text: 'Feed back',
            icon: <Image alt="" src={iconMessage} />,
            key: 'FEED_BACK'
        },
        {
            title: 'Lịch',
            route: '/',
            text: 'Lịch',
            icon: <Image alt="" src={iconCalendar} />,
            key: 'TIME_SCHEDULE'
        },
        {
            title: 'Cài đặt',
            route: '/',
            text: 'Cài đặt',
            icon: <Image alt="" src={iconSetting} />,
            key: 'SETTING'
        },
        {
            title: 'Trợ giúp',
            route: '/',
            text: 'Trợ giúp',
            icon: <Image alt="" src={iconInfo} />,
            key: 'HELP'
        }
    ],
    TEACHER: []
};
export {
    tabForRole
}