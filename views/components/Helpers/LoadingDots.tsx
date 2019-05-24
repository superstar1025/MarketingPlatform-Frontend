import React from "react";
import classNames from "classnames";

type Props = {
  className?: string;
};

const LoadingDots = ({ className }: Props) => {
  return (
    <div
      className={classNames(
        "uik-loader-dots__dotloader uik-btn__loader btn-loader",
        className
      )}
    >
      <div className="uik-loader-dots__dotloader1" />
      <div className="uik-loader-dots__dotloader2" />
    </div>
  );
};

export default LoadingDots;
