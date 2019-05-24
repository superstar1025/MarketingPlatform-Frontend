import React from "react";
import classnames from "classnames";

import UserActionTopBarDropwdownBase from "./UserActionTopBarDropdownBase";

interface IProps {
  className?: string;
  title?: string;
  buttonText?: string | null;
  buttonAction?: () => void;
  buttonProps?: { [key: string]: any };
  close?: () => void;
}

const UserActionTopBarDropwdownSuccess = (props: IProps) => {
  return (
    <UserActionTopBarDropwdownBase
      {...props}
      className={classnames(props.className, "top-bar-success")}
    />
  );
};

export default UserActionTopBarDropwdownSuccess;
