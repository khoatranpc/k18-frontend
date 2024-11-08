import { Form } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { querySearchTeacherByEmail } from "@/store/reducers/searchTeacher.reducer";
import { Button, Input, MenuProps, Popconfirm, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Action, Obj, State } from "@/global/interface";
import { mapRoleToString } from "@/global/init";
import {
  useDebounce,
  useDetailClass,
  useHandleTeacherInRCBT,
} from "@/utils/hooks";
import { ROLE_TEACHER } from "@/global/enum";
import { useHookMessage } from "@/utils/hooks/message";
import { AppDispatch, RootState } from "@/store";
import Dropdown from "@/components/Dropdown";
import styles from "@/styles/class/BookTeacher.module.scss";
import { LoadingOutlined } from "@ant-design/icons";
import teleBot from "@/utils/teleAlert";

interface Props {
  requestId: string;
  onSuccess: () => void;
  // for update teacher
  isUpdate?: boolean;
  teacherId?: string;
  teacherRole?: ROLE_TEACHER | string;
  status?: boolean;
  nameTeacher?: string;
  groupInfo?: Obj;
}
const AddTeacher = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const listTeacher = useSelector(
    (state: RootState) => (state.searchTeacher as State).state
  );
  const mapListSelect =
    (listTeacher.response?.data as Array<Obj>)?.map((item) => {
      return {
        key: item._id as string,
        label: `${item.fullName as string} - ${item.phoneNumber as string}`,
        email: item.email as string,
      };
    }) || [];

  const [teacher, setTeacher] = useState<{
    id: string;
    label: string;
    email?: string;
  }>({
    id: props.teacherId || "",
    label: props.nameTeacher || "",
  });
  const [emailSearch, setEmailSearch] = useState("");
  const firstRender = useRef(true);
  const emailTeacherDebounce = useDebounce(emailSearch);
  const crrClassInfo = useDetailClass("GET");
  const crrClassDetails = crrClassInfo.data?.response?.data;
  const crrGroupDetails = props?.groupInfo;

  const handleSearchTeacher = (value: string) => {
    const payload: Action = {
      payload: {
        query: {
          query: {
            email: value,
          },
        },
      },
    };
    dispatch(querySearchTeacherByEmail(payload));
  };
  const [updateTeacher, setUpdateTeacher] = useState<{
    id: string;
    label: string;
    email?: string;
  }>({
    id: props.teacherId || "",
    label: props.nameTeacher || "",
  });

  const { dataHandle, query, clear, removeTeacher, update } =
    useHandleTeacherInRCBT();
  const message = useHookMessage();
  const [crrRole, setCrrRole] = useState<ROLE_TEACHER | string>(
    props.teacherRole || ""
  );

  const role: Array<string> = [
    ROLE_TEACHER.ST,
    ROLE_TEACHER.MT,
    ROLE_TEACHER.SP,
  ];
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!props.isUpdate) {
      const payload: Action = {
        payload: {
          query: {
            query: {
              options: "ADD",
              role: crrRole,
              idTeacher: teacher.id,
            },
            params: [props.requestId],
          },
        },
      };
      query(payload);
    } else {
      update(
        teacher.id,
        updateTeacher.id,
        crrRole as ROLE_TEACHER,
        true,
        props.requestId
      );
    }
  };
  useEffect(() => {
    if (!firstRender.current) {
      if (emailTeacherDebounce) {
        handleSearchTeacher(emailTeacherDebounce);
      }
    }
  }, [emailTeacherDebounce, updateTeacher, teacher]);
  useEffect(() => {
    if (dataHandle.response) {
      if (dataHandle.success) {
        const messsData = {
          className: crrClassDetails?.codeClass,
          groupName: crrGroupDetails?.locationId?.locationCode,
          teacherName: props.isUpdate ? updateTeacher.label : teacher.label,
          teacherRole: crrRole,
        };
        teleBot.sendToTeleBot(teleBot.createMessageModifineTeacher(messsData));
        props.onSuccess();
      }
      message.open(
        {
          content: dataHandle.response.message as string,
          type: dataHandle.success ? "success" : "error",
        },
        2000
      );
      clear();
      message.close(2000);
    }
  }, [dataHandle]);
  return (
    <div className={styles.addTeacher}>
      <Form onSubmit={handleSubmit}>
        <label>
          Giáo viên: {!props.isUpdate ? teacher.label : updateTeacher.label}
        </label>
        <Dropdown
          title={
            <Input
              prefix={listTeacher.isLoading ? <LoadingOutlined /> : null}
              placeholder={"Nhập email giáo viên"}
              onChange={(e) => {
                firstRender.current = false;
                setEmailSearch(e.target.value);
              }}
              size="small"
              value={emailSearch}
            />
          }
          onClickItem={(e, _, item) => {
            if (!props.isUpdate) {
              setTeacher({
                id: e.key,
                label: (item as Obj)?.label,
              });
            } else {
              setUpdateTeacher({
                id: e.key,
                label: (item as Obj)?.label,
              });
            }
            firstRender.current = true;
            setEmailSearch((item as Obj)?.email);
          }}
          trigger={"click"}
          listSelect={mapListSelect}
          overlayClassName={styles.selectTeacher}
        />
        {((!props.isUpdate && !teacher.id) ||
          (props.isUpdate && !updateTeacher.id)) && (
          <p className="error">Đừng quên chọn GV nhé!</p>
        )}
        <label>Vị trí: {mapRoleToString[crrRole as ROLE_TEACHER]}</label>
        {!crrRole && <p className="error">Hãy chọn vị trí cho GV!</p>}
        <Dropdown
          title={"Chọn role"}
          listSelect={role.map((item) => {
            return {
              key: item,
              label: mapRoleToString[item as ROLE_TEACHER],
            };
          })}
          trigger={"click"}
          onClickItem={(e) => {
            setCrrRole(e.key);
          }}
        />
        <div className={styles.fnc}>
          {props.isUpdate && (
            <Popconfirm
              title={`Xoá GV: ${props.nameTeacher}`}
              onConfirm={() => {
                removeTeacher(props.teacherId as string, props.requestId);
              }}
            >
              <Button
                disabled={dataHandle.isLoading && props.isUpdate}
                className={styles.btnRemoveTeacher}
                loading={dataHandle.isLoading && !props.isUpdate}
              >
                Xoá
              </Button>
            </Popconfirm>
          )}
          <Button
            loading={dataHandle.isLoading}
            htmlType="submit"
            className={styles.btnAddTeacher}
          >
            {props.isUpdate ? "Cập nhật" : "Thêm"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddTeacher;
