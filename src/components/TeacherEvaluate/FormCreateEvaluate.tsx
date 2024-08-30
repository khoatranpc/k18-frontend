import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import SelectClass from "../FormTeacherOff/SelectClass";
import CustomInputWithOptions from "../CustomInput";
import "quill/dist/quill.snow.css";
import Quill from "quill";

interface FormValues {
  name: string;
  codeClass: string;
  date: string;
  numberOfStudent: number;
  absent: string;
  checkIn: string;
  score: number;
  skill: string;
  teachingSkill: number;
  feedback: string;
}

const initValues: FormValues = {
  name: "Pham Ngoc Cuong",
  codeClass: "",
  date: "",
  numberOfStudent: 50,
  absent: "",
  checkIn: "",
  score: 0,
  skill: "",
  teachingSkill: 0,
  feedback: "",
};

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
  teachingSkill: Yup.number()
    .required("Bạn cần tự đánh giá kỹ năng giảng dạy!")
    .min(1, "Điểm không thể nhỏ hơn 1")
    .max(10, "Điểm không thể lớn hơn 10"),
  feedback: Yup.string().required("Bạn cần đánh giá/feedback về khoá học!"),
});

const FormCreateEvaluate: React.FC = () => {
  const quillRef = useRef<Quill | null>(null);

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik<FormValues>({
    initialValues: initValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("🚀 ~ onSubmit ~ values:", values);
    },
  });

  useEffect(() => {
    if (!quillRef.current) {
      const quill = new Quill("#feedback-editor", {
        theme: "snow",
      });

      quillRef.current = quill;

      quill.root.innerHTML = values.feedback || "";
      quill.on("text-change", () => {
        setFieldValue("feedback", quill.root.innerHTML);
      });
    } else {
      quillRef.current.root.innerHTML = values.feedback || "";
    }

    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
      }
    };
  }, [values.feedback, setFieldValue]);
  return (
    <div className="mx-auto">
      <Form onFinish={handleSubmit} layout="vertical" className="p-6">
        <Form.Item
          label={"Họ và tên:"}
          name="name"
          initialValue={values.name}
          required
        >
          <Input
            placeholder="Họ và tên"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
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
          name="teachingSkill"
          required
        >
          <InputNumber
            placeholder="Điểm"
            name="teachingSkill"
            min={1}
            max={10}
            value={values.teachingSkill}
            onChange={(value) => setFieldValue("teachingSkill", value)}
            onBlur={handleBlur}
          />
          {errors.teachingSkill && touched.teachingSkill && (
            <p className="text-[red]">{errors.teachingSkill}</p>
          )}
        </Form.Item>

        <Form.Item
          label={"Đánh giá/ feedback về khoá học"}
          name="feedback"
          required
        >
          <div id="feedback-editor" style={{ height: "200px" }}></div>
          {errors.feedback && touched.feedback && (
            <p className="text-[red]">{errors.feedback}</p>
          )}
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          className="py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Xác nhận
        </Button>
      </Form>
    </div>
  );
};

export default FormCreateEvaluate;
