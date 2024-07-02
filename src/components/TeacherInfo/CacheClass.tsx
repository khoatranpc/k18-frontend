import React, { useEffect, useState } from "react";
import { getColorTeacherPoint } from "@/global/init";
import { Columns, Obj, RowData } from "@/global/interface";
import Table from "../Table";
import styles from "@/styles/teacher/TeacherInfo.module.scss";
import { useClassTeacherRegister } from "@/utils/hooks";
import useGetCrrUser from "@/utils/hooks/getUser";

const CacheClass = () => {
  const alo = useClassTeacherRegister();
  const teacher = useGetCrrUser()?.data as Obj;
  const teacherId = teacher?._id;
  console.log("🚀 ~ CacheClass ~ teacherId:", teacherId);

  const columns: Columns = [
    {
      key: "TIME",
      title: "Thời gian",
      dataIndex: "time",
    },
    {
      key: "CLASS",
      title: "Lớp",
      dataIndex: "codeClass",
    },
    {
      key: "TC",
      title: "TeacherPoint",
      dataIndex: "tcp",
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
  const data: RowData[] = [
    {
      key: 1,
      time: "20/10",
      codeClass: "TC-C4EJS145",
      tcp: 4.2,
      listFb: [
        {
          name: "Nguyễn Văn A",
          fb: "Nguuuuuuuuuuuuuuuuuuu",
        },
        {
          name: "Nguyễn Văn A",
          fb: "Nguuuuuuuuuuuuuuuuuuu",
        },
        {
          name: "Nguyễn Văn A",
          fb: "Nguuuuuuuuuuuuuuuuuuu",
        },
      ],
    },
    {
      key: 2,
      time: "20/10",

      codeClass: "TC-C4EJS145",
      tcp: 4.2,
    },
  ];

  useEffect(() => {
    alo.query(teacherId);
  }, []);

  console.log(alo.data.response);

  return (
    <div className={styles.cacheClass}>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => {
            return (record.listFb as Obj[])?.map((item, idx) => {
              return <p key={idx}>{item.fb}</p>;
            });
          },
        }}
        disableDefaultPagination
        rowData={data}
      />
    </div>
  );
};

export default CacheClass;
