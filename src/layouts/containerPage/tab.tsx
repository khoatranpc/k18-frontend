import { ComponentPage, KEY_ICON, PositionTe, ROLE, ROLE_USER } from "@/global/enum";
import { SiderRoute } from "@/global/interface";
import CombineRoute from "@/global/route";

const siderByRole: Record<ROLE_USER | ROLE, Array<SiderRoute>> = {
  TE: [
    {
      title: "Tổng quan",
      route: CombineRoute["TE"]["OVERVIEW"],
      keyIcon: "OV",
      indexroute: CombineRoute["TE"]["OVERVIEW"],
      noReplaceTitle: true,
      positionAccept: Object.values(PositionTe)
    },
    {
      title: "Tuyển dụng",
      route: 'RECRUITMENT',
      keyIcon: "RCM",
      indexroute: 'RECRUITMENT',
      notRouting: true,
      children: [
        {
          title: "Tuyển dụng",
          route: CombineRoute["TE"]["RECRUITMENT"],
          indexroute: CombineRoute["TE"]["RECRUITMENT"],
          positionAccept: Object.values(PositionTe)
        },
        {
          title: "Chi tiết ứng viên",
          route: CombineRoute["TE"]["RECRUITMENT_DETAIL_CANDIDATE"],
          indexroute: CombineRoute["TE"]["RECRUITMENT_DETAIL_CANDIDATE"],
          hasBackPage: true,
          hide: true,
          positionAccept: Object.values(PositionTe),
          component: ComponentPage.RECRUITMENT_DETAIL_CANDIDATE
        },
        {
          title: "Lịch phỏng vấn",
          route: CombineRoute["TE"]["CALENDAR_INTERVIEW"],
          indexroute: CombineRoute["TE"]["CALENDAR_INTERVIEW"],
          positionAccept: Object.values(PositionTe)
        },
        {
          title: "Tạo hồ sơ ứng viên",
          route: CombineRoute["TE"]["RECRUITMENT_CREATE_CANDIDATE"],
          indexroute: CombineRoute["TE"]["RECRUITMENT_CREATE_CANDIDATE"],
          hide: true,
          hasBackPage: true,
          positionAccept: Object.values(PositionTe)
        },
      ],
      positionAccept: Object.values(PositionTe)
    },
    {
      title: "Giáo viên",
      route: "TEACHER",
      indexroute: "TEACHER",
      positionAccept: [PositionTe.LEADER, PositionTe.ASSISTANT, PositionTe.QC],
      keyIcon: "TC",
      children: [
        {
          route: CombineRoute["TE"]["MANAGER"]["TEACHER"],
          indexroute: CombineRoute["TE"]["MANAGER"]["TEACHER"],
          title: "Danh sách",
          positionAccept: [PositionTe.LEADER, PositionTe.ASSISTANT, PositionTe.QC]
        },
        {
          route: CombineRoute["TE"]["MANAGER"]["DETAILTEACHER"],
          indexroute: CombineRoute["TE"]["MANAGER"]["DETAILTEACHER"],
          title: "Chi tiết giáo viên",
          hide: true,
          hasBackPage: true,
          component: ComponentPage.TEACHER_DETAIL,
          positionAccept: [PositionTe.LEADER, PositionTe.ASSISTANT, PositionTe.QC]
        },
        {
          route: CombineRoute["TE"]["MANAGER"]["REQUEST_ONLEAVE"],
          indexroute: CombineRoute["TE"]["MANAGER"]["REQUEST_ONLEAVE"],
          title: "Thông tin off",
          positionAccept: [PositionTe.LEADER, PositionTe.ASSISTANT, PositionTe.QC]
        },
      ]
    },
    {
      title: "Lớp học",
      route: "CLASS",
      indexroute: "CLASS",
      keyIcon: "HTS",
      positionAccept: [PositionTe.LEADER, PositionTe.ASSISTANT, PositionTe.QC],
      notRouting: true,
      children: [
        {
          route: CombineRoute["TE"]["MANAGER"]["CLASS"],
          indexroute: CombineRoute["TE"]["MANAGER"]["CLASS"],
          positionAccept: [PositionTe.LEADER, PositionTe.ASSISTANT, PositionTe.QC],
          title: 'Danh sách'
        },
        {
          indexroute: CombineRoute["TE"]["MANAGER"]["REQUEST_CLASS"],
          route: CombineRoute["TE"]["MANAGER"]["REQUEST_CLASS"],
          title: 'Mở lớp',
          positionAccept: [PositionTe.LEADER, PositionTe.ASSISTANT, PositionTe.QC]
        }
      ]
    },
    {
      title: "Chi tiết lớp học",
      route: CombineRoute["TE"]["MANAGER"]["DETAILCLASS"],
      indexroute: CombineRoute["TE"]["MANAGER"]["DETAILCLASS"],
      hide: true,
      hasBackPage: true,
      component: ComponentPage.DETAILCLASS,
      positionAccept: [PositionTe.LEADER, PositionTe.ASSISTANT, PositionTe.QC],
    },
    {
      title: "Lưu trữ",
      route: "STORAGE",
      indexroute: "STORAGE",
      keyIcon: "FD",
      notRouting: true,
      positionAccept: [PositionTe.LEADER, PositionTe.ASSISTANT, PositionTe.QC],
      children: [
        {
          title: "Tài liệu",
          route: CombineRoute["TE"]["MANAGER"]["STORAGE"]["DOCUMENT"],
          indexroute: CombineRoute["TE"]["MANAGER"]["STORAGE"]["DOCUMENT"],
          positionAccept: [PositionTe.LEADER, PositionTe.ASSISTANT, PositionTe.QC]
        },
        {
          title: "Khoá học",
          route: CombineRoute["TE"]["MANAGER"]["STORAGE"]["COURSE"],
          indexroute: CombineRoute["TE"]["MANAGER"]["STORAGE"]["COURSE"],
          positionAccept: [PositionTe.LEADER, PositionTe.ASSISTANT, PositionTe.QC]
        },
        {
          title: 'Thời gian học',
          indexroute: CombineRoute["TE"]["MANAGER"]["STORAGE"]['TIME_WEEKDAY'],
          route: CombineRoute["TE"]["MANAGER"]["STORAGE"]['TIME_WEEKDAY'],
          positionAccept: [PositionTe.LEADER, PositionTe.ASSISTANT, PositionTe.QC],
        },
        {
          title: "Chi tiết khoá học",
          route: CombineRoute["TE"]["MANAGER"]["STORAGE"]["COURSE_DETAIL"],
          indexroute: CombineRoute["TE"]["MANAGER"]["STORAGE"]["COURSE_DETAIL"],
          hide: true,
          hasBackPage: true,
          component: ComponentPage.COURSE_DETAIL,
          positionAccept: [PositionTe.LEADER, PositionTe.ASSISTANT, PositionTe.QC]
        },
        {
          title: "Bộ trắc nghiệm",
          route: CombineRoute["TE"]["MANAGER"]["STORAGE"]["TEST_COURSE"],
          indexroute: CombineRoute["TE"]["MANAGER"]["STORAGE"]["TEST_COURSE"],
          hide: true,
          hasBackPage: true,
          positionAccept: [PositionTe.LEADER, PositionTe.ASSISTANT, PositionTe.QC]
        },
      ]
    },

    {
      title: "Cơ sở",
      route: "LOCATION",
      indexroute: "LOCATION",
      keyIcon: "LOCATION",
      children: [
        {
          title: "Khu vực",
          route: CombineRoute["TE"]["AREA"],
          indexroute: CombineRoute["TE"]["AREA"],
          positionAccept: Object.values(PositionTe)
        },
        {
          title: "Danh sách",
          route: CombineRoute["TE"]["LOCATION"],
          indexroute: CombineRoute["TE"]["LOCATION"],
          positionAccept: Object.values(PositionTe)
        },
      ],
      positionAccept: Object.values(PositionTe)
    },
    {
      title: "Giờ học",
      keyIcon: "TIMESCHEDULE",
      route: CombineRoute["TE"]["TIMESCHEDULE"],
      indexroute: CombineRoute["TE"]["TIMESCHEDULE"],
    },
    {
      title: "Feedback",
      keyIcon: "MS",
      route: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
      indexroute: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
      positionAccept: [PositionTe.LEADER, PositionTe.ASSISTANT, PositionTe.QC]
    },
    {
      title: "Mẫu mail",
      keyIcon: "MAIL",
      route: CombineRoute["TE"]["MANAGER"]["TEMPLATE_MAIL"],
      indexroute: CombineRoute["TE"]["MANAGER"]["TEMPLATE_MAIL"],
      positionAccept: Object.values(PositionTe)
    },
    {
      title: "TE",
      keyIcon: "EMPLOYEE",
      route: "",
      indexroute: "",
      children: [
        {
          title: "Danh sách",
          route: CombineRoute["TE"]["MANAGER"]["STAFF"],
          indexroute: CombineRoute["TE"]["MANAGER"]["STAFF"],
          positionAccept: [PositionTe.LEADER]
        },
        {
          title: "Báo cáo",
          route: CombineRoute["TE"]["MANAGER"]["REPORT"],
          indexroute: CombineRoute["TE"]["MANAGER"]["REPORT"],
          positionAccept: Object.values(PositionTe)
        },
        {
          title: "Thông tin TE",
          route: CombineRoute['TE']['MANAGER']['STAFF_INFO'],
          showIcon: false,
          indexroute: CombineRoute['TE']['MANAGER']['STAFF_INFO'],
          hide: true,
          component: ComponentPage.TE_STAFF,
          hasBackPage: true,
          noReplaceTitle: true,
          positionAccept: [PositionTe.LEADER]
        },
      ],
      positionAccept: Object.values(PositionTe)
    },
    {
      title: "Thông tin cá nhân",
      keyIcon: "IF",
      route: CombineRoute["TE"]["MY_INFO"],
      indexroute: CombineRoute["TE"]["MY_INFO"],
      hide: true
    },
    {
      title: 'CS',
      indexroute: 'CS',
      notRouting: true,
      positionAccept: [PositionTe.LEADER, ROLE.TE],
      keyIcon: 'CS',
      route: 'CS',
      children: [
        {
          title: 'Danh sách CS',
          route: CombineRoute['TE']['CS']['LIST'],
          indexroute: CombineRoute['TE']['CS']['LIST'],
          positionAccept: [PositionTe.LEADER, ROLE.TE]
        },
        {
          title: 'Chi tiết CS',
          route: CombineRoute['TE']['CS']['DETAIL'],
          indexroute: CombineRoute['TE']['CS']['DETAIL'],
          positionAccept: [PositionTe.LEADER, ROLE.TE],
          hide: true
        },
      ]
    }
  ],
  TEACHER: [
    {
      title: "Thông tin giáo viên",
      route: CombineRoute["TEACHER"]["TEACHERINFO"],
      keyIcon: KEY_ICON.TC,
      showIcon: true,
      indexroute: CombineRoute["TEACHER"]["TEACHERINFO"],
      component: ComponentPage.TEACHERS,
      positionAccept: [ROLE.TEACHER]
    },
    {
      title: "Đánh giá",
      route: CombineRoute["TEACHER"]["TEACHER_EVALUATE"],
      keyIcon: KEY_ICON.EV,
      showIcon: true,
      indexroute: CombineRoute["TEACHER"]["TEACHER_EVALUATE"],
      positionAccept: [ROLE.TEACHER]
    },
    {
      title: "Lớp học",
      route: CombineRoute["TEACHER"]["CLASS"],
      keyIcon: KEY_ICON.HTS,
      showIcon: true,
      indexroute: CombineRoute["TEACHER"]["CLASS"],
      component: ComponentPage.MANAGER_CLASS,
      positionAccept: [ROLE.TEACHER]
    },
    {
      title: "Chi tiết lớp học",
      route: CombineRoute["TEACHER"]["DETAILCLASS"],
      indexroute: CombineRoute["TEACHER"]["DETAILCLASS"],
      hide: true,
      keyIcon: KEY_ICON.HTS,
      component: ComponentPage.DETAILCLASS,
      positionAccept: [ROLE.TEACHER],
      hasBackPage: true
    },
    {
      title: "Khoá Học",
      route: CombineRoute["TEACHER"]["COURSE"],
      keyIcon: KEY_ICON.CR,
      showIcon: true,
      indexroute: CombineRoute["TEACHER"]["COURSE"],
      component: ComponentPage.MANAGER_COURSE,
      positionAccept: [ROLE.TEACHER]
    },
    {
      title: "Chi tiết",
      route: CombineRoute["TEACHER"]["COURSE_DETAIL"],
      indexroute: CombineRoute["TEACHER"]["COURSE_DETAIL"],
      component: ComponentPage.COURSE_DETAIL,
      hide: true,
      positionAccept: [ROLE.TEACHER]
    },
    {
      title: "Cơ sở",
      route: CombineRoute["TEACHER"]["LOCATION"],
      keyIcon: KEY_ICON.LOCATION,
      showIcon: true,
      indexroute: CombineRoute["TEACHER"]["LOCATION"],
      component: ComponentPage.LOCATION,
      positionAccept: [ROLE.TEACHER]
    },
    {
      title: "Lịch",
      route: CombineRoute["TEACHER"]["CALENDAR"],
      keyIcon: KEY_ICON.CL,
      showIcon: true,
      indexroute: CombineRoute["TEACHER"]["CALENDAR"],
      component: ComponentPage.CALENDAR,
      positionAccept: [ROLE.TEACHER]
    },
    {
      title: "Feedback",
      route: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
      indexroute: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
      hide: true,
      component: ComponentPage.MANAGER_FEEDBACK,
      positionAccept: [ROLE.TEACHER]
    },
    // {
    //   title: "Tài liệu chung",
    //   route: CombineRoute["TEACHER"]["GENERAL_DOCUMENT"],
    //   keyIcon: KEY_ICON.IF,
    //   showIcon: true,
    //   indexroute: CombineRoute["TEACHER"]["GENERAL_DOCUMENT"],
    //   component: ComponentPage.DOCUMENT,
    //   positionAccept: [ROLE.TEACHER]
    // },
  ],
  COMMON: [],
  CXO: [],
  CS: [
    {
      title: "Lớp học",
      route: "CLASS",
      indexroute: "CLASS",
      keyIcon: "HTS",
      positionAccept: [ROLE.CS],
      notRouting: true,
      children: [
        {
          route: CombineRoute["CS"]["CLASS"]['LIST'],
          indexroute: CombineRoute["CS"]["CLASS"]['LIST'],
          positionAccept: [ROLE.CS],
          title: 'Danh sách'
        },
        {
          indexroute: CombineRoute["CS"]['CLASS']['REQUEST'],
          route: CombineRoute["CS"]['CLASS']['REQUEST'],
          title: 'Mở lớp',
          positionAccept: [ROLE.CS]
        }
      ]
    },
    {
      title: "Chi tiết lớp học",
      route: CombineRoute["CS"]['CLASS']['DETAIL'],
      indexroute: CombineRoute["CS"]['CLASS']['DETAIL'],
      hide: true,
      hasBackPage: true,
      component: ComponentPage.DETAILCLASS,
      positionAccept: [ROLE.CS],
    },
    {
      title: "Feedback",
      keyIcon: "MS",
      route: CombineRoute['CS']["FEEDBACK"],
      indexroute: CombineRoute['CS']["FEEDBACK"],
      positionAccept: [ROLE.CS]
    },
    {
      title: 'CS',
      indexroute: 'CS',
      notRouting: true,
      positionAccept: [ROLE.CS],
      keyIcon: 'CS',
      route: 'CS',
      children: [
        {
          title: 'Danh sách CS',
          route: CombineRoute['CS']['LIST'],
          indexroute: CombineRoute['CS']['LIST'],
          positionAccept: [ROLE.CS]
        },
        {
          title: 'Chi tiết CS',
          route: CombineRoute['TE']['CS']['DETAIL'],
          indexroute: CombineRoute['TE']['CS']['DETAIL'],
          positionAccept: [ROLE.CS],
          hide: true
        },
      ]
    },
  ]
};
export { siderByRole };
