import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form } from "react-bootstrap";
import { Button, DatePicker, Input, TimePicker } from "antd";
import dayjs from "dayjs";
import { Obj } from "@/global/interface";
import {
  useDebounce,
  useFindGetAllTe,
  useGetDataRoundProcess,
} from "@/utils/hooks";
import Dropdown from "@/components/Dropdown";
import Loading from "@/components/loading";
import styles from "@/styles/Recruitment/ManagerRecruitment.module.scss";
import SelectTe from "@/components/SelectTe";

interface Props {
  handleSubmit?: (values: Obj) => void;
  handleModal?: () => void;
  hasDoc?: boolean;
  disabledLinkMeet?: boolean;
}
const CreateCalendar = (props: Props) => {
  const [teInfo, setTeInfo] = useState<Obj>({});
  const [teAInfo, setTeAInfo] = useState<Obj>({});

  const validationSchema = yup.object({
    ...(!props.disabledLinkMeet
      ? {
          linkMeet: yup.string().required("Chưa có thông tin link meet!"),
        }
      : {}),
    te: yup.string().required("Chưa có thông tin TE phỏng vấn!"),
    teA: yup.string().required("Chưa có thông tin TE phụ trách"),
    time: yup.string().required("Chưa có thông tin thời gian!"),
    ...(props.hasDoc
      ? {
          doc: yup.string().required("Chưa có tài liệu cung cấp!"),
        }
      : {}),
  });
  const dataRoundProcess = useGetDataRoundProcess();
  const getDataRoundProcess = (
    dataRoundProcess.data.response?.data as Array<Obj>
  )?.[0];

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    handleReset,
  } = useFormik({
    initialValues: {
      linkMeet: (getDataRoundProcess?.linkMeet as string) || "",
      time: (getDataRoundProcess?.time as string) || "",
      te: getDataRoundProcess?.te?._id || "",
      teA: getDataRoundProcess?.teA?._id || "",
      doc: (getDataRoundProcess?.doc as string) || "",
    },
    validationSchema,
    onSubmit(values) {
      console.log("🚀 ~ onSubmit ~ values:", values);

      //   props.handleSubmit?.(values);
    },
  });

  console.log("errors.te", errors.te);

  return (
    <Form onSubmit={handleSubmit}>
      {!props.disabledLinkMeet && (
        <Form.Group>
          <Form.Label>
            Link meet <span className="error">*</span>
          </Form.Label>
          <Input
            size="small"
            name="linkMeet"
            value={values.linkMeet}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.linkMeet && touched.linkMeet && (
            <p className="error">{errors.linkMeet}</p>
          )}
        </Form.Group>
      )}
      {props.hasDoc && (
        <Form.Group>
          <Form.Label>
            Tài liệu <span className="error">*</span>
          </Form.Label>
          <Input
            size="small"
            name="doc"
            value={values.doc}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.doc && touched.doc && <p className="error">{errors.doc}</p>}
        </Form.Group>
      )}

      <Form.Group>
        <Form.Label>
          Thời gian <span className="error">*</span>
        </Form.Label>
        <br />
        <DatePicker
          onBlur={handleBlur}
          name="time"
          onChange={(value: Obj | any) => {
            setFieldValue("time", value?.$d || "");
          }}
          placeholder="Ngày PV"
          popupClassName={styles.pickDate}
          size="small"
          value={values.time ? dayjs(new Date(values.time)) : null}
          format={"DD-MM-YYYY"}
        />
        <br />
        {values.time && (
          <TimePicker
            onChange={(value: Obj | any) => {
              if (value) {
                const hours = value?.$H;
                const minute = value?.$m;
                const currentInterviewDay = new Date(values.time);
                currentInterviewDay.setHours(hours);
                currentInterviewDay.setMinutes(minute);
                currentInterviewDay.setSeconds(0, 0);
                setFieldValue("time", new Date(currentInterviewDay));
              }
            }}
            value={values.time ? dayjs(new Date(values.time)) : null}
            popupClassName={styles.pickDate}
            format={"HH:mm"}
            size="small"
            placeholder="Giờ"
          />
        )}
        {errors.time && touched.time && !values.time && (
          <p className="error">{errors.time}</p>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label>
          TE phỏng vấn <span className="error">*</span>:{" "}
          {teInfo?.teName as String} - {teInfo.positionTe as String}
          {errors.te && touched.te && !values.te && (
            <p className="error">{errors.te as String}</p>
          )}
        </Form.Label>
        <div>
          {" "}
          <SelectTe
            size="small"
            onChange={(__, _, data) => {
              if (data) {
                setTeInfo(data);
                setFieldValue("te", teInfo.id);
              }
            }}
            value={teInfo.id}
          />
        </div>
        <div>
          <Form.Label>
            TE phụ trách <span className="error">*</span>:{" "}
            {teAInfo?.teName as String} - {teAInfo.positionTe as String}
            {errors.teA && touched.teA && !values.teA && (
              <p className="error">{errors.teA as String}</p>
            )}
          </Form.Label>
          <div>
            {" "}
            <SelectTe
              size="small"
              onChange={(__, _, data) => {
                if (data) {
                  setTeAInfo(data);
                  setFieldValue("teA", teAInfo.id);
                }
              }}
            />
          </div>
        </div>

        {/* <Dropdown
                    listSelect={getListTe?.map((item) => {
                        return {
                            key: item._id as string,
                            label: `${item.teName}-${item.positionTe}${item.courseId ? ` ${(item.courseId as Obj[])?.map((item) => item.courseName)?.toString()}` : ''}`
                        }
                    })}
                    trigger='click'
                    title={<div className={styles.inputLoading}>
                        <Input
                            onBlur={handleBlur}
                            name='te'
                            prefixCls={''}
                            size="small"
                            placeholder="Gõ email để tìm kiếm"
                            onChange={(e) => {
                                setValueFindTe(e.target.value);
                            }}
                        />
                        {listTe.data.isLoading && <Loading className={styles.iconLoading} />}
                    </div>
                    }
                    sizeButton="small"
                    onClickItem={(e) => {
                        setFieldValue('te', e.key);
                    }}
                /> */}
      </Form.Group>
      <div className={styles.btnCreateScheduleInterview}>
        <Button
          disabled={dataRoundProcess.data.isLoading}
          size="small"
          onClick={(e) => {
            if (getDataRoundProcess && getDataRoundProcess.time) {
              handleReset(e);
              setTeInfo({
                id: null,
              });
            } else {
              props.handleModal?.();
            }
          }}
        >
          {getDataRoundProcess && getDataRoundProcess.time ? "Đặt lại" : "Huỷ"}
        </Button>
        <Button
          size="small"
          htmlType="submit"
          loading={dataRoundProcess.data.isLoading}
        >
          {getDataRoundProcess?.time ? "Cập nhật" : "Tạo lịch"}
        </Button>
      </div>
    </Form>
  );
};

export default CreateCalendar;
