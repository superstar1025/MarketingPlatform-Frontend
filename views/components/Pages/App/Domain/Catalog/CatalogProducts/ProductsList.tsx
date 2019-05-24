import * as React from "react";
import { NamespacesConsumer } from "react-i18next";
import isEmpty from "lodash/fp/isEmpty";
import { withRouter, RouteComponentProps } from "react-router";
import { QueryResult } from "react-apollo";

import CatalogEmpty from "./ProductsList/CatalogEmpty";
import CatalogListControls from "./ProductsList/CatalogListControls";

import GraphQLErrors from "../../../../../Helpers/GraphQLErrors";
import Layout from "../../../../../Helpers/Layout";
import localeNamespaceKeys from "../../../../../../../constants/localization";
import Loading from "../../../../../Helpers/Loading";
import {
  ProductsComponent,
  ProductsQuery
} from "../../../../../../../typeDefinitions/__generated__/components";
import WindowedList from "../../../../../Helpers/WindowedList";
import ProductsListHeader from "./ProductsList/ProductsListHeader";
import ProductListRow from "./ProductsList/ProductListRow";

interface Props extends RouteComponentProps<{ domainId: string }> {}

export const orderingProperties = {
  alphabetical: "name",
  reverseAlphabetical: "-name"
};

const ProductsList = ({ match }: Props) => {
  const [orderBy, changeOrderBy] = React.useState(
    orderingProperties.alphabetical
  );
  const { domainId } = match.params;
  const sort = () => {
    const orderProperty =
      orderBy === orderingProperties.alphabetical
        ? orderingProperties.reverseAlphabetical
        : orderingProperties.alphabetical;

    changeOrderBy(orderProperty);
  };

  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.catalog._name]}>
      {(t, { ready }) =>
        ready && (
          <ProductsComponent variables={{ domainId, first: 1 }}>
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
                  <Layout
                    className="catalog-error-page"
                    title={t(
                      `${localeNamespaceKeys.catalog.products._name}.${
                        localeNamespaceKeys.catalog.products.headerCatalog
                      }`
                    )}
                  >
                    <GraphQLErrors
                      queryResult={(initialResult as unknown) as QueryResult}
                    />
                  </Layout>
                );
              }
              const initialProducts =
                initialResult.data &&
                initialResult.data.node &&
                initialResult.data.node.products &&
                initialResult.data.node.products.edges;

              if (isEmpty(initialProducts)) {
                return (
                  <Layout
                    className="catalog-empty-page"
                    title={t(
                      `${localeNamespaceKeys.catalog.products._name}.${
                        localeNamespaceKeys.catalog.products.headerCatalog
                      }`
                    )}
                  >
                    <CatalogEmpty />
                  </Layout>
                );
              }
              return (
                orderBy && (
                  <Layout
                    className="catalog-products-page"
                    title={t(
                      `${localeNamespaceKeys.catalog.products._name}.${
                        localeNamespaceKeys.catalog.products
                          .headerManageProducts
                      }`
                    )}
                  >
                    <CatalogListControls
                      render={({ searchFilter }) => (
                        <ProductsComponent
                          variables={{
                            domainId,
                            first: 10,
                            searchFilter,
                            orderBy
                          }}
                        >
                          {result => {
                            if (result.loading) {
                              return <Loading />;
                            }

                            if (result.error) {
                              return (
                                <GraphQLErrors
                                  queryResult={
                                    (result as unknown) as QueryResult
                                  }
                                />
                              );
                            }
                            const products =
                              (result.data &&
                                result.data.node &&
                                result.data.node.products &&
                                result.data.node.products.edges) ||
                              [];
                            const hasNextPage =
                              (result.data &&
                                result.data.node &&
                                result.data.node.products &&
                                result.data.node.products.pageInfo &&
                                result.data.node.products.pageInfo
                                  .hasNextPage) ||
                              false;

                            if (!isEmpty(products)) {
                              const cursor =
                                result.data &&
                                result.data.node &&
                                result.data.node.products &&
                                result.data.node.products.pageInfo.endCursor;
                              return (
                                <WindowedList
                                  rowComponent={ProductListRow}
                                  headerComponent={() => (
                                    <ProductsListHeader
                                      changeSort={sort}
                                      orderBy={orderBy}
                                    />
                                  )}
                                  isNextPageLoading={result.loading}
                                  hasNextPage={hasNextPage}
                                  items={products}
                                  loadNextPage={(
                                    startIndex: number,
                                    stopIndex: number
                                  ) => {
                                    return result.fetchMore({
                                      variables: {
                                        domainId,
                                        first: 10,
                                        cursor,
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
                                          fetchMoreResult.node.products &&
                                          fetchMoreResult.node.products.edges;
                                        const newPageInfo =
                                          fetchMoreResult &&
                                          fetchMoreResult.node &&
                                          fetchMoreResult.node.products &&
                                          fetchMoreResult.node.products
                                            .pageInfo;
                                        const previousHasNextPage =
                                          previousQueryResult.node &&
                                          previousQueryResult.node.products &&
                                          previousQueryResult.node.products
                                            .pageInfo &&
                                          previousQueryResult.node.products
                                            .pageInfo.hasNextPage;
                                        const previousDomainTypeName =
                                          previousQueryResult.node &&
                                          previousQueryResult.node.__typename;
                                        const previousProductsTypeName =
                                          previousQueryResult.node &&
                                          previousQueryResult.node.products &&
                                          previousQueryResult.node.products
                                            .__typename;
                                        const previousEdges =
                                          (previousQueryResult &&
                                            previousQueryResult.node &&
                                            previousQueryResult.node.products &&
                                            previousQueryResult.node.products
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
                                                products: {
                                                  __typename: previousProductsTypeName,
                                                  edges: [
                                                    ...previousEdges,
                                                    ...newEdges
                                                  ],
                                                  pageInfo: newPageInfo
                                                }
                                              }
                                            } as ProductsQuery)
                                          : previousQueryResult;
                                      }
                                    });
                                  }}
                                />
                              );
                            }
                            return null;
                          }}
                        </ProductsComponent>
                      )}
                    />
                  </Layout>
                )
              );
            }}
          </ProductsComponent>
        )
      }
    </NamespacesConsumer>
  );
};

// TODO: replace with hook when available
export default withRouter(ProductsList);
