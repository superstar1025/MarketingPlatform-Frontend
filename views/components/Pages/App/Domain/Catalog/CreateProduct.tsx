import React from "react";
import { NamespacesConsumer } from "react-i18next";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Formik } from "formik";
import { adopt } from "react-adopt";

import Layout from "../../../../Helpers/Layout";
import routePaths from "../../../../../../constants/routePaths";
import BackLink from "../../../../Helpers/TopBar/BackLink";
import localeNamespaceKeys from "../../../../../../constants/localization";
import CreateProductForm from "./CreateProduct/CreateProductForm";
import {
  createProductValidationSchema,
  createProductCustomValidation
} from "../../../../../../utils/formValidation/createProduct";
import { createProductFormFields } from "../../../../../../constants/formFields";

import { IMapper } from "../../../Authentication/Register";
import {
  defaultUnitOfWeight,
  defaultUnitOfDimension
} from "../../../../../../constants/catalog";
import { MutationRenderProp } from "../../../../../../typeDefinitions";
import {
  CreateProductComponent,
  CreateSkuComponent,
  UploadProductImageComponent,
  UploadSkuImageComponent,
  CreateProductMutation,
  CreateProductVariables,
  CreateSkuMutation,
  CreateSkuVariables,
  UploadProductImageMutation,
  UploadProductImageVariables,
  UploadSkuImageMutation,
  UploadSkuImageVariables
} from "../../../../../../typeDefinitions/__generated__/components";
import { submitCreateProductForm } from "../../../../../../api/catalog";
import { UserActionTopBarDropdownContext } from "../../../../Contexts/UserActionTopBarDropdown";
import { history } from "../../../../../..";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES,
  DROP_DOWN_BUTTON_TEXT
} from "../../../../../../constants/dropDowns";
import { ProductsExistContext } from "../../../../Contexts/ProductsExist";

export interface IMappedCreateProductMutations {
  [key: string]: MutationRenderProp<any, any>;
  createProductMutation: MutationRenderProp<
    CreateProductMutation,
    CreateProductVariables
  >;
  createSkuMutation: MutationRenderProp<CreateSkuMutation, CreateSkuVariables>;
  uploadProductImagesMutation: MutationRenderProp<
    UploadProductImageMutation,
    UploadProductImageVariables
  >;
  uploadSkuImagesMutation: MutationRenderProp<
    UploadSkuImageMutation,
    UploadSkuImageVariables
  >;
}

interface Props extends RouteComponentProps<{ domainId: string }> {}

const createProductMutation = ({ render }: IMapper) => (
  <CreateProductComponent>
    {(mutation, result) => render({ mutation, result })}
  </CreateProductComponent>
);

const createSkuMutation = ({ render }: IMapper) => (
  <CreateSkuComponent>
    {(mutation, result) => render({ mutation, result })}
  </CreateSkuComponent>
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

const ComposedMutation = adopt({
  createProductMutation,
  createSkuMutation,
  uploadProductImagesMutation,
  uploadSkuImagesMutation
});

const CreateProduct = ({ match }: Props) => {
  const { domainId } = match.params;
  const { showDropDown } = React.useContext(UserActionTopBarDropdownContext);
  const { productsExist, refetch } = React.useContext(ProductsExistContext);

  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.catalog._name]}>
      {(t, { ready }) =>
        ready && (
          <ComposedMutation>
            {({
              createProductMutation,
              createSkuMutation,
              uploadProductImagesMutation,
              uploadSkuImagesMutation
            }: IMappedCreateProductMutations) => {
              return (
                <Formik
                  onSubmit={async (values, formActions) => {
                    try {
                      const productId = await submitCreateProductForm(
                        domainId,
                        values,
                        {
                          createProductMutation,
                          createSkuMutation,
                          uploadProductImagesMutation,
                          uploadSkuImagesMutation
                        }
                      );

                      formActions.setSubmitting(false);
                      showDropDown(DROP_DOWN_TYPES.DROP_DOWN_SUCCESS, {
                        title: DROP_DOWN_TITLES.DROP_DOWN_SUCCESS
                      });

                      if (!productsExist) {
                        refetch();
                      }

                      history.push(
                        routePaths.catalog.getProductPath(domainId, productId)
                      );
                    } catch (error) {
                      formActions.setSubmitting(false);
                      showDropDown(DROP_DOWN_TYPES.DROP_DOWN_ERROR, {
                        title: DROP_DOWN_TITLES.DROP_DOWN_ERROR,
                        buttonProps: {
                          type: "submit"
                        },
                        buttonText: DROP_DOWN_BUTTON_TEXT.DROP_DOWN_ERROR
                      });
                    }
                  }}
                  validate={createProductCustomValidation}
                  validationSchema={createProductValidationSchema()}
                  initialValues={{
                    [createProductFormFields.title]: "",
                    [createProductFormFields.description]: "",
                    [createProductFormFields.imageUploads]: [],
                    [createProductFormFields.basePrice]: "",
                    [createProductFormFields.salePrice]: "",
                    [createProductFormFields.unitOfWeight]: [
                      defaultUnitOfWeight
                    ],
                    [createProductFormFields.weight]: "",
                    [createProductFormFields.htsCode]: "",
                    [createProductFormFields.unitOfDimensions]: [
                      defaultUnitOfDimension
                    ],
                    [createProductFormFields.length]: "",
                    [createProductFormFields.height]: "",
                    [createProductFormFields.width]: "",
                    [createProductFormFields.sku]: "",
                    [createProductFormFields.quantity]: "",
                    [createProductFormFields.skus]: [],
                    [createProductFormFields.attributes]: [],
                    [createProductFormFields.gender]: 5
                  }}
                  render={createProductFormBag => {
                    return (
                      <Layout
                        className="create-product-page"
                        title={
                          <BackLink
                            text={t(
                              `${localeNamespaceKeys.catalog.product._name}.${
                                localeNamespaceKeys.catalog.product.headerBack
                              }`
                            )}
                            route={routePaths.catalog.getProductsListPath(
                              domainId
                            )}
                          />
                        }
                      >
                        <CreateProductForm
                          mutations={{
                            createProductMutation,
                            createSkuMutation,
                            uploadProductImagesMutation,
                            uploadSkuImagesMutation
                          }}
                          createProductFormBag={createProductFormBag}
                        />
                      </Layout>
                    );
                  }}
                />
              );
            }}
          </ComposedMutation>
        )
      }
    </NamespacesConsumer>
  );
};

// TODO: change to hook when its available
export default withRouter(CreateProduct);
