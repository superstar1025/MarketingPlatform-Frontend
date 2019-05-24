import React from "react";

interface IProps {
  children: React.ReactNode;
}

const FormSection = ({ children }: IProps) => {
  return <div className="form-section">{children}</div>;
};

export default FormSection;
