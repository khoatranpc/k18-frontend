import { ComponentPage, KEY_ICON, ROLE_USER } from "@/global/enum";
import { TabRoute } from "@/global/interface";
import { MapIconKey } from "@/global/icon";
import CombineRoute from "@/global/route";
import Collapse, { ItemPanels } from "@/components/Collapse";
import styles from '@/styles/tabs/Tab.module.scss';

const panelsTeacher: ItemPanels[] = [
    {
        header: <div className={styles.tabPanel}>{MapIconKey[KEY_ICON.TC]} Giáo viên</div>,
        key: 'TEACHER',
        content: <div className="content-panel">
            <div className="item">Danh sách giáo viên</div>
            <div className="item">Xếp hạng</div>
            <div className="item">Lương</div>
        </div>
    }
]

const tabForRole: Record<ROLE_USER, Array<TabRoute>> = {
    TE: [
        {
            title: 'Tổng quan',
            route: CombineRoute['TE']['OVERVIEW'],
            key: 'OVER_VIEW',
            keyIcon: KEY_ICON.OV,
            showIcon: true,
            indexRoute: CombineRoute['TE']['OVERVIEW'],
            noReplaceTitle: true,
            component: ComponentPage.OVERVIEW
        },
        {
            title: 'Tuyển dụng',
            route: CombineRoute['TE']['RECRUITMENT'],
            key: 'RECRUITMENT',
            keyIcon: KEY_ICON.RCM,
            showIcon: true,
            indexRoute: CombineRoute['TE']['RECRUITMENT'],
            noReplaceTitle: true,
            component: ComponentPage.RECRUITMENT
        },
        {
            title: <Collapse panels={panelsTeacher} className="collapse_tab" />,
            route: '/',
            key: 'TEACHERS_PN',
            keyIcon: KEY_ICON.TC,
            indexRoute: '',
            noReplaceTitle: true,
            component: ComponentPage.TEACHERS,
            notRouting: true
        },
        {
            title: 'Lớp học',
            route: CombineRoute['TE']['MANAGER']['CLASS'],
            key: 'CLASSES',
            keyIcon: KEY_ICON.HTS,
            showIcon: true,
            indexRoute: CombineRoute['TE']['MANAGER']['CLASS'],
            noReplaceTitle: true,
            component: ComponentPage.MANAGER_CLASS
        },
        {
            title: 'Khoá học',
            route: CombineRoute['TE']['MANAGER']['COURSE'],
            key: 'COURSES',
            keyIcon: KEY_ICON.CR,
            showIcon: true,
            indexRoute: '',
            noReplaceTitle: true,
            component: ComponentPage.MANAGER_COURSE
        },
        {
            title: 'Lưu trữ',
            route: CombineRoute['TE']['MANAGER']['SAVE'],
            key: 'SAVE',
            keyIcon: KEY_ICON.FD,
            showIcon: true,
            indexRoute: '',
            noReplaceTitle: true,
            component: ComponentPage.SAVE
        },
        {
            title: 'Cơ sở',
            route: CombineRoute['TE']['LOCATION'],
            key: 'LOCATION',
            keyIcon: KEY_ICON.LOCATION,
            showIcon: true,
            indexRoute: CombineRoute['TE']['LOCATION'],
            noReplaceTitle: true,
            component: ComponentPage.LOCATION
        },
        {
            title: 'Khung giờ học',
            route: CombineRoute['TE']['TIMESCHEDULE'],
            key: 'TIMESCHEDULE',
            keyIcon: KEY_ICON.CLOCK,
            showIcon: true,
            indexRoute: CombineRoute['TE']['TIMESCHEDULE'],
            noReplaceTitle: true,
            component: ComponentPage.TIMESCHEDULE
        },
        {
            title: 'Feed back',
            route: CombineRoute['TE']['MANAGER']['FEEDBACK'],
            key: 'FEED_BACK',
            keyIcon: KEY_ICON.MS,
            showIcon: true,
            indexRoute: '',
            noReplaceTitle: true,
            component: ComponentPage.MANAGER_FEEDBACK
        },
        {
            title: 'Lịch',
            route: CombineRoute['TE']['CALENDAR'],
            key: 'CALENDAR',
            keyIcon: KEY_ICON.CL,
            showIcon: true,
            indexRoute: '',
            noReplaceTitle: true,
            component: ComponentPage.CALENDAR
        },
        {
            title: 'Cài đặt',
            route: CombineRoute['TE']['SETTING'],
            key: 'SETTING',
            keyIcon: KEY_ICON.ST,
            showIcon: true,
            indexRoute: CombineRoute['TE']['SETTING'],
            noReplaceTitle: true,
            component: ComponentPage.SETTING
        },
        {
            title: 'Trợ giúp',
            route: CombineRoute['TE']['HELP'],
            key: 'HELP',
            keyIcon: KEY_ICON.IF,
            showIcon: true,
            indexRoute: CombineRoute['TE']['HELP'],
            noReplaceTitle: true,
            component: ComponentPage.HELP
        },
        {
            title: 'Chi tiết lớp học',
            route: CombineRoute['TE']['MANAGER']['DETAILCLASS'],
            key: 'DETAIL_CLASS',
            indexRoute: CombineRoute['TE']['MANAGER']['DETAILCLASS'],
            disable: true,
            keyIcon: KEY_ICON.HTS,
            component: ComponentPage.DETAILCLASS
        }
    ],
    TEACHER: []
};
export {
    tabForRole
}