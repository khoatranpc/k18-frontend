import React, { memo, useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Columns, Obj, RowData } from "@/global/interface";
import { ComponentPage, RoundProcess, StatusProcessing } from "@/global/enum";
import { getColorByRoundProcess, getLabelRoundProcess } from "@/global/init";
import { formatDatetoString } from "@/utils";
import { useGetListDataRecruitment } from "@/utils/hooks";
import {
  PayloadRoute,
  initDataRoute,
} from "@/store/reducers/global-reducer/route";
import { ContextRecruitment } from "../context";
import Table from "@/components/Table";
import CombineRoute from "@/global/route";
import NoProgress from "@/components/NoPress";
import Processing from "@/components/Processing";
import ProcessDone from "@/components/ProcessDone";
import styles from "@/styles/Recruitment/ManagerRecruitment.module.scss";
import { Tag, Tooltip } from "antd";
import { mapRecruitmentStatus } from "./helper";
import { InfoCircleOutlined } from "@ant-design/icons";

export const getStatusProcess: Record<StatusProcessing, React.ReactElement> = {
  DONE: <ProcessDone />,
  NOPROCESS: <NoProgress />,
  PROCESSING: <Processing />,
};
interface Props {
  isSearching: boolean;
  listDataRecruitment: ReturnType<typeof useGetListDataRecruitment>;
  componentId: string;
}

interface HigherTable {
  isSearching: boolean;
}

const TableRecruitment = (props: Props) => {
  const { pagination, isSearch } = useContext(ContextRecruitment);
  const router = useRouter();
  const dispatch = useDispatch();
  const listDataRecruitment = props.listDataRecruitment;
  const rowData: RowData[] = (
    (listDataRecruitment.data.response?.data as Obj)?.listData as Array<Obj>
  )?.map((item) => {
    return {
      key: item._id,
      ...item,
    };
  });

  const columns: Columns = [
    {
      key: "TIME",
      title: "Thời gian ứng tuyển",
      dataIndex: "timeApply",
      render(value, record) {
        return (
          <div className={styles.viewDetail}>
            {formatDatetoString(value, "dd/MM/yyyy")}
          </div>
        );
      },
      fixed: "left",
      width: 150,
    },
    {
      key: "FULLNAME",
      title: "Họ và tên",
      dataIndex: "fullName",
      fixed: "left",
      width: 170,
      render(_, record: Obj) {
        return (
          <div className={styles.fullName}>
            <span>{_}</span>{" "}
            {record?.note && (
              <Tooltip color="blue" title={record?.note}>
                <InfoCircleOutlined className={styles.icon_info} />
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      key: "COURSE_REGISTER",
      title: "Bộ môn",
      dataIndex: "courseApply",

      render(value) {
        return value ? (
          <Tag style={{ padding: "0.5rem 2rem" }} color={value.color}>
            {value.courseName}
          </Tag>
        ) : (
          ""
        );
      },
      fixed: "left",
      width: 150,
    },
    {
      key: "CONTACT",
      title: "Liên hệ",
      render(_, record: Obj) {
        return (
          <div>
            {record.phoneNumber && <p>{record.phoneNumber}</p>}
            {record.email && <p>{record.email}</p>}
          </div>
        );
      },
      width: 300,
    },
    {
      key: "PROCESSING",
      title: "Vòng hiện tại",
      dataIndex: "roundProcess",
      render(value) {
        return (
          <Tag color={getColorByRoundProcess[value as RoundProcess]}>
            {getLabelRoundProcess[value as RoundProcess]}
          </Tag>
        );
      },
      width: 90,
    },
    {
      key: "RSIT",
      title: "Trạng thái",

      width: 150,
      render(value, record) {
        const roundStatus = mapRecruitmentStatus(record);
        return <Tag color={roundStatus.msgColor}>{roundStatus.msg}</Tag>;
      },
    },
    {
      key: "RSM",
      title: "TT Mail",

      width: 150,
      render(value, record) {
        const roundStatus = mapRecruitmentStatus(record);
        return (
          <Tag color={roundStatus.emailStatusColor}>
            {roundStatus.emailStatus}
          </Tag>
        );
      },
    },

    {
      key: "PROGRESS",
      title: "Trạng thái xử lý",
      dataIndex: "statusProcess",
      align: "center",
      render(value) {
        return (
          <div className={styles.statusProcess}>
            {getStatusProcess[value as StatusProcessing]}
          </div>
        );
      },
      width: 150,
    },
    {
      key: "CV",
      title: "CV",
      dataIndex: "linkCv",
      align: "center",

      render(value) {
        return (
          <a target="_blank" style={{ color: "blue" }} href={value}>
            Link
          </a>
        );
      },
      fixed: "right",
      width: 50,
    },
  ];
  const handleRedirectDetail = (candidateId: string) => {
    const routerPayload: PayloadRoute = {
      payload: {
        component: ComponentPage.RECRUITMENT_DETAIL_CANDIDATE,
        route: CombineRoute["TE"]["RECRUITMENT_DETAIL_CANDIDATE"],
        title: "Chi tiết ứng viên",
        hasBackPage: true,
        replaceTitle: "Chi tiết ứng viên",
      },
    };
    router.push(`/te/manager/recruitment/${candidateId}`);
    dispatch(initDataRoute(routerPayload));
  };

  return (
    <div className={styles.tableView}>
      <Table
        heightToScroll={1000}
        hasFixedColumn
        disableDefaultPagination
        columns={columns}
        rowData={rowData}
        enablePaginationAjax
        loading={listDataRecruitment.data.isLoading}
        hanldeClickRow={(record) => {
          handleRedirectDetail(record._id as string);
        }}
        onChangeDataPagination={(data) => {
          pagination.setDataPagination(data);
        }}
        crrPage={pagination.data.currentPage}
        rowOnPage={pagination.data.currentTotalRowOnPage}
        showSizePage
        maxPage={
          ((listDataRecruitment.data.response?.data as Obj)
            ?.totalPage as number) ?? 1
        }
      />
    </div>
  );
};

const MemoTableRecruitment = memo(TableRecruitment, (prevProps, nextProps) => {
  if (
    nextProps.listDataRecruitment.data.payload?.query?.query?.componentId ===
      nextProps.componentId ||
    (prevProps.listDataRecruitment.data.payload?.query?.query?.componentId &&
      nextProps.listDataRecruitment.data.payload?.query?.query?.componentId &&
      prevProps.listDataRecruitment.data.payload?.query?.query?.componentId ===
        nextProps.listDataRecruitment.data.payload?.query?.query?.componentId)
  ) {
    return false;
  }
  return true;
});

const BoundaryTable = (props: HigherTable) => {
  const listDataRecruitment = useGetListDataRecruitment();
  const isFirstRender = useRef(true);
  const { pagination, conditionFilter, tableComponentId } =
    useContext(ContextRecruitment);
  const getDataPagination = pagination.data;

  const queryListData = (recordOnPage: number, page: number) => {
    listDataRecruitment.query(
      recordOnPage,
      page,
      [
        "_id",
        "fullName",
        "courseName",
        "createdAt",
        "updatedAt",
        "email",
        "phoneNumber",
        "linkFacebook",
        "linkCv",
        "result",
        "statusProcess",
        "timeApply",
        "roundProcess",
        "sendMail",
        "color",
        "note",
        "sendMailPending",
        "sendMailNoConnect",
      ],
      {
        ...conditionFilter.condition,
        componentId: tableComponentId,
      }
    );
  };
  useEffect(() => {
    const getPayloadQuery = listDataRecruitment.data.payload;
    if (!props.isSearching) {
      if (
        getPayloadQuery &&
        (Number(getPayloadQuery?.query?.query?.recordOnPage) !==
          getDataPagination.currentTotalRowOnPage ||
          Number(getPayloadQuery?.query?.query?.currentPage) !==
            getDataPagination.currentPage)
      ) {
        queryListData(
          getDataPagination.currentTotalRowOnPage,
          getDataPagination.currentPage
        );
      }
    }
  }, [pagination.data, listDataRecruitment.data.payload, props.isSearching]);
  useEffect(() => {
    if (!isFirstRender.current) {
      queryListData(
        getDataPagination.currentTotalRowOnPage,
        getDataPagination.currentPage
      );
    } else {
      isFirstRender.current = !isFirstRender.current;
    }
  }, [conditionFilter.condition]);
  return (
    <MemoTableRecruitment
      isSearching={props.isSearching}
      listDataRecruitment={listDataRecruitment}
      componentId={tableComponentId}
    />
  );
};
export default BoundaryTable;
