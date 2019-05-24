import React from "react";
import isEmpty from "lodash/fp/isEmpty";
import { withRouter, RouteComponentProps } from "react-router";

import { ProductsComponent } from "../../../typeDefinitions/__generated__/components";

interface Props extends RouteComponentProps<{ domainId: string }> {
  children: React.ReactNode;
}

export const ProductsExistContext = React.createContext<{
  refetch: () => void;
  productsExist: boolean;
}>({ productsExist: false, refetch: () => {} });

export const DomainsConsumer = ProductsExistContext.Consumer;

// TODO: add refetch when products import
const ProductsExistProvider = (props: Props) => {
  const { domainId } = props.match.params;

  return domainId ? (
    <ProductsComponent variables={{ domainId, first: 1 }}>
      {({ data, refetch }) => {
        const productsExist =
          (data &&
            data.node &&
            data.node.products &&
            data.node.products.edges &&
            !isEmpty(data.node.products.edges)) ||
          false;

        return (
          <ProductsExistContext.Provider value={{ productsExist, refetch }}>
            {props.children}
          </ProductsExistContext.Provider>
        );
      }}
    </ProductsComponent>
  ) : null;
};

export default withRouter(ProductsExistProvider);
