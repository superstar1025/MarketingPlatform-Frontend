import * as React from "react";
import { Redirect, withRouter, RouteComponentProps } from "react-router";
import isEmpty from "lodash/fp/isEmpty";

import routePaths from "../../../constants/routePaths";
import { DomainsContext } from "../Contexts/Domains";
import { getDomainsFromApolloResult } from "../../../utils";

interface ITestIds {
  home: string;
}

export const appTestIds: ITestIds = {
  home: "home"
};

const App = ({ match }: RouteComponentProps<{ domainId: string }>) => {
  const domainsResult = React.useContext(DomainsContext);
  const { domainId } = match.params;
  const domains = getDomainsFromApolloResult(domainsResult);

  if (domainsResult && !domainId && domains && isEmpty(domains)) {
    return <Redirect to={routePaths.domains.stores} />;
  }

  if (domainsResult && !domainId && domains && domains.length === 1) {
    const id = domains[0] && domains[0].id;
    return <Redirect to={routePaths.catalog.getProductsListPath(id)} />;
  }

  if (domainsResult && !domainId && domains && domains.length > 1) {
    return <Redirect to={routePaths.domains.stores} />;
  }

  return (
    <div className="page" data-testid={appTestIds.home}>
      <Redirect to={routePaths.catalog.getProductsListPath(domainId)} />
    </div>
  );
};

// TODO: change to hook when its available
export default withRouter(App);
