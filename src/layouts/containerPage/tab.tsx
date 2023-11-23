import { ComponentPage, KEY_ICON, PositionTe, ROLE_USER } from "@/global/enum";
import { TabRoute } from "@/global/interface";
import { MapIconKey } from "@/global/icon";
import CombineRoute from "@/global/route";
import Collapse, { ItemPanels } from "@/components/Collapse";
import ContentPanel, { ItemContentPanel } from "./Panels/Content";
import HeaderPanel from "./Panels/Header";
import styles from "@/styles/tabs/Tab.module.scss";

const listPanelTeacher: ItemContentPanel[] = [
  {
    title: "Danh sách giáo viên",
    route: CombineRoute["TE"]["MANAGER"]["TEACHER"],
  },
  {
    title: "Xếp hạng",
    route: CombineRoute["TE"]["MANAGER"]["TEACHERRANK"],
  },
  {
    title: "Lương",
    route: CombineRoute["TE"]["MANAGER"]["TEACHERSALARY"],
  },
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
    title: 'Cơ sở'
  },
  {
    route: CombineRoute["TE"]["AREA"],
    title: 'Khu vực'
  }
];
const panelsLocation: ItemPanels[] = [
  {
    header: <HeaderPanel
      listChildRoute={[CombineRoute["TE"]["LOCATION"], CombineRoute["TE"]["AREA"]]}
      className={`${styles.tabPanel} ${styles.parent}`}
      icon={MapIconKey[KEY_ICON.LOCATION]}
      title="Cơ sở"
    />,
    content: <ContentPanel listItem={listPanelLocation} />,
    key: "LOCATION"
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
      positionTE: PositionTe.LEADER
    },
    {
      title: "Tuyển dụng",
      route: CombineRoute["TE"]["RECRUITMENT"],
      key: "RECRUITMENT",
      keyIcon: KEY_ICON.RCM,
      showIcon: true,
      indexRoute: CombineRoute["TE"]["RECRUITMENT"],
      noReplaceTitle: true,
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
      disable: true,
    },
    {
      title: "Chi tiết ứng viên",
      route: CombineRoute["TE"]["RECRUITMENT_DETAIL_CANDIDATE"],
      key: "RECRUITMENT",
      keyIcon: KEY_ICON.RCM,
      showIcon: true,
      indexRoute: CombineRoute["TE"]["RECRUITMENT_DETAIL_CANDIDATE"],
      component: ComponentPage.RECRUITMENT_DETAIL_CANDIDATE,
      disable: true,
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
      title: "Khoá học",
      route: CombineRoute["TE"]["MANAGER"]["COURSE"],
      key: "COURSES",
      keyIcon: KEY_ICON.CR,
      showIcon: true,
      indexRoute: CombineRoute["TE"]["MANAGER"]["COURSE"],
      noReplaceTitle: true,
      component: ComponentPage.MANAGER_COURSE,
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
      disable: true
    },
    {
      title: <Collapse panels={panelsLocation} className={`collapse_tab ${styles.managerLocation}`} />,
      route: CombineRoute["TE"]["LOCATION"],
      key: "MG_LOCATION",
      // keyIcon: KEY_ICON.LOCATION,
      notRouting: true,
      showIcon: true,
      indexRoute: '',
      noReplaceTitle: true,
      component: ComponentPage.LOCATION,
      className: `${styles.tabFeedback}`,
    },
    {
      route: CombineRoute["TE"]["LOCATION"],
      indexRoute: CombineRoute["TE"]["LOCATION"],
      component: ComponentPage.LOCATION,
      key: 'LOCATION',
      title: 'Cơ sở',
      noReplaceTitle: true,
      disable: true,
    },
    {
      route: CombineRoute["TE"]["AREA"],
      indexRoute: CombineRoute["TE"]["AREA"],
      component: ComponentPage.AREA,
      key: 'AREA',
      title: 'Khu vực',
      disable: true,
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
    {
      title: "Lịch",
      route: CombineRoute["TE"]["CALENDAR"],
      key: "CALENDAR",
      keyIcon: KEY_ICON.CL,
      showIcon: true,
      indexRoute: "",
      noReplaceTitle: true,
      component: ComponentPage.CALENDAR,
    },
    {
      title: "Cài đặt",
      route: CombineRoute["TE"]["SETTING"],
      key: "SETTING",
      keyIcon: KEY_ICON.ST,
      showIcon: true,
      indexRoute: CombineRoute["TE"]["SETTING"],
      noReplaceTitle: true,
      component: ComponentPage.SETTING,
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
      disable: true
    },
    {
      title: "Chi tiết lớp học",
      route: CombineRoute["TE"]["MANAGER"]["DETAILCLASS"],
      key: "DETAIL_CLASS",
      indexRoute: CombineRoute["TE"]["MANAGER"]["DETAILCLASS"],
      disable: true,
      keyIcon: KEY_ICON.HTS,
      component: ComponentPage.DETAILCLASS,
    },
    {
      title: "Danh sách giáo viên",
      route: CombineRoute["TE"]["MANAGER"]["TEACHER"],
      key: "TEACHER",
      indexRoute: CombineRoute["TE"]["MANAGER"]["TEACHER"],
      disable: true,
      keyIcon: KEY_ICON.HTS,
      component: ComponentPage.TEACHER,
      noReplaceTitle: true,
    },
    {
      title: "Chi tiết",
      route: CombineRoute["TE"]["MANAGER"]["DETAILTEACHER"],
      key: "DETAIL_TEACHER",
      indexRoute: CombineRoute["TE"]["MANAGER"]["DETAILTEACHER"],
      disable: true,
      component: ComponentPage.TEACHER_DETAIL,
    },
    {
      title: "Form feedback",
      route: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
      key: "DETAIL_TEACHER",
      indexRoute: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
      disable: true,
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
      disable: false,
      component: ComponentPage.TEMPLATE_MAIL,
      noReplaceTitle: true,
      positionTE: PositionTe.LEADER
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
      route: CombineRoute["TEACHER"]["MANAGER"]["CLASS"],
      key: "CLASSES",
      keyIcon: KEY_ICON.HTS,
      showIcon: true,
      indexRoute: CombineRoute["TEACHER"]["MANAGER"]["CLASS"],
      noReplaceTitle: true,
      component: ComponentPage.MANAGER_CLASS,
    },
    {
      title: "Khoá Học",
      route: CombineRoute["TEACHER"]["MANAGER"]["COURSE"],
      key: "COURSES",
      keyIcon: KEY_ICON.CR,
      showIcon: true,
      indexRoute: CombineRoute["TEACHER"]["MANAGER"]["COURSE"],
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
    // {
    //   title: (
    //     <Collapse
    //       panels={panelsFeedback}
    //       className={`collapse_tab ${styles.collapseFeedback}`}
    //     />
    //   ),
    //   route: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
    //   key: "FEED_BACK",
    //   showIcon: true,
    //   indexRoute: "",
    //   component: ComponentPage.MANAGER_FEEDBACK,
    //   notRouting: true,
    //   className: `${styles.tabFeedback}`,
    // },
    {
      title: "Lịch",
      route: CombineRoute["TE"]["CALENDAR"],
      key: "CALENDAR",
      keyIcon: KEY_ICON.CL,
      showIcon: true,
      indexRoute: "",
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
      route: CombineRoute["TE"]["MANAGER"]["DETAILCLASS"],
      key: "DETAIL_CLASS",
      indexRoute: CombineRoute["TE"]["MANAGER"]["DETAILCLASS"],
      disable: true,
      keyIcon: KEY_ICON.HTS,
      component: ComponentPage.DETAILCLASS,
    },
    {
      title: "Feedback",
      route: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
      key: "DETAIL_TEACHER",
      indexRoute: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
      disable: true,
      component: ComponentPage.MANAGER_FEEDBACK,
      noReplaceTitle: true,
    },
  ],
  COMMON: []
};
export { tabForRole };
