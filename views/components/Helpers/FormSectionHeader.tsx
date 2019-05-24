import React from "react";

interface IProps {
  children: React.ReactNode;
}

const FormSectionHeader = ({ children }: IProps) => {
  return <div className="form-section-header">{children}</div>;
};

export default FormSectionHeader;
