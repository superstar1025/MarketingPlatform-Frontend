import React from "react";
import classnames from "classnames";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

import Navigation from "./Navigation";
import { DomainsContext } from "../Contexts/Domains";
import { getDomainsFromApolloResult } from "../../../utils";
import { MODAL_TYPES } from "../../../constants/modals";
import { ModalContext } from "../Contexts/Modals";
import routePaths from "../../../constants/routePaths";
import NoAccessPage from "./NoAccessPage";
import { AuthTokenContext } from "../Contexts/Auth";
import OpenArrows from "../UI/Icons/OpenArrows";
import { history } from "../../..";

export const catalogTestIds = {
  catalog: "catalog"
};

const {
  UikTopBarSection,
  UikTopBarTitle,
  UikTopBar,
  UikDropdownItem,
  UikDropdown,
  UikNavBurger,
  UikButton
} = require("../../../@uik");

interface Props extends RouteComponentProps<{ domainId: string }> {
  className?: string;
  title?: React.ReactNode;
  userActionTopBar?: React.ReactNode;
  children: React.ReactNode;
}

const Layout = ({
  className,
  title,
  userActionTopBar,
  children,
  match
}: Props) => {
  const [isMenuOpen, toggleMenu] = React.useState(false);
  const domainsResult = React.useContext(DomainsContext);
  const { toggleModalType } = React.useContext(ModalContext);
  const { logout } = React.useContext(AuthTokenContext);

  const { domainId } = match.params;
  const domains = getDomainsFromApolloResult(domainsResult);
  const currentDomain = domains.find(domain => domain.id === domainId);
  const domainDropdownItems = domains.filter(domain => domain.id !== domainId);

  if (currentDomain) {
    return (
      <div
        className={classnames("app-page", "page", className)}
        data-testid={catalogTestIds.catalog}
      >
        {userActionTopBar}
        <Navigation isMenuOpen={isMenuOpen} />
        <div
          className={classnames({
            "page-container": true,
            "container-slider": isMenuOpen
          })}
        >
          <UikTopBar className="layout-top-bar">
            <UikTopBarSection>
              <UikNavBurger
                className="nav-burger"
                isOpen={isMenuOpen}
                onClick={() => toggleMenu(!isMenuOpen)}
              />
              <UikTopBarTitle className="top-bar-title">{title}</UikTopBarTitle>
            </UikTopBarSection>
            <UikTopBarSection className="top-bar-buttons-right">
              <UikDropdown
                className="domain-drop-down"
                DisplayComponent={({ onClick }: { onClick: () => void }) => (
                  <UikButton onClick={onClick}>
                    {currentDomain.company ? (
                      <span className="subtext">
                        {currentDomain.company.name}:&nbsp;
                      </span>
                    ) : null}
                    <span>{currentDomain.label}</span>
                    <OpenArrows />
                  </UikButton>
                )}
                position="bottomRight"
              >
                {domainDropdownItems.map(domain => (
                  <UikDropdownItem
                    key={domain.id}
                    onClick={() =>
                      history.push(routePaths.getDashboardPath(domain.id))
                    }
                  >
                    {domain.company ? (
                      <span className="subtext">
                        {domain.company.name}:&nbsp;
                      </span>
                    ) : null}
                    <span>{domain.label}</span>
                  </UikDropdownItem>
                ))}

                <UikDropdownItem
                  className="space-between"
                  onClick={() => {
                    toggleModalType(MODAL_TYPES.CREATE_STORE, {
                      refetchDomains: domainsResult
                        ? domainsResult.refetch
                        : () => {}
                    });
                  }}
                >
                  <i className="icofont-plus" />
                  &nbsp;
                  <span>Add another store</span>
                </UikDropdownItem>
              </UikDropdown>
              <UikButton onClick={logout}>Logout</UikButton>
            </UikTopBarSection>
          </UikTopBar>
          <div
            className={classnames({
              "main-container": true
            })}
          >
            <div className="main-container-inner">{children}</div>
          </div>
        </div>
      </div>
    );
  }
  return <NoAccessPage />;
};

// TODO: change to hooks when available
export default withRouter(Layout);
