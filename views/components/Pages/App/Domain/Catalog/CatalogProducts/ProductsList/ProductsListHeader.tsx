import React from "react";
import { NamespacesConsumer } from "react-i18next";

import localeNamespaceKeys from "../../../../../../../../constants/localization";
import { orderingProperties } from "../ProductsList";

interface Props {
  changeSort: () => void;
  orderBy: string;
}

// TODO: localization
const ProductsListHeader = ({ changeSort, orderBy }: Props) => {
  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.catalog._name]}>
      {(t, { ready }) =>
        ready && (
          <div className="table-headers-wrapper">
            <div className="table-headers table-row">
              <div className="table-header table-row-item" />
              <div
                className="table-header table-row-item hover-hand"
                onClick={changeSort}
              >
                {t(
                  `${localeNamespaceKeys.catalog.products._name}.${
                    localeNamespaceKeys.catalog.products.product
                  }`
                )}
                {orderBy === orderingProperties.alphabetical && (
                  <i className="icofont-caret-down" />
                )}
                {orderBy === orderingProperties.reverseAlphabetical && (
                  <i className="icofont-caret-up" />
                )}
              </div>
              <div className="table-header table-row-item">
                Active Campaigns
              </div>
              <div className="table-header table-row-item">
                {/* {t(
                `${localeNamespaceKeys.catalog.products._name}.${
                  localeNamespaceKeys.catalog.products.price
                }`
              )} */}
                Inventory
              </div>
            </div>
          </div>
        )
      }
    </NamespacesConsumer>
  );
};

export default ProductsListHeader;
