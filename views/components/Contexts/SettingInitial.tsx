import React, { createContext, useState, ReactNode } from "react";

export interface SettingInitialContextValues {
  avatar: string,
  setAvatar: (avatar: string) => void;
}

interface Props {
  children: ReactNode;
}

const defaultContextValues: SettingInitialContextValues = {
  avatar: "",
  setAvatar: () => {}
};

export const SettingInitialContext = createContext(defaultContextValues);

const SettingInitialProvider = (props: Props) => {
  
  const [avatar, setAvatarVal] = useState("");

  const setAvatar = (param: string) => {
    setAvatarVal(param);
  };
  return (
    <SettingInitialContext.Provider
      value={{ avatar, setAvatar }}
    >
      {props.children}
    </SettingInitialContext.Provider>
  );
};

export default SettingInitialProvider;
