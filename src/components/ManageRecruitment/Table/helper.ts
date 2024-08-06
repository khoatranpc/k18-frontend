import { RoundProcess } from "@/global/enum";
import { Obj } from "@/global/interface";
import CV from "../DetailCandidate/Progress/CV";
import { Prev } from "react-bootstrap/esm/PageItem";

export const mapRecruitmentStatus = (record: Obj) => {
    const result = {
        msg: "Chưa xử lý",
        msgColor: "red",
        emailStatus: "Chưa email",
        emailStatusColor: "red"
    }
    const roundProcess = record?.roundProcess || RoundProcess.CV;
    const updateMsg = (msg: string, color: string) => {
        result.msg = msg;
        result.msgColor = color;
    }
    const updateEmailStatus = (emailStatus: string, color: string) => {
        result.emailStatus = emailStatus;
        result.emailStatusColor = color;
    }



    switch (roundProcess) {
        case RoundProcess.CV:
            if (record?.processCV?.processed) {
                if (!record?.processCV?.result) {
                    updateMsg("Không Đạt CV", "red");
                } else {
                    updateMsg("Đạt CV", "lime");
                }
                if (!record?.processCV?.sentMail) {
                    updateEmailStatus("Chưa gửi thông báo", "red");
                } else {
                    updateEmailStatus("Đã gửi thông báo", "green");
                }
            } else {
                updateMsg("Chưa xử lý CV", "gold")
                if (record?.sendMailPending) {
                    updateMsg("Tạm Ngưng", "volcano");
                    updateEmailStatus("Đã email Pending", "green");
                }
                if (record?.sendMailNoConnect) {
                    updateMsg("Không thể liên hệ", "magenta");
                    updateEmailStatus("Đã email LH nhiều lần", "green");
                }
            }
            break;
        case RoundProcess.INTERVIEW:
            if (record?.processInterview?.processed) {
                if (record?.processInterview?.eventCalendarId) {
                    if (record?.processInterview?.result) {
                        updateMsg("Đạt PV", "green");
                    } else {
                        updateMsg("Trượt PV", "red");
                    }
                    if (record?.processInterview?.mailResultSent) {
                        updateEmailStatus("Đã gửi kết quả", "green");
                    } else {
                        updateEmailStatus("Chưa gửi kết quả", "red");
                    }
                } else {
                    if (!record?.processInterview?.result) {
                        updateMsg("Trượt PV", "red");
                    }
                    if (record?.processInterview?.mailResultSent) {
                        updateEmailStatus("Đã gửi kết quả", "green");
                    } else {
                        updateEmailStatus("Chưa gửi kết quả", "red");
                    }

                }
            } else {
                if (record?.processInterview?.eventCalendarId) {
                    updateMsg("Đã hẹn PV", "cyan");
                } else {
                    updateMsg("Chờ PV", "cyan");
                }
            }
            break;
        case RoundProcess.TEST:
            updateMsg("Đang kiểm tra", "geekblue");
            updateEmailStatus("Đã gửi kết quả", "green");

            break;
        case RoundProcess.CLAUTID:
            updateMsg("Đang dự thính", "geekblue");
            updateEmailStatus("Đã gửi kết quả", "green");

            break;
        default:
            updateMsg("Chưa xử lý", "gold");
            updateEmailStatus("Chưa email", "red");
    }



    return result;
}