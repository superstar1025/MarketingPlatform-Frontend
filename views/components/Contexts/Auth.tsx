import React from "react";

import { ELLIOT_TOKEN } from "../../../constants/authentication";
import { withApollo, WithApolloClient } from "react-apollo";
import { history } from "../../..";
import routePaths from "../../../constants/routePaths";

interface AuthTokenProps {
  children: React.ReactNode;
}
type Props = WithApolloClient<AuthTokenProps>;

// TODO: make this better...try the example below...and use verify token mutation
// https://medium.com/@kamenminkov.com/authentication-flow-with-apollo-and-react-bfc5b86d19c2
export const AuthTokenContext = React.createContext<{
  token: string | null;
  login: (t: string) => void;
  logout: () => void;
}>({
  token: "",
  login: (t: string) => {},
  logout: () => {}
});

const AuthTokenProvider = (props: Props) => {
  const [token, setAuthToken] = React.useState(
    localStorage.getItem(ELLIOT_TOKEN)
  );

  const login = (token: string) => {
    setAuthToken(token);
    localStorage.setItem(ELLIOT_TOKEN, token);
  };
  const logout = () => {
    setAuthToken("");
    props.client.resetStore();
    localStorage.removeItem(ELLIOT_TOKEN);
    history.push(routePaths.auth.login);
  };

  return (
    <AuthTokenContext.Provider value={{ token, login, logout }}>
      {props.children}
    </AuthTokenContext.Provider>
  );
};

export default withApollo(AuthTokenProvider);
