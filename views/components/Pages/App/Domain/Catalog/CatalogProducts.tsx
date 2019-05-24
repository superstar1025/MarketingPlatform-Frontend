import React from "react";
import { Switch, Route } from "react-router-dom";

import CatalogProduct from "./CatalogProducts/ProductDetails";
import routePaths from "../../../../../../constants/routePaths";
import ProductsList from "./CatalogProducts/ProductsList";
import CreateProduct from "./CreateProduct";

const CatalogProducts = () => {
  return (
    <Switch>
      <Route
        exact={false}
        path={routePaths.catalog.product}
        component={CatalogProduct}
      />
      <Route
        path={routePaths.catalog.create}
        exact={true}
        component={CreateProduct}
      />
      <Route
        exact={true}
        path={routePaths.catalog.products}
        component={ProductsList}
      />
    </Switch>
  );
};

export default CatalogProducts;
