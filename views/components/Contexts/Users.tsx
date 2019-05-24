
import React from "react";
import { QueryResult } from "react-apollo";

import {
  UsersComponent,
  UsersQuery,
  UsersVariables
} from "../../../typeDefinitions/__generated__/components";

interface Props {
  domainId: string;
  children: React.ReactNode;
}

export const UsersContext = React.createContext<
  QueryResult<UsersQuery, UsersVariables> | undefined
>((undefined as any) as QueryResult<UsersQuery, UsersVariables>);

const UsersProvider = (props: Props) => {
  const { domainId } = props;
  if (domainId) {
    return (
      <UsersComponent variables={{ domainId: domainId }} >
        {result => {
          return (
            <UsersContext.Provider value={result}>
              {props.children}
            </UsersContext.Provider>
          );
        }}
      </UsersComponent>
    );
  }
  return (
    <UsersContext.Provider value={undefined}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
