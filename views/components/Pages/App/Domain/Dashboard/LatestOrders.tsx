import React from "react";
import { Link } from "react-router-dom";
import { NamespacesConsumer } from "react-i18next";
import isEmpty from "lodash/fp/isEmpty";
import localeNamespaceKeys from "../../../../../../constants/localization";
import Loading from "../../../../Helpers/Loading";
import StatusBadge from "../../../../Helpers/StatusBadge";


import routePaths from "../../../../../../constants/routePaths";
import { getFormattedPrice } from "../../../../../../utils/price";
import {
  LatestOrdersComponent,
  LatestOrdersEdges
} from "../../../../../../typeDefinitions/__generated__/components";


const {
  UikWidget,
  UikWidgetHeader,
  UikButton,
  UikWidgetContent,
  UikWidgetTable,
} = require("../../../../../../@uik");

interface LatestOrdersProps {
  domainId: string;
}

const LatestOrders = ({ domainId }: LatestOrdersProps) => {
  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.dashboard._name]}>
      {(t) =>
        <UikWidget className="latest-orders">
          <UikWidgetHeader
            rightEl={
              <UikButton
                clear
                icon={<i className="icofont-long-arrow-right" />}
                iconRight
                Component={Link}
                to={routePaths.orders.getBasePath(domainId)}
              >
                {t(`${localeNamespaceKeys.dashboard.viewAllOrders}`)}
              </UikButton>
            }
          >
            {t(`${localeNamespaceKeys.dashboard.latestOrders}`)}
          </UikWidgetHeader>
          <LatestOrdersComponent variables={{ domainId, last: 10 }}>
            {initialResult => {
              if (initialResult.loading) {
                return (
                  <UikWidgetContent className="loading-container">
                    <Loading />
                  </UikWidgetContent>
                );
              }
              const initialLatestOrders: LatestOrdersEdges[] | undefined | null =
                initialResult.data &&
                initialResult.data.node &&
                initialResult.data.node.orders &&
                initialResult.data.node.orders.edges;
              if (!initialLatestOrders || isEmpty(initialLatestOrders)) {
                return (
                  <UikWidgetContent
                    className="no-latest-order"
                  >
                    {t(`${localeNamespaceKeys.dashboard.noOrdersHaveBeenPlaced}`)}
                  </UikWidgetContent>
                );
              }
              return (
                <div className="latest-orders-table">
                  <UikWidgetTable>
                    <tbody>
                      {initialLatestOrders.map((order: LatestOrdersEdges) => {
                        if (order.node) {
                          const { id, customerName, orderStatus, stripeId, orderTotal } = order.node;
                          return (
                            <tr key={id}>
                              <td>
                                <span>{customerName}</span>
                                <p>{stripeId}</p>
                              </td>
                              <td>
                                <StatusBadge status={orderStatus} />
                              </td>
                              <td>
                                {getFormattedPrice(orderTotal)}
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </UikWidgetTable>
                </div>
              );
            }}
          </LatestOrdersComponent>
        </UikWidget>
      }
    </NamespacesConsumer>
  );
};

export default LatestOrders;
