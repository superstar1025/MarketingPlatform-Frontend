import React from "react";
import { QueryResult } from "react-apollo";

import {
  WalletComponent,
  WalletQuery,
  WalletVariables
} from "../../../typeDefinitions/__generated__/components";
import GraphQLErrors from "../Helpers/GraphQLErrors";

interface Props {
  domainId: string;
  children: React.ReactNode;
}

export const WalletContext = React.createContext<
  QueryResult<WalletQuery, WalletVariables> | undefined
>((undefined as any) as QueryResult<WalletQuery, WalletVariables>);

export const WalletConsumer = WalletContext.Consumer;

const WalletProvider = (props: Props) => {
  const { domainId } = props;
  if (domainId) {
      <WalletComponent variables={{ id: domainId }}>
        {result => {
          return (
            <WalletContext.Provider value={result}>
              {props.children}
            </WalletContext.Provider>
          );
        }}
      </WalletComponent>
  }
  return (
    <WalletContext.Provider value={undefined}>
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
