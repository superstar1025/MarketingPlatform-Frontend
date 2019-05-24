import React from "react";
import classnames from "classnames";

import UserActionTopBarDropwdownBase from "./UserActionTopBarDropdownBase";

interface IProps {
  className?: string;
  title?: string;
  buttonText?: string | null;
  buttonAction?: () => void;
  buttonProps?: { [key: string]: any };
  close: () => void;
}

const UserActionTopBarDropwdownReady = (props: IProps) => {
  if (props) {
    return (
      <UserActionTopBarDropwdownBase
        {...props}
        className={classnames(props.className, "top-bar-ready")}
      />
    );
  }
  return null;
};

export default UserActionTopBarDropwdownReady;
