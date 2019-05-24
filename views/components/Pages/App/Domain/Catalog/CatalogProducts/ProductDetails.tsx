import React from "react";
import { NamespacesConsumer } from "react-i18next";
import { QueryResult } from "react-apollo";
import { adopt } from "react-adopt";
import { Formik } from "formik";
import get from "lodash/fp/get";
import flow from "lodash/fp/flow";
import isEmpty from "lodash/fp/isEmpty";

import localeNamespaceKeys from "../../../../../../../constants/localization";
import { getProductDetailsInitialValuesFromProduct } from "../../../../../../../utils/catalog";
import Layout from "../../../../../Helpers/Layout";
import BackLink from "../../../../../Helpers/TopBar/BackLink";
import routePaths from "../../../../../../../constants/routePaths";
import { extractDataFromResult } from "../../../../../../../utils";
import GraphQLErrors from "../../../../../Helpers/GraphQLErrors";
import {
  updateSimpleProductValidationSchema,
  updateProductWithVariantsValidationSchema,
  updateSimpleProductCustomValidation
} from "../../../../../../../utils/formValidation/updateProduct";
import UpdateProductForm from "./ProductDetails/UpdateProductForm";
import UpdateSimpleProductForm from "./ProductDetails/UpdateSimpleProductForm";
import {
  IMapper,
  MutationRenderProp
} from "../../../../../../../typeDefinitions";
import { UpdateProductFormBag } from "../../../../../../../typeDefinitions/catalog/forms";
import {
  UpdateProductComponent,
  CreateOrUpdateSkusComponent,
  UploadProductImageComponent,
  UploadSkuImageComponent,
  ProductComponent,
  ProductNode,
  UpdateProductAttributesComponent,
  UpdateProductMutation,
  UpdateProductVariables,
  UpdateProductAttributesMutation,
  UpdateProductAttributesVariables,
  CreateOrUpdateSkusMutation,
  CreateOrUpdateSkusVariables,
  UploadProductImageMutation,
  UploadProductImageVariables,
  UploadSkuImageMutation,
  UploadSkuImageVariables,
  DeleteSkuMutation,
  DeleteSkuVariables,
  DeleteSkuComponent
} from "../../../../../../../typeDefinitions/__generated__/components";
import Loading from "../../../../../Helpers/Loading";
import { RouteComponentProps, withRouter } from "react-router";
import { UserActionTopBarDropdownContext } from "../../../../../Contexts/UserActionTopBarDropdown";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES,
  DROP_DOWN_BUTTON_TEXT
} from "../../../../../../../constants/dropDowns";
import {
  submitUpdateSimpleProductForm,
  submitUpdateProductForm
} from "../../../../../../../api/catalog";

export interface IMappedUpdateProductMutations {
  [key: string]: MutationRenderProp<any, any>;
  updateProductMutation: MutationRenderProp<
    UpdateProductMutation,
    UpdateProductVariables
  >;
  updateProductAttributesMutation: MutationRenderProp<
    UpdateProductAttributesMutation,
    UpdateProductAttributesVariables
  >;
  createOrUpdateSkuMutation: MutationRenderProp<
    CreateOrUpdateSkusMutation,
    CreateOrUpdateSkusVariables
  >;
  uploadProductImagesMutation: MutationRenderProp<
    UploadProductImageMutation,
    UploadProductImageVariables
  >;
  uploadSkuImagesMutation: MutationRenderProp<
    UploadSkuImageMutation,
    UploadSkuImageVariables
  >;
  deleteSkuMutation: MutationRenderProp<DeleteSkuMutation, DeleteSkuVariables>;
}

const updateProductMutation = ({ render }: IMapper) => (
  <UpdateProductComponent>
    {(mutation, result) => render({ mutation, result })}
  </UpdateProductComponent>
);

const updateProductAttributesMutation = ({ render }: IMapper) => (
  <UpdateProductAttributesComponent>
    {(mutation, result) => render({ mutation, result })}
  </UpdateProductAttributesComponent>
);

const createOrUpdateSkuMutation = ({ render }: IMapper) => (
  <CreateOrUpdateSkusComponent>
    {(mutation, result) => render({ mutation, result })}
  </CreateOrUpdateSkusComponent>
);

const uploadProductImagesMutation = ({ render }: IMapper) => (
  <UploadProductImageComponent>
    {(mutation, result) => render({ mutation, result })}
  </UploadProductImageComponent>
);

const uploadSkuImagesMutation = ({ render }: IMapper) => (
  <UploadSkuImageComponent>
    {(mutation, result) => render({ mutation, result })}
  </UploadSkuImageComponent>
);

const deleteSkuMutation = ({ render }: IMapper) => (
  <DeleteSkuComponent>
    {(mutation, result) => render({ mutation, result })}
  </DeleteSkuComponent>
);

const ComposedMutation = adopt({
  updateProductMutation,
  updateProductAttributesMutation,
  createOrUpdateSkuMutation,
  uploadProductImagesMutation,
  uploadSkuImagesMutation,
  deleteSkuMutation
});

const CatalogProductDetails = ({
  match
}: RouteComponentProps<{ productId: string; domainId: string }>) => {
  const { productId, domainId } = match.params;
  const { showDropDown } = React.useContext(UserActionTopBarDropdownContext);
  if (productId) {
    return (
      <NamespacesConsumer ns={[localeNamespaceKeys.catalog._name]}>
        {(t, { ready }) =>
          ready && (
            <ProductComponent
              variables={{
                productId
              }}
            >
              {queryProductResult => {
                const product: ProductNode = flow(
                  extractDataFromResult,
                  get("node")
                )((queryProductResult as unknown) as QueryResult);
                const isSimpleProduct = product && isEmpty(product.attributes);
                return product ? (
                  <ComposedMutation>
                    {(mutations: IMappedUpdateProductMutations) => {
                      const initialValues =
                        getProductDetailsInitialValuesFromProduct(product) ||
                        {};
                      return (
                        <Formik
                          onSubmit={async (values, actions) => {
                            try {
                              if (isSimpleProduct) {
                                await submitUpdateSimpleProductForm(
                                  domainId,
                                  product,
                                  values,
                                  mutations
                                );
                              } else {
                                await submitUpdateProductForm(
                                  domainId,
                                  productId,
                                  values,
                                  mutations
                                );
                              }
                              actions.setSubmitting(false);
                              const newResult = await queryProductResult.refetch();
                              const newProduct = flow(
                                extractDataFromResult,
                                get("node")
                              )((newResult as unknown) as QueryResult);
                              const newInitialValues =
                                getProductDetailsInitialValuesFromProduct(
                                  newProduct
                                ) || {};
                              actions.resetForm(newInitialValues);
                              showDropDown(DROP_DOWN_TYPES.DROP_DOWN_SUCCESS, {
                                title: DROP_DOWN_TITLES.DROP_DOWN_SUCCESS
                              });
                            } catch (error) {
                              actions.setSubmitting(false);
                              showDropDown(DROP_DOWN_TYPES.DROP_DOWN_ERROR, {
                                title: DROP_DOWN_TITLES.DROP_DOWN_ERROR,
                                buttonProps: {
                                  type: "submit"
                                },
                                buttonText:
                                  DROP_DOWN_BUTTON_TEXT.DROP_DOWN_ERROR
                              });
                            }
                          }}
                          validate={
                            isSimpleProduct
                              ? updateSimpleProductCustomValidation
                              : () => {}
                          }
                          validationSchema={
                            isSimpleProduct
                              ? updateSimpleProductValidationSchema()
                              : updateProductWithVariantsValidationSchema
                          }
                          initialValues={initialValues}
                          render={(
                            updateProductFormBag: UpdateProductFormBag
                          ) => {
                            return (
                              <Layout
                                className="create-product-page"
                                title={
                                  <BackLink
                                    text={t(
                                      `${
                                        localeNamespaceKeys.catalog.product
                                          ._name
                                      }.${
                                        localeNamespaceKeys.catalog.product
                                          .headerBack
                                      }`
                                    )}
                                    route={routePaths.catalog.getProductsListPath(
                                      domainId
                                    )}
                                  />
                                }
                              >
                                {queryProductResult.loading ? (
                                  <Loading />
                                ) : (
                                  <React.Fragment>
                                    {isSimpleProduct ? (
                                      <UpdateSimpleProductForm
                                        product={product}
                                        updateProductFormBag={
                                          updateProductFormBag
                                        }
                                        updateProductMutations={mutations}
                                      />
                                    ) : (
                                      <UpdateProductForm
                                        product={product}
                                        updateProductFormBag={
                                          updateProductFormBag
                                        }
                                        refetchProduct={
                                          queryProductResult.refetch
                                        }
                                        updateProductMutations={mutations}
                                      />
                                    )}
                                  </React.Fragment>
                                )}
                              </Layout>
                            );
                          }}
                        />
                      );
                    }}
                  </ComposedMutation>
                ) : (
                  <Layout
                    className="create-product-page"
                    title={
                      <BackLink
                        text={t(
                          `${localeNamespaceKeys.catalog.product._name}.${
                            localeNamespaceKeys.catalog.product.headerBack
                          }`
                        )}
                        route={routePaths.catalog.getProductsListPath(domainId)}
                      />
                    }
                  >
                    <GraphQLErrors
                      queryResult={
                        (queryProductResult as unknown) as QueryResult
                      }
                    />
                  </Layout>
                );
                // TODO: render fallback for GQLErrors like a 404 page or something
              }}
            </ProductComponent>
          )
        }
      </NamespacesConsumer>
    );
  }
  return null;
};

export default withRouter(CatalogProductDetails);
