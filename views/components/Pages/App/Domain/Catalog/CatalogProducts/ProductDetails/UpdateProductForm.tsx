import React from "react";
import { ErrorMessage, FastField, Form } from "formik";
import { NamespacesConsumer } from "react-i18next";
import toNumber from "lodash/fp/toNumber";
import isEmpty from "lodash/fp/isEmpty";

const {
  UikFormInputGroup,
  UikWidget,
  UikWidgetContent,
  UikHeadline,
  UikHeadlineDesc,
  UikRadio,
  UikWidgetHeader
} = require("../../../../../../../../@uik");

import {
  updateProductFormFields,
  placeholders
} from "../../../../../../../../constants/formFields";
import localeNamespaceKeys from "../../../../../../../../constants/localization";
import FormField from "../../../../../../Helpers/FormField";
import FormLabel from "../../../../../../Helpers/FormLabel";
import UpdateProductImageDrop from "../../../../../../Helpers/UpdateProductImageDrop";
import ExistingVariations from "./UpdateProductForm/ExistingVariations";
import FormRow from "../../../../../../Helpers/FormRow";
import { UserActionTopBarDropdownContext } from "../../../../../../Contexts/UserActionTopBarDropdown";
import { genderCodesAndLabels } from "../../../../../../../../constants/catalog";
import { IMappedUpdateProductMutations } from "../ProductDetails";
import {
  UpdateProductFormFieldProps,
  UpdateProductFormBag
} from "../../../../../../../../typeDefinitions/catalog/forms";
import { areMutationsLoading } from "../../../../../../../../utils/catalog";
import { ProductNode } from "../../../../../../../../typeDefinitions/__generated__/components";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES,
  DROP_DOWN_BUTTON_TEXT
} from "../../../../../../../../constants/dropDowns";
import UserActionTopBarDropdownSwitch from "../../../../../../Helpers/UserActionTopBarDropdownSwitch";
import { DropDownProps } from "../../../../../../Helpers/UserActionTopBarDropdownSwitch/UserActionTopBarDropdownBase";

interface ITestIds {
  createProduct: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

interface IProps {
  product: ProductNode;
  updateProductFormBag: UpdateProductFormBag;
  updateProductMutations: IMappedUpdateProductMutations;
  refetchProduct: () => void;
}

export const createProductFormTestIds: ITestIds = {
  createProduct: "createProduct"
};

//TODO: localization
//TODO: break form sections into separate components with field renders living inside of static methods to prevent fields from losing focus if using custom component like UikInput
const UpdateProductForm = ({
  updateProductFormBag,
  product,
  updateProductMutations,
  refetchProduct
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
              <Form className="create-product-form">
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
                              name={updateProductFormFields.title}
                              value={
                                updateProductFormBag.values[
                                  updateProductFormFields.title
                                ]
                              }
                              placeholder={placeholders.title}
                              className="form-input"
                              type="text"
                            />
                            <ErrorMessage name={updateProductFormFields.title}>
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
                              name={updateProductFormFields.description}
                              value={
                                updateProductFormBag.values[
                                  updateProductFormFields.description
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
                          updateProductFormFields.images
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
                              .shipping._keyPath
                          }.${
                            localeNamespaceKeys.catalog.product.formLabels
                              .shipping.sectionHeader
                          }`
                        )}
                      </UikWidgetHeader>
                      <UikWidgetContent>
                        <FormField>
                          <FormLabel>HTS Code</FormLabel>
                          <FastField
                            name={updateProductFormFields.htsCode}
                            value={
                              updateProductFormBag.values[
                                updateProductFormFields.htsCode
                              ]
                            }
                            placeholder={placeholders.htsCode}
                            type="text"
                            className="form-input"
                          />
                          <ErrorMessage name={updateProductFormFields.htsCode}>
                            {msg => <div className="error-message">{msg}</div>}
                          </ErrorMessage>
                        </FormField>
                      </UikWidgetContent>
                    </UikWidget>

                    <ExistingVariations
                      product={product}
                      refetchProduct={refetchProduct}
                    />
                  </div>
                  <div className="form-column form-column-right">
                    <UikWidgetContent className="form-column-right-content">
                      <div className="form-right-label">Gender</div>
                      <div className="form-right-sub-label">
                        Who is your product intended for?
                      </div>
                      <UikFormInputGroup>
                        <FastField
                          name={updateProductFormFields.gender}
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
                                      updateProductFormFields.gender,
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

export default UpdateProductForm;
