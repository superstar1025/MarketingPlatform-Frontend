import React from "react";

interface IProps {
  children: React.ReactNode;
}

const FormContainer = ({ children }: IProps) => {
  return <div className="form-container">{children}</div>;
};

export default FormContainer;
