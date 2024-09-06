import React, { useEffect, useState } from "react";
import { Button } from "antd";
import Table from "../Table";
import { Columns, Obj, RowData } from "@/global/interface";
import { useListRequestOnLeave } from "@/utils/hooks";
import ModalCustomize from "../ModalCustomize";
import FormCreateEvaluate from "../TeacherEvaluate/FormCreateEvaluate";
import styles from "@/styles/RequestOnLeave.module.scss";

const Evaluate = () => {
  const listRequest = useListRequestOnLeave();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const getListRequest = (listRequest.data.response?.data as Obj)
    ?.data as Obj[];
  const columns: Columns = [
    {
      title: "Ngày học",
      dataIndex: "createdAt",
    },
    {
      title: "Giáo viên",
    },
    {
      title: "Lớp",
    },
    {
      title: "Cơ sở",
    },
    {
      title: "Buổi",
    },
    {
      title: "Hành động",
      render(value) {
        return (
          <Button type="primary" onClick={handleOpenModal}>
            Đánh giá
          </Button>
        );
      },
    },
  ];
  const rowData: RowData[] = getListRequest?.map((item) => {
    return {
      ...item,
      key: item._id,
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

      <ModalCustomize
        onHide={handleCloseModal}
        centered
        modalHeader={<div>Đánh giá giáo viên</div>}
        dialogClassName={`${styles.dialog} dialogEventPopUp`}
        backdropClassName={styles.backdrop}
        show={isModalVisible}
      >
        <FormCreateEvaluate />
      </ModalCustomize>
    </div>
  );
};

export default Evaluate;
