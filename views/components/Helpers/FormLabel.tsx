import React from "react";

interface IProps {
  children: React.ReactNode;
}

const FormLabel = ({ children }: IProps) => {
  return (
    <div className="form-label">
      <label>{children}</label>
    </div>
  );
};

export default FormLabel;
