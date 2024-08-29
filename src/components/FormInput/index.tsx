import React from "react";
import { Form } from "react-bootstrap";

interface FormInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | undefined | boolean;
  readOnly?: boolean;
  type?: string;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  readOnly = false,
  type = "text",
  placeholder = "",
}) => (
  <Form.Group controlId={name} className="mb-4">
    <Form.Label className="block text-gray-700 font-semibold mb-2">
      {label}
    </Form.Label>
    <Form.Control
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className="w-full p-2 border border-gray-300 rounded-lg"
      placeholder={placeholder}
      readOnly={readOnly}
    />
    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
  </Form.Group>
);

export default FormInput;
