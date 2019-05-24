import React from "react";
import { NamespacesConsumer } from "react-i18next";
import { withRouter, RouteComponentProps } from "react-router-dom";

import localeNamespaceKeys from "../../../../../../constants/localization";
import routePaths from "../../../../../../constants/routePaths";
import { history } from "../../../../../..";

const { UikButton } = require("../../../../../../@uik");

const OrdersEmpty = ({ match }: RouteComponentProps<{ domainId: string }>) => {
  const { domainId } = match.params;
  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.orders._name]}>
      {(t, { ready }) =>
        ready && (
          <div className="catalog-empty">
            <div className="catalog-empty-emoji">
              {t(
                `${localeNamespaceKeys.orders.empty._name}.${
                  localeNamespaceKeys.orders.empty.emoji
                }`
              )}
            </div>
            <div className="catalog-empty-headers">
              <h2 className="uik-headline__wrapper">
                {t(
                  `${localeNamespaceKeys.orders.empty._name}.${
                    localeNamespaceKeys.orders.empty.header
                  }`
                )}
              </h2>
              <p className="uik-headline-desc__wrapper">
                {t(
                  `${localeNamespaceKeys.orders.empty._name}.${
                    localeNamespaceKeys.orders.empty.subheader
                  }`
                )}
              </p>
            </div>
            <div className="catalog-empty-buttons">
              <UikButton
                success
                onClick={() =>
                  history.push(
                    routePaths.catalog.getCreateProductPath(domainId)
                  )
                }
              >
                {t(
                  `${localeNamespaceKeys.orders.empty._name}.${
                    localeNamespaceKeys.orders.empty.createProduct
                  }`
                )}
              </UikButton>
            </div>
          </div>
        )
      }
    </NamespacesConsumer>
  );
};

export default withRouter(OrdersEmpty);
