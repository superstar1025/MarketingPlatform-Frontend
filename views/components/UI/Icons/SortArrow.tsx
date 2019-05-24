import React from "react";

interface IProps {
  onClick?: () => void;
}

const SortArrow = (props: IProps) => (
  <svg width={6} height={10} {...props}>
    <defs>
      <path
        d="M5.998 6.943L2.943 9.998 0 7.055l5.998-.112zM0 3.045L3.045 0 5.98 2.934 0 3.045z"
        id="prefix__a"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="prefix__b" fill="#fff">
        <use xlinkHref="#prefix__a" />
      </mask>
      <g mask="url(#prefix__b)" fill="#9EA0A5">
        <path d="M0 0h6v10H0z" />
      </g>
    </g>
  </svg>
);

export default SortArrow;
