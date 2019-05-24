import React from "react";
import { Switch, Route } from "react-router-dom";

import routePaths from "../../../../constants/routePaths";
import CatalogProducts from "./Domain/Catalog/CatalogProducts";
import Dashboard from "./Domain/Dashboard";
import Catalog from "./Domain/Catalog";
import Orders from "./Domain/Orders";
import Settings from "./Domain/Settings";
import ProductsExistProvider from "../../Contexts/ProductsExist";
import OrderDetails from "./Domain/OrderDetails";

const Domain = () => {
  return (
    <ProductsExistProvider>
      <Switch>
        <Route path={routePaths.dashboard} exact={true} component={Dashboard} />
        <Route
          path={routePaths.catalog.base}
          exact={true}
          component={Catalog}
        />
        <Route
          path={routePaths.catalog.base}
          exact={false}
          component={CatalogProducts}
        />
        <Route path={routePaths.orders.base} exact={true} component={Orders} />
        <Route
          path={routePaths.settings.base}
          exact={true}
          component={Settings}
        />
        <Route path={routePaths.orders.base} exact={true} component={Orders} />
        <Route
          path={routePaths.orders.order}
          exact={false}
          component={OrderDetails}
        />
      </Switch>
    </ProductsExistProvider>
  );
};

export default Domain;
