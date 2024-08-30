import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";
import { FormikHandlers, FormikTouched, FormikErrors } from "formik";

interface CustomInputWithOptionsProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: FormikHandlers["handleChange"];
  onBlur: FormikHandlers["handleBlur"];
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
  onChange,
  onBlur,
  errors,
  touched,
  setFieldValue,
  reasons = [],
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    if (value === "Có") {
      setShowOptions(true);
    } else {
      setShowOptions(false);
      setFieldValue(`${name}Option`, "NO");
    }
  }, [value, setFieldValue, name]);

  const handleChange = (value: string) => {
    setFieldValue(name, value);
  };

  const handleOptionChange = (option: string) => {
    setFieldValue(`${name}Option`, option);
  };

  return (
    <Form.Item
      label={label}
      name={name}
      required
      validateStatus={errors[name] && touched[name] ? "error" : undefined}
    >
      <Select
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={onBlur}
        value={value}
      >
        <Select.Option value="Có">YES</Select.Option>
        <Select.Option value="Không">NO</Select.Option>
      </Select>
      {showOptions && (
        <Select
          placeholder="Chọn lý do"
          style={{ marginTop: "10px" }}
          onChange={handleOptionChange}
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
