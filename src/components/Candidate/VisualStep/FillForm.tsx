import React from "react";
import { Obj } from "@/global/interface";
import { useGetCandidateOnboard } from "@/utils/hooks";
import styles from "@/styles/Recruitment/Candidate.module.scss";
import { Button, Tag } from "antd";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const FillForm = () => {
  const candidateInfo = useGetCandidateOnboard();
  const router = useRouter();
  const getCandidateInfo = candidateInfo.data.response?.data as Obj;
  return (
    <div className={styles.FillForm}>
      {!getCandidateInfo?.fillForm ? (
        <div style={{ fontSize: "2.2rem" }}>
          <p>Thực hiện điền form thông tin tại</p>
          <div className={styles.linkWrapper}>
            <a
              href={
                "https://docs.google.com/forms/d/e/1FAIpQLSe-Ad6CpCq5I-o3qRTzmGnslAhk_IcvaX1rlNTo2uI8LDJ7nQ/viewform"
              }
            >
              <button className={styles.button64}>
                <span>LINK</span>
              </button>
            </a>
          </div>
          <small>
            Ứng viên vui lòng sử dụng email đăng ký với MindX để điền form
          </small>
        </div>
      ) : (
        <div className={styles.successAlert}>
          <Tag
            className={styles.tag}
            icon={<CheckCircleOutlined />}
            color="success"
          >
            Bạn đã hoàn thành onboard
          </Tag>

          <Button
            className={styles.btn_grad}
            size="large"
            icon={<HomeOutlined />}
            onClick={() => {
              router.push("/");
            }}
          >
            Đi Đến Trang Chủ
          </Button>
        </div>
      )}
    </div>
  );
};

export default FillForm;
