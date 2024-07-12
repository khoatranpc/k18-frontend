import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Badge, Button, DatePicker, Popconfirm, Popover, TabsProps } from "antd";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Action, Columns, Obj, RowData } from "@/global/interface";
import {
  fieldFilter,
  getClassForm,
  getColorFromStatusClass,
  getColorTeacherPoint,
  mapStatusToString,
} from "@/global/init";
import {
  ClassForm,
  ComponentPage,
  PositionTe,
  ROLE,
  ROLE_TEACHER,
  STATUS_CLASS,
} from "@/global/enum";
import CombineRoute from "@/global/route";
import {
  formatDatetoString,
  generateRowDataForMergeRowSingleField,
  sortByString,
  toastify,
  uuid,
} from "@/utils";
import {
  useComparePositionTE,
  useDebounce,
  useGetListClass,
  useGetListFeedback,
  useGetListBookTeacher,
  useListClass,
  useListCs,
  useUpdateClassBasicInfor,
} from "@/utils/hooks";
import { AppDispatch } from "@/store";
import {
  PayloadRoute,
  initDataRoute,
} from "@/store/reducers/global-reducer/route";
import useGetCrrUser from "@/utils/hooks/getUser";
import { queryGetListClass } from "@/store/reducers/class/listClass.reducer";
import { FieldFilter } from "../Tabs/ToolBar/interface";
import ManagerClassContext from "./context";
import Tabs from "../Tabs";
import ToolBar, { ItemFilterField } from "../Tabs/ToolBar";
import Table from "../Table";
import TitleHeader from "./TitleHeader";
import ModalCustomize from "../ModalCustomize";
import CreateClass from "./CreateClass";
import { TabDetailClass } from "./Detail";
import SelectBaseCourse from "../SelectBaseCourse";
import SelectStatusClass from "./SelectStatusClass";
import MiniDashboard from "./MiniDashboard";
import styles from "@/styles/class/Class.module.scss";

enum Tab {
  ALL_CLASS = "ALL_CLASS",
  MY_CLASS = "MY_CLASS",
  REGISTER_CLASS = "REGISTER_CLASS",
}

interface PropsFilter {
  onChange?: (filter: Obj) => void;
}
const CustomizeFilter = (props: PropsFilter) => {
  const firstRender = useRef<boolean>(true);
  const [filter, setFilter] = useState<Obj>({
    course: "",
    status: "ALL",
    date: null,
  });
  useEffect(() => {
    if (!firstRender.current) {
      props.onChange?.(filter);
    }
    firstRender.current = false;
  }, [filter]);
  const listFilter: ItemFilterField[] = [
    {
      title: "Môn học",
      key: fieldFilter.SUBJECT,
      filter: (
        <SelectBaseCourse
          value={filter.course}
          onChange={(value) => {
            setFilter({
              ...filter,
              course: value,
            });
          }}
        />
      ),
    },
    {
      title: "Trạng thái",
      key: fieldFilter.STATUS,
      filter: (
        <SelectStatusClass
          value={filter.status}
          onChange={(value) => {
            setFilter({
              ...filter,
              status: value,
            });
          }}
        />
      ),
    },
    {
      title: "Tháng",
      key: fieldFilter.OPEN_SCHEDULE,
      filter: (
        <DatePicker
          value={filter.date ? dayjs(new Date(filter.date)) : null}
          size="small"
          placeholder="Chọn (mm/yyyy)"
          format={"MM/YYYY"}
          picker="month"
          onChange={(value) => {
            const getDate = (value as Obj)?.$d ? (value as Obj)?.$d : null;
            setFilter({
              ...filter,
              date: getDate,
            });
          }}
        />
      ),
    },
  ];
  return (
    <div className={styles.customizeFilter}>
      {listFilter.map((item) => {
        return (
          <div className={styles.itemFilter} key={item.key}>
            <span>
              <b>{item.title}</b>
            </span>
            {item.filter}
          </div>
        );
      })}
    </div>
  );
};
interface Props {
  componentId: string;
  listClass: Action;
}

const ManagerClass = (props: Props) => {
  const hasRole = useComparePositionTE(
    PositionTe.LEADER,
    PositionTe.QC,
    PositionTe.ASSISTANT
  );
  const crrUser = useGetCrrUser();
  const getCrrUser = crrUser?.data as Obj;
  const items: TabsProps["items"] = [
    {
      key: Tab["ALL_CLASS"],
      label: "Tất cả lớp",
    },
  ];
  const [storeManagerClass, setStoreManagerClass] = useState<{
    crrKeyTab: string;
    listFieldFilter: Array<{
      key: string;
      value: any;
    }>;
  }>({
    crrKeyTab: items[0].key,
    listFieldFilter: [],
  });
  const listFeedBack = useGetListFeedback();
  const getListFeedback = ((listFeedBack.data.response as Obj)?.data as Obj)
    ?.list as Obj[];
  const router = useRouter();
  const updatedClass = useUpdateClassBasicInfor();
  const [indexUpdate, setIndexUpdate] = useState(-1);
  const listClass = props.listClass;
  const getQueryListClass = useMemo(() => {
    return listClass.payload?.query?.query as Obj
  }, [props.listClass.response]);

  const firstQuery = useRef<boolean>(true);
  const nextComponentId = (listClass.response as Obj)?.query?.query?.componentId as string;
  const isQueryClassTeacherPoint = useRef<boolean>(true);
  const listCs = useListCs();
  const getListCs = (listCs.data.response?.data as Obj[] ?? []);
  const mapDataListClass: RowData[] = useMemo(() => {
    if (nextComponentId !== props.componentId) {
      return [];
    }
    const list: Obj[] =
      ((listClass.response?.data as Obj)?.classes as Array<Obj>)?.map(
        (item) => {
          let crrST = "";
          (item.recordBookTeacher as Array<Obj>)!.find((rc) => {
            const findST = (rc.teacherRegister as Array<Obj>)?.find((rcTc) => {
              return (rcTc?.roleRegister as ROLE_TEACHER) === ROLE_TEACHER.ST;
            });
            crrST = findST?.idTeacher?.fullName || "";
            return findST;
          });
          const listBook =
            (item.recordBookTeacher as Obj[])?.map((rc) => {
              return {
                groupNumber: rc.groupNumber,
                ...(rc.locationId as Obj),
                teacherRegister: rc.teacherRegister ?? [],
              };
            }) ?? [];
          return {
            _id: item._id as string,
            key: item._id as string,
            codeClass: item.codeClass,
            subject: item.courseId?.courseName,
            teacher: crrST,
            dateStart: item.dayRange?.start,
            status: item.status,
            timeSchedule: item.timeSchedule,
            classForm: getClassForm[item.classForm as ClassForm],
            color: item.courseId?.color,
            bookTeachers: listBook,
            cxoId: item.cxoId
          };
        }
      ) || [];
    return generateRowDataForMergeRowSingleField(list, "bookTeachers");
  }, [listClass.response?.data as Obj, props.componentId, nextComponentId]);
  const dispatch = useDispatch<AppDispatch>();
  const [codeClass, setCodeClass] = useState("");
  const [conditionFilter, setConditionFilter] = useState<Obj>({});

  const codeClassDebounce = useDebounce(codeClass, 1000);
  const columns: Columns = [
    {
      key: "codeClass",
      dataIndex: "codeClass",
      title: "Mã lớp",
      className: `hasSort ${styles.colTable}`,
      sorter: (a, b) => {
        return sortByString(a.codeClass as string, b.codeClass as string);
      },
      render(value, record, index) {
        const filterClTeacherPoint: Array<Obj> = getListFeedback?.filter(
          (item) => {
            return item.codeClass._id === record._id;
          }
        );
        const calcTC = filterClTeacherPoint?.reduce((prevValue, item) => {
          return prevValue + (item.pointST + item.pointMT) / 2;
        }, 0);
        return (
          <Badge
            count={`${Number(
              filterClTeacherPoint?.length
                ? calcTC / filterClTeacherPoint?.length
                : 0
            ).toFixed(2)}`}
            color={getColorTeacherPoint(
              filterClTeacherPoint?.length
                ? Number(calcTC / filterClTeacherPoint?.length)
                : 0
            )}
            size="small"
            offset={[15, -8]}
          >
            <span className={styles.cellCodeClass}>{value}</span>
          </Badge>
        );
      },
      onCell(data) {
        return {
          rowSpan: (data.rowSpan as number) ?? 1,
          style: {
            fontWeight: "500",
          },
        };
      },
      width: 230,
    },

    {
      key: "subject",
      dataIndex: "subject",
      title: "Khoá",
      className: `hasSort text-center`,
      sorter: (a, b) => {
        return sortByString(a.subject as string, b.subject as string);
      },
      render(value, record) {
        return (
          <div
            className={styles.subject}
            style={{ backgroundColor: record.color as string }}
          >
            {value}
          </div>
        );
      },
      onCell(data) {
        return {
          rowSpan: (data.rowSpan as number) ?? 1,
        };
      },
      width: 170,
    },
    {
      key: 'CS',
      title: 'Quản lý lớp',
      dataIndex: 'cxoId',
      render(value) {
        const crrCs = getListCs.find(item => item._id === value);
        return crrCs ? <p style={{ lineHeight: '100%', margin: '0' }}>
          <img style={{ width: '2rem', height: '2rem', borderRadius: '50%' }} src={crrCs.image} /> CS {crrCs.area.code} | {crrCs.name}
        </p> : 'Chưa có thông tin';
      },
      width: 170,
      onCell(data) {
        return {
          rowSpan: (data.rowSpan as number) ?? 1,
        };
      },
    },
    {
      key: "teacher",
      dataIndex: "teacher",
      title: "Giáo viên",
      className: `${styles.mw20}`,
      sorter: (a, b) => {
        return sortByString(a.teacher as string, b.teacher as string);
      },
      render(value) {
        return (
          value || (
            <span style={{ color: "var(--base)", fontWeight: "500" }}>
              Thiếu
            </span>
          )
        );
      },
      onCell(data) {
        return {
          rowSpan: (data.rowSpan as number) ?? 1,
        };
      },
      width: 170,
    },
    {
      key: "group",
      title: "Nhóm",
      dataIndex: "bookTeachers",
      render(value: Obj) {
        const tc =
          (value?.teacherRegister as Obj[])?.filter(
            (item: Obj) => item?.accept
          ) ?? [];
        return (
          <Popover
            content={<p>{value?.locationDetail ?? "Chưa có thông tin "}</p>}
          >
            <span
              style={{
                color: !value.groupNumber ? "var(--base)" : "unset",
                fontWeight: !value.groupNumber ? "500" : "unset",
              }}
            >
              {value?.groupNumber
                ? `Nhóm ${value?.groupNumber ?? ''} - ${value?.locationCode ?? ''}`
                : "Thiếu"}
              {!tc.length ? (
                <span style={{ color: "var(--base)", fontWeight: "500" }}>
                  {" "}
                  Chưa có GV
                </span>
              ) : (
                ""
              )}
            </span>
          </Popover>
        );
      },
      width: 200,
    },
    {
      key: "dateStart",
      dataIndex: "dateStart",
      title: "Ngày khai giảng",
      render(value) {
        return formatDatetoString(value as Date, "dd/MM/yyyy");
      },
      onCell(data) {
        return {
          rowSpan: (data.rowSpan as number) ?? 1,
        };
      },
      width: 170,
    },
    {
      key: "timeSchedule",
      dataIndex: "timeSchedule",
      title: "Lịch học",
      render(value: Array<Record<string, unknown>>) {
        return (
          <div className={styles.colTimeSchedule}>
            <p>
              {value[0]?.weekday as string}: {value?.[0]?.start as string}-
              {value?.[0]?.end as string}
            </p>
            <p>
              {value[1]?.weekday as string}: {value?.[1]?.start as string}-
              {value?.[1]?.end as string}
            </p>
          </div>
        );
      },
      onCell(data) {
        return {
          rowSpan: (data.rowSpan as number) ?? 1,
        };
      },
      width: 250,
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Trạng thái",
      render(value) {
        return (
          <div
            className={`${value} stt ${styles.status}`}
            style={{
              backgroundColor: getColorFromStatusClass[value as STATUS_CLASS],
            }}
          >
            {mapStatusToString[value as STATUS_CLASS]}
          </div>
        );
      },
      onCell(data) {
        return {
          rowSpan: (data.rowSpan as number) ?? 1,
        };
      },
      width: 100,
      fixed: "right",
    },
    {
      key: 'ACTION',
      title: 'Hành động',
      className: 'text"-center',
      render(_, record: Obj, index: number) {
        return <div style={{ margin: 'auto', width: 'fit-content' }}>
          <Popconfirm
            title="Xoá lớp?"
            okText="Đồng ý"
            cancelText="Huỷ"
            onConfirm={() => {
              setIndexUpdate(index);
              updatedClass.handleUpdate({
                payload: {
                  query: {
                    body: {
                      isDelete: true
                    },
                    params: [record._id]
                  }
                }
              });
            }}
          >
            <Button style={{ color: 'var(--base)', borderColor: 'var(--base)' }} loading={updatedClass.updated.isLoading && indexUpdate === index} icon={<DeleteOutlined />} className="flex center" onClick={(e) => {
              e.stopPropagation();
            }} />
          </Popconfirm>
        </div>
      },
      width: 100,
      fixed: "right",
      onCell(data) {
        return {
          rowSpan: (data.rowSpan as number) ?? 1,
          onClick(e) {
            e.stopPropagation();
          }
        };
      },
    }
  ];
  const handleClickRow = (record: Obj) => {
    const routePayload: PayloadRoute = {
      payload: {
        route: hasRole
          ? CombineRoute["TE"]["MANAGER"]["DETAILCLASS"]
          : CombineRoute["TEACHER"]["DETAILCLASS"],
        title: record?.codeClass,
        replaceTitle: (
          <TitleHeader
            tabDetail={TabDetailClass.OVERVIEW}
            editTitle
            title={record.codeClass as string}
            dateStart={formatDatetoString(
              new Date(record.dateStart as Date),
              "dd/MM/yyyy"
            )}
            statusClass={record.status as STATUS_CLASS}
          />
        ),
        hasBackPage: true,
        moreData: record,
        component: ComponentPage.DETAILCLASS,
      },
    };
    dispatch(initDataRoute(routePayload));

    const route =
      getCrrUser?.roleAccount === ROLE.TE
        ? hasRole
          ? `/te/manager/class/detail/${record._id}`
          : "/404"
        : getCrrUser?.roleAccount === ROLE.CS
          ? `/cs/class/${record._id}`
          : `/teacher/class/detail/${record._id}`;
    router.push(route);
  };
  const handleQueryListClass = (
    currentPage: number,
    recordOnPage: number,
    filter?: Obj
  ) => {
    const payload: Action = {
      payload: {
        query: {
          query: {
            currentPage: currentPage,
            recordOnPage: recordOnPage,
            fields: [
              "_id",
              "codeClass",
              "dayRange",
              "timeSchedule",
              "courseId",
              "courseLevelId",
              "levelName",
              "levelCode",
              "courseName",
              "color",
              "start",
              "end",
              "weekday",
              "status",
              "classForm",
              "recordBookTeacher",
              "groupNumber",
              "locationCode",
              "locationDetail",
              'cxoId'
            ],
            codeClass: codeClassDebounce,
            ...conditionFilter,
            ...filter,
            isDelete: false
          },
        },
      },
    };
    dispatch(queryGetListClass(payload));
  };
  const [openModal, setOpenModal] = useState<boolean>(false);
  useEffect(() => {
    if (!firstQuery.current) {
      handleQueryListClass(1, 10);
    }
    firstQuery.current = false;
  }, [codeClassDebounce]);
  useEffect(() => {
    if (updatedClass.updated.response) {
      const getMessage = updatedClass.updated.success ? 'Xoá lớp thành công!' : `Xoá lớp thất bại! ${updatedClass.updated.response?.message as string ?? ''}`
      toastify(getMessage, {
        type: updatedClass.updated.success ? 'success' : 'error'
      });
      if (updatedClass.updated.success) {
        if (getQueryListClass) {
          handleQueryListClass(getQueryListClass?.currentPage as number ?? 1, getQueryListClass?.recordOnPage as number ?? 10);
        }
      }
      setIndexUpdate(-1);
      updatedClass.clear();
    }
  }, [updatedClass.updated.response, conditionFilter, getQueryListClass]);
  useEffect(() => {
    if (!listCs.data.response) {
      listCs.query();
    }
  }, []);
  useEffect(() => {
    if (
      listClass.success &&
      listClass.response &&
      isQueryClassTeacherPoint.current &&
      !listClass.isLoading
    ) {
      isQueryClassTeacherPoint.current = false;
      const getListClassId = (
        (listClass.response.data as Obj)?.classes as Array<Obj>
      )?.map((item) => item._id as string);
      listFeedBack.query(
        undefined,
        undefined,
        {
          listClass: getListClassId,
        },
        ["_id", "pointST", "pointMT"]
      );
    }
  }, [listClass]);
  return (
    <ManagerClassContext.Provider
      value={{
        crrKeyTab: storeManagerClass!.crrKeyTab,
        listFieldFilter: storeManagerClass!.listFieldFilter as FieldFilter[],
        setContext: setStoreManagerClass,
      }}
    >
      <div className={styles.containerTool}>
        <Tabs
          listItemTab={items}
          activeKey={storeManagerClass.crrKeyTab}
          onClickTab={(key) => {
            setStoreManagerClass({
              ...storeManagerClass,
              crrKeyTab: key,
            });
          }}
        />
        <ToolBar
          customizeFilter={
            <CustomizeFilter
              onChange={(filter) => {
                handleQueryListClass(1, 10, { ...filter, componentId: props.componentId });
                setConditionFilter({ ...filter, componentId: props.componentId });
              }}
            />
          }
          context={ManagerClassContext}
          listFilter={[]}
          createButton={hasRole}
          exportCSVButton={hasRole}
          onClickCreateButton={() => {
            router.push("/te/manager/class/request-class");
          }}
          iconReload
          onClickReload={() => {
            isQueryClassTeacherPoint.current = true;
            handleQueryListClass(
              (listClass?.response?.data as Obj)?.currentPage as number,
              (listClass?.response?.data as Obj)?.recordOnPage as number,
              {
                ...conditionFilter,
                componentId: props.componentId
              }
            );
          }}
          placeHolderSearch="Nhập mã lớp"
          onChangeSearch={(value) => {
            setCodeClass(value);
          }}
        />
        {getCrrUser?.roleAccount !== ROLE.TEACHER && <MiniDashboard month={conditionFilter.date} />}
      </div>
      <Table
        bordered
        className={styles.tableMangerClass}
        detectRerender={updatedClass.updated.isLoading}
        columns={columns}
        rowData={mapDataListClass}
        loading={listClass.isLoading}
        disableDefaultPagination
        enablePaginationAjax
        onChangeDataPagination={(dataPagination: {
          currentPage: number;
          currentTotalRowOnPage: number;
        }) => {
          handleQueryListClass(
            dataPagination.currentPage,
            dataPagination.currentTotalRowOnPage,
            { ...conditionFilter, componentId: props.componentId }
          );
          isQueryClassTeacherPoint.current = true;
        }}
        crrPage={(listClass.response?.data as Obj)?.currentPage}
        rowOnPage={(listClass.response?.data as Obj)?.recordOnPage}
        showSizePage
        hanldeClickRow={handleClickRow}
        maxPage={(listClass.response?.data as Obj)?.totalPage as number}
      />
      {openModal && (
        <ModalCustomize
          show={openModal}
          modalHeader={<h2>Tạo lớp</h2>}
          onHide={() => {
            setOpenModal(false);
          }}
          size="lg"
        >
          <CreateClass />
        </ModalCustomize>
      )}
    </ManagerClassContext.Provider>
  );
};
const MemoManageClass = memo(ManagerClass, (prevProps, nextProps) => {
  const getPrevComponentId = prevProps.componentId;
  const nextComponentId = (nextProps.listClass.componentId);
  if ((nextComponentId && getPrevComponentId === nextComponentId)) return false;
  return true;
});

const BoundaryManageClass = () => {
  const componentId = useRef(uuid());
  const listClass = useListClass();
  return <MemoManageClass componentId={componentId.current} listClass={listClass.data} />
}

export default BoundaryManageClass;
