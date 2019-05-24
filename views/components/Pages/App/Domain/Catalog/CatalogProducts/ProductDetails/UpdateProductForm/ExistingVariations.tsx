import React, { useState } from "react";
import { NamespacesConsumer } from "react-i18next";
import { Formik } from "formik";
import { adopt } from "react-adopt";
import { withRouter, RouteComponentProps } from "react-router";
import get from "lodash/fp/get";

import localeNamespaceKeys from "../../../../../../../../../constants/localization";
import ReorderVariantAttributesModal from "./ExistingVariations/ReorderVariantAttributesModal";
import ExistingVariantTable from "./ExistingVariations/ExistingVariantTable";
import { SkuNode } from "../../../../../../../../../typeDefinitions/catalog";
import EditOptions from "./ExistingVariations/EditOptions";
import EditVariantModal from "./ExistingVariations/EditVariantModal";
import { UpdateProductReorderVariationsFormBag } from "../../../../../../../../../typeDefinitions/catalog/forms";
import { createProductReorderVariationsFormFields } from "../../../../../../../../../constants/formFields";
import { extractSkus } from "../../../../../../../../../utils/catalog";
import AddVariantModal from "./ExistingVariations/AddVariantModal";
import {
  IMapper,
  ComposedMutations
} from "../../../../../../../../../typeDefinitions";
import ErrorBoundary from "../../../../../../../Helpers/ErrorBoundary";
import {
  CreateOrUpdateSkusComponent,
  UploadSkuImageComponent,
  ProductNode,
  UpdateProductAttributesComponent
} from "../../../../../../../../../typeDefinitions/__generated__/components";
import { UserActionTopBarDropdownContext } from "../../../../../../../Contexts/UserActionTopBarDropdown";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES
} from "../../../../../../../../../constants/dropDowns";

const {
  UikButton,
  UikWidget,
  UikWidgetHeader,
  UikWidgetContent
} = require("../../../../../../../../../@uik");

export type Attribute = { id: string; text: string };
export type Attributes = Attribute[];

interface Props extends RouteComponentProps<{ domainId: string }> {
  product: ProductNode;
  refetchProduct: () => void;
}

const editVariationModalTypes = {
  ADD_VARIANT: "ADD_VARIANT",
  EDIT_VARIANT: "EDIT_VARIANT",
  REORDER_OPTIONS: "REORDER_OPTIONS",
  EDIT_OPTIONS: "EDIT_OPTIONS"
};

const createOrUpdateSkus = ({ render }: IMapper) => (
  <CreateOrUpdateSkusComponent>
    {(mutation, result) => render({ mutation, result })}
  </CreateOrUpdateSkusComponent>
);

const uploadSkuImage = ({ render }: IMapper) => (
  <UploadSkuImageComponent>
    {(mutation, result) => render({ mutation, result })}
  </UploadSkuImageComponent>
);

const ComposedMutation = adopt({
  createOrUpdateSkus,
  uploadSkuImage
});

//TODO: localization
const ExistingVariations = ({ product, refetchProduct, match }: Props) => {
  const [modalType, setModalType] = useState<null | string>(null);
  const [sku, setSku] = useState<null | SkuNode>(null);
  const { showDropDown } = React.useContext(UserActionTopBarDropdownContext);

  const { attributes } = product;
  const skus = extractSkus(product.skus);
  const handleModalAccessibility = (sku?: SkuNode) => {
    if (sku) {
      setSku(sku);
      setModalType(editVariationModalTypes.EDIT_VARIANT);
    } else {
      setSku(null);
      setModalType(null);
    }
  };
  const { domainId } = match.params;

  return (
    <NamespacesConsumer
      ns={[
        localeNamespaceKeys.catalog._name,
        localeNamespaceKeys.formValidation._name
      ]}
    >
      {(t, { ready }) => {
        return (
          ready && (
            <ComposedMutation>
              {({ createOrUpdateSkus, uploadSkuImage }: ComposedMutations) => (
                <UikWidget>
                  <UikWidgetHeader
                    className="variations-widget-header"
                    rightEl={
                      <div className="widget-header-buttons">
                        {get("length")(attributes) > 0 ? (
                          <React.Fragment>
                            <UikButton
                              onClick={() => {
                                setModalType(
                                  editVariationModalTypes.REORDER_OPTIONS
                                );
                              }}
                            >
                              Reorder Options
                            </UikButton>
                            <UikButton
                              onClick={() => {
                                setModalType(
                                  editVariationModalTypes.EDIT_OPTIONS
                                );
                              }}
                            >
                              Edit Options
                            </UikButton>
                          </React.Fragment>
                        ) : null}
                        <UikButton
                          primary
                          onClick={() => {
                            setModalType(editVariationModalTypes.ADD_VARIANT);
                          }}
                        >
                          Add Variant
                        </UikButton>
                      </div>
                    }
                  >
                    {t(
                      `${
                        localeNamespaceKeys.catalog.product.formLabels
                          .variations._keyPath
                      }.${
                        localeNamespaceKeys.catalog.product.formLabels
                          .variations.sectionHeader
                      }`
                    )}
                  </UikWidgetHeader>
                  <UikWidgetContent>
                    <ExistingVariantTable
                      skus={skus || []}
                      attributes={attributes || []}
                      handleEditVariantModalAccessibility={
                        handleModalAccessibility
                      }
                    />
                  </UikWidgetContent>

                  {modalType === editVariationModalTypes.REORDER_OPTIONS ? (
                    <UpdateProductAttributesComponent>
                      {(updateProductAttributes, result) => (
                        <Formik
                          onSubmit={() => {}}
                          initialValues={{
                            [createProductReorderVariationsFormFields.attributes]: attributes
                          }}
                          render={(
                            reorderVariantAttributesFormBag: UpdateProductReorderVariationsFormBag
                          ) => {
                            return (
                              <ErrorBoundary>
                                <ReorderVariantAttributesModal
                                  skus={skus}
                                  reorderVariantAttributesFormBag={
                                    reorderVariantAttributesFormBag
                                  }
                                  isModalOpen={
                                    modalType ===
                                    editVariationModalTypes.REORDER_OPTIONS
                                  }
                                  updateProductAttributesResult={result}
                                  submitForm={() => {
                                    const productId = product.id;
                                    reorderVariantAttributesFormBag.setSubmitting(
                                      true
                                    );
                                    return updateProductAttributes({
                                      variables: {
                                        domainId,
                                        productId,
                                        attributes:
                                          reorderVariantAttributesFormBag.values
                                            .attributes || []
                                      }
                                    })
                                      .then(async result => {
                                        await refetchProduct();
                                        reorderVariantAttributesFormBag.setSubmitting(
                                          false
                                        );
                                        showDropDown(
                                          DROP_DOWN_TYPES.DROP_DOWN_SUCCESS,
                                          {
                                            title:
                                              DROP_DOWN_TITLES.DROP_DOWN_SUCCESS
                                          }
                                        );
                                        handleModalAccessibility();
                                        return result;
                                      })
                                      .catch(error => {
                                        reorderVariantAttributesFormBag.setSubmitting(
                                          false
                                        );
                                        return error;
                                      });
                                  }}
                                  handleCloseModal={() =>
                                    handleModalAccessibility()
                                  }
                                />
                              </ErrorBoundary>
                            );
                          }}
                        />
                      )}
                    </UpdateProductAttributesComponent>
                  ) : null}

                  {modalType === editVariationModalTypes.EDIT_OPTIONS ? (
                    <EditOptions
                      isModalOpen={
                        modalType === editVariationModalTypes.EDIT_OPTIONS
                      }
                      product={product}
                      handleCloseModal={() => handleModalAccessibility()}
                      refetchProduct={refetchProduct}
                    />
                  ) : null}

                  {modalType === editVariationModalTypes.EDIT_VARIANT &&
                  sku !== null ? (
                    <EditVariantModal
                      createOrUpdateSkus={createOrUpdateSkus}
                      sku={sku}
                      isModalOpen={
                        modalType === editVariationModalTypes.EDIT_VARIANT
                      }
                      product={product}
                      handleCloseModal={() => handleModalAccessibility()}
                      uploadSkuImage={uploadSkuImage}
                      refetchProduct={refetchProduct}
                    />
                  ) : null}

                  {modalType === editVariationModalTypes.ADD_VARIANT ? (
                    <AddVariantModal
                      product={product}
                      attributes={attributes || []}
                      isModalOpen={
                        modalType === editVariationModalTypes.ADD_VARIANT
                      }
                      createOrUpdateSkus={createOrUpdateSkus}
                      uploadSkuImage={uploadSkuImage}
                      handleCloseModal={() => handleModalAccessibility()}
                      refetchProduct={refetchProduct}
                    />
                  ) : null}
                </UikWidget>
              )}
            </ComposedMutation>
          )
        );
      }}
    </NamespacesConsumer>
  );
};

export default withRouter(ExistingVariations);
