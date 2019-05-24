import React from "react";
import { DROP_DOWN_TYPES } from "../../../constants/dropDowns";
import UserActionTopBarDropwdownReady from "./UserActionTopBarDropdownSwitch/UserActionTopBarDropdownReady";
import UserActionTopBarDropwdownSuccess from "./UserActionTopBarDropdownSwitch/UserActionTopBarDropwdownSuccess";
import UserActionTopBarDropwdownError from "./UserActionTopBarDropdownSwitch/UserActionTopBarDropdownError";

type Props = {
  type: string;
  props?: { [key: string]: any };
  close: () => void;
};

const UserActionTopBarDropdownSwitch = ({ type, props, close }: Props) => {
  switch (type) {
    case DROP_DOWN_TYPES.DROP_DOWN_READY:
      return <UserActionTopBarDropwdownReady {...props} close={close} />;
    case DROP_DOWN_TYPES.DROP_DOWN_SUCCESS:
      return <UserActionTopBarDropwdownSuccess {...props} close={close} />;
    case DROP_DOWN_TYPES.DROP_DOWN_ERROR:
      return <UserActionTopBarDropwdownError {...props} close={close} />;
    default:
      return null;
  }
};

export default UserActionTopBarDropdownSwitch;
