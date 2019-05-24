import React from "react";
import { ErrorMessage, FastField, Form, FieldProps } from "formik";
import { NamespacesConsumer } from "react-i18next";
import toNumber from "lodash/fp/toNumber";
import isEmpty from "lodash/fp/isEmpty";

const {
  UikSelect,
  UikContentTitle,
  UikFormInputGroup,
  UikWidget,
  UikWidgetHeader,
  UikWidgetContent,
  UikHeadline,
  UikHeadlineDesc,
  UikRadio
} = require("../../../../../../../../@uik");

import {
  updateSimpleProductFormFields,
  placeholders
} from "../../../../../../../../constants/formFields";
import localeNamespaceKeys from "../../../../../../../../constants/localization";
import FormField from "../../../../../../Helpers/FormField";
import FormLabel from "../../../../../../Helpers/FormLabel";
import UpdateProductImageDrop from "../../../../../../Helpers/UpdateProductImageDrop";
import FormRow from "../../../../../../Helpers/FormRow";
import {
  genderCodesAndLabels,
  unitsOfWeight,
  unitsOfDimension,
  minimumQuantity,
  minimumDimensionSize
} from "../../../../../../../../constants/catalog";
import { IMappedUpdateProductMutations } from "../ProductDetails";
import {
  UpdateSimpleProductFormBag,
  UpdateProductFormFieldProps
} from "../../../../../../../../typeDefinitions/catalog/forms";
import NewVariations from "../../CreateProduct/CreateProductForm/NewVariations";
import { ProductNode } from "../../../../../../../../typeDefinitions/__generated__/components";
import { UserActionTopBarDropdownContext } from "../../../../../../Contexts/UserActionTopBarDropdown";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES,
  DROP_DOWN_BUTTON_TEXT
} from "../../../../../../../../constants/dropDowns";
import { areMutationsLoading } from "../../../../../../../../utils/catalog";
import UserActionTopBarDropdownSwitch from "../../../../../../Helpers/UserActionTopBarDropdownSwitch";
import { DropDownProps } from "../../../../../../Helpers/UserActionTopBarDropdownSwitch/UserActionTopBarDropdownBase";
import {
  getCentsFromDollars,
  getDollarsFromCents
} from "../../../../../../../../utils/price";
import CurrencyField from "../../../../../../Helpers/FormFields/CurrencyField";

interface ITestIds {
  createProduct: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

interface IProps {
  product: ProductNode;
  updateProductFormBag: UpdateSimpleProductFormBag;
  updateProductMutations: IMappedUpdateProductMutations;
}

export const createProductFormTestIds: ITestIds = {
  createProduct: "createProduct"
};

//TODO: localization
//TODO: break form sections into separate components with field renders living inside of static methods to prevent fields from losing focus if using custom component like UikInput
const UpdateSimpleProductForm = ({
  updateProductFormBag,
  product,
  updateProductMutations
}: IProps) => {
  const { showDropDown, close } = React.useContext(
    UserActionTopBarDropdownContext
  );
  React.useEffect(() => {
    if (updateProductFormBag.dirty) {
      showDropDown(DROP_DOWN_TYPES.DROP_DOWN_READY, {
        title: DROP_DOWN_TITLES.DROP_DOWN_READY,
        buttonText: DROP_DOWN_BUTTON_TEXT.DROP_DOWN_READY,
        isLoading: areMutationsLoading(updateProductMutations),
        buttonProps: {
          type: "submit"
        }
      });
    }
    if (!updateProductFormBag.dirty && !isEmpty(updateProductFormBag.touched)) {
      close();
    }
  }, [updateProductFormBag.dirty, updateProductFormBag.values]);

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
            <div>
              <UikHeadline>{product.name}</UikHeadline>
              <UikHeadlineDesc className="form-headline-desc">
                <i className="icofont-eye-alt" /> Preview
              </UikHeadlineDesc>
              <Form className="update-simple-product-form">
                <UserActionTopBarDropdownContext.Consumer>
                  {({ dropDownType, dropDownProps, close }) => {
                    return (
                      <UserActionTopBarDropdownSwitch
                        type={dropDownType}
                        close={close}
                        props={
                          {
                            ...dropDownProps,
                            isLoading:
                              areMutationsLoading(updateProductMutations) ||
                              updateProductFormBag.isSubmitting
                          } as DropDownProps
                        }
                      />
                    );
                  }}
                </UserActionTopBarDropdownContext.Consumer>
                <div className="form-columns">
                  <div className="form-column">
                    <UikWidget>
                      <UikWidgetContent>
                        <FormRow>
                          <FormField>
                            <FormLabel>
                              {t(
                                `${
                                  localeNamespaceKeys.catalog.product.formLabels
                                    .productInfo._keyPath
                                }.${
                                  localeNamespaceKeys.catalog.product.formLabels
                                    .productInfo.title
                                }`
                              )}
                            </FormLabel>
                            <FastField
                              name={updateSimpleProductFormFields.title}
                              value={
                                updateProductFormBag.values[
                                  updateSimpleProductFormFields.title
                                ]
                              }
                              placeholder={placeholders.title}
                              className="form-input"
                              type="text"
                            />
                            <ErrorMessage
                              name={updateSimpleProductFormFields.title}
                            >
                              {msg => (
                                <div className="error-message">{msg}</div>
                              )}
                            </ErrorMessage>
                          </FormField>
                        </FormRow>
                        <FormRow>
                          <FormField>
                            <FormLabel>
                              {t(
                                `${
                                  localeNamespaceKeys.catalog.product.formLabels
                                    .productInfo._keyPath
                                }.${
                                  localeNamespaceKeys.catalog.product.formLabels
                                    .productInfo.description
                                }`
                              )}
                            </FormLabel>
                            <FastField
                              name={updateSimpleProductFormFields.description}
                              value={
                                updateProductFormBag.values[
                                  updateSimpleProductFormFields.description
                                ]
                              }
                              placeholder={placeholders.description}
                              component="textarea"
                              className="form-input-lg"
                            />
                          </FormField>
                        </FormRow>
                      </UikWidgetContent>
                    </UikWidget>

                    <UpdateProductImageDrop
                      images={
                        updateProductFormBag.values[
                          updateSimpleProductFormFields.images
                        ]
                      }
                      formBag={updateProductFormBag}
                      product={product}
                    />

                    <UikWidget>
                      <UikWidgetHeader>
                        {t(
                          `${
                            localeNamespaceKeys.catalog.product.formLabels
                              .pricing._keyPath
                          }.${
                            localeNamespaceKeys.catalog.product.formLabels
                              .pricing.sectionHeader
                          }`
                        )}
                      </UikWidgetHeader>
                      <UikWidgetContent>
                        <UikFormInputGroup direction="horizontal">
                          <CurrencyField
                            onBlur={() => {
                              updateProductFormBag.setFieldTouched(
                                updateSimpleProductFormFields.basePrice,
                                true
                              );
                            }}
                            name={updateSimpleProductFormFields.basePrice}
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
                              updateProductFormBag.values.basePrice === ""
                                ? ""
                                : getDollarsFromCents(
                                    updateProductFormBag.values.basePrice
                                  )
                            }
                            formBag={updateProductFormBag}
                            onValueChange={val => {
                              const cents = parseInt(
                                getCentsFromDollars(val.floatValue) || ""
                              );
                              if (isNaN(cents)) {
                                updateProductFormBag.setFieldValue(
                                  updateSimpleProductFormFields.basePrice,
                                  ""
                                );
                              } else {
                                updateProductFormBag.setFieldValue(
                                  updateSimpleProductFormFields.basePrice,
                                  cents
                                );
                              }
                            }}
                          />
                          <CurrencyField
                            onBlur={() => {
                              updateProductFormBag.setFieldTouched(
                                updateSimpleProductFormFields.basePrice,
                                true
                              );
                            }}
                            name={updateSimpleProductFormFields.salePrice}
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
                              updateProductFormBag.values.salePrice === ""
                                ? ""
                                : getDollarsFromCents(
                                    updateProductFormBag.values.salePrice
                                  )
                            }
                            formBag={updateProductFormBag}
                            onValueChange={val => {
                              const cents = parseInt(
                                getCentsFromDollars(val.floatValue) || ""
                              );
                              if (isNaN(cents)) {
                                updateProductFormBag.setFieldValue(
                                  updateSimpleProductFormFields.salePrice,
                                  ""
                                );
                              } else {
                                updateProductFormBag.setFieldValue(
                                  updateSimpleProductFormFields.salePrice,
                                  cents
                                );
                              }
                            }}
                          />
                        </UikFormInputGroup>
                      </UikWidgetContent>
                    </UikWidget>

                    <UikWidget>
                      <UikWidgetHeader>
                        {t(
                          `${
                            localeNamespaceKeys.catalog.product.formLabels
                              .shipping._keyPath
                          }.${
                            localeNamespaceKeys.catalog.product.formLabels
                              .shipping.sectionHeader
                          }`
                        )}
                      </UikWidgetHeader>
                      <UikWidgetContent>
                        <UikFormInputGroup direction="horizontal">
                          <UikFormInputGroup>
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
                              <div className="form-input-select">
                                <FastField
                                  name={updateSimpleProductFormFields.weight}
                                  value={
                                    updateProductFormBag.values[
                                      updateSimpleProductFormFields.weight
                                    ]
                                  }
                                  placeholder={placeholders.weight}
                                  className="form-input"
                                  type="number"
                                  min={minimumDimensionSize}
                                  step="0.01"
                                />
                                <FastField
                                  name={
                                    updateSimpleProductFormFields.unitOfWeight
                                  }
                                  value={
                                    updateProductFormBag.values[
                                      updateSimpleProductFormFields.unitOfWeight
                                    ]
                                  }
                                  component={({
                                    field: { value }
                                  }: FieldProps) => (
                                    <UikSelect
                                      options={unitsOfWeight}
                                      value={value}
                                      onChange={(newValue: SelectOption) => {
                                        updateProductFormBag.setFieldValue(
                                          updateSimpleProductFormFields.unitOfWeight,
                                          [newValue]
                                        );
                                      }}
                                    />
                                  )}
                                />
                              </div>
                              <ErrorMessage
                                name={updateSimpleProductFormFields.weight}
                              >
                                {msg => (
                                  <div className="error-message">{msg}</div>
                                )}
                              </ErrorMessage>
                            </FormField>
                          </UikFormInputGroup>
                          <UikFormInputGroup>
                            <FormField>
                              <FormLabel>HTS Code</FormLabel>
                              <FastField
                                name={updateSimpleProductFormFields.htsCode}
                                value={
                                  updateProductFormBag.values[
                                    updateSimpleProductFormFields.htsCode
                                  ]
                                }
                                placeholder={placeholders.htsCode}
                                type="text"
                                className="form-input"
                              />
                              <ErrorMessage
                                name={updateSimpleProductFormFields.htsCode}
                              >
                                {msg => (
                                  <div className="error-message">{msg}</div>
                                )}
                              </ErrorMessage>
                            </FormField>
                          </UikFormInputGroup>
                        </UikFormInputGroup>
                      </UikWidgetContent>
                      <UikWidgetContent>
                        <UikContentTitle>
                          {t(
                            `${
                              localeNamespaceKeys.catalog.product.formLabels
                                .shipping._keyPath
                            }.${
                              localeNamespaceKeys.catalog.product.formLabels
                                .shipping.dimensions
                            }`
                          )}
                        </UikContentTitle>
                        <FormRow>
                          <FormField>
                            <FormLabel>
                              {t(
                                `${
                                  localeNamespaceKeys.catalog.product.formLabels
                                    .shipping._keyPath
                                }.${
                                  localeNamespaceKeys.catalog.product.formLabels
                                    .shipping.unitOfMeasure
                                }`
                              )}
                            </FormLabel>
                            <FastField
                              name={
                                updateSimpleProductFormFields.unitOfDimensions
                              }
                              value={
                                updateProductFormBag.values[
                                  updateSimpleProductFormFields.unitOfDimensions
                                ]
                              }
                              component={({ field: { value } }: FieldProps) => (
                                <UikSelect
                                  options={unitsOfDimension}
                                  value={value}
                                  onChange={(newValue: SelectOption) => {
                                    updateProductFormBag.setFieldValue(
                                      updateSimpleProductFormFields.unitOfDimensions,
                                      [newValue]
                                    );
                                  }}
                                />
                              )}
                            />
                            <ErrorMessage
                              name={
                                updateSimpleProductFormFields.unitOfDimensions
                              }
                            >
                              {msg => (
                                <div className="error-message">{msg}</div>
                              )}
                            </ErrorMessage>
                          </FormField>
                        </FormRow>
                        <UikFormInputGroup direction="horizontal">
                          <FormField>
                            <FormLabel>
                              {t(
                                `${
                                  localeNamespaceKeys.catalog.product.formLabels
                                    .shipping._keyPath
                                }.${
                                  localeNamespaceKeys.catalog.product.formLabels
                                    .shipping.length
                                }`
                              )}
                            </FormLabel>
                            <FastField
                              name={updateSimpleProductFormFields.length}
                              value={
                                updateProductFormBag.values[
                                  updateSimpleProductFormFields.length
                                ]
                              }
                              placeholder={placeholders.length}
                              type="number"
                              min={minimumDimensionSize}
                              step="0.01"
                              className="form-input"
                            />
                            <ErrorMessage
                              name={updateSimpleProductFormFields.length}
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
                                  localeNamespaceKeys.catalog.product.formLabels
                                    .shipping._keyPath
                                }.${
                                  localeNamespaceKeys.catalog.product.formLabels
                                    .shipping.height
                                }`
                              )}
                            </FormLabel>
                            <FastField
                              name={updateSimpleProductFormFields.height}
                              value={
                                updateProductFormBag.values[
                                  updateSimpleProductFormFields.height
                                ]
                              }
                              placeholder={placeholders.height}
                              type="number"
                              min={minimumDimensionSize}
                              step="0.01"
                              className="form-input"
                            />
                            <ErrorMessage
                              name={updateSimpleProductFormFields.height}
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
                                  localeNamespaceKeys.catalog.product.formLabels
                                    .shipping._keyPath
                                }.${
                                  localeNamespaceKeys.catalog.product.formLabels
                                    .shipping.width
                                }`
                              )}
                            </FormLabel>
                            <FastField
                              name={updateSimpleProductFormFields.width}
                              value={
                                updateProductFormBag.values[
                                  updateSimpleProductFormFields.width
                                ]
                              }
                              placeholder={placeholders.width}
                              type="number"
                              min={minimumDimensionSize}
                              step="0.01"
                              className="form-input"
                            />
                            <ErrorMessage
                              name={updateSimpleProductFormFields.width}
                            >
                              {msg => (
                                <div className="error-message">{msg}</div>
                              )}
                            </ErrorMessage>
                          </FormField>
                        </UikFormInputGroup>
                      </UikWidgetContent>
                    </UikWidget>

                    <UikWidget>
                      <UikWidgetHeader>
                        {t(
                          `${
                            localeNamespaceKeys.catalog.product.formLabels
                              .inventory._keyPath
                          }.${
                            localeNamespaceKeys.catalog.product.formLabels
                              .inventory.sectionHeader
                          }`
                        )}
                      </UikWidgetHeader>
                      <UikWidgetContent>
                        <FormRow>
                          <UikFormInputGroup direction="horizontal">
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
                                name={updateSimpleProductFormFields.sku}
                                value={
                                  updateProductFormBag.values[
                                    updateSimpleProductFormFields.sku
                                  ]
                                }
                                placeholder={placeholders.sku}
                                type="text"
                                className="form-input"
                              />
                              <ErrorMessage
                                name={updateSimpleProductFormFields.sku}
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
                                name={updateSimpleProductFormFields.quantity}
                                value={
                                  updateProductFormBag.values[
                                    updateSimpleProductFormFields.quantity
                                  ]
                                }
                                placeholder={placeholders.quantity}
                                type="number"
                                min={minimumQuantity}
                                step="1"
                                className="form-input"
                              />
                              <ErrorMessage
                                name={updateSimpleProductFormFields.quantity}
                              >
                                {msg => (
                                  <div className="error-message">{msg}</div>
                                )}
                              </ErrorMessage>
                            </FormField>
                          </UikFormInputGroup>
                        </FormRow>
                      </UikWidgetContent>
                    </UikWidget>

                    <NewVariations formBag={updateProductFormBag} />
                  </div>
                  <div className="form-column form-column-right">
                    <UikWidgetContent className="form-column-right-content">
                      <div className="form-right-label">Gender</div>
                      <div className="form-right-sub-label">
                        Who is your product intended for?
                      </div>
                      <UikFormInputGroup>
                        <FastField
                          name={updateSimpleProductFormFields.gender}
                          render={({ field }: UpdateProductFormFieldProps) =>
                            genderCodesAndLabels.map(g => {
                              return (
                                <UikRadio
                                  key={g.id}
                                  defaultChecked={
                                    updateProductFormBag.values.gender === g.id
                                  }
                                  value={g.id}
                                  label={g.label}
                                  onChange={(
                                    e: React.MouseEvent<HTMLInputElement>
                                  ) =>
                                    updateProductFormBag.setFieldValue(
                                      updateSimpleProductFormFields.gender,
                                      toNumber(e.currentTarget.value)
                                    )
                                  }
                                  onBlur={field.onBlur}
                                  name="rgroup"
                                />
                              );
                            })
                          }
                        />
                      </UikFormInputGroup>
                    </UikWidgetContent>
                  </div>
                </div>
              </Form>
            </div>
          )
        );
      }}
    </NamespacesConsumer>
  );
};

export default UpdateSimpleProductForm;
