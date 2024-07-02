import React from "react";
import { Button, Checkbox, Input } from "antd";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { Obj } from "@/global/interface";
import styles from "@/styles/teacher/CreateTeacherbyTe.module.scss";
import SelectCourseMultiple from "../SelectCourse/SelectMultipale";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Bạn cần cung cấp email!"),
  fullName: yup.string().required("Bạn cần cung cấp họ và tên!"),
  facebookLink: yup.string().url("Link Facebook không hợp lệ"),
  phoneNumber: yup.string().required("Bạn cần cung cấp số điện thoại!"),
  roles: yup.array().of(yup.string()).required("Bạn cần chọn vai trò!"),
  coursesRegister: yup
    .array()
    .of(
      yup.object({
        idCourse: yup.string().required(),
        levelHandle: yup.array().of(yup.string()).required(),
      })
    )
    .min(1, "Bạn cần đăng ký ít nhất một khóa học!"),
});

interface Props {
  currentCourse?: Obj;
  isCreate?: boolean;
}

const CreateTeacherbyTe = (props: Props) => {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      facebookLink: "",
      roles: [],
      phoneNumber: "",
      coursesRegister: [],
    },
    validationSchema,
    onSubmit(values) {
      // Handle form submission
      console.log(values);
    },
  });

  return (
    <div className={styles.contentUdpateCourse}>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Form.Group className={styles.itemForm}>
          <Form.Label>
            Email<span className="error">*</span>:
          </Form.Label>
          <Input
            size="small"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <p className="error">{errors.email as string}</p>
          )}
        </Form.Group>
        <Form.Group className={styles.itemForm}>
          <Form.Label>
            Họ và Tên<span className="error">*</span>:
          </Form.Label>
          <Input
            size="small"
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.fullName && errors.fullName && (
            <p className="error">{errors.fullName as string}</p>
          )}
        </Form.Group>
        <Form.Group className={styles.itemForm}>
          <Form.Label>Link Facebook:</Form.Label>
          <Input
            size="small"
            type="text"
            name="facebookLink"
            value={values.facebookLink}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.facebookLink && errors.facebookLink && (
            <p className="error">{errors.facebookLink as string}</p>
          )}
        </Form.Group>
        <Form.Group className={styles.itemForm}>
          <Form.Label>
            Số điện thoại<span className="error">*</span>:
          </Form.Label>
          <Input
            size="small"
            type="text"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.phoneNumber && errors.phoneNumber && (
            <p className="error">{errors.phoneNumber as string}</p>
          )}
        </Form.Group>
        <Form.Group className={styles.itemForm}>
          <Form.Label>
            Vai trò<span className="error">*</span>:
          </Form.Label>
          <Checkbox.Group
            options={[
              { label: "Giáo viên", value: "ST" },
              { label: "Mentor", value: "MT" },
              { label: "Supporter", value: "SP" },
            ]}
            name="roles"
            value={values.roles}
            onChange={(checkedValues) => setFieldValue("roles", checkedValues)}
          />
          {touched.roles && errors.roles && (
            <p className="error">{errors.roles as string}</p>
          )}
        </Form.Group>
        <Form.Group className={styles.itemForm}>
          <Form.Label>
            Khóa học đăng ký<span className="error">*</span>:
          </Form.Label>
          <SelectCourseMultiple
            multiple
            onChange={(data) => {
              setFieldValue("coursesRegister", data);
            }}
          />
          {touched.coursesRegister && errors.coursesRegister && (
            <p className="error">{errors.coursesRegister as string}</p>
          )}
        </Form.Group>

        <div className={`${styles.marginTop} ${styles.btnAction}`}>
          <Button onClick={handleReset}>Reset</Button>
          <Button htmlType="submit">Tạo</Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateTeacherbyTe;
