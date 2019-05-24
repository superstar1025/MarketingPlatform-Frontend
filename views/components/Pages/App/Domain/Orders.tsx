import * as React from "react";
import { NamespacesConsumer } from "react-i18next";
import isEmpty from "lodash/fp/isEmpty";

import OrdersEmpty from "./Orders/OrdersEmpty";
import OrderStatusFilters from "../../../../../constants/orderStatusFilters";

import OrdersListControls from "./Orders/OrdersListControls";
import GraphQLErrors from "../../../Helpers/GraphQLErrors";
import Layout from "../../../Helpers/Layout";
import localeNamespaceKeys from "../../../../../constants/localization";
import Loading from "../../../Helpers/Loading";
import { withRouter, RouteComponentProps } from "react-router";
import {
  OrdersComponent,
  OrdersQuery
} from "../../../../../typeDefinitions/__generated__/components";
import WindowedList from "../../../Helpers/WindowedList";
import OrdersListHeader from "./Orders/OrdersListHeader";
import OrdersListRow from "./Orders/OrdersListRow";

interface Props extends RouteComponentProps<{ domainId: string }> {}

// TODO: localization
export const orderingProperties = {
  alphabetical: "stripeId",
  reverseAlphabetical: "-stripeId"
};

const Orders = ({ match }: Props) => {
  const [orderBy, setOrderBy] = React.useState(orderingProperties.alphabetical);
  const { domainId } = match.params;

  const sort = () => {
    if (orderBy === orderingProperties.alphabetical) {
      setOrderBy(orderingProperties.reverseAlphabetical);
    } else {
      setOrderBy(orderingProperties.alphabetical);
    }
  };

  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.orders._name]}>
      {(t, { ready }) =>
        ready && (
          <OrdersComponent
            variables={{
              first: 1,
              domainId
            }}
          >
            {initialResult => {
              if (initialResult.loading) {
                return (
                  <Layout>
                    <Loading />
                  </Layout>
                );
              }

              if (initialResult.error) {
                return (
                  <Layout title="Orders">
                    <GraphQLErrors queryResult={initialResult} />
                  </Layout>
                );
              }
              const initialOrders =
                (initialResult.data &&
                  initialResult.data.node &&
                  initialResult.data.node.orders &&
                  initialResult.data.node.orders.edges) ||
                [];

              if (isEmpty(initialOrders)) {
                return (
                  <Layout title="Orders">
                    <OrdersEmpty />
                  </Layout>
                );
              }
              return (
                orderBy && (
                  <Layout className="orders-page" title="Manage your orders">
                    <OrdersListControls
                      render={({ orderStatusFilter, searchFilter }) => (
                        <OrdersComponent
                          variables={{
                            first: 10,
                            orderStatusFilter:
                              searchFilter !== "" ||
                              orderStatusFilter === OrderStatusFilters.ALL
                                ? null
                                : orderStatusFilter,
                            searchFilter,
                            orderBy,
                            domainId
                          }}
                        >
                          {result => {
                            if (result.loading) {
                              return <Loading />;
                            }

                            if (result.error) {
                              return <GraphQLErrors queryResult={result} />;
                            }
                            const orders =
                              (result.data &&
                                result.data.node &&
                                result.data.node.orders &&
                                result.data.node.orders.edges) ||
                              [];
                            const hasNextPage =
                              (result.data &&
                                result.data.node &&
                                result.data.node.orders &&
                                result.data.node.orders.pageInfo &&
                                result.data.node.orders.pageInfo.hasNextPage) ||
                              false;
                            if (!isEmpty(orders)) {
                              const cursor =
                                result.data &&
                                result.data.node &&
                                result.data.node.orders &&
                                result.data.node.orders.pageInfo.endCursor;
                              return (
                                <WindowedList
                                  rowComponent={OrdersListRow}
                                  headerComponent={() => (
                                    <OrdersListHeader
                                      changeSort={sort}
                                      orderBy={orderBy}
                                    />
                                  )}
                                  isNextPageLoading={result.loading}
                                  hasNextPage={hasNextPage}
                                  items={orders}
                                  loadNextPage={(
                                    startIndex: number,
                                    stopIndex: number
                                  ) => {
                                    return result.fetchMore({
                                      variables: {
                                        first: 10,
                                        cursor,
                                        orderStatusFilter,
                                        searchFilter,
                                        orderBy
                                      },
                                      updateQuery: (
                                        previousQueryResult,
                                        options
                                      ) => {
                                        const fetchMoreResult =
                                          options.fetchMoreResult;
                                        const newEdges =
                                          fetchMoreResult &&
                                          fetchMoreResult.node &&
                                          fetchMoreResult.node.orders &&
                                          fetchMoreResult.node.orders.edges;
                                        const newPageInfo =
                                          fetchMoreResult &&
                                          fetchMoreResult.node &&
                                          fetchMoreResult.node.orders &&
                                          fetchMoreResult.node.orders.pageInfo;
                                        const previousHasNextPage =
                                          previousQueryResult.node &&
                                          previousQueryResult.node.orders &&
                                          previousQueryResult.node.orders
                                            .pageInfo &&
                                          previousQueryResult.node.orders
                                            .pageInfo.hasNextPage;
                                        const previousDomainTypeName =
                                          previousQueryResult.node &&
                                          previousQueryResult.node.__typename;
                                        const previousOrdersTypeName =
                                          previousQueryResult.node &&
                                          previousQueryResult.node.orders &&
                                          previousQueryResult.node.orders
                                            .__typename;
                                        const previousEdges =
                                          (previousQueryResult &&
                                            previousQueryResult.node &&
                                            previousQueryResult.node.orders &&
                                            previousQueryResult.node.orders
                                              .edges) ||
                                          [];

                                        return newEdges &&
                                          newEdges.length &&
                                          previousHasNextPage
                                          ? ({
                                              // Put the new products at the end of the list and update `pageInfo`
                                              // so we have the new `endCursor` and `hasNextPage` values
                                              node: {
                                                __typename: previousDomainTypeName,
                                                orders: {
                                                  __typename: previousOrdersTypeName,
                                                  edges: [
                                                    ...previousEdges,
                                                    ...newEdges
                                                  ],
                                                  pageInfo: newPageInfo
                                                }
                                              }
                                            } as OrdersQuery)
                                          : previousQueryResult;
                                      }
                                    });
                                  }}
                                />
                              );
                            }
                            return null;
                          }}
                        </OrdersComponent>
                      )}
                    />
                  </Layout>
                )
              );
            }}
          </OrdersComponent>
        )
      }
    </NamespacesConsumer>
  );
};

export default withRouter(Orders);
