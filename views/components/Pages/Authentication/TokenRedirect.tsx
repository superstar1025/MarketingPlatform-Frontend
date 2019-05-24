import React from "react";
import { Redirect } from "react-router";

import { AuthTokenContext } from "../../Contexts/Auth";
import { DomainsContext } from "../../Contexts/Domains";

const TokenRedirect = (props: { token: string; pathname: string }) => {
  const { login } = React.useContext(AuthTokenContext);
  const domainsResult = React.useContext(DomainsContext);

  if (props.token) {
    login(props.token);
    if (domainsResult) {
      domainsResult.refetch();
    }
    return <Redirect to={props.pathname} />;
  }
  return null;
};

export default TokenRedirect;
