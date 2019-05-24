import React from "react";
import classnames from "classnames";

interface IProps {
  className?: string;
}
export const testIds = {
  loading: "loading"
};

const ModalLoading = ({ className }: IProps) => (
  <div className={classnames("modal-load-root", "fade-out", className)}>
    <div className="modal-loader-overlay">
      {" "}
      <div className="loader-inner ball-scale-ripple-multiple ball-scale-ripple-multiple-color">
        {" "}
        <div /> <div /> <div />{" "}
      </div>{" "}
    </div>
  </div>
);

export default ModalLoading;
