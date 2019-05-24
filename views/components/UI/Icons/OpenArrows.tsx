import React from "react";

const OpenArrows = () => (
  <svg width={7} height={10}>
    <title>{"Icon/Dropdown Arrow"}</title>
    <defs>
      <path
        d="M6.497 6.943L3.443 9.998.5 7.055l5.997-.112zM.5 3.045L3.545 0l2.934 2.934-5.98.111z"
        id="prefix__a"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="prefix__b" fill="#fff">
        <use xlinkHref="#prefix__a" />
      </mask>
      <g mask="url(#prefix__b)" fill="#9EA0A5">
        <path d="M0 0h7v10H0z" />
      </g>
    </g>
  </svg>
);

export default OpenArrows;
