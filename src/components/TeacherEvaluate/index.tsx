import React from "react";
import FormCreateEvaluate from "./FormCreateEvaluate";
import styles from "@/styles/teacher/TeacherInfo.module.scss";
import TimelineEvaluate from "../TimelineEvaluate";

const TeacherEvaluate = () => {
  return (
    <div className={styles.teacherEvulate}>
      <div className={styles.listEvaluate}>
        <FormCreateEvaluate />
      </div>
      <div className={styles.formCreateEvaluate}>
        <TimelineEvaluate />
      </div>
    </div>
  );
};

export default TeacherEvaluate;
