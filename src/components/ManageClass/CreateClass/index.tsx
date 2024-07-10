import React, { useEffect, useMemo, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Input, InputNumber, Popconfirm, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import * as yup from "yup";
import { useFormik } from "formik";
import { useHookMessage } from "@/utils/hooks/message";
import { toastify, uuid } from "@/utils";
import { AppDispatch, RootState } from "@/store";
import {
  clearCreateClass,
  queryCreateClass,
} from "@/store/reducers/class/createClass.reducer";
import { Action, Columns, Obj, State } from "@/global/interface";
import {
  useDeleteRecordBookTC,
  useDetailClass,
  useGetLocations,
  useGetTimeSchedule,
  useListCs,
  useQueryBookTeacher,
  useUpdateClassBasicInfor,
} from "@/utils/hooks";
import SelectCourse from "@/components/SelectCourse";
import PickTimeSchedule from "@/components/PickTimeSchedule";
import Table from "@/components/Table";
import SelectLocation from "@/components/SelectLocation";
import styles from "@/styles/class/CreateClass.module.scss";
import teleBot from "@/utils/teleAlert";
import SelectCs from "@/components/CS/SelectCs";

interface Props {
  onReceive?: (status: boolean) => void;
  isUpdate?: boolean;
  data?: Obj;
}
const validationSchema = yup.object({
  codeClass: yup.string().required("Bạn chưa nhập mã lớp!"),
  courseId: yup.string().required("Bạn chưa chọn khoá học!"),
  courseLevelId: yup.string().required("Bạn chưa có cấp độ của khoá học!"),
  dayStart: yup.string().required("Bạn chưa chọn ngày khai giảng!"),
  dayEnd: yup.string().required("Bạn chưa chọn ngày kết thúc!"),
  timeOnce: yup.object().required("Bạn chưa chọn ngày học!"),
  timeTwice: yup.object().required("Bạn chưa chọn ngày học!"),
});
const getLabelTime = (time: Obj) => {
  return `${time.weekday}, ${time.start}- ${time.end}`;
};
const CreateClass = (props: Props) => {
  const { query, data } = useQueryBookTeacher("GET");
  const detailClass = useDetailClass("GET");
  const deleteRCBTC = useDeleteRecordBookTC();
  const listCs = useListCs();
  const getListCs = (listCs.data.response?.data as Obj[] ?? []);
  const router = useRouter();
  const updatedClass = useUpdateClassBasicInfor();
  const getDataRequestBookTC = useMemo(() => {
    return data?.response?.data as Obj[];
  }, [data?.response?.data]);
  const listTimeSchedule = useGetTimeSchedule();
  const dispatch = useDispatch<AppDispatch>();
  const { locations, queryLocations } = useGetLocations();
  const message = useHookMessage();
  const createClass = useSelector(
    (state: RootState) => (state.createClass as State).state
  );

  const { sendToTeleBot, createMessageCreateClass } = teleBot;

  const initValues: Obj =
    props.data && props.isUpdate
      ? {
        ...props.data,
        codeClass: props.data.codeClass,
        courseId: props.data.courseId?._id,
        courseLevelId: props.data.courseLevelId?._id,
        dayStart: props.data.dayRange?.start,
        dayEnd: props.data.dayRange?.end,
        timeOnce: (props.data.timeSchedule as Obj[])?.[0],
        timeTwice: (props.data.timeSchedule as Obj[])?.[1],
        expectedGroup: [],
        linkZoom: props.data.linkZoom,
        note: props.data.note ?? "",
        cxo: props.data.cxo ?? "",
        bu: props.data.bu ?? "",
      }
      : {
        codeClass: "",
        courseId: "",
        courseLevelId: "",
        dayStart: "",
        dayEnd: "",
        timeOnce: "",
        timeTwice: "",
        expectedGroup: [],
        bu: "",
        cxo: "",
        linkZoom: "",
        note: "",
      };
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    setTouched,
    setErrors,
    handleReset,
    setFieldTouched,
  } = useFormik({
    initialValues: initValues,
    validationSchema,
    onSubmit(values) {
      const mapDataforRequest: Action = {
        payload: {
          query: {
            body: {
              cxoId: values.cxoId,
              buId: values.buId,
              courseId: values.courseId,
              courseLevelId: values.courseLevelId,
              codeClass: values.codeClass,
              dayRange: {
                start: values.dayStart,
                end: values.dayEnd,
              },
              timeSchedule: [values.timeOnce, values.timeTwice],
              bookTeacher: values.expectedGroup,
              linkZoom: values.linkZoom,
              note: values.note,
            },
          },
        },
      };

      if ((values.expectedGroup as Obj[]).length) {
        if ((values.expectedGroup as Obj[])!.some((item) => !item.locationId)) {
          toastify("Một số thông tin cơ sở chưa được chọn!", {
            type: "error",
          });
        }
        if (
          (values.expectedGroup as Obj[])!.some((item) => !item.totalStudents)
        ) {
          toastify("Một số thông tin họ sinh dự kiến chưa hoàn thiện!", {
            type: "error",
          });
        } else {
          if (!props.data) {
            dispatch(queryCreateClass(mapDataforRequest));
          } else {
            const tmpValues: Obj = {
              ...values,
            };
            delete tmpValues._id;
            updatedClass.handleUpdate({
              payload: {
                query: {
                  params: [router.query.classId as string],
                  body: {
                    ...tmpValues,
                    codeClass: values.codeClass,
                    dayRange: {
                      start: values.dayStart,
                      end: values.dayEnd,
                    },
                    timeSchedule: [values.timeOnce, values.timeTwice],
                    ...(JSON.stringify(values.expectedGroup) !==
                      JSON.stringify(initValues.expectedGroup)
                      ? {
                        bookTeacher: values.expectedGroup,
                      }
                      : {}),
                  },
                },
              },
            });
          }
        }
      } else {
        toastify("Thông tin dự kiến nhóm học chưa hoàn thiện!", {
          type: "error",
        });
      }
    },
  });

  const handleDeleteGroup = (index: number) => {
    if (!props.isUpdate) {
      (values.expectedGroup as Obj[])!.splice(index, 1);
      setFieldValue("expectedGroup", [...values.expectedGroup]);
    } else {
      if (getDataRequestBookTC[index]) {
      } else {
        (values.expectedGroup as Obj[])!.splice(index, 1);
        setFieldValue("expectedGroup", [...values.expectedGroup]);
      }
    }
  };
  const handleChangeDataBookTeacher = (
    field: string,
    value: string | number,
    index: number
  ) => {
    values.expectedGroup[index][field] = value;
    setFieldValue("expectedGroup", [...values.expectedGroup]);
  };
  const columns: Columns = useMemo(() => {
    return [
      {
        key: "STT",
        title: "STT",
        dataIndex: "groupNumber",
        render(value, __, index) {
          return (
            <div>
              Nhóm{" "}
              <InputNumber<number>
                size="small"
                value={value}
                onChange={(value) => {
                  handleChangeDataBookTeacher(
                    "groupNumber",
                    (value as number) ?? 0,
                    index
                  );
                }}
              />
            </div>
          );
        },
      },
      {
        key: "LOCATION",
        title: (
          <span>
            Cơ sở <span style={{ color: "var(--base)" }}>*</span>
          </span>
        ),
        dataIndex: "locationId",
        width: 70,
        render(value, _, index) {
          return (
            <SelectLocation
              isShortName
              sizeButton="small"
              title={
                ((locations?.data as Array<Obj>)?.find(
                  (item) => item._id === value
                )?.locationCode as string) ?? "Chọn"
              }
              onSelectLocation={(locationId) => {
                handleChangeDataBookTeacher(
                  "locationId",
                  locationId ?? "",
                  index
                );
              }}
            />
          );
        },
      },
      {
        key: "HVDK",
        title: (
          <span>
            Số HV (dự kiến) <span style={{ color: "var(--base)" }}>*</span>
          </span>
        ),
        width: 150,
        dataIndex: "totalStudents",
        className: "text-center",
        render(value, _, index) {
          return (
            <InputNumber<number>
              style={{ margin: "auto" }}
              size="small"
              value={value}
              min={0}
              onChange={(data) => {
                handleChangeDataBookTeacher(
                  "totalStudents",
                  data as number,
                  index
                );
              }}
            />
          );
        },
      },
      {
        key: "ZALO",
        title: "Zalo",
        dataIndex: "zalo",
        render(value, _, index) {
          return (
            <Input
              size="small"
              style={{ resize: "none" }}
              defaultValue={value}
              onChange={(e) => {
                handleChangeDataBookTeacher("zalo", e.target.value ?? "", index);
              }}
            />
          );
        },
      },
      {
        key: "NOTE",
        title: "Lưu ý",
        dataIndex: "note",
        render(value, _, index) {
          return (
            <Input.TextArea
              size="small"
              style={{ resize: "none" }}
              value={value}
              onChange={(e) => {
                handleChangeDataBookTeacher("note", e.target.value ?? "", index);
              }}
            />
          );
        },
      },
      {
        key: "ACTION",
        title: "Hành động",
        className: "text-center",
        width: 90,
        render(_, __, index) {
          const checkExisted = props.isUpdate ? getDataRequestBookTC?.[index] : null;
          if (!checkExisted) {
            return (
              <Button
                loading={deleteRCBTC.data.isLoading}
                size="small"
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "auto",
                  borderColor: "var(--base)",
                }}
                onClick={() => {
                  handleDeleteGroup(index);
                }}
              >
                <DeleteFilled style={{ color: "var(--base)" }} />
              </Button>
            );
          } else {
            return (
              <Popconfirm
                title="Thông báo"
                description="Xác nhận xoá nhóm!"
                okText="Xác nhận"
                cancelText="Huỷ"
                onConfirm={() => {
                  deleteRCBTC.query({
                    params: [checkExisted._id],
                  });
                }}
              >
                <Button
                  loading={deleteRCBTC.data.isLoading}
                  size="small"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "auto",
                    borderColor: "var(--base)",
                  }}
                >
                  <DeleteFilled style={{ color: "var(--base)" }} />
                </Button>
              </Popconfirm>
            );
          }
        },
      },
    ]
  }, [values.expectedGroup]);
  useEffect(() => {
    if (deleteRCBTC.data.response) {
      if (deleteRCBTC.data.success) {
        query!(router.query.classId as string);
      }
      message.open({
        content: deleteRCBTC.data.success
          ? "Xoá thông tin thành công!"
          : (deleteRCBTC.data.response?.message as string),
        type: deleteRCBTC.data.success ? "success" : "error",
      });
      message.close();
      deleteRCBTC.clear?.();
    }
  }, [deleteRCBTC.data.response]);
  useEffect(() => {
    if (getDataRequestBookTC) {
      setFieldValue(
        "expectedGroup",
        getDataRequestBookTC.map((item) => {
          return {
            ...item,
            key: item._id,
            locationId: item.locationId?._id,
            totalStudents: item.totalStudents ?? 0,
            note: item.note ?? "",
          };
        })
      );
    }
  }, [getDataRequestBookTC]);
  useEffect(() => {
    if (router.query.classId) {
      query!(router.query.classId as string);
    }
    if (!locations) {
      queryLocations();
    }
  }, []);
  useEffect(() => {
    if (props.data) {
      if (updatedClass.updated.response) {
        if (updatedClass.updated.success) {
          detailClass.query?.(router.query.classId as string);
        }
        message.open(
          {
            content: updatedClass.updated.response?.message as string,
            type: updatedClass.updated.success ? "success" : "error",
          },
          2000
        );
        message.close();
        updatedClass.clear();
      }
    }
  }, [updatedClass.updated]);
  useEffect(() => {
    if (createClass && !createClass.isLoading && createClass.response) {
      if (createClass.success) {
        const classAlertData = {
          className: values.codeClass,
          dayStart: dayjs(values.dayStart).format("DD/MM/YYYY"),
          dayEnd: dayjs(values.dayEnd).format("DD/MM/YYYY"),
          timeOnce: getLabelTime(values.timeOnce),
          timeTwice: getLabelTime(values.timeTwice),
          cxo: getListCs.find(item => item._id === values.cxoId)?.name,
          classGroupCount: values.expectedGroup.length | 0,
          classGroup: values.expectedGroup.map((group: any) => {
            return {
              location: locations?.data.find(
                (location: Obj) => location._id === group.locationId
              )?.locationName,
              totalStudents: group.totalStudents,
              note: group.note,
            };
          }),
        };

        sendToTeleBot(createMessageCreateClass(classAlertData));
        message.open(
          {
            content: "Tạo lớp thành công!",
            type: "success",
          },
          2000
        );
      } else {
        message.open(
          {
            content: createClass.response.message as string,
            type: "error",
          },
          2000
        );
      }
      dispatch(clearCreateClass());
      setTimeout(() => {
        message.close();
      }, 2000);
    }
  }, [createClass, dispatch, values, listCs.data.response]);
  useEffect(() => {
    if (!props.isUpdate) {
      handleReset({});
    }
  }, [props.isUpdate]);
  return (
    <div className={styles.containerCreateClass}>
      <Form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.partSideLeft}>
          <Form.Group className={styles.mb_24}>
            <Form.Label>
              Mã lớp: <span className="error">*</span>
            </Form.Label>
            <Input
              type="text"
              name="codeClass"
              defaultValue={values.codeClass}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Mã lớp"
              size="small"
              className={styles.input}
            />
            {errors.codeClass && touched.codeClass && (
              <p className="error">{errors.codeClass as string}</p>
            )}
          </Form.Group>
          <Form.Group className={styles.mb_24}>
            <Form.Label>
              Khoá học: <span className="error">*</span>
            </Form.Label>
            <SelectCourse
              courseLevelId={values.courseLevelId}
              courseId={values.courseId}
              shortLabelItem
              onChange={(dataSelect) => {
                setFieldValue("courseId", dataSelect.courseId);
                setFieldValue("courseLevelId", dataSelect.levelId);
              }}
              onBlur={(value) => {
                setTouched({
                  ...touched,
                  courseId: true,
                  courseLevelId: true,
                });
                if (value.courseId && value.levelId) {
                  delete errors.courseId;
                  delete errors.courseLevelId;
                  setErrors({
                    ...errors,
                  });
                }
              }}
            />
            {errors.courseId && errors.courseId && touched.courseId && (
              <p className="error">{errors.courseId as string}</p>
            )}
            {errors.courseLevelId &&
              errors.courseLevelId &&
              touched.courseLevelId && (
                <p className="error">{errors.courseLevelId as string}</p>
              )}
          </Form.Group>
          <Form.Group className={styles.mb_24}>
            <Form.Label>
              Thời gian học (dự kiến): <span className="error">*</span>
            </Form.Label>
            <div className="hihi">
              <RangePicker
                format={"DD/MM/YYYY"}
                defaultValue={[
                  values.dayStart ? dayjs(values.dayStart) : null,
                  values.dayEnd ? dayjs(values.dayEnd) : null,
                ]}
                size="small"
                className={styles.rangePickerDropdown}
                placeholder={["Ngày KG", "Ngày KT"]}
                onChange={(value) => {
                  const dataDate = value as Array<Obj>;
                  setFieldValue("dayStart", dataDate?.[0]?.$d as Date);
                  setFieldValue("dayEnd", dataDate?.[1]?.$d as Date);
                }}
                onBlur={(e) => {
                  setTouched({
                    ...touched,
                    dayStart: true,
                    dayEnd: true,
                  });
                  if (values.dayStart && values.dayEnd) {
                    delete errors.dayStart;
                    delete errors.dayEnd;
                  }
                }}
              />
              {errors.dayStart && errors.dayStart && touched.dayStart && (
                <p className="error">{errors.dayStart as string}</p>
              )}
              {errors.dayEnd && errors.dayEnd && touched.dayEnd && (
                <p className="error">{errors.dayEnd as string}</p>
              )}
            </div>
          </Form.Group>
          <Form.Group className={styles.mb_24}>
            <Form.Label>
              Lịch học: <span className="error">*</span>
            </Form.Label>
            {(!(values.timeOnce as unknown as Obj)?._id ||
              !(values.timeTwice as unknown as Obj)?._id) && (
                <p className="error">Đừng quên chọn lịch học trong tuần nhé!</p>
              )}
            <div className={styles.day}>
              <div className="day1">
                <label>
                  Ngày 1:{" "}
                  <span className={styles.dayTime}>
                    {values.timeOnce ? getLabelTime(values.timeOnce) : ""}
                  </span>
                </label>
                <PickTimeSchedule
                  value={values.timeOnce}
                  size="small"
                  className={styles.weekday}
                  onClickItem={(e) => {
                    const findItem = (
                      listTimeSchedule.data.response?.data as Array<Obj>
                    )?.find((item) => item._id === e.key);
                    setFieldValue("timeOnce", findItem);
                    delete errors.timeOnce;
                    setErrors({
                      ...errors,
                    });
                  }}
                />
              </div>
              <div className="day2">
                <label>
                  Ngày 2:{" "}
                  <span className={styles.dayTime}>
                    {values.timeTwice ? getLabelTime(values.timeTwice) : ""}
                  </span>
                </label>
                <PickTimeSchedule
                  value={values.timeTwice}
                  size="small"
                  className={styles.weekday}
                  onClickItem={(e) => {
                    const findItem = (
                      listTimeSchedule.data.response?.data as Array<Obj>
                    )?.find((item) => item._id === e.key);
                    setFieldValue("timeTwice", findItem);
                    delete errors.timeTwice;
                    setErrors({
                      ...errors,
                    });
                  }}
                />
              </div>
            </div>
          </Form.Group>
        </div>
        <div className={styles.partSideRight}>
          <Form.Group className={styles.mb_24}>
            <Form.Label>CXO:</Form.Label>
            <SelectCs
              style={{ width: '100%' }}
              size="small"
              onBlur={() => {
                setFieldTouched('cxoId', true);
              }}
              onChange={(value) => {
                setFieldValue('cxoId', value);
              }}
              defaultValue={values.cxoId}
              showSearch
              filterOption={(input, option: any) => {
                return String(option.email).toLowerCase().includes(input.toLowerCase()) || String(option.name).toLowerCase().includes(input.toLowerCase())
              }}
            />
          </Form.Group>
          <Form.Group className={styles.mb_24}>
            <Form.Label>Cơ sở BU:</Form.Label>
            <div>
              <Select
                showSearch
                placeholder="Gõ tên hoặc mã cơ sở để tìm kiếm"
                style={{ width: '100%' }}
                size="small"
                defaultValue={values.buId}
                options={(locations?.data as Obj[])?.map(item => {
                  return {
                    ...item,
                    value: item._id,
                    label: `${item.locationCode} - ${item.locationName}`
                  }
                })}
                filterOption={(input, option: any) => {
                  return String(option.locationCode).toLowerCase().includes(input.toLowerCase()) || String(option.locationName).toLowerCase().includes(input.toLowerCase())
                }}
                onChange={(value) => {
                  setFieldValue('buId', value);
                }}
                loading={locations?.loading}
              />
            </div>
          </Form.Group>
          <Form.Group className={styles.mb_24}>
            <Form.Label>Link online:</Form.Label>
            <Input
              type="text"
              size="small"
              defaultValue={values.linkZoom}
              onChange={handleChange}
              name="linkZoom"
            />
          </Form.Group>
          <Form.Group className={styles.mb_24}>
            <Form.Label>Ghi chú:</Form.Label>
            <Input.TextArea
              size="small"
              defaultValue={values.note}
              onChange={handleChange}
              name="note"
            />
          </Form.Group>
          <Form.Group className={styles.mb_24}>
            <Form.Label>
              Nhóm dự kiến: <span className="error">*</span>
              <small>(ít nhất một nhóm)</small>
            </Form.Label>
            <Button
              size="small"
              style={{ float: "right" }}
              onClick={() => {
                const newLc = {
                  key: uuid(),
                  groupNumber: (values.expectedGroup as Obj[]).length + 1,
                  classId: router.query.classId as string,
                };
                values.expectedGroup.push(newLc as unknown as Obj);
                setFieldValue("expectedGroup", [...values.expectedGroup]);
              }}
            >
              Thêm
            </Button>
            <Table
              disableDefaultPagination
              bordered
              columns={columns}
              rowData={[...values.expectedGroup]}
            />
          </Form.Group>
          <Button
            loading={createClass.isLoading || updatedClass.updated.isLoading}
            size="small"
            htmlType="submit"
            className={styles.btnCreateClass}
          >
            Lưu
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateClass;
