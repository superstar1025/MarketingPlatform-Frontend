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
import get from "lodash/fp/get";
import isString from "lodash/fp/isString";
import isEmpty from "lodash/fp/isEmpty";
import isEqual from "lodash/fp/isEqual";

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
import {
  updateProducAddVariantFormFields,
  placeholders
} from "../../../../../../../../../../constants/formFields";
import FormField from "../../../../../../../../Helpers/FormField";
import FormLabel from "../../../../../../../../Helpers/FormLabel";
import localeNamespaceKeys from "../../../../../../../../../../constants/localization";
import { SelectOption } from "../../UpdateSimpleProductForm";
import FormRow from "../../../../../../../../Helpers/FormRow";
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
import {
  UpdateProductAddVariantModalFormBag,
  UpdateProductAddVariantModalFormValues
} from "../../../../../../../../../../typeDefinitions/catalog/forms";
import { updateProductAddVariantValidation } from "../../../../../../../../../../utils/formValidation/updateProduct";
import {
  generateSkuFromFormValues,
  getSkuIds,
  updatedAttributesSchema
} from "../../../../../../../../../../utils/catalog";
import { mutationNames } from "../../../../../../../../../../constants/graphql";
import { IMutationRenderProp } from "../../../../../../../../../../typeDefinitions/index";
import GraphQLErrors from "../../../../../../../../Helpers/GraphQLErrors";
import {
  ProductNode,
  AttributesInputObject,
  UpdateProductAttributesComponent
} from "../../../../../../../../../../typeDefinitions/__generated__/components";
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

interface Props {
  attributes: AttributesInputObject[];
  isModalOpen: boolean;
  handleCloseModal: () => void;
  createOrUpdateSkus: IMutationRenderProp;
  uploadSkuImage: IMutationRenderProp;
  product: ProductNode;
  refetchProduct: () => void;
}

// TODO: localization
const AddVariantModal = ({
  attributes,
  isModalOpen,
  handleCloseModal,
  createOrUpdateSkus,
  uploadSkuImage,
  product,
  refetchProduct
}: Props) => {
  const defaultSkuAttributes = attributes
    ? attributes.reduce((acc, curr: any) => {
        return {
          ...acc,
          [curr.attributeKey]: ""
        };
      }, {})
    : {};
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
              <UpdateProductAttributesComponent>
                {(updateProductsAttribute, result) => (
                  <Formik
                    validationSchema={updateProductAddVariantValidation(
                      defaultSkuAttributes
                    )}
                    onSubmit={(
                      values: UpdateProductAddVariantModalFormValues,
                      actions: FormikActions<
                        UpdateProductAddVariantModalFormValues
                      >
                    ) => {
                      const sku = generateSkuFromFormValues(values);
                      const productId = product.id;
                      const domainId = product.domain.id;

                      const productAttributesSchemaCheck = updatedAttributesSchema(
                        values[updateProducAddVariantFormFields.attributes] ||
                          {},
                        product.attributes
                      );

                      return createOrUpdateSkus
                        .mutation({
                          variables: {
                            skus: [sku],
                            domainId,
                            productId
                          }
                        })
                        .then(result => {
                          const image: File =
                            values[updateProducAddVariantFormFields.image];

                          let skuImageUpload = Promise.resolve();
                          let productAttributesUpdate = Promise.resolve();
                          if (image) {
                            const skuIds: string = getSkuIds(
                              result,
                              mutationNames.createOrUpdateSkus
                            );

                            skuImageUpload = uploadSkuImage
                              .mutation({
                                variables: {
                                  image,
                                  skuId: skuIds[0],
                                  domainId,
                                  productId
                                }
                              })
                              .then(result => result)
                              .catch(error => error);
                          }
                          if (
                            !isEqual(productAttributesSchemaCheck)(
                              product.attributes
                            )
                          ) {
                            productAttributesUpdate = updateProductsAttribute({
                              variables: {
                                domainId,
                                productId,
                                attributes: productAttributesSchemaCheck
                              }
                            })
                              .then(result => result)
                              .catch(error => error);
                          }

                          return Promise.all([
                            productAttributesUpdate,
                            skuImageUpload
                          ]);
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
                    initialValues={{
                      [updateProducAddVariantFormFields.basePrice]: "",
                      [updateProducAddVariantFormFields.salePrice]: "",
                      [updateProducAddVariantFormFields.unitOfWeight]: [
                        defaultUnitOfWeight
                      ],
                      [updateProducAddVariantFormFields.weight]: "",
                      [updateProducAddVariantFormFields.unitOfDimensions]: [
                        defaultUnitOfDimension
                      ],
                      [updateProducAddVariantFormFields.length]: "",
                      [updateProducAddVariantFormFields.height]: "",
                      [updateProducAddVariantFormFields.width]: "",
                      [updateProducAddVariantFormFields.sku]: "",
                      [updateProducAddVariantFormFields.quantity]: "",
                      [updateProducAddVariantFormFields.attributes]: defaultSkuAttributes
                    }}
                    render={(
                      updateProductAddVariantFormBag: UpdateProductAddVariantModalFormBag
                    ) => {
                      const buttonDisabled =
                        !isEmpty(updateProductAddVariantFormBag.errors) ||
                        updateProductAddVariantFormBag.isSubmitting ||
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
                            Add Variation
                          </UikWidgetHeader>
                          <UikWidgetContent>
                            <div className="edit-variant-modal-middle">
                              <UikFormInputGroup>
                                <div className="attributes">
                                  {attributes.map(attribute => (
                                    <div key={attribute.attributeKey}>
                                      <FormRow>
                                        <FormField>
                                          <FormLabel>
                                            {attribute.attributeKey}
                                          </FormLabel>
                                          <FastField
                                            name={`${
                                              updateProducAddVariantFormFields.attributes
                                            }.${attribute.attributeKey}`}
                                            value={get(
                                              `${
                                                updateProducAddVariantFormFields.attributes
                                              }.${attribute.attributeKey}`
                                            )(
                                              updateProductAddVariantFormBag.values
                                            )}
                                            placeholder={`${
                                              attribute.attributeKey
                                            } value`}
                                            className="form-input"
                                            type="text"
                                          />
                                          <ErrorMessage
                                            name={`${
                                              updateProducAddVariantFormFields.attributes
                                            }.${attribute.attributeKey}`}
                                          >
                                            {msg => (
                                              <div className="error-message">
                                                {msg}
                                              </div>
                                            )}
                                          </ErrorMessage>
                                        </FormField>
                                      </FormRow>
                                    </div>
                                  ))}
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
                                        updateProductAddVariantFormBag.setFieldValue(
                                          updateProducAddVariantFormFields.image,
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
                                          {updateProductAddVariantFormBag.values
                                            .image ? (
                                            <React.Fragment>
                                              {isString(
                                                updateProductAddVariantFormBag
                                                  .values.image
                                              ) ? (
                                                <Thumbnail
                                                  url={
                                                    updateProductAddVariantFormBag
                                                      .values.image
                                                  }
                                                />
                                              ) : (
                                                <Thumbnail
                                                  file={
                                                    updateProductAddVariantFormBag
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
                                            icon={
                                              <i className="icofont-cloudapp" />
                                            }
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
                                    updateProductAddVariantFormBag.setFieldTouched(
                                      updateProducAddVariantFormFields.basePrice,
                                      true
                                    );
                                  }}
                                  name={
                                    updateProducAddVariantFormFields.basePrice
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
                                    updateProductAddVariantFormBag.values
                                      .basePrice === ""
                                      ? ""
                                      : getDollarsFromCents(
                                          updateProductAddVariantFormBag.values
                                            .basePrice
                                        )
                                  }
                                  formBag={updateProductAddVariantFormBag}
                                  onValueChange={val => {
                                    const cents = parseInt(
                                      getCentsFromDollars(val.floatValue) || ""
                                    );
                                    if (isNaN(cents)) {
                                      updateProductAddVariantFormBag.setFieldValue(
                                        updateProducAddVariantFormFields.basePrice,
                                        ""
                                      );
                                    } else {
                                      updateProductAddVariantFormBag.setFieldValue(
                                        updateProducAddVariantFormFields.basePrice,
                                        cents
                                      );
                                    }
                                  }}
                                />
                                <CurrencyField
                                  onBlur={() => {
                                    updateProductAddVariantFormBag.setFieldTouched(
                                      updateProducAddVariantFormFields.basePrice,
                                      true
                                    );
                                  }}
                                  name={
                                    updateProducAddVariantFormFields.salePrice
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
                                    updateProductAddVariantFormBag.values
                                      .salePrice === ""
                                      ? ""
                                      : getDollarsFromCents(
                                          updateProductAddVariantFormBag.values
                                            .salePrice
                                        )
                                  }
                                  formBag={updateProductAddVariantFormBag}
                                  onValueChange={val => {
                                    const cents = parseInt(
                                      getCentsFromDollars(val.floatValue) || ""
                                    );
                                    if (isNaN(cents)) {
                                      updateProductAddVariantFormBag.setFieldValue(
                                        updateProducAddVariantFormFields.salePrice,
                                        ""
                                      );
                                    } else {
                                      updateProductAddVariantFormBag.setFieldValue(
                                        updateProducAddVariantFormFields.salePrice,
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
                                        updateProducAddVariantFormFields.weight
                                      }
                                      value={
                                        updateProductAddVariantFormBag.values[
                                          updateProducAddVariantFormFields
                                            .weight
                                        ]
                                      }
                                      className="form-input"
                                      type="number"
                                      min={minimumDimensionSize}
                                      placeholder={placeholders.weight}
                                      step="0.01"
                                    />
                                  </FormField>

                                  <FastField
                                    name={
                                      updateProducAddVariantFormFields.unitOfWeight
                                    }
                                    value={
                                      updateProductAddVariantFormBag.values[
                                        updateProducAddVariantFormFields
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
                                          updateProductAddVariantFormBag.setFieldValue(
                                            updateProducAddVariantFormFields.unitOfWeight,
                                            [newValue]
                                          );
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <ErrorMessage
                                  name={updateProducAddVariantFormFields.weight}
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
                                      updateProducAddVariantFormFields.unitOfDimensions
                                    }
                                    value={
                                      updateProductAddVariantFormBag.values[
                                        updateProducAddVariantFormFields
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
                                          updateProductAddVariantFormBag.setFieldValue(
                                            updateProducAddVariantFormFields.unitOfDimensions,
                                            [newValue]
                                          );
                                        }}
                                      />
                                    )}
                                  />
                                  <ErrorMessage
                                    name={
                                      updateProducAddVariantFormFields.unitOfDimensions
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
                                      updateProducAddVariantFormFields.length
                                    }
                                    value={
                                      updateProductAddVariantFormBag.values[
                                        updateProducAddVariantFormFields.length
                                      ]
                                    }
                                    type="number"
                                    min={minimumDimensionSize}
                                    placeholder={placeholders.length}
                                    step="0.01"
                                    className="form-input"
                                  />
                                  <ErrorMessage
                                    name={
                                      updateProducAddVariantFormFields.length
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
                                      updateProducAddVariantFormFields.height
                                    }
                                    value={
                                      updateProductAddVariantFormBag.values[
                                        updateProducAddVariantFormFields.height
                                      ]
                                    }
                                    type="number"
                                    min={minimumDimensionSize}
                                    placeholder={placeholders.height}
                                    step="0.01"
                                    className="form-input"
                                  />
                                  <ErrorMessage
                                    name={
                                      updateProducAddVariantFormFields.height
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
                                    name={
                                      updateProducAddVariantFormFields.width
                                    }
                                    value={
                                      updateProductAddVariantFormBag.values[
                                        updateProducAddVariantFormFields.width
                                      ]
                                    }
                                    placeholder={placeholders.width}
                                    type="number"
                                    min={minimumDimensionSize}
                                    step="0.01"
                                    className="form-input"
                                  />
                                  <ErrorMessage
                                    name={
                                      updateProducAddVariantFormFields.width
                                    }
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
                                    name={updateProducAddVariantFormFields.sku}
                                    value={
                                      updateProductAddVariantFormBag.values[
                                        updateProducAddVariantFormFields.sku
                                      ]
                                    }
                                    placeholder={placeholders.sku}
                                    type="text"
                                    className="form-input"
                                  />
                                  <ErrorMessage
                                    name={updateProducAddVariantFormFields.sku}
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
                                      updateProducAddVariantFormFields.quantity
                                    }
                                    value={
                                      updateProductAddVariantFormBag.values[
                                        updateProducAddVariantFormFields
                                          .quantity
                                      ]
                                    }
                                    type="number"
                                    min={minimumQuantity}
                                    placeholder={placeholders.quantity}
                                    step="1"
                                    className="form-input"
                                  />
                                  <ErrorMessage
                                    name={
                                      updateProducAddVariantFormFields.quantity
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
                                  updateProductAddVariantFormBag.submitForm
                                }
                                disabled={buttonDisabled}
                                isLoading={
                                  uploadSkuImage.result.loading ||
                                  createOrUpdateSkus.result.loading ||
                                  updateProductAddVariantFormBag.isSubmitting
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
                )}
              </UpdateProductAttributesComponent>
            </Modal>
          )
        );
      }}
    </NamespacesConsumer>
  );
};

export default AddVariantModal;
