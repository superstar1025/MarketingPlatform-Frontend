import React, { createContext, useState, ReactNode } from "react";

export interface CountrySelectContextValues {
  Country: string;
  State: string;
  setCountry: (param: string) => void;
  setRegion: (param: string) => void;
}

interface Props {
  children: ReactNode;
}

const defaultContextValues: CountrySelectContextValues = {
  Country: "",
  State: "",
  setCountry: () => {},
  setRegion: () => {}
};

export const CountrySelectContext = createContext(defaultContextValues);

const CountrySelectProvider = (props: Props) => {
  const [Country, selectCountry] = useState("");
  const [State, selectRegion] = useState("");

  const setCountry = (param: string) => {
    selectCountry(param);
  };
  const setRegion = (param: string) => {
    selectRegion(param);
  };

  return (
    <CountrySelectContext.Provider
      value={{ setCountry, setRegion, Country, State }}
    >
      {props.children}
    </CountrySelectContext.Provider>
  );
};

export default CountrySelectProvider;
