import React from "react";
import { ErrorMessage, FastField, FormikProps, FieldProps } from "formik";
import { NamespacesConsumer } from "react-i18next";
import isEmpty from "lodash/fp/isEmpty";
import classnames from "classnames";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const {
  UikWidget,
  UikWidgetContent,
  UikWidgetHeader,
  UikSelect,
  UikFormInputGroup
} = require("../../../../../../../@uik");

import { CountrySelectContext } from "../../../../../Contexts/CountrySelect";
import { CountryRegionContext } from "../../../../../Contexts/CountryRegion";
import { settingDetailFormFields } from "../../../../../../../constants/formFields";
import localeNamespaceKeys from "../../../../../../../constants/localization";
import { currencies } from "../../../../../../../constants/setting";
import FormField from "../../../../../Helpers/FormField";
import FormLabel from "../../../../../Helpers/FormLabel";
import { SettingFormValues } from "../../../../../../../typeDefinitions/setting/forms";
import { UserActionTopBarDropdownContext } from "../../../../../Contexts/UserActionTopBarDropdown";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES,
  DROP_DOWN_BUTTON_TEXT
} from "../../../../../../../constants/dropDowns";
import { IMappedSettingFormMutations } from "../../../../../../../utils/setting";
import { areMutationsLoading } from "../../../../../../../utils/setting";

interface IProps {
  businessDetailFormBag: FormikProps<SettingFormValues>;
  mutations: IMappedSettingFormMutations;
}
export interface SelectOption {
  label: string;
  value: string;
}
const BusinessForm = ({ businessDetailFormBag, mutations }: IProps) => {
  const { showDropDown, close } = React.useContext(
    UserActionTopBarDropdownContext
  );
  const { setCountry, setRegion } = React.useContext(CountrySelectContext);
  React.useEffect(() => {
    if (businessDetailFormBag.dirty) {
      showDropDown(DROP_DOWN_TYPES.DROP_DOWN_READY, {
        title: DROP_DOWN_TITLES.DROP_DOWN_READY,
        buttonText: DROP_DOWN_BUTTON_TEXT.DROP_DOWN_READY,
        isLoading: areMutationsLoading(mutations),
        buttonProps: {
          type: "submit"
        }
      });
    }
    if (
      !businessDetailFormBag.dirty &&
      isEmpty(businessDetailFormBag.touched)
    ) {
      close();
    }
    setCountry(
      businessDetailFormBag.values[
        settingDetailFormFields.businessDetails.country
      ]
    );
    setRegion(
      businessDetailFormBag.values[
        settingDetailFormFields.businessDetails.state
      ]
    );
  }, [businessDetailFormBag.dirty, businessDetailFormBag.values]);

  return (
    <NamespacesConsumer
      ns={[
        localeNamespaceKeys.setting._name,
        localeNamespaceKeys.formValidation._name
      ]}
    >
      {(t, { ready }) => {
        return (
          ready && (
            <div>
              <UikWidget
                className={classnames({
                  "setting-section": true
                })}
              >
                <UikWidgetHeader className="section-header">
                  <span className="title">
                    {t(`${localeNamespaceKeys.setting.businessDetails._name}`)}
                  </span>
                  <br />
                  <span className="description">
                    {t(`${localeNamespaceKeys.setting.businessDetails.header}`)}
                  </span>
                </UikWidgetHeader>
                <UikWidgetContent className="section-content">
                  <UikFormInputGroup direction="horizontal">
                    <FormField>
                      <FormLabel>
                        {t(
                          `${
                            localeNamespaceKeys.setting.businessDetails
                              .companyName
                          }`
                        )}
                      </FormLabel>
                      <FastField
                        name={
                          settingDetailFormFields.businessDetails.companyName
                        }
                        value={
                          businessDetailFormBag.values[
                            settingDetailFormFields.businessDetails.companyName
                          ]
                        }
                        className="uik-input__input"
                        type="text"
                      />
                      <ErrorMessage
                        name={
                          settingDetailFormFields.businessDetails.companyName
                        }
                      >
                        {msg => <div className="error-message">{msg}</div>}
                      </ErrorMessage>
                    </FormField>
                    <FormField>
                      <FormLabel>
                        {t(
                          `${localeNamespaceKeys.setting.businessDetails.email}`
                        )}
                      </FormLabel>
                      <FastField
                        name={settingDetailFormFields.businessDetails.email}
                        value={
                          businessDetailFormBag.values[
                            settingDetailFormFields.businessDetails.email
                          ]
                        }
                        className="uik-input__input"
                        type="text"
                      />
                      <ErrorMessage
                        name={settingDetailFormFields.businessDetails.email}
                      >
                        {msg => <div className="error-message">{msg}</div>}
                      </ErrorMessage>
                    </FormField>
                  </UikFormInputGroup>
                  <UikFormInputGroup direction="horizontal">
                    <FormField>
                      <FormLabel>
                        {t(
                          `${
                            localeNamespaceKeys.setting.businessDetails
                              .customerSupportNumber
                          }`
                        )}
                      </FormLabel>
                      <FastField
                        name={
                          settingDetailFormFields.businessDetails
                            .customerSupportNumber
                        }
                        value={
                          businessDetailFormBag.values[
                            settingDetailFormFields.businessDetails
                              .customerSupportNumber
                          ]
                        }
                        className="uik-input__input"
                        type="text"
                      />
                      <ErrorMessage
                        name={
                          settingDetailFormFields.businessDetails
                            .customerSupportNumber
                        }
                      >
                        {msg => <div className="error-message">{msg}</div>}
                      </ErrorMessage>
                    </FormField>
                    <FormField>
                      <FormLabel>
                        {t(
                          `${
                            localeNamespaceKeys.setting.businessDetails.currency
                          }`
                        )}
                      </FormLabel>
                      <FastField
                        name={settingDetailFormFields.businessDetails.currency}
                        value={
                          businessDetailFormBag.values[
                            settingDetailFormFields.businessDetails.currency
                          ]
                        }
                        component={({ field: { value } }: FieldProps) => (
                          <UikSelect
                            className="business-form-select"
                            options={currencies}
                            value={value}
                            onChange={(newValue: SelectOption) => {
                              businessDetailFormBag.setFieldValue(
                                settingDetailFormFields.businessDetails
                                  .currency,
                                [newValue]
                              );
                            }}
                          />
                        )}
                      />
                      <ErrorMessage
                        name={settingDetailFormFields.businessDetails.currency}
                      >
                        {msg => <div className="error-message">{msg}</div>}
                      </ErrorMessage>
                    </FormField>
                  </UikFormInputGroup>
                  <UikFormInputGroup direction="horizontal">
                    <FormField>
                      <FormLabel>
                        {t(
                          `${
                            localeNamespaceKeys.setting.businessDetails.address1
                          }`
                        )}
                      </FormLabel>
                      <FastField
                        name={settingDetailFormFields.businessDetails.address1}
                        value={
                          businessDetailFormBag.values[
                            settingDetailFormFields.businessDetails.address1
                          ]
                        }
                        className="uik-input__input"
                        type="text"
                      />
                      <ErrorMessage
                        name={settingDetailFormFields.businessDetails.address1}
                      >
                        {msg => <div className="error-message">{msg}</div>}
                      </ErrorMessage>
                    </FormField>
                    <FormField>
                      <FormLabel>
                        {t(
                          `${
                            localeNamespaceKeys.setting.businessDetails.address2
                          }`
                        )}
                      </FormLabel>
                      <FastField
                        name={settingDetailFormFields.businessDetails.address2}
                        value={
                          businessDetailFormBag.values[
                            settingDetailFormFields.businessDetails.address2
                          ]
                        }
                        className="uik-input__input"
                        type="text"
                      />
                      <ErrorMessage
                        name={settingDetailFormFields.businessDetails.address2}
                      >
                        {msg => <div className="error-message">{msg}</div>}
                      </ErrorMessage>
                    </FormField>
                  </UikFormInputGroup>
                  <UikFormInputGroup direction="horizontal">
                    <FormField>
                      <FormLabel>
                        {t(
                          `${localeNamespaceKeys.setting.businessDetails.city}`
                        )}
                      </FormLabel>
                      <FastField
                        name={settingDetailFormFields.businessDetails.city}
                        value={
                          businessDetailFormBag.values[
                            settingDetailFormFields.businessDetails.city
                          ]
                        }
                        className="uik-input__input"
                        type="text"
                      />
                      <ErrorMessage
                        name={settingDetailFormFields.businessDetails.city}
                      >
                        {msg => <div className="error-message">{msg}</div>}
                      </ErrorMessage>
                    </FormField>
                    <FormField>
                      <FormLabel>
                        {t(
                          `${
                            localeNamespaceKeys.setting.businessDetails.country
                          }`
                        )}
                      </FormLabel>
                      <FastField
                        name={settingDetailFormFields.businessDetails.country}
                        value={
                          businessDetailFormBag.values[
                            settingDetailFormFields.businessDetails.country
                          ]
                        }
                        component={({ field: { value } }: FieldProps) => (
                          <CountryDropdown
                            className="custom-select business-form-select"
                            value={value}
                            onChange={newValue => {
                              businessDetailFormBag.setFieldValue(
                                settingDetailFormFields.businessDetails.country,
                                newValue
                              );
                            }}
                          />
                        )}
                      />
                      <ErrorMessage
                        name={settingDetailFormFields.businessDetails.country}
                      >
                        {msg => <div className="error-message">{msg}</div>}
                      </ErrorMessage>
                    </FormField>
                  </UikFormInputGroup>
                  <UikFormInputGroup direction="horizontal">
                    <FormField>
                      <FormLabel>
                        {t(
                          `${
                            localeNamespaceKeys.setting.businessDetails.zipCode
                          }`
                        )}
                      </FormLabel>
                      <FastField
                        name={settingDetailFormFields.businessDetails.zipCode}
                        value={
                          businessDetailFormBag.values[
                            settingDetailFormFields.businessDetails.zipCode
                          ]
                        }
                        className="uik-input__input"
                        type="text"
                      />
                      <ErrorMessage
                        name={settingDetailFormFields.businessDetails.zipCode}
                      >
                        {msg => <div className="error-message">{msg}</div>}
                      </ErrorMessage>
                    </FormField>
                    <FormField>
                      <FormLabel>
                        {t(
                          `${localeNamespaceKeys.setting.businessDetails.state}`
                        )}
                      </FormLabel>
                      <FastField
                        name={settingDetailFormFields.businessDetails.state}
                        value={
                          businessDetailFormBag.values[
                            settingDetailFormFields.businessDetails.state
                          ]
                        }
                        component={({ field: { value } }: FieldProps) => (
                          <CountrySelectContext.Consumer>
                            {({ Country }) => (
                              <RegionDropdown
                                className="custom-select business-form-select"
                                value={value}
                                country={Country}
                                onChange={newValue => {
                                  businessDetailFormBag.setFieldValue(
                                    settingDetailFormFields.businessDetails
                                      .state,
                                    newValue
                                  );
                                }}
                              />
                            )}
                          </CountrySelectContext.Consumer>
                        )}
                      />
                      <ErrorMessage
                        name={settingDetailFormFields.businessDetails.state}
                      >
                        {msg => <div className="error-message">{msg}</div>}
                      </ErrorMessage>
                    </FormField>
                  </UikFormInputGroup>
                  <UikFormInputGroup direction="horizontal">
                    <FormField>
                      <FormLabel>
                        {t(
                          `${localeNamespaceKeys.setting.businessDetails.state}`
                        )}
                      </FormLabel>
                      <FastField
                        name={settingDetailFormFields.businessDetails.currency}
                        value={
                          businessDetailFormBag.values[
                            settingDetailFormFields.businessDetails.currency
                          ]
                        }
                        component={({ field: { value } }: FieldProps) => (
                          <CountryRegionContext.Consumer>
                            {({ Country }) => (
                              <UikSelect
                                className="business-form-select"
                                options={Country}
                                value={value}
                                onChange={(newValue: SelectOption) => {
                                  businessDetailFormBag.setFieldValue(
                                    settingDetailFormFields.businessDetails
                                      .currency,
                                    [newValue]
                                  );
                                }}
                              />
                            )
                          }</CountryRegionContext.Consumer>
                        )}
                      />
                      <ErrorMessage
                        name={settingDetailFormFields.businessDetails.state}
                      >
                        {msg => <div className="error-message">{msg}</div>}
                      </ErrorMessage>
                    </FormField>
                  </UikFormInputGroup>
                </UikWidgetContent>
              </UikWidget>
            </div>
          )
        );
      }}
    </NamespacesConsumer>
  );
};

export default BusinessForm;
