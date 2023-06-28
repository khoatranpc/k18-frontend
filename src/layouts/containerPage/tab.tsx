import { KEY_ICON, ROLE_USER } from "@/global/enum";
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
            text: 'Tổng quan',
            key: 'OVER_VIEW',
            keyIcon: KEY_ICON.OV,
            showIcon: true,
            indexRoute: CombineRoute['TE']['OVERVIEW'],
            noReplaceTitle: true
        },
        {
            title: 'Tuyển dụng',
            route: CombineRoute['TE']['RECRUITMENT'],
            text: 'Tuyển dụng',
            key: 'RECRUITMENT',
            keyIcon: KEY_ICON.RCM,
            showIcon: true,
            indexRoute: CombineRoute['TE']['RECRUITMENT'],
            noReplaceTitle: true
        },
        {
            title: <Collapse panels={panelsTeacher} className="collapse_tab" />,
            route: '/',
            text: 'Giáo viên',
            key: 'TEACHERS_PN',
            keyIcon: KEY_ICON.TC,
            indexRoute: '',
            noReplaceTitle: true
        },
        {
            title: 'Lớp học',
            route: CombineRoute['TE']['MANAGER']['CLASS'],
            text: 'Lớp học',
            key: 'CLASSES',
            keyIcon: KEY_ICON.HTS,
            showIcon: true,
            indexRoute: CombineRoute['TE']['MANAGER']['CLASS'],
            noReplaceTitle: true
        },
        {
            title: 'Khoá học',
            route: CombineRoute['TE']['MANAGER']['COURSE'],
            text: 'Khoá học',
            key: 'COURSES',
            keyIcon: KEY_ICON.CR,
            showIcon: true,
            indexRoute: '',
            noReplaceTitle: true
        },
        {
            title: 'Lưu trữ',
            route: CombineRoute['TE']['MANAGER']['SAVE'],
            text: 'Lưu trữ',
            key: 'SAVE',
            keyIcon: KEY_ICON.FD,
            showIcon: true,
            indexRoute: '',
            noReplaceTitle: true
        },
        {
            title: 'Feed back',
            route: CombineRoute['TE']['MANAGER']['FEEDBACK'],
            text: 'Feed back',
            key: 'FEED_BACK',
            keyIcon: KEY_ICON.MS,
            showIcon: true,
            indexRoute: '',
            noReplaceTitle: true
        },
        {
            title: 'Lịch',
            route: CombineRoute['TE']['CALENDAR'],
            text: 'Lịch',
            key: 'CALENDAR',
            keyIcon: KEY_ICON.CL,
            showIcon: true,
            indexRoute: '',
            noReplaceTitle: true
        },
        {
            title: 'Cài đặt',
            route: CombineRoute['TE']['SETTING'],
            text: 'Cài đặt',
            key: 'SETTING',
            keyIcon: KEY_ICON.ST,
            showIcon: true,
            indexRoute: CombineRoute['TE']['SETTING'],
            noReplaceTitle: true
        },
        {
            title: 'Trợ giúp',
            route: CombineRoute['TE']['HELP'],
            text: 'Trợ giúp',
            key: 'HELP',
            keyIcon: KEY_ICON.IF,
            showIcon: true,
            indexRoute: CombineRoute['TE']['HELP'],
            noReplaceTitle: true
        },
        {
            title: 'Chi tiết lớp học',
            route: CombineRoute['TE']['MANAGER']['DETAILCLASS'],
            text: 'Chi tiết lớp học',
            key: 'DETAIL_CLASS',
            indexRoute: CombineRoute['TE']['MANAGER']['DETAILCLASS'],
            disable: true,
            keyIcon: KEY_ICON.HTS,
        }
    ],
    TEACHER: []
};
export {
    tabForRole
}