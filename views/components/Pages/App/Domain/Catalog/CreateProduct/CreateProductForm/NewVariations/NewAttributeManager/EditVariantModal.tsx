import React from "react";
import { NamespacesConsumer } from "react-i18next";
import Dropzone from "react-dropzone";
import { Formik, FastField, ErrorMessage, FieldProps } from "formik";
import classNames from "classnames";
import keys from "lodash/fp/keys";
import get from "lodash/fp/get";
import isString from "lodash/fp/isString";
import isEmpty from "lodash/fp/isEmpty";
import flow from "lodash/fp/flow";

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
  createProductEditVariantFormFields,
  placeholders
} from "../../../../../../../../../../constants/formFields";
import FormField from "../../../../../../../../Helpers/FormField";
import FormLabel from "../../../../../../../../Helpers/FormLabel";
import localeNamespaceKeys from "../../../../../../../../../../constants/localization";
import { SelectOption } from "../../../CreateProductForm";
import {
  CREATE_PRODUCT_IMAGE_SIZE_LIMIT,
  unitsOfWeight,
  unitsOfDimension,
  minimumQuantity,
  minimumDimensionSize
} from "../../../../../../../../../../constants/catalog";
import Thumbnail from "../../../../../../../../Helpers/Thumbnail";
import { SkuCreationNode } from "../../../../../../../../../../typeDefinitions/catalog";
import {
  getUnitOfWeightByNumber,
  getUnitOfDimensionsByNumber,
  generateSkuFromFormValues
} from "../../../../../../../../../../utils/catalog";
import { createProductEditVariantValidationSchema } from "../../../../../../../../../../utils/formValidation/createProduct";
import CurrencyField from "../../../../../../../../Helpers/FormFields/CurrencyField";
import {
  getDollarsFromCents,
  getCentsFromDollars
} from "../../../../../../../../../../utils/price";

interface IProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleEditedVariant: (newSku: SkuCreationNode) => void;
  sku: SkuCreationNode;
}

// TODO: localization
const EditVariantModal = ({
  sku,
  isModalOpen,
  handleCloseModal,
  handleEditedVariant
}: IProps) => {
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
                validationSchema={createProductEditVariantValidationSchema}
                onSubmit={values => {
                  const newSku = {
                    tempId: sku.tempId,
                    ...generateSkuFromFormValues({
                      ...sku,
                      ...values
                    }),
                    image: values.image
                  };
                  handleEditedVariant(newSku);
                  handleCloseModal();
                }}
                initialValues={{
                  [createProductEditVariantFormFields.image]: get(
                    createProductEditVariantFormFields.image
                  )(sku),
                  [createProductEditVariantFormFields.basePrice]: get(
                    createProductEditVariantFormFields.basePrice
                  )(sku),

                  [createProductEditVariantFormFields.salePrice]:
                    get(createProductEditVariantFormFields.salePrice)(sku) ===
                    null
                      ? undefined
                      : get(createProductEditVariantFormFields.salePrice)(sku),
                  [createProductEditVariantFormFields.weight]: get(
                    createProductEditVariantFormFields.weight
                  )(sku),
                  [createProductEditVariantFormFields.unitOfWeight]: flow(
                    get(createProductEditVariantFormFields.unitOfWeight),
                    getUnitOfWeightByNumber
                  )(sku),
                  [createProductEditVariantFormFields.unitOfDimensions]: flow(
                    get(createProductEditVariantFormFields.unitOfDimensions),
                    getUnitOfDimensionsByNumber
                  )(sku),
                  [createProductEditVariantFormFields.length]: get(
                    createProductEditVariantFormFields.length
                  )(sku),
                  [createProductEditVariantFormFields.width]: get(
                    createProductEditVariantFormFields.width
                  )(sku),
                  [createProductEditVariantFormFields.height]: get(
                    createProductEditVariantFormFields.height
                  )(sku),
                  [createProductEditVariantFormFields.sku]: get(
                    createProductEditVariantFormFields.sku
                  )(sku),
                  [createProductEditVariantFormFields.quantity]: get(
                    createProductEditVariantFormFields.quantity
                  )(sku)
                }}
                render={editVariantFormBag => {
                  const attributes = get("attributes")(sku);
                  const buttonDisabled = !isEmpty(editVariantFormBag.errors);
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
                      <div className="edit-variant-modal-middle">
                        <UikWidgetContent>
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
                                {Object.values(attributes).map(
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
                                    editVariantFormBag.setFieldValue(
                                      createProductEditVariantFormFields.image,
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
                                      {editVariantFormBag.values.image ? (
                                        <React.Fragment>
                                          {isString(
                                            editVariantFormBag.values.image
                                          ) ? (
                                            <Thumbnail
                                              url={
                                                editVariantFormBag.values.image
                                              }
                                            />
                                          ) : (
                                            <Thumbnail
                                              file={
                                                editVariantFormBag.values.image
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

                          <UikFormInputGroup>
                            <h4>Pricing</h4>
                            <CurrencyField
                              onBlur={() => {
                                editVariantFormBag.setFieldTouched(
                                  createProductEditVariantFormFields.basePrice,
                                  true
                                );
                              }}
                              name={
                                createProductEditVariantFormFields.basePrice
                              }
                              label={t(
                                `${
                                  localeNamespaceKeys.catalog.product.formLabels
                                    .pricing._keyPath
                                }.${
                                  localeNamespaceKeys.catalog.product.formLabels
                                    .pricing.basePrice
                                }`
                              )}
                              placeholder={placeholders.basePrice}
                              value={
                                editVariantFormBag.values.basePrice === ""
                                  ? ""
                                  : getDollarsFromCents(
                                      editVariantFormBag.values.basePrice
                                    )
                              }
                              formBag={editVariantFormBag}
                              onValueChange={val => {
                                const cents = parseInt(
                                  getCentsFromDollars(val.floatValue) || ""
                                );
                                if (isNaN(cents)) {
                                  editVariantFormBag.setFieldValue(
                                    createProductEditVariantFormFields.basePrice,
                                    ""
                                  );
                                } else {
                                  editVariantFormBag.setFieldValue(
                                    createProductEditVariantFormFields.basePrice,
                                    cents
                                  );
                                }
                              }}
                            />
                          </UikFormInputGroup>

                          <UikFormInputGroup>
                            <CurrencyField
                              onBlur={() => {
                                editVariantFormBag.setFieldTouched(
                                  createProductEditVariantFormFields.salePrice,
                                  true
                                );
                              }}
                              name={
                                createProductEditVariantFormFields.salePrice
                              }
                              label={t(
                                `${
                                  localeNamespaceKeys.catalog.product.formLabels
                                    .pricing._keyPath
                                }.${
                                  localeNamespaceKeys.catalog.product.formLabels
                                    .pricing.salePrice
                                }`
                              )}
                              placeholder={placeholders.salePrice}
                              value={
                                editVariantFormBag.values.salePrice === ""
                                  ? ""
                                  : getDollarsFromCents(
                                      editVariantFormBag.values.salePrice
                                    )
                              }
                              formBag={editVariantFormBag}
                              onValueChange={val => {
                                const cents = parseInt(
                                  getCentsFromDollars(val.floatValue) || ""
                                );
                                if (isNaN(cents)) {
                                  editVariantFormBag.setFieldValue(
                                    createProductEditVariantFormFields.salePrice,
                                    ""
                                  );
                                } else {
                                  editVariantFormBag.setFieldValue(
                                    createProductEditVariantFormFields.salePrice,
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
                                    createProductEditVariantFormFields.weight
                                  }
                                  value={
                                    editVariantFormBag.values[
                                      createProductEditVariantFormFields.weight
                                    ]
                                  }
                                  placeholder={placeholders.weight}
                                  className="form-input"
                                  type="number"
                                  min={minimumDimensionSize}
                                  step="0.01"
                                />
                              </FormField>

                              <FastField
                                name={
                                  createProductEditVariantFormFields.unitOfWeight
                                }
                                value={
                                  editVariantFormBag.values[
                                    createProductEditVariantFormFields
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
                                      editVariantFormBag.setFieldValue(
                                        createProductEditVariantFormFields.unitOfWeight,
                                        [newValue]
                                      );
                                    }}
                                  />
                                )}
                              />
                            </div>
                            <ErrorMessage
                              name={createProductEditVariantFormFields.weight}
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
                                  createProductEditVariantFormFields.unitOfDimensions
                                }
                                value={
                                  editVariantFormBag.values[
                                    createProductEditVariantFormFields
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
                                      editVariantFormBag.setFieldValue(
                                        createProductEditVariantFormFields.unitOfDimensions,
                                        [newValue]
                                      );
                                    }}
                                  />
                                )}
                              />
                              <ErrorMessage
                                name={
                                  createProductEditVariantFormFields.unitOfDimensions
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
                                name={createProductEditVariantFormFields.length}
                                value={
                                  editVariantFormBag.values[
                                    createProductEditVariantFormFields.length
                                  ]
                                }
                                placeholder={placeholders.length}
                                type="number"
                                min={minimumDimensionSize}
                                step="0.01"
                                className="form-input"
                              />
                              <ErrorMessage
                                name={createProductEditVariantFormFields.length}
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
                                name={createProductEditVariantFormFields.height}
                                value={
                                  editVariantFormBag.values[
                                    createProductEditVariantFormFields.height
                                  ]
                                }
                                placeholder={placeholders.height}
                                type="number"
                                min={minimumDimensionSize}
                                step="0.01"
                                className="form-input"
                              />
                              <ErrorMessage
                                name={createProductEditVariantFormFields.height}
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
                                name={createProductEditVariantFormFields.width}
                                value={
                                  editVariantFormBag.values[
                                    createProductEditVariantFormFields.width
                                  ]
                                }
                                placeholder={placeholders.width}
                                type="number"
                                min={minimumDimensionSize}
                                step="0.01"
                                className="form-input"
                              />
                              <ErrorMessage
                                name={createProductEditVariantFormFields.width}
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
                                name={createProductEditVariantFormFields.sku}
                                value={
                                  editVariantFormBag.values[
                                    createProductEditVariantFormFields.sku
                                  ]
                                }
                                placeholder={placeholders.sku}
                                type="text"
                                className="form-input"
                              />
                              <ErrorMessage
                                name={createProductEditVariantFormFields.sku}
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
                                  createProductEditVariantFormFields.quantity
                                }
                                value={
                                  editVariantFormBag.values[
                                    createProductEditVariantFormFields.quantity
                                  ]
                                }
                                placeholder={placeholders.quantity}
                                type="number"
                                min={minimumQuantity}
                                step="1"
                                className="form-input"
                              />
                              <ErrorMessage
                                name={
                                  createProductEditVariantFormFields.quantity
                                }
                              >
                                {msg => (
                                  <div className="error-message">{msg}</div>
                                )}
                              </ErrorMessage>
                            </FormField>
                          </UikFormInputGroup>
                        </UikWidgetContent>
                      </div>
                      <UikWidgetContent>
                        <UikFormInputGroup>
                          <UikButton
                            success
                            onClick={editVariantFormBag.submitForm}
                            disabled={buttonDisabled}
                            className={classNames({
                              "uik-button-disabled": buttonDisabled
                            })}
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
};

export default EditVariantModal;
