import React from "react";
import { NamespacesConsumer } from "react-i18next";
import { FastField, ErrorMessage, FieldProps, FormikProps } from "formik";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

import FormField from "../../FormField";
import FormLabel from "../../FormLabel";
import localeNamespaceKeys from "../../../../../constants/localization";
import { settingDetailFormFields } from "../../../../../constants/formFields";
import { CountrySelectContext } from "../../../Contexts/CountrySelect";
import { LocationFormValues } from "../../../../../typeDefinitions/setting/forms";

const {
  UikWidgetContent,
  UikFormInputGroup
} = require("../../../../../@uik");

interface IProps {
  locationFormBag: FormikProps<LocationFormValues>;
}

export interface SelectOption {
  label: string;
  value: string;
}

const AddLocationFields = ({ locationFormBag }: IProps) => {
  const { setCountry, setRegion } = React.useContext(CountrySelectContext);
  React.useEffect(() => {
    setCountry(
      locationFormBag.values[settingDetailFormFields.location.locationCountry]
    );
    setRegion(
      locationFormBag.values[settingDetailFormFields.location.locationState]
    );
  }, [locationFormBag.values]);

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
            <UikWidgetContent className="section-content">
              <UikFormInputGroup direction="horizontal">
                <FormField>
                  <FormLabel>
                    {t(`${localeNamespaceKeys.setting.location.locationName}`)}
                  </FormLabel>
                  <FastField
                    name={settingDetailFormFields.location.locationName}
                    className="uik-input__input"
                    value={
                      locationFormBag.values[
                        settingDetailFormFields.location.locationName
                      ]
                    }
                    type="text"
                  />
                  <ErrorMessage
                    name={settingDetailFormFields.location.locationName}
                  >
                    {msg => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </FormField>
                <FormField>
                  <FormLabel>
                    {t(`${localeNamespaceKeys.setting.location.locationEmail}`)}
                  </FormLabel>
                  <FastField
                    name={settingDetailFormFields.location.locationEmail}
                    className="uik-input__input"
                    type="text"
                    value={
                      locationFormBag.values[
                        settingDetailFormFields.location.locationEmail
                      ]
                    }
                  />
                  <ErrorMessage
                    name={settingDetailFormFields.location.locationEmail}
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
                        localeNamespaceKeys.setting.location.locationPhoneNumber
                      }`
                    )}
                  </FormLabel>
                  <FastField
                    name={settingDetailFormFields.location.locationPhoneNumber}
                    className="uik-input__input"
                    type="text"
                    value={
                      locationFormBag.values[
                        settingDetailFormFields.location.locationPhoneNumber
                      ]
                    }
                  />
                  <ErrorMessage
                    name={settingDetailFormFields.location.locationPhoneNumber}
                  >
                    {msg => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </FormField>
                <FormField>
                  <FormLabel>
                    {t(`${localeNamespaceKeys.setting.location.locationCity}`)}
                  </FormLabel>
                  <FastField
                    name={settingDetailFormFields.location.locationCity}
                    className="uik-input__input"
                    type="text"
                    value={
                      locationFormBag.values[
                        settingDetailFormFields.location.locationCity
                      ]
                    }
                  />
                  <ErrorMessage
                    name={settingDetailFormFields.location.locationCity}
                  >
                    {msg => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </FormField>
              </UikFormInputGroup>
              <UikFormInputGroup direction="horizontal">
                <FormField>
                  <FormLabel>
                    {t(
                      `${localeNamespaceKeys.setting.location.locationAdress1}`
                    )}
                  </FormLabel>
                  <FastField
                    name={settingDetailFormFields.location.locationAdress1}
                    className="uik-input__input"
                    type="text"
                    value={
                      locationFormBag.values[
                        settingDetailFormFields.location.locationAdress1
                      ]
                    }
                  />
                  <ErrorMessage
                    name={settingDetailFormFields.location.locationAdress1}
                  >
                    {msg => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </FormField>
                <FormField>
                  <FormLabel>
                    {t(
                      `${localeNamespaceKeys.setting.location.locationAdress2}`
                    )}
                  </FormLabel>
                  <FastField
                    name={settingDetailFormFields.location.locationAdress2}
                    className="uik-input__input"
                    type="text"
                    value={
                      locationFormBag.values[
                        settingDetailFormFields.location.locationAdress2
                      ]
                    }
                  />
                  <ErrorMessage
                    name={settingDetailFormFields.location.locationAdress2}
                  >
                    {msg => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </FormField>
              </UikFormInputGroup>
              <UikFormInputGroup direction="horizontal">
                <FormField>
                  <FormLabel>
                    {t(
                      `${localeNamespaceKeys.setting.location.locationCountry}`
                    )}
                  </FormLabel>
                  <FastField
                    name={settingDetailFormFields.location.locationCountry}
                    value={
                      locationFormBag.values[
                        settingDetailFormFields.location.locationCountry
                      ]
                    }
                    component={({ field: { value } }: FieldProps) => (
                      <CountryDropdown
                        className="custom-select business-form-select"
                        value={value}
                        onChange={newValue => {
                          locationFormBag.setFieldValue(
                            settingDetailFormFields.location.locationCountry,
                            newValue
                          );
                        }}
                      />
                    )}
                  />
                  <ErrorMessage
                    name={settingDetailFormFields.location.locationCountry}
                  >
                    {msg => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </FormField>
                <FormField>
                  <FormLabel>
                    {t(`${localeNamespaceKeys.setting.location.locationState}`)}
                  </FormLabel>
                  <FastField
                    name={settingDetailFormFields.location.locationState}
                    value={
                      locationFormBag.values[
                        settingDetailFormFields.location.locationState
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
                              locationFormBag.setFieldValue(
                                settingDetailFormFields.location.locationState,
                                newValue
                              );
                            }}
                          />
                        )}
                      </CountrySelectContext.Consumer>
                    )}
                  />
                  <ErrorMessage
                    name={settingDetailFormFields.location.locationState}
                  >
                    {msg => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </FormField>
              </UikFormInputGroup>
              <UikFormInputGroup direction="horizontal">
                <FormField>
                  <FormLabel>
                    {t(
                      `${localeNamespaceKeys.setting.location.locationZipCode}`
                    )}
                  </FormLabel>
                  <FastField
                    name={settingDetailFormFields.location.locationZipCode}
                    className="uik-input__input"
                    type="text"
                    value={
                      locationFormBag.values[
                        settingDetailFormFields.location.locationZipCode
                      ]
                    }
                  />
                  <ErrorMessage
                    name={settingDetailFormFields.location.locationZipCode}
                  >
                    {msg => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </FormField>
                <FormField>
                </FormField>
              </UikFormInputGroup>
            </UikWidgetContent>
          )
        );
      }}
    </NamespacesConsumer>
  );
};

export default AddLocationFields;
