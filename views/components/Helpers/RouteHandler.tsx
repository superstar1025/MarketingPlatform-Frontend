import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import isEmpty from "lodash/fp/isEmpty";

import routePaths from "../../../constants/routePaths";
import { RouteRenderProp } from "../../../constants/genericTypes";
import { AuthTokenContext } from "../Contexts/Auth";
import { DomainsContext } from "../Contexts/Domains";
import { getDomainsFromApolloResult } from "../../../utils";

interface IRouteHandlerProps {
  isProtected: boolean;
  exact: boolean;
  path: string;
  component: React.ComponentType<any>;
}

type RouteHandler = (props: IRouteHandlerProps) => React.ReactElement<any>;

const RouteHandler: RouteHandler = ({
  isProtected,
  path,
  component: RenderedComponent,
  ...rest
}) => {
  const { token } = React.useContext(AuthTokenContext);
  const domainsResult = React.useContext(DomainsContext);
  const domains = getDomainsFromApolloResult(domainsResult);

  const renderProp: RouteRenderProp = props => {
    if (!token && isProtected) {
      return (
        <div data-testid="redirect">
          <Redirect
            to={{
              pathname: routePaths.auth.login,
              state: { from: props.location }
            }}
          />
        </div>
      );
    }
    if (domainsResult && isEmpty(domains)) {
      return <Redirect to={routePaths.domains.stores} />;
    }
    return <RenderedComponent {...props} {...rest} />;
  };

  return <Route {...rest} path={path} render={renderProp} />;
};

export default RouteHandler;
