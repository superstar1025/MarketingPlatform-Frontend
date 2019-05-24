import React from "react";
import classnames from "classnames";

interface IProps {
  className?: string;
}
export const testIds = {
  loading: "loading"
};

const Loading = ({ className }: IProps) => (
  <div
    data-testid={testIds.loading}
    className={classnames("loader", "fade-out", className)}
  >
    {" "}
    <div className="loader-inner ball-scale-ripple-multiple ball-scale-ripple-multiple-color">
      {" "}
      <div /> <div /> <div />{" "}
    </div>{" "}
  </div>
);

export default Loading;
