import React, { memo, useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { Obj } from "@/global/interface";
import { TemplateMail } from "@/global/enum";
import { useGetDetailCandidate, useGetMailTemplate } from "@/utils/hooks";
import SelectTe from "@/components/SelectTe";
import TextEditor from "@/components/TextEditor";
import Send from "@/icons/Send";
import ModalCustomize from "@/components/ModalCustomize";
import styles from "@/styles/Recruitment/ManagerRecruitment.module.scss";
import { HookReducer, uuid } from "@/utils";

interface Props {
  round?: TemplateMail;
  handleSend: (template: TemplateMail, payload: Obj) => void;
  statusSendMail?: boolean;
  disabled?: boolean;
  roundId?: string;
  text?: string;
  componentId?: string;
  isLoading?: boolean;
}
interface SendingMailV2 extends Props {
  mailTemplate: HookReducer;
}

const SendingMailV2 = (props: SendingMailV2) => {
  const handleSend = props.handleSend;
  const getTemplate = props.round || TemplateMail.NOCONNECT;
  const mailTemplate = props.mailTemplate;
  const dataMailtemplate = mailTemplate.data.response?.data as Obj;
  const [teProcess, setTeProcess] = useState<Obj | null>(null);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const crrCandidate = useGetDetailCandidate();
  const getDataCandidate = crrCandidate.data.response?.data as Obj;

  const [modal, setModal] = useState(false);

  const handleBlur = (newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (dataMailtemplate && getDataCandidate) {
      setTitle(dataMailtemplate.title);
      const example = dataMailtemplate.html
        ? String(dataMailtemplate.html)
            .replace("{{NAME}}", getDataCandidate?.fullName as string)
            .replace(
              "{{COURSE}}",
              `${getDataCandidate?.courseApply.courseName as string}`
            )
            .replace(
              "{{TE}}",
              `<a href="${teProcess?.facebook}" style="color:#1155cc;">${teProcess?.teName}</a>   - ${teProcess?.phoneNumber}`
            )
        : "";
      setValue(example);
    }
  }, [dataMailtemplate, getDataCandidate, teProcess]);
  return (
    <div className={styles.sendingMailV2}>
      <Button
        size="small"
        className={styles.btnSentMailV2}
        onClick={() => {
          setModal(true);
        }}
      >
        <Send className={styles.iconSentV2} />
        {props.text || "Gửi Mail"}
        {props.statusSendMail ? (
          <CheckCircleFilled
            style={{ color: "var(--success)" }}
            className={styles.statusSentMail}
          />
        ) : (
          <CloseCircleFilled
            style={{ color: "var(--light-red)" }}
            className={styles.statusSentMail}
          />
        )}
      </Button>
      {modal && (
        <ModalCustomize
          size="xl"
          centered
          show={modal}
          onHide={() => {
            setModal(false);
            setTeProcess(null);
          }}
          modalHeader={
            <div
              style={{
                display: "flex",
              }}
            >
              <div>
                <span>
                  Gửi mail tới:<b>{getDataCandidate?.email as string}</b>{" "}
                </span>
                <div>
                  TE Xử lý:{" "}
                  <SelectTe
                    status={!teProcess ? "error" : ""}
                    size="small"
                    onChange={(__, _, data) => {
                      if (data) {
                        setTeProcess(data);
                      }
                    }}
                  />
                </div>
              </div>
              <div style={{ marginLeft: "1rem" }}>
                {props.statusSendMail ? (
                  <CheckCircleFilled
                    style={{ color: "var(--success)" }}
                    className={styles.statusSentMail}
                  />
                ) : (
                  <CloseCircleFilled
                    style={{ color: "var(--light-red)" }}
                    className={styles.statusSentMail}
                  />
                )}
              </div>
            </div>
          }
        >
          <TextEditor
            title={title}
            setTitle={setTitle}
            hasTitle
            value={value}
            onBlur={handleBlur}
            loadingButton={props.isLoading}
            textButton="Gửi"
            handleSubmit={() =>
              handleSend(getTemplate, {
                courseName: getDataCandidate.courseApply.courseName,
                candidateName: getDataCandidate.fullName,
                candidateEmail: getDataCandidate.email,
                teInfo: {
                  teName: teProcess?.teName || "Dương Văn Mẩn",
                  facebook:
                    teProcess?.facebook || "https://www.facebook.com/mvann02",
                  phoneNumber: teProcess?.phoneNumber || "0707918019",
                },
              })
            }
            disabledSave={!teProcess || props.isLoading}
          />
        </ModalCustomize>
      )}
    </div>
  );
};

const MemoSendingMailV2 = memo(SendingMailV2, (prevProps, nextProps) => {
  if (prevProps.isLoading !== nextProps.isLoading) {
    return false;
  }
  if (nextProps.mailTemplate.data.componentId !== prevProps.componentId) {
    return true;
  }
  return false;
});

const BoundarySendingV2 = (props: Props) => {
  const componentId = useRef(uuid());
  const mailTemplate = useGetMailTemplate();
  const getTemplate = props.round || TemplateMail.NOCONNECT;
  useEffect(() => {
    if (
      !mailTemplate.data.componentId ||
      mailTemplate.data.componentId !== componentId.current
    ) {
      mailTemplate.query(
        {
          query: {
            template: getTemplate,
          },
        },
        componentId.current
      );
    }
  }, [getTemplate]);

  return (
    <MemoSendingMailV2
      {...props}
      componentId={componentId.current}
      mailTemplate={mailTemplate}
    />
  );
};
export default BoundarySendingV2;
