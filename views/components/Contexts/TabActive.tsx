import React, { createContext, useState, ReactNode } from "react";

export interface TabActiveContextContextValues {
  active: number;
  setActiveTab: (active:number) => void;
}

interface Props {
  children: ReactNode;
}

const defaultContextValues: TabActiveContextContextValues = {
  active: 1,
  setActiveTab: () => {}
};

export const TabActiveContext = createContext(
  defaultContextValues
);

const TabActiveProvider = (props: Props) => {
  const [active, setActiveType] = useState(1);

  const setActiveTab = (active: number) => {
    setActiveType(active);
  };

  return (
    <TabActiveContext.Provider
      value={{ setActiveTab, active}}
    >
      {props.children}
    </TabActiveContext.Provider>
  );
};

export default TabActiveProvider;
