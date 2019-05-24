import * as React from "react";
import classnames from "classnames";
import flow from "lodash/fp/flow";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { NamespacesConsumer } from "react-i18next";

import CowLogoWhite from "../UI/Icons/CowLogoWhite";
import routePaths from "../../../constants/routePaths";
import localeNamespaceKeys from "../../../constants/localization";
import { DomainsContext } from "../Contexts/Domains";
import WalletProvider from "../Contexts/Wallet";
import WalletSection from "./WalletSection";

import { extractApolloData, extractDomains } from "../../../utils";
import { ProductsExistContext } from "../Contexts/ProductsExist";

interface Props extends RouteComponentProps<{ domainId: string }> {
  isMenuOpen?: boolean;
}
const Navigation = ({ isMenuOpen, match }: Props) => {
  const { domainId } = match.params;
  const domainsResult = React.useContext(DomainsContext);
  const { productsExist } = React.useContext(ProductsExistContext);

  const domains = flow(
    () => extractApolloData(domainsResult, "domains"),
    extractDomains
  )();
  const currentDomain = domains.find(domain => domain.id === domainId);

  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.navigation._name]}>
      {(t, { ready }) =>
        ready && (
          <div className={classnames({ nav: true, "nav-slider": isMenuOpen })}>
            <div className="nav-inner">
              <div className="nav-inner-top">
                <div className="logo">
                  <CowLogoWhite />
                </div>
              </div>

              <div className="nav-inner-middle">
                <section className="nav-inner-middle-menu-container">
                  <span className="nav-label">
                    {t(`${localeNamespaceKeys.navigation.menu}`)}
                  </span>

                  {productsExist && (
                    <NavLink
                      to={routePaths.getDashboardPath(domainId)}
                      className="nav-link"
                    >
                      <span className="nav-link-inner">
                        {t(`${localeNamespaceKeys.navigation.dashboard}`)}
                      </span>
                    </NavLink>
                  )}
                  <NavLink
                    to={routePaths.catalog.getBaseBath(domainId)}
                    className="nav-link"
                  >
                    <span className="nav-link-inner">
                      {t(`${localeNamespaceKeys.navigation.catalog}`)}
                    </span>
                  </NavLink>
                  <NavLink
                    to={routePaths.orders.getBasePath(domainId)}
                    className="nav-link"
                  >
                    <span className="nav-link-inner">
                      {t(`${localeNamespaceKeys.navigation.orders}`)}
                    </span>
                  </NavLink>
                  <NavLink
                    to={routePaths.settings.getBaseBath(domainId)}
                    className="nav-link"
                  >
                    <span className="nav-link-inner">
                      {t(`${localeNamespaceKeys.navigation.settings}`)}
                    </span>
                  </NavLink>
                </section>
              </div>
              <WalletProvider domainId={domainId}>
                <WalletSection currentDomain={currentDomain} />
              </WalletProvider>

              <div className="nav-inner-bottom">
                <p className="copyright">
                  &#169; {t(`${localeNamespaceKeys.navigation.copyRight}`)}
                </p>
                <p className="subtext">
                  {t(`${localeNamespaceKeys.navigation.companyDescription}`)}
                </p>
              </div>
            </div>
          </div>
        )
      }
    </NamespacesConsumer>
  );
};

// TODO: replace with hook when available
export default withRouter(Navigation);
