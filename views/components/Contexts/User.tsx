import React from "react";

import {
  UserQuery,
  UserVariables,
  UserComponent
} from "../../../typeDefinitions/__generated__/components";
import { QueryResult } from "react-apollo";
import { AuthTokenContext } from "./Auth";

type Props = { children: React.ReactNode };

export const UserContext = React.createContext<
  QueryResult<UserQuery, UserVariables> | undefined
>((undefined as any) as QueryResult<UserQuery, UserVariables>);

export const UserConsumer = UserContext.Consumer;

const UserProvider = (props: Props) => {
  const { token } = React.useContext(AuthTokenContext);
  if (token) {
    return (
      <UserComponent>
        {result => {
          return (
            <UserContext.Provider value={result}>
              {props.children}
            </UserContext.Provider>
          );
        }}
      </UserComponent>
    );
  }
  return (
    <UserContext.Provider value={undefined}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
