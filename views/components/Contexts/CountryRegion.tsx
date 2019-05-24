import React, { createContext, useState, ReactNode } from "react";
import countryData from "country-region-data";

export interface CountrySelectContextValues {
  Country: Array<Object>;
}

interface Props {
  children: ReactNode;
}

const defaultContextValues: CountrySelectContextValues = {
  Country: []
};

export const CountryRegionContext = createContext(defaultContextValues);

const CountryRegionProvider = (props: Props) => {
  let countryOptions = [];
  for(let i=0; i<countryData.length; i++) {
    const item = countryData[i];
    countryOptions.push({label: item.countryName, value: item.countryName})
  }
  const [Country] = useState(countryOptions);
  console.log(Country);

  return (
    <CountryRegionContext.Provider
      value={{ Country }}
    >
      {props.children}
    </CountryRegionContext.Provider>
  );
}

export default CountryRegionProvider;
