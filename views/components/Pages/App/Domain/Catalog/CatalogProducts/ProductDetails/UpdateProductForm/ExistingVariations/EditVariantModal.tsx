import React from "react";
import classNames from "classnames";
import { NamespacesConsumer } from "react-i18next";
import {
  Formik,
  FastField,
  ErrorMessage,
  FieldProps,
  FormikActions
} from "formik";
import Dropzone from "react-dropzone";
import keys from "lodash/fp/keys";
import get from "lodash/fp/get";
import flow from "lodash/fp/flow";
import isEmpty from "lodash/fp/isEmpty";
import isString from "lodash/fp/isString";

const {
  UikButton,
  UikWidget,
  UikWidgetHeader,
  UikWidgetContent,
  UikFormInputGroup,
  UikDivider,
  UikSelect
} = require("../../../../../../../../../../@uik");

import Modal from "../../../../../../../../Helpers/Modal";
import FormField from "../../../../../../../../Helpers/FormField";
import FormLabel from "../../../../../../../../Helpers/FormLabel";
import localeNamespaceKeys from "../../../../../../../../../../constants/localization";
import { SelectOption } from "../../UpdateSimpleProductForm";
import {
  CREATE_PRODUCT_IMAGE_SIZE_LIMIT,
  unitsOfDimension,
  unitsOfWeight,
  defaultUnitOfWeight,
  defaultUnitOfDimension,
  minimumQuantity,
  minimumDimensionSize
} from "../../../../../../../../../../constants/catalog";
import Thumbnail from "../../../../../../../../Helpers/Thumbnail";
import { SkuNode } from "../../../../../../../../../../typeDefinitions/catalog";
import {
  getUnitOfWeightByNumber,
  getUnitOfDimensionsByNumber,
  getSkuIds,
  generateSkuFromFormValues
} from "../../../../../../../../../../utils/catalog";
import {
  UpdateProductEditVariantFormBag,
  UpdateProductEditVariantModalFormValues
} from "../../../../../../../../../../typeDefinitions/catalog/forms";
import { updateProductEditVariantValidation } from "../../../../../../../../../../utils/formValidation/updateProduct";
import {
  updateProducEditVariantFormFields,
  placeholders
} from "../../../../../../../../../../constants/formFields";
import { IMutationRenderProp } from "../../../../../../../../../../typeDefinitions";
import GraphQLErrors from "../../../../../../../../Helpers/GraphQLErrors";
import { mutationNames } from "../../../../../../../../../../constants/graphql";
import { ProductNode } from "../../../../../../../../../../typeDefinitions/__generated__/components";
import { withRouter, RouteComponentProps } from "react-router";
import { UserActionTopBarDropdownContext } from "../../../../../../../../Contexts/UserActionTopBarDropdown";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES
} from "../../../../../../../../../../constants/dropDowns";
import CurrencyField from "../../../../../../../../Helpers/FormFields/CurrencyField";
import {
  getDollarsFromCents,
  getCentsFromDollars
} from "../../../../../../../../../../utils/price";

interface IProps extends RouteComponentProps<{ domainId: string }> {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  sku: SkuNode;
  createOrUpdateSkus: IMutationRenderProp;
  uploadSkuImage: IMutationRenderProp;
  product: ProductNode;
  refetchProduct: () => void;
}

// TODO: localization
const EditVariantModal = ({
  sku,
  isModalOpen,
  handleCloseModal,
  createOrUpdateSkus,
  uploadSkuImage,
  product,
  refetchProduct,
  match
}: IProps) => {
  if (sku) {
    const attributes = sku && sku.attributes;
    const { domainId } = match.params;
    const { showDropDown } = React.useContext(UserActionTopBarDropdownContext);

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
              <Modal isOpen={isModalOpen} handleCloseModal={handleCloseModal}>
                <Formik
                  onSubmit={(
                    values: UpdateProductEditVariantModalFormValues,
                    actions: FormikActions<
                      UpdateProductEditVariantModalFormValues
                    >
                  ) => {
                    const newSku = generateSkuFromFormValues({
                      id: sku.id,
                      stripeId: sku.stripeId,
                      attributes,
                      ...values
                    });
                    const productId = product.id;
                    return createOrUpdateSkus
                      .mutation({
                        variables: {
                          skus: [newSku],
                          domainId,
                          productId
                        }
                      })
                      .then(result => {
                        const image: File =
                          values[updateProducEditVariantFormFields.image];
                        if (image) {
                          const skuIds: string = getSkuIds(
                            result,
                            mutationNames.createOrUpdateSkus
                          );

                          return uploadSkuImage.mutation({
                            variables: {
                              image,
                              skuId: skuIds[0],
                              domainId,
                              productId
                            }
                          });
                        }
                        return Promise.resolve(result);
                      })
                      .then(async result => {
                        await refetchProduct();
                        actions.setSubmitting(false);
                        showDropDown(DROP_DOWN_TYPES.DROP_DOWN_SUCCESS, {
                          title: DROP_DOWN_TITLES.DROP_DOWN_SUCCESS
                        });
                        handleCloseModal();
                        return result;
                      })
                      .catch(error => {
                        actions.setSubmitting(false);
                        return error;
                      });
                  }}
                  validationSchema={updateProductEditVariantValidation}
                  initialValues={{
                    [updateProducEditVariantFormFields.basePrice]: get(
                      updateProducEditVariantFormFields.basePrice
                    )(sku),
                    [updateProducEditVariantFormFields.salePrice]: get(
                      updateProducEditVariantFormFields.salePrice
                    )(sku),
                    [updateProducEditVariantFormFields.weight]: get(
                      updateProducEditVariantFormFields.weight
                    )(sku),
                    [updateProducEditVariantFormFields.unitOfWeight]: get(
                      updateProducEditVariantFormFields.unitOfWeight
                    )(sku)
                      ? flow(
                          get(updateProducEditVariantFormFields.unitOfWeight),
                          getUnitOfWeightByNumber
                        )(sku)
                      : defaultUnitOfWeight,
                    [updateProducEditVariantFormFields.unitOfDimensions]: get(
                      updateProducEditVariantFormFields.unitOfDimensions
                    )(sku)
                      ? flow(
                          get(
                            updateProducEditVariantFormFields.unitOfDimensions
                          ),
                          getUnitOfDimensionsByNumber
                        )(sku)
                      : defaultUnitOfDimension,
                    [updateProducEditVariantFormFields.length]: get(
                      updateProducEditVariantFormFields.length
                    )(sku),
                    [updateProducEditVariantFormFields.width]: get(
                      updateProducEditVariantFormFields.width
                    )(sku),
                    [updateProducEditVariantFormFields.height]: get(
                      updateProducEditVariantFormFields.height
                    )(sku),
                    [updateProducEditVariantFormFields.sku]: get(
                      updateProducEditVariantFormFields.sku
                    )(sku),
                    [updateProducEditVariantFormFields.quantity]: get(
                      updateProducEditVariantFormFields.quantity
                    )(sku)
                  }}
                  render={(
                    updateProductEditVariantFormBag: UpdateProductEditVariantFormBag
                  ) => {
                    const buttonDisabled =
                      !isEmpty(updateProductEditVariantFormBag.errors) ||
                      updateProductEditVariantFormBag.isSubmitting ||
                      uploadSkuImage.result.loading ||
                      createOrUpdateSkus.result.loading;
                    return (
                      <UikWidget>
                        <UikWidgetHeader
                          rightEl={
                            <UikButton
                              clear
                              icon={<i className="icofont-close" />}
                              iconOnly
                              onClick={handleCloseModal}
                            />
                          }
                        >
                          Edit Variation
                        </UikWidgetHeader>
                        <UikWidgetContent>
                          <div className="edit-variant-modal-middle">
                            <UikFormInputGroup>
                              <h4>Options</h4>
                              <span>
                                To edit options, close this modal and click the{" "}
                                <strong>Edit Options</strong> button in the{" "}
                                <strong>Variations</strong> section of this
                                product.
                              </span>

                              <div className="edit-variant-properties">
                                <div className="attributes">
                                  {keys(attributes).map(attributeKey => (
                                    <div key={attributeKey}>{attributeKey}</div>
                                  ))}
                                </div>
                                <div className="attribute-values">
                                  {Object.values(attributes || {}).map(
                                    (value, index) => (
                                      <div key={index}>{value}</div>
                                    )
                                  )}
                                </div>
                              </div>
                            </UikFormInputGroup>

                            <UikDivider margin />

                            <div className="upload-image-section">
                              <UikFormInputGroup>
                                <Dropzone
                                  accept="image/*"
                                  multiple={false}
                                  maxSize={CREATE_PRODUCT_IMAGE_SIZE_LIMIT}
                                  onDrop={(acceptedFiles: File[]) => {
                                    if (acceptedFiles.length) {
                                      updateProductEditVariantFormBag.setFieldValue(
                                        updateProducEditVariantFormFields.image,
                                        acceptedFiles[0]
                                      );
                                    }
                                  }}
                                >
                                  {({
                                    isDragActive,
                                    isDragReject,
                                    getRootProps,
                                    getInputProps,
                                    open
                                  }) => {
                                    return (
                                      <div className="edit-variant-image-upload">
                                        {updateProductEditVariantFormBag.values
                                          .image ? (
                                          <React.Fragment>
                                            {isString(
                                              updateProductEditVariantFormBag
                                                .values.image
                                            ) ? (
                                              <Thumbnail
                                                url={
                                                  updateProductEditVariantFormBag
                                                    .values.image
                                                }
                                              />
                                            ) : (
                                              <Thumbnail
                                                file={
                                                  updateProductEditVariantFormBag
                                                    .values.image
                                                }
                                              />
                                            )}
                                          </React.Fragment>
                                        ) : (
                                          <Thumbnail url="" />
                                        )}
                                        <UikButton
                                          primary
                                          icon={<i className="icofont-cloudapp" />}
                                          onClick={() => open()}
                                        >
                                          Set Variation Image
                                        </UikButton>
                                        <div
                                          {...getRootProps()}
                                          className={classNames("dropzone", {
                                            "dropzone--isActive": isDragActive,
                                            "drop-cursor": isDragActive,
                                            "no-drop-cursor": isDragReject
                                          })}
                                        >
                                          <input {...getInputProps()} />
                                        </div>
                                      </div>
                                    );
                                  }}
                                </Dropzone>
                              </UikFormInputGroup>
                            </div>

                            <UikFormInputGroup direction="vertical">
                              <h4>Pricing</h4>
                              <CurrencyField
                                onBlur={() => {
                                  updateProductEditVariantFormBag.setFieldTouched(
                                    updateProducEditVariantFormFields.basePrice,
                                    true
                                  );
                                }}
                                name={
                                  updateProducEditVariantFormFields.basePrice
                                }
                                label={t(
                                  `${
                                    localeNamespaceKeys.catalog.product
                                      .formLabels.pricing._keyPath
                                  }.${
                                    localeNamespaceKeys.catalog.product
                                      .formLabels.pricing.basePrice
                                  }`
                                )}
                                placeholder={placeholders.basePrice}
                                value={
                                  updateProductEditVariantFormBag.values
                                    .basePrice === ""
                                    ? ""
                                    : getDollarsFromCents(
                                        updateProductEditVariantFormBag.values
                                          .basePrice
                                      )
                                }
                                formBag={updateProductEditVariantFormBag}
                                onValueChange={val => {
                                  const cents = parseInt(
                                    getCentsFromDollars(val.floatValue) || ""
                                  );
                                  if (isNaN(cents)) {
                                    updateProductEditVariantFormBag.setFieldValue(
                                      updateProducEditVariantFormFields.basePrice,
                                      ""
                                    );
                                  } else {
                                    updateProductEditVariantFormBag.setFieldValue(
                                      updateProducEditVariantFormFields.basePrice,
                                      cents
                                    );
                                  }
                                }}
                              />
                              <CurrencyField
                                onBlur={() => {
                                  updateProductEditVariantFormBag.setFieldTouched(
                                    updateProducEditVariantFormFields.salePrice,
                                    true
                                  );
                                }}
                                name={
                                  updateProducEditVariantFormFields.salePrice
                                }
                                label={t(
                                  `${
                                    localeNamespaceKeys.catalog.product
                                      .formLabels.pricing._keyPath
                                  }.${
                                    localeNamespaceKeys.catalog.product
                                      .formLabels.pricing.salePrice
                                  }`
                                )}
                                placeholder={placeholders.salePrice}
                                value={
                                  updateProductEditVariantFormBag.values
                                    .salePrice === ""
                                    ? getDollarsFromCents(null)
                                    : getDollarsFromCents(
                                        updateProductEditVariantFormBag.values
                                          .salePrice
                                      )
                                }
                                formBag={updateProductEditVariantFormBag}
                                onValueChange={val => {
                                  const cents = parseInt(
                                    getCentsFromDollars(val.floatValue) || ""
                                  );
                                  if (isNaN(cents)) {
                                    updateProductEditVariantFormBag.setFieldValue(
                                      updateProducEditVariantFormFields.salePrice,
                                      ""
                                    );
                                  } else {
                                    updateProductEditVariantFormBag.setFieldValue(
                                      updateProducEditVariantFormFields.salePrice,
                                      cents
                                    );
                                  }
                                }}
                              />
                            </UikFormInputGroup>

                            <UikDivider margin />

                            <UikFormInputGroup>
                              <h4>Shipping</h4>
                              <div className="form-input-select">
                                <FormField>
                                  <FormLabel>
                                    {t(
                                      `${
                                        localeNamespaceKeys.catalog.product
                                          .formLabels.shipping._keyPath
                                      }.${
                                        localeNamespaceKeys.catalog.product
                                          .formLabels.shipping.weight
                                      }`
                                    )}
                                  </FormLabel>
                                  <FastField
                                    name={
                                      updateProducEditVariantFormFields.weight
                                    }
                                    value={
                                      updateProductEditVariantFormBag.values[
                                        updateProducEditVariantFormFields.weight
                                      ]
                                    }
                                    className="form-input"
                                    type="number"
                                    min={minimumDimensionSize}
                                    step="0.01"
                                  />
                                </FormField>

                                <FastField
                                  name={
                                    updateProducEditVariantFormFields.unitOfWeight
                                  }
                                  value={
                                    updateProductEditVariantFormBag.values[
                                      updateProducEditVariantFormFields
                                        .unitOfWeight
                                    ]
                                  }
                                  component={({
                                    field: { value }
                                  }: FieldProps) => (
                                    <UikSelect
                                      options={unitsOfWeight}
                                      value={value}
                                      onChange={(newValue: SelectOption) => {
                                        updateProductEditVariantFormBag.setFieldValue(
                                          updateProducEditVariantFormFields.unitOfWeight,
                                          [newValue]
                                        );
                                      }}
                                    />
                                  )}
                                />
                              </div>
                              <ErrorMessage
                                name={updateProducEditVariantFormFields.weight}
                              >
                                {msg => (
                                  <div className="error-message">{msg}</div>
                                )}
                              </ErrorMessage>
                            </UikFormInputGroup>

                            <UikDivider margin />

                            <UikFormInputGroup>
                              <FormField>
                                <FormLabel>
                                  {t(
                                    `${
                                      localeNamespaceKeys.catalog.product
                                        .formLabels.shipping._keyPath
                                    }.${
                                      localeNamespaceKeys.catalog.product
                                        .formLabels.shipping.unitOfMeasure
                                    }`
                                  )}
                                </FormLabel>
                                <FastField
                                  name={
                                    updateProducEditVariantFormFields.unitOfDimensions
                                  }
                                  value={
                                    updateProductEditVariantFormBag.values[
                                      updateProducEditVariantFormFields
                                        .unitOfDimensions
                                    ]
                                  }
                                  component={({
                                    field: { value }
                                  }: FieldProps) => (
                                    <UikSelect
                                      options={unitsOfDimension}
                                      value={value}
                                      onChange={(newValue: SelectOption) => {
                                        updateProductEditVariantFormBag.setFieldValue(
                                          updateProducEditVariantFormFields.unitOfDimensions,
                                          [newValue]
                                        );
                                      }}
                                    />
                                  )}
                                />
                                <ErrorMessage
                                  name={
                                    updateProducEditVariantFormFields.unitOfDimensions
                                  }
                                >
                                  {msg => (
                                    <div className="error-message">{msg}</div>
                                  )}
                                </ErrorMessage>
                              </FormField>
                            </UikFormInputGroup>

                            <UikFormInputGroup>
                              <FormField>
                                <FormLabel>
                                  {t(
                                    `${
                                      localeNamespaceKeys.catalog.product
                                        .formLabels.shipping._keyPath
                                    }.${
                                      localeNamespaceKeys.catalog.product
                                        .formLabels.shipping.length
                                    }`
                                  )}
                                </FormLabel>
                                <FastField
                                  name={
                                    updateProducEditVariantFormFields.length
                                  }
                                  value={
                                    updateProductEditVariantFormBag.values[
                                      updateProducEditVariantFormFields.length
                                    ]
                                  }
                                  type="number"
                                  min={minimumDimensionSize}
                                  step="0.01"
                                  className="form-input"
                                />
                                <ErrorMessage
                                  name={
                                    updateProducEditVariantFormFields.length
                                  }
                                >
                                  {msg => (
                                    <div className="error-message">{msg}</div>
                                  )}
                                </ErrorMessage>
                              </FormField>
                              <FormField>
                                <FormLabel>
                                  {t(
                                    `${
                                      localeNamespaceKeys.catalog.product
                                        .formLabels.shipping._keyPath
                                    }.${
                                      localeNamespaceKeys.catalog.product
                                        .formLabels.shipping.height
                                    }`
                                  )}
                                </FormLabel>
                                <FastField
                                  name={
                                    updateProducEditVariantFormFields.height
                                  }
                                  value={
                                    updateProductEditVariantFormBag.values[
                                      updateProducEditVariantFormFields.height
                                    ]
                                  }
                                  type="number"
                                  min={minimumDimensionSize}
                                  step="0.01"
                                  className="form-input"
                                />
                                <ErrorMessage
                                  name={
                                    updateProducEditVariantFormFields.height
                                  }
                                >
                                  {msg => (
                                    <div className="error-message">{msg}</div>
                                  )}
                                </ErrorMessage>
                              </FormField>
                              <FormField>
                                <FormLabel>
                                  {t(
                                    `${
                                      localeNamespaceKeys.catalog.product
                                        .formLabels.shipping._keyPath
                                    }.${
                                      localeNamespaceKeys.catalog.product
                                        .formLabels.shipping.width
                                    }`
                                  )}
                                </FormLabel>
                                <FastField
                                  name={updateProducEditVariantFormFields.width}
                                  value={
                                    updateProductEditVariantFormBag.values[
                                      updateProducEditVariantFormFields.width
                                    ]
                                  }
                                  type="number"
                                  min={minimumDimensionSize}
                                  step="0.01"
                                  className="form-input"
                                />
                                <ErrorMessage
                                  name={updateProducEditVariantFormFields.width}
                                >
                                  {msg => (
                                    <div className="error-message">{msg}</div>
                                  )}
                                </ErrorMessage>
                              </FormField>
                            </UikFormInputGroup>

                            <UikDivider margin />

                            <UikFormInputGroup>
                              <h4>Inventory</h4>
                              <FormField>
                                <FormLabel>
                                  {t(
                                    `${
                                      localeNamespaceKeys.catalog.product
                                        .formLabels.inventory._keyPath
                                    }.${
                                      localeNamespaceKeys.catalog.product
                                        .formLabels.inventory.sku
                                    }`
                                  )}
                                </FormLabel>
                                <FastField
                                  name={updateProducEditVariantFormFields.sku}
                                  value={
                                    updateProductEditVariantFormBag.values[
                                      updateProducEditVariantFormFields.sku
                                    ]
                                  }
                                  type="text"
                                  className="form-input"
                                />
                                <ErrorMessage
                                  name={updateProducEditVariantFormFields.sku}
                                >
                                  {msg => (
                                    <div className="error-message">{msg}</div>
                                  )}
                                </ErrorMessage>
                              </FormField>
                              <FormField>
                                <FormLabel>
                                  {t(
                                    `${
                                      localeNamespaceKeys.catalog.product
                                        .formLabels.inventory._keyPath
                                    }.${
                                      localeNamespaceKeys.catalog.product
                                        .formLabels.inventory.inventory
                                    }`
                                  )}
                                </FormLabel>
                                <FastField
                                  name={
                                    updateProducEditVariantFormFields.quantity
                                  }
                                  value={
                                    updateProductEditVariantFormBag.values[
                                      updateProducEditVariantFormFields.quantity
                                    ]
                                  }
                                  type="number"
                                  min={minimumQuantity}
                                  step="1"
                                  className="form-input"
                                />
                                <ErrorMessage
                                  name={
                                    updateProducEditVariantFormFields.quantity
                                  }
                                >
                                  {msg => (
                                    <div className="error-message">{msg}</div>
                                  )}
                                </ErrorMessage>
                              </FormField>
                            </UikFormInputGroup>
                          </div>
                        </UikWidgetContent>
                        {createOrUpdateSkus.result.error ||
                        uploadSkuImage.result.error ? (
                          <UikWidgetContent>
                            <GraphQLErrors
                              mutationResult={createOrUpdateSkus.result}
                            />
                            <GraphQLErrors
                              mutationResult={uploadSkuImage.result}
                            />
                          </UikWidgetContent>
                        ) : null}
                        <UikWidgetContent>
                          <UikFormInputGroup>
                            <UikButton
                              success
                              onClick={
                                updateProductEditVariantFormBag.submitForm
                              }
                              disabled={buttonDisabled}
                              isLoading={
                                uploadSkuImage.result.loading ||
                                createOrUpdateSkus.result.loading ||
                                updateProductEditVariantFormBag.isSubmitting
                              }
                            >
                              Save Changes
                            </UikButton>
                          </UikFormInputGroup>
                        </UikWidgetContent>
                      </UikWidget>
                    );
                  }}
                />
              </Modal>
            )
          );
        }}
      </NamespacesConsumer>
    );
  }
  return null;
};

export default withRouter(EditVariantModal);
