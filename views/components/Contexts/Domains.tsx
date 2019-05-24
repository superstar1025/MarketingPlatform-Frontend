import React from "react";
import { QueryResult } from "react-apollo";

import {
  DomainsComponent,
  DomainsQuery,
  DomainsVariables
} from "../../../typeDefinitions/__generated__/components";
import { AuthTokenContext } from "./Auth";
import Loading from "../Helpers/Loading";
import GraphQLErrors from "../Helpers/GraphQLErrors";

interface Props {
  children: React.ReactNode;
}

export const DomainsContext = React.createContext<
  QueryResult<DomainsQuery, DomainsVariables> | undefined
>((undefined as any) as QueryResult<DomainsQuery, DomainsVariables>);

export const DomainsConsumer = DomainsContext.Consumer;

const DomainsProvider = (props: Props) => {
  const { token } = React.useContext(AuthTokenContext);
  if (token) {
    return (
      <DomainsComponent>
        {result => {
          if (result.loading) {
            return <Loading />;
          }
          if (result.error) {
            // TODO: replace with error page
            return <GraphQLErrors queryResult={result} />;
          }
          return (
            <DomainsContext.Provider value={result}>
              {props.children}
            </DomainsContext.Provider>
          );
        }}
      </DomainsComponent>
    );
  }
  return (
    <DomainsContext.Provider value={undefined}>
      {props.children}
    </DomainsContext.Provider>
  );
};

export default DomainsProvider;
