import React from "react";
import Form from "react-bootstrap/Form";

export default function InputField(props: any) {
  const {label, type, placeholder } = props;
  console.log(props)
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type ?? "text"} size="lg" placeholder={placeholder} {...props} />
      
    </Form.Group>
  );
}
