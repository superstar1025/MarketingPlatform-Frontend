import React from "react";
import { FieldProps, FormikProps, FastField } from "formik";
import { NamespacesConsumer } from "react-i18next";
import isEmpty from "lodash/fp/isEmpty";
import classnames from "classnames";
import { IMappedSettingFormMutations } from "../../../../../../../utils/setting";
import { areMutationsLoading } from "../../../../../../../utils/setting";
import CurrencyField from "../../../../../Helpers/FormFields/CurrencyField";
import localeNamespaceKeys from "../../../../../../../constants/localization";
import { settingDetailFormFields } from "../../../../../../../constants/formFields";
import { SettingFormValues } from "../../../../../../../typeDefinitions/setting/forms";
import { UserActionTopBarDropdownContext } from "../../../../../Contexts/UserActionTopBarDropdown";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES,
  DROP_DOWN_BUTTON_TEXT
} from "../../../../../../../constants/dropDowns";
import {
  getCentsFromDollars,
  getDollarsFromCents
} from "../../../../../../../utils/price";

const {
  UikWidget,
  UikWidgetHeader,
  UikToggle,
  UikWidgetContent
} = require("../../../../../../../@uik");

interface IProps {
  shippingFormBag: FormikProps<SettingFormValues>;
  mutations: IMappedSettingFormMutations;
}
const ShippingForm = ({ shippingFormBag, mutations }: IProps) => {
  const { showDropDown, close } = React.useContext(
    UserActionTopBarDropdownContext
  );
  React.useEffect(() => {
    if (shippingFormBag.dirty) {
      showDropDown(DROP_DOWN_TYPES.DROP_DOWN_READY, {
        title: DROP_DOWN_TITLES.DROP_DOWN_READY,
        buttonText: DROP_DOWN_BUTTON_TEXT.DROP_DOWN_READY,
        isLoading: areMutationsLoading(mutations),
        buttonProps: {
          type: "submit"
        }
      });
    }
    if (!shippingFormBag.dirty && isEmpty(shippingFormBag.touched)) {
      close();
    }
  }, [shippingFormBag.dirty, shippingFormBag.values]);

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
                    {t(`${localeNamespaceKeys.setting.shipping._name}`)}
                  </span>
                  <br />
                  <span className="description">
                    {t(`${localeNamespaceKeys.setting.shipping.description}`)}
                  </span>
                </UikWidgetHeader>
                <UikWidgetHeader
                  className="section-header"
                  rightEl={
                    <FastField
                      name={
                        settingDetailFormFields.shipping.activatedFlatShipping
                      }
                      value={
                        shippingFormBag.values[
                          settingDetailFormFields.shipping.activatedFlatShipping
                        ]
                      }
                      component={({ field: { value } }: FieldProps) => (
                        <UikToggle
                          checked={value}
                          onChange={() => {
                            // shippingFormBag.setFieldValue(
                            //   settingDetailFormFields.shipping.activatedFlatShipping,
                            //   !value
                            // );
                          }}
                        />
                      )}
                    />
                  }
                >
                  <span className="sub-title">Flat Rate Shipping</span>
                  <br />
                  <span className="description">
                    Enable to add a flat rate shipping option to your checkout.
                  </span>
                </UikWidgetHeader>
                <UikWidgetHeader
                  className="section-header"
                  rightEl={
                    <FastField
                      name={
                        settingDetailFormFields.shipping.activatedFreeShipping
                      }
                      value={
                        shippingFormBag.values[
                          settingDetailFormFields.shipping.activatedFreeShipping
                        ]
                      }
                      component={({ field: { value } }: FieldProps) => (
                        <UikToggle
                          checked={value}
                          onChange={() => {
                            shippingFormBag.setFieldValue(
                              settingDetailFormFields.shipping
                                .activatedFreeShipping,
                              !value
                            );
                          }}
                        />
                      )}
                    />
                  }
                >
                  <span className="sub-title">Free Shipping</span>
                  <br />
                  <span className="description">
                    Activate and assign a checkout amount to qualify for free
                    shipping.
                  </span>
                </UikWidgetHeader>
                <UikWidgetContent
                  className={classnames({
                    "section-content": true,
                    deactive:
                      shippingFormBag.values[
                        settingDetailFormFields.shipping.activatedFreeShipping
                      ] === false
                  })}
                >
                  <CurrencyField
                    className="minimum-order-value"
                    onBlur={() => {
                      shippingFormBag.setFieldTouched(
                        settingDetailFormFields.shipping.minimumOrderValue,
                        true
                      );
                    }}
                    name={settingDetailFormFields.shipping.minimumOrderValue}
                    label={"Minimum Order Value Qualification"}
                    placeholder={"$"}
                    value={
                      shippingFormBag.values[
                        settingDetailFormFields.shipping.minimumOrderValue
                      ] === ""
                        ? ""
                        : getDollarsFromCents(
                            shippingFormBag.values[
                              settingDetailFormFields.shipping.minimumOrderValue
                            ]
                          )
                    }
                    formBag={shippingFormBag}
                    onValueChange={val => {
                      const cents = parseInt(
                        getCentsFromDollars(val.floatValue) || ""
                      );
                      if (isNaN(cents)) {
                        shippingFormBag.setFieldValue(
                          settingDetailFormFields.shipping.minimumOrderValue,
                          0
                        );
                      } else {
                        shippingFormBag.setFieldValue(
                          settingDetailFormFields.shipping.minimumOrderValue,
                          cents
                        );
                      }
                    }}
                  />
                  {/* <UikInput
                    className="minimum-order-value"
                    label="Minimum Order Value Qualification"
                  /> */}
                </UikWidgetContent>
              </UikWidget>
            </div>
          )
        );
      }}
    </NamespacesConsumer>
  );
};

export default ShippingForm;
