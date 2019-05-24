import React from "react";
import isEmpty from "lodash/fp/isEmpty";

import { DomainsContext } from "../../Contexts/Domains";
import { getDomainsFromApolloResult } from "../../../../utils";
import CowLogo from "../../UI/Icons/CowLogo";
import routePaths from "../../../../constants/routePaths";
import GraphQLErrors from "../../Helpers/GraphQLErrors";
import { UserContext } from "../../Contexts/User";
import { AuthTokenContext } from "../../Contexts/Auth";
import { history } from "../../../..";

const {
  UikWidget,
  UikButton,
  UikWidgetContent,
  UikFormInputGroup
} = require("../../../../@uik");

const DomainListing = () => {
  const domainsResult = React.useContext(DomainsContext);
  const userResult = React.useContext(UserContext);
  const { logout } = React.useContext(AuthTokenContext);
  const domains = getDomainsFromApolloResult(domainsResult);
  const firstName =
    userResult &&
    userResult.data &&
    userResult.data.user &&
    userResult.data.user.firstName
      ? userResult.data.user.firstName
      : null;

  return (
    <div className="widget-page-container page">
      <div>
        <CowLogo />
      </div>
      <UikWidget className="widget-page-widget">
        <UikWidgetContent className="widget-page-header-section">
          <div className="widget-page-form-header">
            Welcome back{firstName && <span>, {firstName}</span>}
          </div>
          {isEmpty(domains) && (
            <div className="light-text">No accounts exist</div>
          )}
        </UikWidgetContent>
        {domainsResult && domainsResult.error ? (
          <UikWidgetContent>
            <GraphQLErrors queryResult={domainsResult} />
          </UikWidgetContent>
        ) : (
          <React.Fragment>
            {domains.map(domain => {
              const company =
                domain && domain.company && domain.company.name
                  ? domain.company.name
                  : null;
              return (
                <UikWidgetContent key={domain.id}>
                  <div className="list-row space-between">
                    <div>
                      <div>{company && <div>{company}</div>}</div>
                      <div>
                        {domain.label && (
                          <div className="light-text">{domain.label}</div>
                        )}
                      </div>
                    </div>
                    <UikButton
                      onClick={() => {
                        history.push(
                          routePaths.catalog.getProductsListPath(domain.id)
                        );
                      }}
                    >
                      View
                    </UikButton>
                  </div>
                </UikWidgetContent>
              );
            })}
            <UikWidgetContent>
              <UikFormInputGroup>
                <UikButton
                  success
                  onClick={() => {
                    history.push(routePaths.domains.create);
                  }}
                >
                  Add another store
                </UikButton>
              </UikFormInputGroup>
              <UikFormInputGroup>
                <UikButton
                  error
                  onClick={() => {
                    logout();
                    history.push(routePaths.auth.login);
                  }}
                >
                  Logout
                </UikButton>
              </UikFormInputGroup>
            </UikWidgetContent>
          </React.Fragment>
        )}
      </UikWidget>
    </div>
  );
};

export default DomainListing;
