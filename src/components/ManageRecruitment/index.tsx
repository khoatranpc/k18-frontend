import React, { useContext, useEffect, useState } from "react";
import { useGetListCourse } from "@/utils/hooks";
import ContextProvider from "./ContextProvider";
import FilterBar from "./FilterBar";
import Table from "./Table";
import styles from "@/styles/Recruitment/ManagerRecruitment.module.scss";
import { TabsProps } from "antd";
import { getLabelRoundProcess } from "@/global/init";
import Tabs from "../Tabs";
import { ContextRecruitment } from "./context";

const ManagerRecruitment = () => {
  const allCourse = useGetListCourse();
  const [isSearching, setIsSearching] = useState(false);

  const { conditionFilter } = useContext(ContextRecruitment);
  const handleChangeConditionFilter = (
    field: keyof typeof conditionFilter.condition,
    value: any
  ) => {
    conditionFilter.setCondition({
      ...conditionFilter.condition,
      [field]: value,
    });
  };

  useEffect(() => {
    if (!allCourse.listCourse) {
      allCourse.queryListCourse();
    }
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "ALL",
      label: "All",
    },
    ...Object.entries(getLabelRoundProcess).map(([key, label]) => ({
      key,
      label: <div>{label}</div>,
    })),
  ];

  return (
    <div className={styles.containerManagerRecruitment}>
      <FilterBar setIsSearching={setIsSearching} />

      <Tabs
        notAllowContent
        listItemTab={items}
        className={"pt-0"}
        onClickTab={(key) => handleChangeConditionFilter("roundProcess", key)}
      />

      <Table isSearching={isSearching} />
    </div>
  );
};

const BoundaryManagerRecruitment = () => {
  return (
    <ContextProvider>
      <ManagerRecruitment />
    </ContextProvider>
  );
};

export default BoundaryManagerRecruitment;
