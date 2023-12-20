import { ComponentPage, KEY_ICON, PositionTe, ROLE_USER } from "@/global/enum";
import { TabRoute } from "@/global/interface";
import { MapIconKey } from "@/global/icon";
import CombineRoute from "@/global/route";
import Collapse, { ItemPanels } from "@/components/Collapse";
import ContentPanel, { ItemContentPanel } from "./Panels/Content";
import HeaderPanel from "./Panels/Header";
import styles from "@/styles/tabs/Tab.module.scss";
import IconDocument from "@/icons/Document";

const listPanelTeacher: ItemContentPanel[] = [
  {
    title: "Danh sách giáo viên",
    route: CombineRoute["TE"]["MANAGER"]["TEACHER"],
  },
  // hided
  // {
  //   title: "Xếp hạng",
  //   route: CombineRoute["TE"]["MANAGER"]["TEACHERRANK"],
  // },
  // {
  //   title: "Lương",
  //   route: CombineRoute["TE"]["MANAGER"]["TEACHERSALARY"],
  // },
];
const panelsTeacher: ItemPanels[] = [
  {
    header: (
      <HeaderPanel
        listChildRoute={[
          CombineRoute["TE"]["MANAGER"]["TEACHER"],
          CombineRoute["TE"]["MANAGER"]["TEACHERRANK"],
          CombineRoute["TE"]["MANAGER"]["TEACHERSALARY"],
        ]}
        className={`${styles.tabPanel} ${styles.parent}`}
        icon={MapIconKey[KEY_ICON.TC]}
        title="Giáo viên"
      />
    ),
    key: "TEACHER",
    content: <ContentPanel listItem={listPanelTeacher} />,
  },
];

const listPanelFeedback: ItemContentPanel[] = [
  {
    title: "Form feedback",
    route: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
  },
];
const panelsFeedback: ItemPanels[] = [
  {
    header: (
      <HeaderPanel
        listChildRoute={[CombineRoute["TE"]["MANAGER"]["FEEDBACK"]]}
        className={`${styles.tabPanel} ${styles.parent}`}
        icon={MapIconKey[KEY_ICON.MS]}
        title="Feedback"
      />
    ),
    key: "FEEDBACK",
    content: <ContentPanel listItem={listPanelFeedback} />,
  },
];

const listPanelLocation: ItemContentPanel[] = [
  {
    route: CombineRoute["TE"]["LOCATION"],
    title: "Cơ sở",
  },
  {
    route: CombineRoute["TE"]["AREA"],
    title: "Khu vực",
  },
];
const panelsLocation: ItemPanels[] = [
  {
    header: (
      <HeaderPanel
        listChildRoute={[
          CombineRoute["TE"]["LOCATION"],
          CombineRoute["TE"]["AREA"],
        ]}
        className={`${styles.tabPanel} ${styles.parent}`}
        icon={MapIconKey[KEY_ICON.LOCATION]}
        title="Cơ sở"
      />
    ),
    content: <ContentPanel listItem={listPanelLocation} />,
    key: "LOCATION",
  },
];

const listPanelRecruitment: ItemContentPanel[] = [
  {
    route: CombineRoute["TE"]["RECRUITMENT"],
    title: "Tuyển dụng",
  },
  {
    route: CombineRoute["TE"]["CALENDAR_INTERVIEW"],
    title: "Lịch phỏng vấn",
  },
];
const panelsRecruitment: ItemPanels[] = [
  {
    header: (
      <HeaderPanel
        listChildRoute={[
          CombineRoute["TE"]["RECRUITMENT"],
          CombineRoute["TE"]["CALENDAR_INTERVIEW"],
        ]}
        className={`${styles.tabPanel} ${styles.parent}`}
        icon={MapIconKey[KEY_ICON.RCM]}
        title="Tuyển dụng"
      />
    ),
    content: <ContentPanel listItem={listPanelRecruitment} />,
    key: "RECRUITMENT",
  },
];

const listPanelTe: ItemContentPanel[] = [
  {
    route: CombineRoute['TE']['MANAGER']['REPORT'],
    title: 'Báo cáo'
  },
  {
    route: CombineRoute['TE']['MANAGER']['STAFF'],
    title: 'Danh sách TE'
  },
];
const panelsTE: ItemPanels[] = [
  {
    content: <ContentPanel listItem={listPanelTe} />,
    key: 'LIST_TE',
    header: <HeaderPanel
      listChildRoute={[
        CombineRoute["TE"]["MANAGER"]["STAFF"],
        CombineRoute["TE"]["MANAGER"]["REPORT"],
      ]}
      className={`${styles.tabPanel} ${styles.parent}`}
      icon={MapIconKey[KEY_ICON.EMPLOYEE]}
      title="Quản lý TE"
    />
  }
]

const listPanelDocument: ItemContentPanel[] = [
  {
    route: CombineRoute['TE']['MANAGER']["STORAGE"]['DOCUMENT'],
    title: 'Tài liệu'
  },
  {
    route: CombineRoute['TE']['MANAGER']["STORAGE"]['COURSE'],
    title: 'Khoá học'
  },
];
const panelsDocument: ItemPanels[] = [
  {
    content: <ContentPanel listItem={listPanelDocument} />,
    key: 'LIST_TE',
    header: <HeaderPanel
      listChildRoute={[
        CombineRoute["TE"]["MANAGER"]["STORAGE"]["COURSE"],
        CombineRoute["TE"]["MANAGER"]["STORAGE"]["DOCUMENT"],
      ]}
      className={`${styles.tabPanel} ${styles.parent}`}
      icon={<IconDocument />}
      title="Lưu trữ"
    />
  }
]

const tabForRole: Record<ROLE_USER, Array<TabRoute>> = {
  TE: [
    {
      title: "Tổng quan",
      route: CombineRoute["TE"]["OVERVIEW"],
      key: "OVER_VIEW",
      keyIcon: KEY_ICON.OV,
      showIcon: true,
      indexRoute: CombineRoute["TE"]["OVERVIEW"],
      noReplaceTitle: true,
      component: ComponentPage.OVERVIEW,
      positionTE: PositionTe.LEADER,
    },
    {
      title: (
        <Collapse
          panels={panelsRecruitment}
          className={`collapse_tab ${styles.mangerRecruitment}`}
        />
      ),
      route: "/",
      key: "RECUITMENT",
      indexRoute: "",
      noReplaceTitle: true,
      component: ComponentPage.RECRUITMENT,
      notRouting: true,
      className: `${styles.tabFeedback}`,
    },
    {
      title: "Tuyển dụng",
      route: CombineRoute["TE"]["RECRUITMENT"],
      key: "RECRUITMENT",
      keyIcon: KEY_ICON.RCM,
      showIcon: true,
      indexRoute: CombineRoute["TE"]["RECRUITMENT"],
      noReplaceTitle: true,
      hide: true,
      component: ComponentPage.RECRUITMENT,
    },
    {
      title: "Lịch",
      route: CombineRoute["TE"]["CALENDAR_INTERVIEW"],
      key: "CALENDAR_INTERVIEW",
      // keyIcon: KEY_ICON.RCM,
      // showIcon: true,
      indexRoute: CombineRoute["TE"]["CALENDAR_INTERVIEW"],
      noReplaceTitle: true,
      hide: true,
      component: ComponentPage.RECRUITMENT,
    },
    {
      title: "Thêm mới ứng viên",
      route: CombineRoute["TE"]["RECRUITMENT_CREATE_CANDIDATE"],
      key: "RECRUITMENT",
      keyIcon: KEY_ICON.RCM,
      showIcon: true,
      indexRoute: CombineRoute["TE"]["RECRUITMENT_CREATE_CANDIDATE"],
      component: ComponentPage.RECRUITMENT,
      hide: true,
    },
    {
      title: "Chi tiết ứng viên",
      route: CombineRoute["TE"]["RECRUITMENT_DETAIL_CANDIDATE"],
      key: "RECRUITMENT",
      keyIcon: KEY_ICON.RCM,
      showIcon: true,
      indexRoute: CombineRoute["TE"]["RECRUITMENT_DETAIL_CANDIDATE"],
      component: ComponentPage.RECRUITMENT_DETAIL_CANDIDATE,
      hide: true,
    },
    {
      title: <Collapse panels={panelsTeacher} className="collapse_tab" />,
      route: "/",
      key: "TEACHERS_PN",
      keyIcon: KEY_ICON.TC,
      indexRoute: "",
      noReplaceTitle: true,
      component: ComponentPage.TEACHERS,
      notRouting: true,
    },
    {
      title: "Lớp học",
      route: CombineRoute["TE"]["MANAGER"]["CLASS"],
      key: "CLASSES",
      keyIcon: KEY_ICON.HTS,
      showIcon: true,
      indexRoute: CombineRoute["TE"]["MANAGER"]["CLASS"],
      noReplaceTitle: true,
      component: ComponentPage.MANAGER_CLASS,
    },
    {
      title: (
        <Collapse
          panels={panelsDocument}
          className={`collapse_tab ${styles.managerLocation}`}
        />
      ),
      route: "",
      key: "MG_DOCUMENT",
      notRouting: true,
      indexRoute: "",
      noReplaceTitle: true,
      component: ComponentPage.DOCUMENT,
      className: `${styles.tabFeedback}`,
    },
    {
      title: "Khoá học",
      route: CombineRoute["TE"]["MANAGER"]["STORAGE"]["COURSE"],
      key: "COURSES",
      keyIcon: KEY_ICON.CR,
      showIcon: true,
      indexRoute: CombineRoute["TE"]["MANAGER"]["STORAGE"]["COURSE"],
      noReplaceTitle: true,
      component: ComponentPage.MANAGER_COURSE,
      hide: true
    },
    {
      title: "Lưu trữ",
      route: CombineRoute["TE"]["MANAGER"]["SAVE"],
      key: "SAVE",
      keyIcon: KEY_ICON.FD,
      showIcon: true,
      indexRoute: "",
      noReplaceTitle: true,
      component: ComponentPage.SAVE,
      hide: true,
    },
    {
      title: (
        <Collapse
          panels={panelsLocation}
          className={`collapse_tab ${styles.managerLocation}`}
        />
      ),
      route: CombineRoute["TE"]["LOCATION"],
      key: "MG_LOCATION",
      // keyIcon: KEY_ICON.LOCATION,
      notRouting: true,
      showIcon: true,
      indexRoute: "",
      noReplaceTitle: true,
      component: ComponentPage.LOCATION,
      className: `${styles.tabFeedback}`,
    },
    {
      route: CombineRoute["TE"]["LOCATION"],
      indexRoute: CombineRoute["TE"]["LOCATION"],
      component: ComponentPage.LOCATION,
      key: "LOCATION",
      title: "Cơ sở",
      noReplaceTitle: true,
      hide: true,
    },
    {
      route: CombineRoute["TE"]["AREA"],
      indexRoute: CombineRoute["TE"]["AREA"],
      component: ComponentPage.AREA,
      key: "AREA",
      title: "Khu vực",
      hide: true,
      noReplaceTitle: true,
    },
    {
      title: "Khung giờ học",
      route: CombineRoute["TE"]["TIMESCHEDULE"],
      key: "TIMESCHEDULE",
      keyIcon: KEY_ICON.CLOCK,
      showIcon: true,
      indexRoute: CombineRoute["TE"]["TIMESCHEDULE"],
      noReplaceTitle: true,
      component: ComponentPage.TIMESCHEDULE,
    },
    {
      title: (
        <Collapse
          panels={panelsFeedback}
          className={`collapse_tab ${styles.collapseFeedback}`}
        />
      ),
      route: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
      key: "FEED_BACK",
      showIcon: true,
      indexRoute: "",
      component: ComponentPage.MANAGER_FEEDBACK,
      notRouting: true,
      className: `${styles.tabFeedback}`,
    },
    // {
    //   title: "Lịch",
    //   route: CombineRoute["TE"]["CALENDAR"],
    //   key: "CALENDAR",
    //   keyIcon: KEY_ICON.CL,
    //   showIcon: true,
    //   indexRoute: "",
    //   noReplaceTitle: true,
    //   component: ComponentPage.CALENDAR,
    // },
    // {
    //   title: "Cài đặt",
    //   route: CombineRoute["TE"]["SETTING"],
    //   key: "SETTING",
    //   keyIcon: KEY_ICON.ST,
    //   showIcon: true,
    //   indexRoute: CombineRoute["TE"]["SETTING"],
    //   noReplaceTitle: true,
    //   component: ComponentPage.SETTING,
    // },
    {
      title: "Trợ giúp",
      route: CombineRoute["TE"]["HELP"],
      key: "HELP",
      keyIcon: KEY_ICON.IF,
      showIcon: true,
      indexRoute: CombineRoute["TE"]["HELP"],
      noReplaceTitle: true,
      component: ComponentPage.HELP,
      hide: true,
    },
    {
      title: "Chi tiết lớp học",
      route: CombineRoute["TE"]["MANAGER"]["DETAILCLASS"],
      key: "DETAIL_CLASS",
      indexRoute: CombineRoute["TE"]["MANAGER"]["DETAILCLASS"],
      hide: true,
      keyIcon: KEY_ICON.HTS,
      component: ComponentPage.DETAILCLASS,
    },
    {
      title: "Danh sách giáo viên",
      route: CombineRoute["TE"]["MANAGER"]["TEACHER"],
      key: "TEACHER",
      indexRoute: CombineRoute["TE"]["MANAGER"]["TEACHER"],
      hide: true,
      keyIcon: KEY_ICON.HTS,
      component: ComponentPage.TEACHER,
      noReplaceTitle: true,
    },
    {
      title: "Chi tiết",
      route: CombineRoute["TE"]["MANAGER"]["DETAILTEACHER"],
      key: "DETAIL_TEACHER",
      indexRoute: CombineRoute["TE"]["MANAGER"]["DETAILTEACHER"],
      hide: true,
      component: ComponentPage.TEACHER_DETAIL,
    },
    {
      title: "Form feedback",
      route: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
      key: "DETAIL_TEACHER",
      indexRoute: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
      hide: true,
      component: ComponentPage.MANAGER_FEEDBACK,
      noReplaceTitle: true,
    },
    {
      title: "Mẫu mail",
      route: CombineRoute["TE"]["MANAGER"]["TEMPLATE_MAIL"],
      key: "TEMPLATE_MAIL",
      showIcon: true,
      keyIcon: KEY_ICON.MAIL,
      indexRoute: CombineRoute["TE"]["MANAGER"]["TEMPLATE_MAIL"],
      hide: false,
      component: ComponentPage.TEMPLATE_MAIL,
      noReplaceTitle: true,
      positionTE: PositionTe.LEADER,
    },
    {
      title: <Collapse panels={panelsTE} className="collapse_tab" />,
      route: "",
      key: "STAFF",
      showIcon: false,
      indexRoute: "",
      component: ComponentPage.TE_STAFF,
      noReplaceTitle: true,
      positionTE: PositionTe.LEADER,
      notRouting: true,
      className: `${styles.tabFeedback}`,
    },
    {
      title: "Danh sách TE",
      route: CombineRoute["TE"]["MANAGER"]["STAFF"],
      key: "LIST_TE",
      showIcon: false,
      indexRoute: CombineRoute["TE"]["MANAGER"]["STAFF"],
      hide: true,
      component: ComponentPage.TE_STAFF,
      noReplaceTitle: true,
      positionTE: PositionTe.LEADER,
    },
    {
      title: "Báo cáo",
      route: CombineRoute["TE"]["MANAGER"]["REPORT"],
      key: "REPORT",
      showIcon: false,
      indexRoute: CombineRoute["TE"]["MANAGER"]["REPORT"],
      hide: true,
      component: ComponentPage.TE_STAFF,
      noReplaceTitle: true,
      positionTE: PositionTe.LEADER,
    },
  ],
  TEACHER: [
    {
      title: "Thông tin giáo viên",
      route: CombineRoute["TEACHER"]["TEACHERINFO"],
      key: "TEACHERS_INFO",
      keyIcon: KEY_ICON.TC,
      showIcon: true,
      indexRoute: CombineRoute["TEACHER"]["TEACHERINFO"],
      noReplaceTitle: true,
      component: ComponentPage.TEACHERS,
    },
    {
      title: "Lớp học",
      route: CombineRoute["TEACHER"]["CLASS"],
      key: "CLASSES",
      keyIcon: KEY_ICON.HTS,
      showIcon: true,
      indexRoute: CombineRoute["TEACHER"]["CLASS"],
      noReplaceTitle: true,
      component: ComponentPage.MANAGER_CLASS,
    },
    {
      title: "Khoá Học",
      route: CombineRoute["TEACHER"]["COURSE"],
      key: "COURSES",
      keyIcon: KEY_ICON.CR,
      showIcon: true,
      indexRoute: CombineRoute["TEACHER"]["COURSE"],
      noReplaceTitle: true,
      component: ComponentPage.MANAGER_COURSE,
    },
    {
      title: "Cơ sở",
      route: CombineRoute["TEACHER"]["LOCATION"],
      key: "LOCATION",
      keyIcon: KEY_ICON.LOCATION,
      showIcon: true,
      indexRoute: CombineRoute["TEACHER"]["LOCATION"],
      noReplaceTitle: true,
      component: ComponentPage.LOCATION,
    },
    {
      title: "Lịch",
      route: CombineRoute["TEACHER"]["CALENDAR"],
      key: "CALENDAR",
      keyIcon: KEY_ICON.CL,
      showIcon: true,
      indexRoute: CombineRoute["TEACHER"]["CALENDAR"],
      noReplaceTitle: true,
      component: ComponentPage.CALENDAR,
    },
    {
      title: "Trợ giúp",
      route: CombineRoute["TE"]["HELP"],
      key: "HELP",
      keyIcon: KEY_ICON.IF,
      showIcon: true,
      indexRoute: CombineRoute["TE"]["HELP"],
      noReplaceTitle: true,
      component: ComponentPage.HELP,
    },
    {
      title: "Chi tiết lớp học",
      route: CombineRoute["TEACHER"]["DETAILCLASS"],
      key: "DETAIL_CLASS",
      indexRoute: CombineRoute["TEACHER"]["DETAILCLASS"],
      hide: true,
      keyIcon: KEY_ICON.HTS,
      component: ComponentPage.DETAILCLASS,
    },
    {
      title: "Feedback",
      route: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
      key: "DETAIL_TEACHER",
      indexRoute: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
      hide: true,
      component: ComponentPage.MANAGER_FEEDBACK,
      noReplaceTitle: true,
    },
  ],
  COMMON: [],
};
export { tabForRole };
