import * as React from "react";
import { Switch } from "react-router-dom";

import RouteHandler from "./views/components/Helpers/RouteHandler";
import routePaths from "./constants/routePaths";
import Authentication from "./views/components/Pages/Authentication";
import App from "./views/components/Pages/App";
import CreateDomain from "./views/components/Pages/App/CreateDomain";
import DomainListing from "./views/components/Pages/App/DomainListing";
import Domain from "./views/components/Pages/App/Domain";

type Routes = () => React.ReactElement<any>;

const Routes: Routes = () => {
  return (
    <Switch>
      <RouteHandler
        path={routePaths.home}
        exact={true}
        isProtected={true}
        component={App}
      />
      <RouteHandler
        path={routePaths.auth.base}
        exact={false}
        isProtected={false}
        component={Authentication}
      />
      <RouteHandler
        path={routePaths.domains.create}
        exact={true}
        isProtected={true}
        component={CreateDomain}
      />
      <RouteHandler
        path={routePaths.domains.stores}
        exact={true}
        isProtected={true}
        component={DomainListing}
      />
      <RouteHandler
        path={routePaths.domains.base}
        exact={false}
        isProtected={true}
        component={Domain}
      />
    </Switch>
  );
};

export default Routes;
