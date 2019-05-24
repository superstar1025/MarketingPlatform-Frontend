import React from "react";
import { NamespacesConsumer } from "react-i18next";

import OrderStatusFilters from "../../../constants/orderStatusFilters";
import localeNamespaceKeys from "../../../constants/localization";

interface IProps {
  status?: number;
}

type StatusBadge = (props: IProps) => React.ReactElement<any> | null;

const StatusBadge: StatusBadge = ({ status }) => {
  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.orders._name]}>
      {(t, { ready }) => {
        if (ready) {
          switch (status) {
            case OrderStatusFilters.COMPLETED:
              return (
                <span className="status completed">
                  {t(
                    `${localeNamespaceKeys.orders.orders._name}.${
                      localeNamespaceKeys.orders.orders.completed
                    }`
                  )}
                </span>
              );
            case OrderStatusFilters.CANCELLED:
              return (
                <span className="status cancelled">
                  {t(
                    `${localeNamespaceKeys.orders.orders._name}.${
                      localeNamespaceKeys.orders.orders.cancelled
                    }`
                  )}
                </span>
              );
            case OrderStatusFilters.REFUNDED:
              return (
                <span className="status refunded">
                  {t(
                    `${localeNamespaceKeys.orders.orders._name}.${
                      localeNamespaceKeys.orders.orders.refunded
                    }`
                  )}
                </span>
              );
            default:
              return (
                <span className="status pending">
                  {t(
                    `${localeNamespaceKeys.orders.orders._name}.${
                      localeNamespaceKeys.orders.orders.pending
                    }`
                  )}
                </span>
              );
          }
        }
      }}
    </NamespacesConsumer>
  );
};

export default StatusBadge;
