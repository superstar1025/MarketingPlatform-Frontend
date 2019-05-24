import React, { PureComponent } from "react";
import { NamespacesConsumer } from "react-i18next";

import OrderStatusFilters from "../../../../../../constants/orderStatusFilters";
import localeNamespaceKeys from "../../../../../../constants/localization";

const {
  UikInput,
  UikTabContainer,
  UikTabItem,
  UikTopBar,
  UikTopBarSection
} = require("../../../../../../@uik");

interface IProps {
  render: (arg0: IState) => React.ReactNode;
}

interface IState {
  orderStatusFilter: number;
  searchFilter: string;
}

class OrdersListControls extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      orderStatusFilter: OrderStatusFilters.ALL,
      searchFilter: ""
    };
  }

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ searchFilter: e.currentTarget.value });
  };

  setFilter = (filter: number) => {
    this.setState({ orderStatusFilter: filter });
  };

  render() {
    return (
      <div className="orders-list">
        <NamespacesConsumer ns={[localeNamespaceKeys.orders._name]}>
          {(t, { ready }) =>
            ready && (
              <UikTopBar className="list-controls">
                <UikTopBarSection className="list-filters orders-list-filters">
                  <UikTabContainer className="filter-tabs">
                    <UikTabItem
                      className="filter-tab"
                      active={
                        this.state.orderStatusFilter === OrderStatusFilters.ALL
                      }
                    >
                      <span
                        onClick={() => this.setFilter(OrderStatusFilters.ALL)}
                      >
                        {t(
                          `${localeNamespaceKeys.orders.orders._name}.${
                            localeNamespaceKeys.orders.orders.all
                          }`
                        )}
                      </span>
                    </UikTabItem>
                    <UikTabItem
                      className="filter-tab"
                      active={
                        this.state.orderStatusFilter ===
                        OrderStatusFilters.COMPLETED
                      }
                    >
                      <span
                        onClick={() =>
                          this.setFilter(OrderStatusFilters.COMPLETED)
                        }
                      >
                        {t(
                          `${localeNamespaceKeys.orders.orders._name}.${
                            localeNamespaceKeys.orders.orders.completed
                          }`
                        )}
                      </span>
                    </UikTabItem>
                    <UikTabItem
                      className="filter-tab"
                      active={
                        this.state.orderStatusFilter ===
                        OrderStatusFilters.CANCELLED
                      }
                    >
                      <span
                        onClick={() =>
                          this.setFilter(OrderStatusFilters.CANCELLED)
                        }
                      >
                        {t(
                          `${localeNamespaceKeys.orders.orders._name}.${
                            localeNamespaceKeys.orders.orders.cancelled
                          }`
                        )}
                      </span>
                    </UikTabItem>
                    <UikTabItem
                      className="filter-tab"
                      active={
                        this.state.orderStatusFilter ===
                        OrderStatusFilters.PENDING
                      }
                    >
                      <span
                        onClick={() =>
                          this.setFilter(OrderStatusFilters.PENDING)
                        }
                      >
                        {t(
                          `${localeNamespaceKeys.orders.orders._name}.${
                            localeNamespaceKeys.orders.orders.pending
                          }`
                        )}
                      </span>
                    </UikTabItem>
                    <UikTabItem
                      className="filter-tab"
                      active={
                        this.state.orderStatusFilter ===
                        OrderStatusFilters.REFUNDED
                      }
                    >
                      <span
                        onClick={() =>
                          this.setFilter(OrderStatusFilters.REFUNDED)
                        }
                      >
                        {t(
                          `${localeNamespaceKeys.orders.orders._name}.${
                            localeNamespaceKeys.orders.orders.refunded
                          }`
                        )}
                      </span>
                    </UikTabItem>
                  </UikTabContainer>
                </UikTopBarSection>
                <UikTopBarSection className="list-inputs orders-list-inputs">
                  <UikInput
                    icon={<i className="icofont-search-2" />}
                    iconPosition="right"
                    onChange={this.onChange}
                    placeholder={t(
                      `${localeNamespaceKeys.orders.orders._name}.${
                        localeNamespaceKeys.orders.orders.searchPlaceholder
                      }`
                    )}
                    value={this.state.searchFilter}
                  />
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

export default OrdersListControls;
