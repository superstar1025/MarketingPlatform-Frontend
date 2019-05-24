import React, { PureComponent } from "react";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import routePaths from "../../../../../constants/routePaths";

class Catalog extends PureComponent<RouteComponentProps<{ domainId: string }>> {
  render() {
    const { domainId } = this.props.match.params;
    return <Redirect to={routePaths.catalog.getProductsListPath(domainId)} />;
  }
}

// TODO: change to hook when its available
export default withRouter(Catalog);
