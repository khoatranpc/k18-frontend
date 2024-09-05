import React, { useEffect, useState } from "react";
import { Columns, Obj } from "@/global/interface";
import Table from "../Table";
import EvaluateHistory from "./EvaluateHistory";
import styles from "@/styles/teacher/TeacherInfo.module.scss";
import { useClassTeacherRegister, useGetListFeedback } from "@/utils/hooks";
import useGetCrrUser from "@/utils/hooks/getUser";
import mapFeedbackData from "@/utils/helper/mapFeedbackData";
import { getColorTeacherPoint } from "@/global/init";

const Evaluate = () => {
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
      title: "Ngày Đánh Giá",
      dataIndex: "time",
    },
    {
      key: "CLASS",
      title: "Mã Lớp",
      dataIndex: "codeClass",
    },
    {
      key: "REVIEWER",
      title: "Người đánh giá",
      dataIndex: "name",
    },
    {
      key: "POINT",
      title: "Điểm trung bình",
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
      }
    }
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
            return <EvaluateHistory />;
          },
        }}
        disableDefaultPagination
        rowData={dataResource || []}
      />
    </div>
  );
};

export default Evaluate;
