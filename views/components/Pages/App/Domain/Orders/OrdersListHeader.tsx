import React from "react";
import { NamespacesConsumer } from "react-i18next";

import localeNamespaceKeys from "../../../../../../constants/localization";
import { orderingProperties } from "../Orders";

interface Props {
  changeSort: () => void;
  orderBy: string;
}

// TODO: localization
const OrdersListHeader = ({ changeSort, orderBy }: Props) => {
  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.orders._name]}>
      {(t, { ready }) =>
        ready && (
          <div className="table-headers-wrapper">
            <div className="table-headers table-row row-collection">
              <div
                className="table-header table-row-item hover-hand"
                onClick={changeSort}
              >
                {t(
                  `${localeNamespaceKeys.orders.orders._name}.${
                    localeNamespaceKeys.orders.orders.orderNumber
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
                {t(
                  `${localeNamespaceKeys.orders.orders._name}.${
                    localeNamespaceKeys.orders.orders.customer
                  }`
                )}
              </div>
              <div className="table-header table-row-item">
                {t(
                  `${localeNamespaceKeys.orders.orders._name}.${
                    localeNamespaceKeys.orders.orders.campaign
                  }`
                )}
              </div>
              <div className="table-header table-row-item">
                {t(
                  `${localeNamespaceKeys.orders.orders._name}.${
                    localeNamespaceKeys.orders.orders.status
                  }`
                )}
              </div>
              <div className="table-header table-row-item">
                {t(
                  `${localeNamespaceKeys.orders.orders._name}.${
                    localeNamespaceKeys.orders.orders.total
                  }`
                )}
              </div>
            </div>
          </div>
        )
      }
    </NamespacesConsumer>
  );
};

export default OrdersListHeader;
