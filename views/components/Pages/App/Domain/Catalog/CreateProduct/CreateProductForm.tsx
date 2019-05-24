import React from "react";
import { ErrorMessage, FastField, Form, FormikProps, FieldProps } from "formik";
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
} = require("../../../../../../../@uik");

import {
  createProductFormFields,
  placeholders
} from "../../../../../../../constants/formFields";
import localeNamespaceKeys from "../../../../../../../constants/localization";
import FormField from "../../../../../Helpers/FormField";
import FormLabel from "../../../../../Helpers/FormLabel";
import FormRow from "../../../../../Helpers/FormRow";
import NewVariations from "./CreateProductForm/NewVariations";
import {
  genderCodesAndLabels,
  unitsOfWeight,
  unitsOfDimension,
  minimumQuantity,
  minimumDimensionSize
} from "../../../../../../../constants/catalog";
import { CreateProductFormValues } from "../../../../../../../typeDefinitions/catalog/forms";
import { UserActionTopBarDropdownContext } from "../../../../../Contexts/UserActionTopBarDropdown";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES,
  DROP_DOWN_BUTTON_TEXT
} from "../../../../../../../constants/dropDowns";
import { IMappedCreateProductMutations } from "../CreateProduct";
import { areMutationsLoading } from "../../../../../../../utils/catalog";
import UserActionTopBarDropdownSwitch from "../../../../../Helpers/UserActionTopBarDropdownSwitch";
import { DropDownProps } from "../../../../../Helpers/UserActionTopBarDropdownSwitch/UserActionTopBarDropdownBase";
import CreateProductImageDrop from "../../../../../Helpers/CreateProductImageDrop";
import CurrencyField from "../../../../../Helpers/FormFields/CurrencyField";
import {
  getCentsFromDollars,
  getDollarsFromCents
} from "../../../../../../../utils/price";

interface ITestIds {
  createProduct: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

interface IProps {
  createProductFormBag: FormikProps<CreateProductFormValues>;
  mutations: IMappedCreateProductMutations;
}

export const createProductFormTestIds: ITestIds = {
  createProduct: "createProduct"
};

//TODO: localization
//TODO: break form sections into separate components with field renders living inside of static methods to prevent fields from losing focus if using custom component like UikInput
const CreateProductForm = ({ createProductFormBag, mutations }: IProps) => {
  const { showDropDown, close } = React.useContext(
    UserActionTopBarDropdownContext
  );
  React.useEffect(() => {
    if (createProductFormBag.dirty) {
      showDropDown(DROP_DOWN_TYPES.DROP_DOWN_READY, {
        title: DROP_DOWN_TITLES.DROP_DOWN_READY,
        buttonText: DROP_DOWN_BUTTON_TEXT.DROP_DOWN_READY,
        isLoading: areMutationsLoading(mutations),
        buttonProps: {
          type: "submit"
        }
      });
    }
    if (!createProductFormBag.dirty && !isEmpty(createProductFormBag.touched)) {
      close();
    }
  }, [createProductFormBag.dirty, createProductFormBag.values]);

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
              <UikHeadline>Create a product</UikHeadline>
              <UikHeadlineDesc className="form-headline-desc">
                <i className="icofont-eye-alt" /> Save to view and add "Buy Now"
                links, or QR codes.
              </UikHeadlineDesc>
              <Form className="create-product-form">
                <UserActionTopBarDropdownContext.Consumer>
                  {({ dropDownType, dropDownProps, close }) => (
                    <UserActionTopBarDropdownSwitch
                      type={dropDownType}
                      close={close}
                      props={
                        {
                          ...dropDownProps,
                          isLoading:
                            areMutationsLoading(mutations) ||
                            createProductFormBag.isSubmitting
                        } as DropDownProps
                      }
                    />
                  )}
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
                              name={createProductFormFields.title}
                              value={
                                createProductFormBag.values[
                                  createProductFormFields.title
                                ]
                              }
                              placeholder={placeholders.title}
                              className="form-input"
                              type="text"
                            />
                            <ErrorMessage name={createProductFormFields.title}>
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
                              name={createProductFormFields.description}
                              value={
                                createProductFormBag.values[
                                  createProductFormFields.description
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

                    <CreateProductImageDrop
                      imageUploads={
                        createProductFormBag.values[
                          createProductFormFields.imageUploads
                        ]
                      }
                      formBag={createProductFormBag}
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
                              createProductFormBag.setFieldTouched(
                                createProductFormFields.basePrice,
                                true
                              );
                            }}
                            name={createProductFormFields.basePrice}
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
                              createProductFormBag.values.basePrice === ""
                                ? ""
                                : getDollarsFromCents(
                                    createProductFormBag.values.basePrice
                                  )
                            }
                            formBag={createProductFormBag}
                            onValueChange={val => {
                              const cents = parseInt(
                                getCentsFromDollars(val.floatValue) || ""
                              );
                              if (isNaN(cents)) {
                                createProductFormBag.setFieldValue(
                                  createProductFormFields.basePrice,
                                  ""
                                );
                              } else {
                                createProductFormBag.setFieldValue(
                                  createProductFormFields.basePrice,
                                  cents
                                );
                              }
                            }}
                          />
                          <CurrencyField
                            onBlur={() => {
                              createProductFormBag.setFieldTouched(
                                createProductFormFields.salePrice,
                                true
                              );
                            }}
                            name={createProductFormFields.salePrice}
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
                              createProductFormBag.values.salePrice === ""
                                ? ""
                                : getDollarsFromCents(
                                    createProductFormBag.values.salePrice
                                  )
                            }
                            formBag={createProductFormBag}
                            onValueChange={val => {
                              const cents = parseInt(
                                getCentsFromDollars(val.floatValue) || ""
                              );
                              if (isNaN(cents)) {
                                createProductFormBag.setFieldValue(
                                  createProductFormFields.salePrice,
                                  ""
                                );
                              } else {
                                createProductFormBag.setFieldValue(
                                  createProductFormFields.salePrice,
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
                                  name={createProductFormFields.weight}
                                  value={
                                    createProductFormBag.values[
                                      createProductFormFields.weight
                                    ]
                                  }
                                  placeholder={placeholders.weight}
                                  className="form-input"
                                  type="number"
                                  min={minimumDimensionSize}
                                  step="0.01"
                                />
                                <FastField
                                  name={createProductFormFields.unitOfWeight}
                                  value={
                                    createProductFormBag.values[
                                      createProductFormFields.unitOfWeight
                                    ]
                                  }
                                  component={({
                                    field: { value }
                                  }: FieldProps) => (
                                    <UikSelect
                                      options={unitsOfWeight}
                                      value={value}
                                      onChange={(newValue: SelectOption) => {
                                        createProductFormBag.setFieldValue(
                                          createProductFormFields.unitOfWeight,
                                          [newValue]
                                        );
                                      }}
                                    />
                                  )}
                                />
                              </div>
                              <ErrorMessage
                                name={createProductFormFields.weight}
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
                                name={createProductFormFields.htsCode}
                                value={
                                  createProductFormBag.values[
                                    createProductFormFields.htsCode
                                  ]
                                }
                                placeholder={placeholders.htsCode}
                                type="text"
                                className="form-input"
                              />
                              <ErrorMessage
                                name={createProductFormFields.htsCode}
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
                              name={createProductFormFields.unitOfDimensions}
                              value={
                                createProductFormBag.values[
                                  createProductFormFields.unitOfDimensions
                                ]
                              }
                              component={({ field: { value } }: FieldProps) => (
                                <UikSelect
                                  options={unitsOfDimension}
                                  value={value}
                                  onChange={(newValue: SelectOption) => {
                                    createProductFormBag.setFieldValue(
                                      createProductFormFields.unitOfDimensions,
                                      [newValue]
                                    );
                                  }}
                                />
                              )}
                            />
                            <ErrorMessage
                              name={createProductFormFields.unitOfDimensions}
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
                              name={createProductFormFields.length}
                              value={
                                createProductFormBag.values[
                                  createProductFormFields.length
                                ]
                              }
                              placeholder={placeholders.length}
                              type="number"
                              min={minimumDimensionSize}
                              step="0.01"
                              className="form-input"
                            />
                            <ErrorMessage name={createProductFormFields.length}>
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
                              name={createProductFormFields.height}
                              value={
                                createProductFormBag.values[
                                  createProductFormFields.height
                                ]
                              }
                              placeholder={placeholders.height}
                              type="number"
                              min={minimumDimensionSize}
                              step="0.01"
                              className="form-input"
                            />
                            <ErrorMessage name={createProductFormFields.height}>
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
                              name={createProductFormFields.width}
                              value={
                                createProductFormBag.values[
                                  createProductFormFields.width
                                ]
                              }
                              placeholder={placeholders.width}
                              type="number"
                              min={minimumDimensionSize}
                              step="0.01"
                              className="form-input"
                            />
                            <ErrorMessage name={createProductFormFields.width}>
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
                                name={createProductFormFields.sku}
                                value={
                                  createProductFormBag.values[
                                    createProductFormFields.sku
                                  ]
                                }
                                placeholder={placeholders.sku}
                                type="text"
                                className="form-input"
                              />
                              <ErrorMessage name={createProductFormFields.sku}>
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
                                name={createProductFormFields.quantity}
                                value={
                                  createProductFormBag.values[
                                    createProductFormFields.quantity
                                  ]
                                }
                                placeholder={placeholders.quantity}
                                type="number"
                                min={minimumQuantity}
                                step="1"
                                className="form-input"
                              />
                              <ErrorMessage
                                name={createProductFormFields.quantity}
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

                    <NewVariations formBag={createProductFormBag} />
                  </div>
                  <div className="form-column form-column-right">
                    <UikWidgetContent className="form-column-right-content">
                      <div className="form-right-label">Gender</div>
                      <div className="form-right-sub-label">
                        Who is your product intended for?
                      </div>
                      <UikFormInputGroup>
                        <FastField
                          name={createProductFormFields.gender}
                          render={({
                            field
                          }: FieldProps<CreateProductFormValues>) =>
                            genderCodesAndLabels.map(g => {
                              return (
                                <UikRadio
                                  key={g.id}
                                  defaultChecked={
                                    createProductFormBag.values.gender === g.id
                                  }
                                  value={g.id}
                                  label={g.label}
                                  onChange={(
                                    e: React.MouseEvent<HTMLInputElement>
                                  ) =>
                                    createProductFormBag.setFieldValue(
                                      createProductFormFields.gender,
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

export default CreateProductForm;
