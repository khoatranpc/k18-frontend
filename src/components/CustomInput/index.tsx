import React from "react";
import { Select, Form } from "antd";
import { FormikErrors, FormikTouched } from "formik";

interface CustomInputWithOptionsProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur: React.FocusEventHandler<HTMLSelectElement>;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  setFieldValue: (field: string, value: any) => void;
  reasons?: string[];
}

const CustomInputWithOptions: React.FC<CustomInputWithOptionsProps> = ({
  name,
  label,
  placeholder,
  value,
  onBlur,
  errors,
  touched,
  setFieldValue,
  reasons = [],
}) => {
  const handleSelectChange = (option: string) => {
    setFieldValue(name, option);
    if (option === "no") {
      setFieldValue(`${name}Option`, "");
    }
  };

  const handleReasonChange = (reason: string) => {
    setFieldValue(`${name}Option`, reason);
  };

  return (
    <Form.Item
      label={label}
      validateStatus={touched[name] && errors[name] ? "error" : ""}
    >
      <Select
        placeholder={placeholder}
        value={value}
        onChange={handleSelectChange}
        onBlur={onBlur}
      >
        <Select.Option value="yes">Có</Select.Option>
        <Select.Option value="no">Không</Select.Option>
      </Select>

      {errors[name] && touched[name] && (
        <p className="text-[red]">{String(errors[name])}</p>
      )}
      {value === "yes" && reasons.length > 0 && (
        <Select
          placeholder="Chọn lý do"
          style={{ marginTop: "10px" }}
          onChange={handleReasonChange}
        >
          {reasons.map((reason, index) => (
            <Select.Option key={index} value={reason}>
              {reason}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default CustomInputWithOptions;
