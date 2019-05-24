import React from "react";
import { NamespacesConsumer } from "react-i18next";
import { FastField, ErrorMessage, FormikProps, FieldProps } from "formik";
import classnames from "classnames";

import FormRow from "../../FormRow";
import FormField from "../../FormField";
import FormLabel from "../../FormLabel";
import localeNamespaceKeys from "../../../../../constants/localization";
import { PromotionFormValues } from "../../../../../typeDefinitions/setting/forms";
import { settingDetailFormFields } from "../../../../../constants/formFields";
import DateTimeRangePicker from "../../../Helpers/DateTimeRangePicker";
import { unitsOfDiscount } from "../../../../../constants/setting";
import { DateTime } from "../../../../../typeDefinitions/__generated__/components";

interface SelectOption {
  label: string;
  value: string;
}

const {
  UikFormInputGroup,
  UikWidgetContent,
  UikSelect
} = require("../../../../../@uik");
interface IProps {
  promoCodeFormBag: FormikProps<PromotionFormValues>;
}

const AddPromoCodeFields = ({ promoCodeFormBag }: IProps) => {
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
              <UikFormInputGroup
                direction="horizontal"
                className="promotion-form-group"
              >
                <FormField>
                  <FormLabel>
                    {t(`${localeNamespaceKeys.setting.promotion.promoCode}`)}
                  </FormLabel>
                  <FastField
                    name={settingDetailFormFields.promotion.promoCode}
                    className="uik-input__input promo-code"
                    type="text"
                    value={
                      promoCodeFormBag.values[
                        settingDetailFormFields.promotion.promoCode
                      ]
                    }
                  />
                  <ErrorMessage
                    name={settingDetailFormFields.promotion.promoCode}
                  >
                    {msg => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </FormField>
                <UikFormInputGroup>
                  <FormField>
                    <FormLabel>
                      {t(`${localeNamespaceKeys.setting.promotion.discount}`)}
                    </FormLabel>
                    <div className="promo-form-input-select">
                      <FastField
                        name={settingDetailFormFields.promotion.discount}
                        value={
                          promoCodeFormBag.values[
                            settingDetailFormFields.promotion.discount
                          ]
                        }
                        placeholder={0}
                        className="form-input"
                        type="number"
                        min={0}
                        max={100}
                        step="1"
                      />
                      <FastField
                        name={
                          settingDetailFormFields.promotion.unitOfDiscount
                        }
                        value={
                          promoCodeFormBag.values[
                            settingDetailFormFields.promotion.unitOfDiscount
                          ]
                        }
                        component={({ field: { value } }: FieldProps) => (
                          <UikSelect
                            className="business-form-select"
                            options={unitsOfDiscount}
                            value={value}
                            onChange={(newValue: SelectOption) => {
                              promoCodeFormBag.setFieldValue(
                                settingDetailFormFields.promotion
                                  .unitOfDiscount,
                                [newValue]
                              );
                            }}
                          />
                        )}
                      />
                    </div>
                    <ErrorMessage
                      name={settingDetailFormFields.promotion.discount}
                    >
                      {msg => <div className="error-message">{msg}</div>}
                    </ErrorMessage>
                  </FormField>
                </UikFormInputGroup>
              </UikFormInputGroup>
              <FormRow>
                <FormField>
                  <FormLabel>
                    {t(
                      `${localeNamespaceKeys.setting.promotion.duration}-${
                        localeNamespaceKeys.setting.promotion.from
                      }`
                    )}
                  </FormLabel>
                  <FastField
                    name={settingDetailFormFields.promotion.firstDateTime}
                    value={
                      promoCodeFormBag.values[
                        settingDetailFormFields.promotion.firstDateTime
                      ]
                    }
                    component={({ field: { value } }: FieldProps) => (
                      <DateTimeRangePicker
                        handleChange={(newValue: DateTime) => {
                          promoCodeFormBag.setFieldValue(
                            settingDetailFormFields.promotion.firstDateTime,
                            newValue
                          );
                        }}
                        value={value}
                      />
                    )}
                  />
                  <ErrorMessage
                    name={settingDetailFormFields.promotion.firstDateTime}
                  >
                    {msg => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </FormField>
              </FormRow>
              <FormRow>
                <FormField>
                  <FormLabel>
                    {t(`${localeNamespaceKeys.setting.promotion.to}`)}
                  </FormLabel>
                  <FastField
                    name={settingDetailFormFields.promotion.lastDateTime}
                    value={
                      promoCodeFormBag.values[
                        settingDetailFormFields.promotion.lastDateTime
                      ]
                    }
                    component={({ field: { value } }: FieldProps) => (
                      <DateTimeRangePicker
                        handleChange={(newValue: DateTime) => {
                          promoCodeFormBag.setFieldValue(
                            settingDetailFormFields.promotion.lastDateTime,
                            newValue
                          );
                        }}
                        value={value}
                      />
                    )}
                  />
                  <ErrorMessage
                    name={settingDetailFormFields.promotion.lastDateTime}
                  >
                    {msg => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </FormField>
              </FormRow>
            </UikWidgetContent>
          )
        );
      }}
    </NamespacesConsumer>
  );
};

export default AddPromoCodeFields;
