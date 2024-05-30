"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Form } from "react-bootstrap";
import { Button, Input } from "antd";
import { Obj } from "@/global/interface";
import { useGetCandidateOnboard } from "@/utils/hooks";
import { useHookMessage } from "@/utils/hooks/message";
import VisualStep from "./VisualStep";
import logo from "@/assets/imgs/mindx.png";
import styles from "@/styles/Recruitment/Candidate.module.scss";

const Candidate = () => {
  const [email, setEmail] = useState("");

  const message = useHookMessage();

  const candidateInfo = useGetCandidateOnboard();
  const getCandidateInfo = candidateInfo.data.response?.data as Obj;

  const handleQueryCandidate = () => {
    localStorage.setItem("email__", email);
    candidateInfo.query({
      query: {
        email: email.toLowerCase(),
        fields: "roundProcess,fillForm,email",
      },
    });
  };

  useEffect(() => {
    if (candidateInfo.data.response && !getCandidateInfo) {
      message.open({
        content: "Không tìm thấy dữ liệu ứng viên!",
        type: "error",
      });
    }
  }, [candidateInfo.data.response]);
  useEffect(() => {
    setEmail(localStorage.getItem("email__") ?? "");
  }, []);
  return (
    <div className={styles.candidatePage}>
      <Image src={logo} alt="" />
      <h1>Chào mừng ứng viên đến với quy trình onboard</h1>
      <h2>Vui lòng nhập email để kiểm tra</h2>
      <div className={styles.checkCandidate}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleQueryCandidate();
          }}
          style={{ display: "flex" }}
        >
          <Input
            value={email}
            onChange={(e) => {
              setEmail(() => {
                return e.target.value.trim();
              });
            }}
          />
          <Button loading={candidateInfo.data.isLoading} htmlType="submit">
            Kiểm tra
          </Button>
        </Form>
      </div>

      {getCandidateInfo && <VisualStep />}
    </div>
  );
};

export default Candidate;
