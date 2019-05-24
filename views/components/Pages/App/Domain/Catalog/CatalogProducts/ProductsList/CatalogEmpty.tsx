import React from "react";
import { NamespacesConsumer } from "react-i18next";
import { withRouter, RouteComponentProps } from "react-router-dom";

import localeNamespaceKeys from "../../../../../../../../constants/localization";
import routePaths from "../../../../../../../../constants/routePaths";
import { history } from "../../../../../../../..";

const {
  UikEmojiHeadline,
  UikButton,
  UikHeadline,
  UikHeadlineDesc
} = require("../../../../../../../../@uik");

const CatalogEmpty = ({ match }: RouteComponentProps<{ domainId: string }>) => {
  const { domainId } = match.params;
  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.catalog._name]}>
      {(t, { ready }) =>
        ready && (
          <div className="catalog-empty">
            <UikEmojiHeadline
              emoji={t(
                `${localeNamespaceKeys.catalog.empty._name}.${
                  localeNamespaceKeys.catalog.empty.emoji
                }`
              )}
            />
            <UikHeadline>
              {t(
                `${localeNamespaceKeys.catalog.empty._name}.${
                  localeNamespaceKeys.catalog.empty.header
                }`
              )}
            </UikHeadline>

            <UikHeadlineDesc>
              {t(
                `${localeNamespaceKeys.catalog.empty._name}.${
                  localeNamespaceKeys.catalog.empty.subheader
                }`
              )}
            </UikHeadlineDesc>

            <UikButton
              success
              onClick={() =>
                history.push(routePaths.catalog.getCreateProductPath(domainId))
              }
            >
              {t(
                `${localeNamespaceKeys.catalog.empty._name}.${
                  localeNamespaceKeys.catalog.empty.createProduct
                }`
              )}
            </UikButton>
          </div>
        )
      }
    </NamespacesConsumer>
  );
};

// TODO: change to hook when its available
export default withRouter(CatalogEmpty);
