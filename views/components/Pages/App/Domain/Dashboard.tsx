import React from "react";
import { withRouter, RouteComponentProps, Redirect } from "react-router";
import { NamespacesConsumer } from "react-i18next";

import localeNamespaceKeys from "../../../../../constants/localization";

import Layout from "../../../Helpers/Layout";
import { ProductsExistContext } from "../../../Contexts/ProductsExist";
import routePaths from "../../../../../constants/routePaths";
import SellerOverview from "./Dashboard/SellerOverview";
import LatestOrders from "./Dashboard/LatestOrders";

export const dashboardTestIds = {
  dashboard: "dashboard"
};

const Dashboard = (props: RouteComponentProps<{ domainId: string }>) => {
  const { productsExist } = React.useContext(ProductsExistContext);
  const { domainId } = props.match.params;
  if (!productsExist) {
    return <Redirect to={routePaths.catalog.getProductsListPath(domainId)} />;
  }
  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.dashboard._name]}>
      {(t) =>
        <Layout title={t(`${localeNamespaceKeys.dashboard.title}`)} className="dashboard">
          <SellerOverview />
          <LatestOrders domainId={domainId} />
        </Layout>
      }
    </NamespacesConsumer>
  );
};

export default withRouter(Dashboard);
