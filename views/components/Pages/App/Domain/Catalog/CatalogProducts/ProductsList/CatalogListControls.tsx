import React, { PureComponent } from "react";
import { NamespacesConsumer } from "react-i18next";
import { withRouter, RouteComponentProps } from "react-router-dom";

import localeNamespaceKeys from "../../../../../../../../constants/localization";
import routePaths from "../../../../../../../../constants/routePaths";
import { history } from "../../../../../../../..";

const {
  UikInput,
  UikTabContainer,
  UikTabItem,
  UikButton,
  UikTopBar,
  UikTopBarSection
} = require("../../../../../../../../@uik");

interface IProps extends RouteComponentProps<{ domainId: string }> {
  render: (arg0: IState) => React.ReactNode;
}

interface IState {
  searchFilter: string;
}

class CatalogListControls extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchFilter: ""
    };
  }
  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ searchFilter: e.currentTarget.value });
  };
  render() {
    const { domainId } = this.props.match.params;
    return (
      <div className="catalog-list">
        <NamespacesConsumer ns={[localeNamespaceKeys.catalog._name]}>
          {(t, { ready }) =>
            ready && (
              <UikTopBar className="list-controls">
                <UikTopBarSection className="list-filters catalog-list-filters">
                  <UikTabContainer className="filter-tabs">
                    <UikTabItem active className="filter-tab">
                      {t(
                        `${localeNamespaceKeys.catalog.products._name}.${
                          localeNamespaceKeys.catalog.products.all
                        }`
                      )}
                    </UikTabItem>
                  </UikTabContainer>
                </UikTopBarSection>
                <UikTopBarSection className="list-inputs catalog-list-inputs">
                  <UikInput
                    icon={<i className="icofont-search-2" />}
                    iconPosition="right"
                    onChange={this.onChange}
                    placeholder={t(
                      `${localeNamespaceKeys.catalog.products._name}.${
                        localeNamespaceKeys.catalog.products.searchPlaceholder
                      }`
                    )}
                    value={this.state.searchFilter}
                  />
                  <div>
                    <UikButton
                      success
                      onClick={() =>
                        history.push(
                          routePaths.catalog.getCreateProductPath(domainId)
                        )
                      }
                    >
                      {t(
                        `${localeNamespaceKeys.catalog.empty._name}.${
                          localeNamespaceKeys.catalog.empty.createProduct
                        }`
                      )}
                    </UikButton>
                  </div>
                </UikTopBarSection>
              </UikTopBar>
            )
          }
        </NamespacesConsumer>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// TODO: change to hook when its available
export default withRouter(CatalogListControls);
