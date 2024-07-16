import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ManagerTeacherContext from "../context";
import { Badge } from "antd";
import { Obj } from "@/global/interface";
import {
  useDebounce,
  useGetArea,
  useGetListFeedback,
  useHandleDrawer,
  useImportCSVDataTeacher,
  useListTeacher,
  useTeacherRegisterCourse,
} from "@/utils/hooks";
import { ComponentPage } from "@/global/enum";
import CombineRoute from "@/global/route";
import { getColorTeacherPoint } from "@/global/init";
import { useHookMessage } from "@/utils/hooks/message";
import {
  PayloadRoute,
  initDataRoute,
} from "@/store/reducers/global-reducer/route";
import { AppDispatch } from "@/store";
import Table from "@/components/Table";
import ToolBar from "@/components/Tabs/ToolBar";
import { getColums, mapRowData } from "./config";
import styles from "@/styles/teacher/ManagerTeacher.module.scss";

const ListTeacher = () => {
  const { listTeacher, query } = useListTeacher();
  const importCSVDataTeacher = useImportCSVDataTeacher();
  const message = useHookMessage();
  const getDataImportCSV = importCSVDataTeacher.data;
  const getListTeacher = listTeacher.response?.data as Obj;
  const dataTeacherRegisterCourse = useTeacherRegisterCourse();
  const router = useRouter();
  const area = useGetArea();
  const [email, setEmail] = useState<string>("");
  const debounce = useDebounce(email, 500);
  const getAreas = area.data.response?.data as Obj[];
  const dispatch = useDispatch<AppDispatch>();
  const firstMounted = useRef<boolean>(true);
  const firstQuery = useRef(true);
  const columns = useMemo(() => {
    return getColums(
      undefined,
      getAreas,
      dataTeacherRegisterCourse.listData.isLoading &&
      !dataTeacherRegisterCourse.listData.response
    )
  }, [area.data.response, dataTeacherRegisterCourse.listData.response]);
  const rowData = useMemo(() => {
    return mapRowData(
      (listTeacher.response?.data as Obj)?.listTeacher || [],
      (dataTeacherRegisterCourse.listData.response?.data as Array<Obj>) || []
    )
  }, [listTeacher.response, dataTeacherRegisterCourse.listData.response]);
  const listFb = useGetListFeedback();
  const tc: Obj = {};
  const listTeacherStatistic = [];
  const getDataFb = (listFb.data.response?.data as Obj)?.list as Obj[];
  const handleQueryListTeacher = (
    rowOnPage?: number,
    currentPage?: number,
    email?: string
  ) => {
    query(rowOnPage, currentPage, {
      valueSearch: email,
    });
  };
  const drawer = useHandleDrawer();
  if (getDataFb) {
    getDataFb.forEach((item: Obj) => {
      if (!tc[item.course?.courseName]) {
        tc[item.course?.courseName] = 0;
        tc[`count${item.course?.courseName}`] = 0;
        tc[`color${item.course?.courseName}`] = item.course?.color as string;
      }
      tc[item.course?.courseName] +=
        Number(item.pointMT) + Number(item.pointST);
      tc[`count${item.course?.courseName}`] += 2;
    });
  }
  for (const key in tc) {
    if (!key.includes("count") && !key.includes("color")) {
      const newRecordColumn = {
        name: key,
        tp: Number(
          Number((tc[key] ?? 0) / (tc[`count${key}`] ?? 1)).toFixed(2)
        ),
        color: tc[`color${key}`],
      };
      listTeacherStatistic.push(newRecordColumn);
    }
  }
  if (listTeacherStatistic.length) {
    listTeacherStatistic.sort((a, b) => {
      return b.tp - a.tp;
    });
  }
  const handleClickRow = (record: Obj) => {
    const payload: PayloadRoute = {
      payload: {
        component: ComponentPage.TEACHER_DETAIL,
        route: CombineRoute["TE"]["MANAGER"]["DETAILTEACHER"],
        title: `Giáo viên: ${record.fullName as string}`,
        hasBackPage: true,
        replaceTitle: `Giáo viên: ${record.fullName as string}`,
        moreData: {
          teacherId: record._id,
        },
      },
    };
    dispatch(initDataRoute(payload));
    router.push(`/te/manager/teacher/detail/${record._id as string}`);
  };
  useEffect(() => {
    if (
      firstMounted.current &&
      (!getListTeacher ||
        (getListTeacher && !getListTeacher.currentPage) ||
        !listTeacher.payload?.query?.query?.currentPage)
    ) {
      handleQueryListTeacher(10, 1);
    }
    if (!area.data.success) {
      area.query();
    }
  }, []);
  useEffect(() => {
    if (!listFb.data.isLoading && (!listFb.data.response || (listFb.data.response?.data as Obj)?.recordOnPage)) {
      listFb.query(undefined, undefined, undefined, [
        "_id",
        "course",
        "courseName",
        "pointMT",
        "pointST",
        "color",
      ]);
    }
  }, [listFb.data.response])
  useEffect(() => {
    if (listTeacher.payload?.query?.query?.currentPage) {
      if (listTeacher.success && !email) {
        firstQuery.current = false;
        const getListId =
          ((listTeacher.response?.data as Obj)?.listTeacher as Array<Obj>)?.map(
            (item) => item._id
          ) || [];
        dataTeacherRegisterCourse.query(getListId);
      }
    }
    if (debounce && email && listTeacher.success && !listTeacher.isLoading) {
      const getListId =
        ((listTeacher.response?.data as Obj)?.listTeacher as Array<Obj>)?.map(
          (item) => item._id
        ) || [];
      dataTeacherRegisterCourse.query(getListId);
    }
  }, [listTeacher.response, debounce]);
  useEffect(() => {
    if (getDataImportCSV.response) {
      message.open({
        type: getDataImportCSV.success ? "success" : "error",
        content: (getDataImportCSV.response as Obj)?.message as string,
      });
      importCSVDataTeacher.clear?.();
      message.close();
    }
  }, [getDataImportCSV]);
  useEffect(() => {
    if (!firstMounted.current) {
      handleQueryListTeacher(
        getListTeacher?.recordOnPage ?? 10,
        getListTeacher?.currentPage ?? 1,
        email
      );
    } else {
      firstMounted.current = false;
    }
  }, [debounce]);
  return (
    <div className={styles.listTeacher}>
      <div className={styles.teacherPoint}>
        {listTeacherStatistic.map((item, idx) => {
          console.log(item);
          return (
            <Badge
              key={idx}
              count={item.tp}
              color={getColorTeacherPoint(item.tp)}
            >
              <span
                className={styles.course}
                style={{ backgroundColor: item.color }}
              >
                {item.name}
              </span>
            </Badge>
          );
        })}
      </div>
      <ToolBar
        onChangeSearch={(value) => {
          setEmail(value);
        }}
        placeHolderSearch="Nhập email hoặc họ tên cần tìm"
        context={ManagerTeacherContext}
        onClickReload={() => {
          handleQueryListTeacher(
            getListTeacher?.recordOnPage ?? 10,
            getListTeacher?.currentPage ?? 1,
            email
          );
        }}
        listFilter={[]}
        exportCSVButton
        onClickCreateButton={() => {
          drawer.open({
            componentDirection: "TeacherInfo/CreateTeacherbyTe",
            props: {
              isCreate: true,
            },
            open: true,
            title: "Thêm giáo viên",
          });
        }}
        createButton
        iconReload
        enableImportCSV
        loadingImport={importCSVDataTeacher.data.isLoading}
        onImportCSV={(data) => {
          const formData = new FormData();
          if (data) {
            formData.append("csvFile", data as File);
            importCSVDataTeacher.query({
              body: formData,
              headers: {
                "Content-Type": "mutilpart/form-data",
              },
            });
          }
        }}
      />
      <Table
        loading={listTeacher.isLoading}
        className={styles.tableManagerTeacher}
        disableDefaultPagination
        onChangeDataPagination={(data) => {
          handleQueryListTeacher(
            data.currentTotalRowOnPage,
            data.currentPage,
            email
          );
        }}
        enablePaginationAjax
        bordered
        hasFixedColumn
        columns={columns}
        rowData={getListTeacher?.currentPage && rowData}
        hanldeClickRow={handleClickRow}
        rowOnPage={getListTeacher?.recordOnPage}
        showSizePage
        crrPage={getListTeacher?.currentPage ?? 1}
        maxPage={(listTeacher.response?.data as Obj)?.totalPage ?? 1}
      />
    </div>
  );
};

export default ListTeacher;
