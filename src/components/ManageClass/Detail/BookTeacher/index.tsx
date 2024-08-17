import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Popover, Popconfirm, Switch, Tooltip, Tag } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  CopyOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Columns, Obj, RowData, State } from "@/global/interface";
import { mapRoleToColor, mapRoleToString } from "@/global/init";
import {
  KEY_ICON,
  PositionTe,
  ROLE,
  ROLE_TEACHER,
  STATUS_CLASS,
} from "@/global/enum";
import { MapIconKey } from "@/global/icon";
import { generateRowDataForMergeRowSingleField, uuid } from "@/utils";
import useGetCrrUser from "@/utils/hooks/getUser";
import {
  useComparePositionTE,
  useDetailClass,
  useHandleTeacherInRCBT,
  useQueryBookTeacher,
} from "@/utils/hooks";
import { RootState } from "@/store";
import Table from "@/components/Table";
import ModalCustomize from "@/components/ModalCustomize";
import AddTeacher from "./AddTeacher";
import AddRequestGroup from "./AddRequestGroup";
import TeacherRegister from "./TeacherRegister";
import styles from "@/styles/class/BookTeacher.module.scss";
import NotAvailableText from "@/utils/helper/components/NotAvaiableText";
import { handleCopy } from "@/utils/helper/handleCopy";

interface Props {
  classId: string;
}
const initModalUpdateTeacher = {
  show: false,
  requestId: "",
  teacherId: "",
  role: "",
  statusAccept: false,
  nameTeacher: "",
};
const BookTeacher = (props: Props) => {
  const { query } = useQueryBookTeacher("GET");
  const currentUser = useGetCrrUser()?.data as Obj;
  const { dataHandle, clear, update } = useHandleTeacherInRCBT();
  const hasRole = useComparePositionTE(
    PositionTe.LEADER,
    PositionTe.QC,
    PositionTe.ASSISTANT
  );
  const router = useRouter();
  const detailClass = useDetailClass("GET").data.response?.data as Obj;
  const [modalTeacherRegister, setModalTeacherRegister] = useState<{
    isRegister: boolean;
    isCancel: boolean;
    show: boolean;
    recordBookTeacherId?: String;
  }>({
    isCancel: false,
    isRegister: false,
    show: false,
    recordBookTeacherId: "",
  });
  const handleToggleAcceptStatus = (data: Obj, record?: Obj) => {
    const dataRegiter = data.teacherRegister as Obj;
    const teacher = dataRegiter?.idTeacher as Obj;
    update(
      teacher?._id as string,
      teacher?._id as string,
      teacher?.roleRegister as ROLE_TEACHER,
      !(dataRegiter.accept as boolean),
      data.recordId as string
    );
  };
  const [modalUpdateTeacher, setModalUpdateTeacher] = useState<{
    show: boolean;
    requestId: string;
    teacherId: string;
    role: ROLE_TEACHER | string;
    statusAccept: boolean;
    nameTeacher: string;
  }>(initModalUpdateTeacher);
  const handleClickTeacherCell = (data: Obj) => {
    const teacherRegister = data.teacherRegister as Obj;
    setModalUpdateTeacher({
      requestId: data.recordId as string,
      teacherId: (teacherRegister?.idTeacher?._id as string) || "",
      role: teacherRegister?.roleRegister as ROLE_TEACHER,
      show: true,
      statusAccept: teacherRegister?.accept,
      nameTeacher: teacherRegister?.idTeacher?.fullName as string,
    });
  };
  const columns: Columns = [
    {
      key: "GROUP_NUMBER",
      dataIndex: "groupNumber",
      className: `${styles.tdGroup}`,
      title: "Nhóm",
      render(value, record) {
        return hasRole ? (
          <div>
            <span>{value}</span>
          </div>
        ) : (
          value
        );
      },
      onCell(data) {
        return {
          rowSpan: data.rowSpan as number,
        };
      },
    },
    {
      key: "LOCATION",
      dataIndex: "locationId",
      title: "Cơ sở",
      render(value, record) {
        return <div>{value?.locationCode}</div>;
      },
      onCell(data) {
        return {
          rowSpan: data.rowSpan as number,
        };
      },
    },
    {
      key: "TOTALSTUDENTS",
      dataIndex: "totalStudents",
      title: "Số học sinh",
      render(value, record) {
        return (
          <div className="flex items-center gap-2">
            {value}
            {record?.note && (
              <Tooltip className="text-blue-500" title={record?.note as string}>
                <InfoCircleOutlined className={styles.icon_info} />
              </Tooltip>
            )}
          </div>
        );
      },
      onCell(data) {
        return {
          rowSpan: data.rowSpan as number,
        };
      },
    },
    {
      key: "TEACHER_REGISTER",
      dataIndex: "teacherRegister",
      className: `${styles.cellTeacherRegister}`,
      title: "Giáo viên đăng ký",
      render(value, record: Obj) {
        const crrIdTeacher = record.teacherRegister?.idTeacher?._id;
        const compareUserandTeacher = crrIdTeacher === currentUser?._id;
        return (
          <div>
            {value?.idTeacher?.fullName || <NotAvailableText />}
            {compareUserandTeacher && <Tooltip title="Bạn">*</Tooltip>}
          </div>
        );
      },
      onCell(data) {
        return {
          onClick() {
            if (
              (Array.isArray(data.teacherRegister)
                ? (data.teacherRegister as Obj[]).length
                : data.teacherRegister) &&
              hasRole
            ) {
              handleClickTeacherCell(data);
            }
          },
        };
      },
    },
    {
      key: "PHONE_NUMBER",
      title: (
        <div className="flex items-center gap-2">
          Phone
          <Tooltip className="text-blue-500" title={"Dùng để tìm LMS"}>
            <InfoCircleOutlined className={styles.icon_info} />
          </Tooltip>
        </div>
      ),
      render(value, record) {
        const phoneNumber = (record as any).teacherRegister?.idTeacher
          ?.phoneNumber;
        return (
          <div className="flex items-center gap-2">
            {phoneNumber || <NotAvailableText />}
            {phoneNumber && (
              <Tooltip title="Sao chép số điện thoại">
                <CopyOutlined
                  className="cursor-pointer text-blue-500"
                  onClick={() => handleCopy(phoneNumber)}
                />
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      key: "ROLE",
      dataIndex: "teacherRegister",
      title: "Vị trí",
      render(value, record) {
        const role = mapRoleToString[value?.roleRegister as ROLE_TEACHER];
        return (
          <div>
            {role ? (
              <Tag color={mapRoleToColor[value?.roleRegister as ROLE_TEACHER]}>
                {role}
              </Tag>
            ) : (
              <NotAvailableText />
            )}
          </div>
        );
      },
    },
    ...(hasRole
      ? [
          {
            key: "SALARY",
            title: "Lương/h",
            dataIndex: "teacherRegister",
            render(value?: Obj) {
              const getListSalary = (value?.idTeacher?.salaryPH as Obj[]) || [];
              const getSalary = Number(
                getListSalary[getListSalary.length - 1]?.rank || 0
              );
              return Boolean(getSalary)
                ? getSalary.toLocaleString()
                : "Chưa có mức lương";
            },
          },
        ]
      : []),
    ...(hasRole || currentUser?.roleAccount === ROLE.CS
      ? [
          {
            key: "STATUS",
            dataIndex: "teacherRegister",
            title: "Trạng thái duyệt",
            className: `text-center ${styles.tdSwitch}`,
            render(value: Obj, record: Obj) {
              return (
                <div>
                  <Switch
                    onChange={() => {
                      handleToggleAcceptStatus(record, record);
                    }}
                    className={styles.switch}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={value.accept as boolean}
                  />
                </div>
              );
            },
          },
          {
            key: "ACTION",
            title: "Hành động",
            className: "text-center",
            render(_: any, record: Obj) {
              return (
                <div className="flex center gap">
                  <Button
                    size="small"
                    onClick={() => {
                      window.open(
                        record.teacherRegister?.idTeacher?.profileLink ||
                          record.teacherRegister?.idTeacher?.CVfile,
                        "_blank"
                      );
                    }}
                  >
                    Profile
                  </Button>
                  {hasRole && (
                    <Button
                      className="flex center"
                      icon={<EyeOutlined />}
                      size="small"
                      onClick={() => {
                        const getTeacherId =
                          record?.teacherRegister?.idTeacher?._id;
                        router.push(
                          `/te/manager/teacher/detail/${getTeacherId}`
                        );
                      }}
                    />
                  )}
                </div>
              );
            },
          },
          ...(hasRole
            ? [
                {
                  key: "MANAGE",
                  title: "Quản lý",
                  className: `text-center`,
                  render(_: any, record: Obj) {
                    return (
                      <div>
                        <Button
                          size="small"
                          onClick={() => {
                            setModalAddTeacher({
                              requestId: record._id,
                              show: true,
                            });
                          }}
                        >
                          Thêm GV
                        </Button>
                      </div>
                    );
                  },
                  onCell(data: Obj) {
                    return {
                      rowSpan: data.rowSpan as number,
                    };
                  },
                },
              ]
            : []),
        ]
      : detailClass?.status === STATUS_CLASS.PREOPEN &&
        !(currentUser?.roleAccount === ROLE.CS)
      ? [
          {
            key: "REGISTER",
            title: "Hành động",
            render(_: any, record: Obj) {
              const crrIdTeacher = record.teacherRegister?.idTeacher?._id;
              const compareUserandTeacher = crrIdTeacher === currentUser?._id;
              return (
                <Button
                  onClick={() => {
                    setModalTeacherRegister({
                      isCancel: compareUserandTeacher,
                      isRegister: !compareUserandTeacher,
                      show: true,
                      recordBookTeacherId: record._id as string,
                    });
                  }}
                >
                  {compareUserandTeacher ? "Huỷ" : "Đăng ký"}
                </Button>
              );
            },
          },
        ]
      : []),
  ];
  const [modalAddTeacher, setModalAddTeacher] = useState<{
    show: boolean;
    requestId: string;
  }>({
    show: false,
    requestId: "",
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dataRd = useSelector(
    (state: RootState) => (state.bookTeacher as State).state
  );
  const rowData: RowData[] =
    ((dataRd?.response as Obj)?.data as Array<Obj>)?.map((item) => {
      return {
        key: uuid(),
        ...item,
      };
    }) || [];
  console.log(
    "🚀 ~ constrowData:RowData[]= ~ rowData:",
    generateRowDataForMergeRowSingleField(rowData, "teacherRegister")
  );
  useEffect(() => {
    query!(router.query.classId as string);
    if (
      dataRd &&
      dataRd.success &&
      !(
        ((dataRd.response!.data as Array<Obj>)[0]?.classId as string) ===
        (router.query.classId as string)
      )
    ) {
      query!(router.query.classId as string);
    }
  }, []);
  useEffect(() => {
    if (dataHandle.success && dataHandle.response) {
      query!(router.query.classId as string);
      clear();
    }
  }, [dataHandle]);
  return (
    <div className={styles.bookTeacher}>
      {hasRole && (
        <div className={styles.fnc}>
          <Button
            className={styles.btnCreateRequest}
            onClick={() => {
              setOpenModal(true);
            }}
          >
            {MapIconKey[KEY_ICON.PLCR]}
            <span>Thêm nhóm</span>
          </Button>
        </div>
      )}
      {openModal && (
        <ModalCustomize
          modalHeader={"Thêm nhóm"}
          show={openModal}
          onHide={() => {
            setOpenModal(false);
          }}
        >
          <AddRequestGroup
            groupNumber={
              ((dataRd?.response as Obj)?.data as Array<Obj>)?.length + 1
            }
            classId={router.query.classId as string}
            closeModal={() => {
              setOpenModal(false);
            }}
          />
        </ModalCustomize>
      )}
      {modalTeacherRegister && (
        <ModalCustomize
          centered
          show={modalTeacherRegister.show}
          size="sm"
          onHide={() => {
            setModalTeacherRegister({
              isCancel: false,
              isRegister: false,
              show: false,
              recordBookTeacherId: "",
            });
          }}
          modalHeader={
            <h2>
              {modalTeacherRegister.isRegister
                ? "Đăng ký giảng dạy"
                : "Huỷ lớp"}
            </h2>
          }
        >
          <TeacherRegister
            recordBookTeacherId={
              modalTeacherRegister.recordBookTeacherId as string
            }
            isCancel={modalTeacherRegister.isCancel}
            isRegister={modalTeacherRegister.isRegister}
          />
        </ModalCustomize>
      )}
      {(modalUpdateTeacher.show || modalAddTeacher.show) && (
        <ModalCustomize
          modalHeader={modalAddTeacher.show ? "Thêm GV" : "Cập nhật"}
          show={modalAddTeacher.show || modalUpdateTeacher.show}
          onHide={() => {
            if (modalAddTeacher.show) {
              setModalAddTeacher({
                show: false,
                requestId: "",
              });
            } else {
              setModalUpdateTeacher(initModalUpdateTeacher);
            }
          }}
        >
          <AddTeacher
            isUpdate={modalUpdateTeacher.show}
            nameTeacher={modalUpdateTeacher.nameTeacher}
            requestId={
              modalAddTeacher.requestId || modalUpdateTeacher.requestId
            }
            teacherId={modalUpdateTeacher.teacherId}
            teacherRole={modalUpdateTeacher.role}
            onSuccess={() => {
              query!(router.query.classId as string);
              if (modalAddTeacher.show) {
                setModalAddTeacher({
                  show: false,
                  requestId: "",
                });
              } else {
                setModalUpdateTeacher(initModalUpdateTeacher);
              }
            }}
          />
        </ModalCustomize>
      )}
      <Table
        loading={dataRd.isLoading}
        className="hasMergeCell"
        bordered
        columns={columns}
        rowData={generateRowDataForMergeRowSingleField(
          rowData,
          "teacherRegister"
        )}
        disableDefaultPagination
      />
    </div>
  );
};

export default BookTeacher;
