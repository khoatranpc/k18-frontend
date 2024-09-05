import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import SelectClass from "../FormTeacherOff/SelectClass";
import CustomInputWithOptions from "../CustomInput";
import ReactQuill from "react-quill";
import useGetCrrUser from "@/utils/hooks/getUser";
import { Obj } from "@/global/interface";

interface FormValues {
  name: string;
  codeClass: string;
  date: string;
  absent: string;
  checkIn: string;
  score: number;
  skill: string;
  pointSkill: number;
  feedback: string;
}


const validationSchema = Yup.object({
  codeClass: Yup.string().required("Bạn cần chọn mã lớp!"),
  date: Yup.date().required("Bạn cần chọn thời gian kết thúc!"),
  absent: Yup.string().required("Bạn cần trả lời câu hỏi!"),
  checkIn: Yup.string().required("Bạn cần trả lời câu hỏi!"),
  score: Yup.number()
    .required("Bạn cần tự đánh giá điểm về thái độ!")
    .min(1, "Điểm không thể nhỏ hơn 1")
    .max(10, "Điểm không thể lớn hơn 10"),
  skill: Yup.string().required("Bạn cần đánh giá kết quả lớp!"),
  pointSkill: Yup.number()
    .required("Bạn cần tự đánh giá kỹ năng giảng dạy!")
    .min(1, "Điểm không thể nhỏ hơn 1")
    .max(10, "Điểm không thể lớn hơn 10"),
  feedback: Yup.string().required("Bạn cần đánh giá/feedback về khoá học!"),
});

const FormCreateEvaluate: React.FC = () => {
  const currentUser = useGetCrrUser()?.data as Obj;

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik<FormValues>({
    initialValues: {
      name: currentUser.fullName,
      codeClass: "",
      date: "",
      absent: "",
      checkIn: "",
      score: 0,
      skill: "",
      pointSkill: 0,
      feedback: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("🚀 ~ onSubmit ~ values:", values);
    },
  });

  useEffect(() => {
    setFieldValue("feedback", values.feedback || "");
  }, [values.feedback, setFieldValue]);

  return (
    <div className="mx-auto">
      <Form onFinish={handleSubmit} layout="vertical" className="p-6">
        <Form.Item
          label={"Họ và tên:"}
        >
          <Input
            name="name"
            value={values.name}
            disabled
          />
          {errors.name && touched.name && (
            <p className="text-[red]">{errors.name}</p>
          )}
        </Form.Item>

        <Form.Item
          label={"Mã lớp:"}
          name="codeClass"
          initialValue={values.codeClass}
          required
        >
          <SelectClass
            isDefaultGetAll
            onSelect={(value) => {
              setFieldValue("codeClass", value);
            }}
          />
          {errors.codeClass && touched.codeClass && (
            <p className="text-[red]">{errors.codeClass}</p>
          )}
        </Form.Item>

        <Form.Item label={"Thời gian kết thúc"} name="date" required>
          <DatePicker
            size="middle"
            placeholder="Ngày/Tháng/Năm"
            format={"DD/MM/YYYY"}
            onChange={(date) => {
              setFieldValue("date", date ? date.toISOString() : "");
            }}
          />
          {errors.date && touched.date && (
            <p className="text-[red]">{errors.date}</p>
          )}
        </Form.Item>

        <h3 className="block text-gray-700 font-semibold mb-4">
          Thông tin về thái độ
        </h3>

        <CustomInputWithOptions
          name="absent"
          label={"Bạn có nghỉ, vào muộn buổi học nào không?"}
          placeholder="Trả lời câu hỏi..."
          value={values.absent}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          reasons={["Lý do 1", "Lý do 2", "Lý do 3"]}
        />

        <CustomInputWithOptions
          name="checkIn"
          label={"Bạn có điểm danh đúng giờ, dùng LMS để điểm danh không?"}
          placeholder="Trả lời câu hỏi..."
          value={values.checkIn}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          reasons={["Tôi đi muộn", "Xe tôi hỏng"]}
        />

        <Form.Item
          label={"Về thái độ bạn tự đánh giá được bao nhiêu điểm?"}
          name="score"
          required
        >
          <InputNumber
            placeholder="Điểm"
            name="score"
            min={1}
            max={10}
            value={values.score}
            onChange={(value) => setFieldValue("score", value)}
            onBlur={handleBlur}
          />
          {errors.score && touched.score && (
            <p className="text-[red]">{errors.score}</p>
          )}
        </Form.Item>

        <h3 className="block text-gray-700 font-semibold mb-4">
          Thông tin về kỹ năng
        </h3>

        <Form.Item
          label={"Bạn đánh giá như nào về kết quả của lớp này?"}
          name="skill"
          required
        >
          <Input
            placeholder="Trả lời câu hỏi..."
            name="skill"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.skill}
          />
          {errors.skill && touched.skill && (
            <p className="text-[red]">{errors.skill}</p>
          )}
        </Form.Item>

        <Form.Item
          label={"Tự đánh giá kỹ năng giảng dạy của bạn trong khoá này?"}
          name="pointSkill"
          required
        >
          <InputNumber
            placeholder="Điểm"
            name="pointSkill"
            min={1}
            max={10}
            value={values.pointSkill}
            onChange={(value) => setFieldValue("pointSkill", value)}
            onBlur={handleBlur}
          />
          {errors.pointSkill && touched.pointSkill && (
            <p className="text-[red]">{errors.pointSkill}</p>
          )}
        </Form.Item>

        <Form.Item
          label={"Đánh giá/ feedback về khoá học"}
          name="feedback"
          required
        >
          <ReactQuill
            value={values.feedback}
            onChange={(content) => setFieldValue("feedback", content)}
            placeholder="Đánh giá/ feedback về khoá học..."
            style={{ height: "200px" }}
          />
          {errors.feedback && touched.feedback && (
            <p className="text-[red] mt-20">{errors.feedback}</p>
          )}
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          className="py-2 mt-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Xác nhận
        </Button>
      </Form>
    </div>
  );
};

export default FormCreateEvaluate;
