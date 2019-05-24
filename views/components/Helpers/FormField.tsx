import React from "react";

interface IProps {
  children: React.ReactNode;
}

const FormField = ({ children }: IProps) => {
  return <div className="form-field">{children}</div>;
};

export default FormField;
