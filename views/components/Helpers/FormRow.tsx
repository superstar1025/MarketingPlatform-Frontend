import React from "react";

interface IProps {
  children: React.ReactNode;
}

const FormRow = ({ children }: IProps) => {
  return <div className="form-row">{children}</div>;
};

export default FormRow;
