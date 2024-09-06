import React, { useEffect } from "react";
import Table from "../Table";
import { Columns, Obj, RowData } from "@/global/interface";
import { useListRequestOnLeave } from "@/utils/hooks";
import { formatDatetoString } from "@/utils";
import styles from "@/styles/RequestOnLeave.module.scss";

const RequestOnleave = () => {
  const listRequest = useListRequestOnLeave();

  const getListRequest = (listRequest.data.response?.data as Obj)
    ?.data as Obj[];
  const columns: Columns = [
    {
      title: "Ngày yêu cầu",
      dataIndex: "time",
      key: "date",
      render(value) {
        return formatDatetoString(value as Date, "dd/MM/yyyy");
      },
    },
    {
      title: "Giáo viên",
      dataIndex: "name",
    },
    {
      title: "Lớp",
      dataIndex: "class",
    },
    {
      title: "Cơ sở",
      dataIndex: "location",
    },
    {
      title: "Buổi",
      dataIndex: "session",
      render(value: Obj) {
        return (
          <div className={styles.colTimeSchedule}>
            <p>
              {value?.weekday as string}: {value?.start as string}-
              {value?.end as string}
            </p>
          </div>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Giáo viên thay",
      dataIndex: "bookTeacher",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
  ];
  const rowData: RowData[] = getListRequest?.map((item) => {
    return {
      id: item._id as string,
      key: item._id as string,
      time: item.createdAt,
      name: item.teacherId?.fullName,
      class: item.classSessionId?.classId,
      location: item.locationId,
      session: item.classSessionId?.weekdayTimeScheduleId,
      role: item.teacherId?.role,
      bookTeacher: item.classSessionId?.bookTeacher,
      status: item.cancel,
    };
  });

  console.log(rowData);

  useEffect(() => {
    listRequest.query({
      query: {
        currentPage: 1,
        recordOnPage: 10,
      },
    });
  }, []);

  return (
    <div className={styles.containerRequestOnLeave}>
      <Table
        columns={columns}
        rowData={rowData}
        disableDefaultPagination
        enablePaginationAjax
      />
    </div>
  );
};

export default RequestOnleave;
