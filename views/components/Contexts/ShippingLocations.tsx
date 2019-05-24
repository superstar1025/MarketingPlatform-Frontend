import React from "react";
import { QueryResult } from "react-apollo";

import {
  ShippingLocationsComponent,
  ShippingLocationsQuery,
  ShippingLocationsVariables
} from "../../../typeDefinitions/__generated__/components";

interface Props {
  domainId: string;
  children: React.ReactNode;
}

export const ShippingLocationsContext = React.createContext<
  QueryResult<ShippingLocationsQuery, ShippingLocationsVariables> | undefined
>((undefined as any) as QueryResult<ShippingLocationsQuery, ShippingLocationsVariables>);

const ShippingLocationsProvider = (props: Props) => {
  const { domainId } = props;
  if (domainId) {
    return (
      <ShippingLocationsComponent variables={{ id: domainId }} >
        {result => {
          return (
            <ShippingLocationsContext.Provider value={result}>
              {props.children}
            </ShippingLocationsContext.Provider>
          );
        }}
      </ShippingLocationsComponent>
    );
  }
  return (
    <ShippingLocationsContext.Provider value={undefined}>
      {props.children}
    </ShippingLocationsContext.Provider>
  );
};

export default ShippingLocationsProvider;
