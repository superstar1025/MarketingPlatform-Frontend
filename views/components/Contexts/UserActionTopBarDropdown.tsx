import React, { createContext, useState, ReactNode } from "react";
import { DropDownProps } from "../Helpers/UserActionTopBarDropdownSwitch/UserActionTopBarDropdownBase";

export interface UserActionTopBarDropdownContextValues {
  dropDownProps: {} | { [key: string]: any } | DropDownProps;
  dropDownType: string;
  close: () => void;
  showDropDown: (type: string, props: { [key: string]: any }) => void;
}

interface Props {
  children: ReactNode;
}

const defaultContextValues: UserActionTopBarDropdownContextValues = {
  dropDownProps: {},
  dropDownType: "",
  close: () => {},
  showDropDown: () => {}
};

export const UserActionTopBarDropdownContext = createContext(
  defaultContextValues
);

const UserActionTopBarDropdownProvider = (props: Props) => {
  const [dropDownType, setDropDownType] = useState("");
  const [dropDownProps, setDropDownProps] = useState({});

  const close = () => {
    setDropDownType("");
    setDropDownProps({});
  };

  const showDropDown = (type: string, props: { [key: string]: any }) => {
    setDropDownType(type);
    setDropDownProps(props);
  };

  return (
    <UserActionTopBarDropdownContext.Provider
      value={{ dropDownProps, close, showDropDown, dropDownType }}
    >
      {props.children}
    </UserActionTopBarDropdownContext.Provider>
  );
};

export default UserActionTopBarDropdownProvider;
