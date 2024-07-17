import React, { useEffect, useState } from "react";
import { getColorTeacherPoint } from "@/global/init";
import { Columns, Obj, RowData } from "@/global/interface";
import Table from "../Table";
import styles from "@/styles/teacher/TeacherInfo.module.scss";
import { useClassTeacherRegister, useGetListFeedback } from "@/utils/hooks";
import useGetCrrUser from "@/utils/hooks/getUser";
import mapFeedbackData from "@/utils/helper/mapFeedbackData";
import { uuid } from "@/utils";

const CacheClass = () => {
  const getTeacherInfo = useClassTeacherRegister();
  const getFeedbackList = useGetListFeedback();
  const teacher = useGetCrrUser()?.data as Obj;

  const classListOfTeacher = getTeacherInfo.data?.response?.data || [];
  const feedbackListOfTeacher = getFeedbackList.data?.response?.data.list || [];
  const teacherId = teacher?._id;

  const getListClassId = (data: Obj[]) => {
    const listClassId = data.map((item) => item.classId._id);

    return listClassId;
  };

  const listClassId = getListClassId(classListOfTeacher);

  const columns: Columns = [
    {
      key: "TIME",
      title: "Ngày Khai Giảng",
      dataIndex: "time",
    },
    {
      key: "CLASS",
      title: "Mã Lớp",
      dataIndex: "codeClass",
    },
    {
      key: "FEEDBACKCOUNT",
      title: "Số lượng phản hồi",
      dataIndex: "feedbackCount",
      className: "text-center",
    },
    {
      key: "TEACHERPOINT",
      title: "TeacherPoint",
      dataIndex: "teacherPoint",
      className: "text-center",
      render(value, record, index) {
        return (
          <span
            style={{ color: getColorTeacherPoint(value), fontWeight: "bold" }}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: "CLASSPOINT",
      title: "AVG cả Lớp",
      dataIndex: "classAveragePoint",
      className: "text-center",
      render(value, record, index) {
        return (
          <span
            style={{ color: getColorTeacherPoint(value), fontWeight: "bold" }}
          >
            {value}
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    getTeacherInfo.query(teacherId);
    getFeedbackList.query(
      undefined,
      undefined,
      {
        listClass: listClassId,
      },
      undefined
    );
  }, []);

  const dataResource: any = mapFeedbackData(
    classListOfTeacher,
    feedbackListOfTeacher
  );

  return (
    <div className={styles.cacheClass}>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => {
            return (record.listFb as Obj[])?.map((item, idx) => {
              return (
                <p key={idx + uuid()}>
                  {" "}
                  <b>Thời gian:</b> {item.createdAt} - <b>Nội dung:</b>{" "}
                  {item.docDetail}
                </p>
              );
            });
          },
        }}
        disableDefaultPagination
        rowData={dataResource || []}
      />
    </div>
  );
};

export default CacheClass;
