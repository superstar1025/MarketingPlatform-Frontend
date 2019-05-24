import React from "react";
import { ErrorMessage, FormikProps, FastField, FieldProps } from "formik";
import { NamespacesConsumer } from "react-i18next";
import isEmpty from "lodash/fp/isEmpty";
import classnames from "classnames";

const {
  UikWidget,
  UikWidgetHeader,
  UikWidgetContent,
  UikToggle
} = require("../../../../../../../@uik");
import FormField from "../../../../../Helpers/FormField";
import FormLabel from "../../../../../Helpers/FormLabel";
import localeNamespaceKeys from "../../../../../../../constants/localization";
import { SettingFormValues } from "../../../../../../../typeDefinitions/setting/forms";
import { UserActionTopBarDropdownContext } from "../../../../../Contexts/UserActionTopBarDropdown";
import { settingDetailFormFields } from "../../../../../../../constants/formFields";

import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES,
  DROP_DOWN_BUTTON_TEXT
} from "../../../../../../../constants/dropDowns";
import { stripeUrl } from "../../../../../../../constants/setting";
import { IMappedSettingFormMutations } from "../../../../../../../utils/setting";

import { areMutationsLoading } from "../../../../../../../utils/setting";
import UserActionTopBarDropdownSwitch from "../../../../../Helpers/UserActionTopBarDropdownSwitch";
import { DropDownProps } from "../../../../../Helpers/UserActionTopBarDropdownSwitch/UserActionTopBarDropdownBase";

interface IProps {
  payOutsFormBag: FormikProps<SettingFormValues>;
  mutations: IMappedSettingFormMutations;
}

const PayoutsForm = ({ payOutsFormBag, mutations }: IProps) => {
  const { showDropDown, close } = React.useContext(
    UserActionTopBarDropdownContext
  );
  React.useEffect(() => {
    if (payOutsFormBag.dirty) {
      showDropDown(DROP_DOWN_TYPES.DROP_DOWN_READY, {
        title: DROP_DOWN_TITLES.DROP_DOWN_READY,
        buttonText: DROP_DOWN_BUTTON_TEXT.DROP_DOWN_READY,
        isLoading: areMutationsLoading(mutations),
        buttonProps: {
          type: "submit"
        }
      });
    }
    if (!payOutsFormBag.dirty && isEmpty(payOutsFormBag.touched)) {
      close();
    }
  }, [payOutsFormBag.dirty, payOutsFormBag.values]);

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
              <UserActionTopBarDropdownContext.Consumer>
                {({ dropDownType, dropDownProps, close }) => (
                  <UserActionTopBarDropdownSwitch
                    type={dropDownType}
                    close={close}
                    props={
                      {
                        ...dropDownProps,
                        isLoading: areMutationsLoading(mutations)
                      } as DropDownProps
                    }
                  />
                )}
              </UserActionTopBarDropdownContext.Consumer>
              <UikWidget
                className={classnames({
                  "setting-section": true
                })}
              >
                <UikWidgetHeader className="section-header">
                  <span className="title">
                    {t(`${localeNamespaceKeys.setting.payouts._name}`)}
                  </span>
                  <br />
                  <span className="description">
                    {t(`${localeNamespaceKeys.setting.payouts.description}`)}
                  </span>
                </UikWidgetHeader>
                <UikWidgetHeader
                  className="section-header"
                  rightEl={
                    <FastField
                      name={settingDetailFormFields.payouts.activatedStripe}
                      value={
                        payOutsFormBag.values[
                          settingDetailFormFields.payouts.activatedStripe
                        ]
                      }
                      component={({ field: { value } }: FieldProps) => (
                        <UikToggle
                          checked={value}
                          onChange={() => {
                            payOutsFormBag.setFieldValue(
                              settingDetailFormFields.payouts.activatedStripe,
                              !value
                            );
                          }}
                        />
                      )}
                    />
                  }
                >
                  <div className="payment-setting">
                    <div className="stripe-icon" />
                    <span className="description">
                      {t(
                        `${
                          localeNamespaceKeys.setting.payouts.stripeDescription
                        }`
                      )}
                    </span>
                  </div>
                </UikWidgetHeader>
                <UikWidgetHeader
                  className={classnames({
                    "section-header": true,
                    deactive:
                      payOutsFormBag.values[
                        settingDetailFormFields.payouts.activatedStripe
                      ] === false
                  })}
                >
                  <a href={stripeUrl} className="stripe-connect dark">
                    <span>
                      {t(
                        `${localeNamespaceKeys.setting.payouts.connectStripe}`
                      )}
                    </span>
                  </a>
                </UikWidgetHeader>
                <UikWidgetHeader
                  className="section-header"
                  rightEl={
                    <FastField
                      name={settingDetailFormFields.payouts.activatedPaypal}
                      value={
                        payOutsFormBag.values[
                          settingDetailFormFields.payouts.activatedPaypal
                        ]
                      }
                      component={({ field: { value } }: FieldProps) => (
                        <UikToggle
                          checked={value}
                          onChange={() => {
                            payOutsFormBag.setFieldValue(
                              settingDetailFormFields.payouts.activatedPaypal,
                              !value
                            );
                          }}
                        />
                      )}
                    />
                  }
                >
                  <div className="payment-setting">
                    <div className="paypal-icon" />
                    <span className="description">
                      {t(
                        `${
                          localeNamespaceKeys.setting.payouts.paypalDescription
                        }`
                      )}
                    </span>
                  </div>
                </UikWidgetHeader>
                <UikWidgetContent
                  className={classnames({
                    "section-content": true,
                    deactive:
                      payOutsFormBag.values[
                        settingDetailFormFields.payouts.activatedPaypal
                      ] === false
                  })}
                >
                  <FormField>
                    <FormLabel>
                      {t(
                        `${
                          localeNamespaceKeys.setting.payouts.paypalEmailAddress
                        }`
                      )}
                    </FormLabel>
                    <FastField
                      name="paypalAccountName"
                      placeholder="doublin@skywalker.io"
                      className="uik-input__input paypal-address"
                      type="text"
                      label="PAYPAL ACCOUNT EMAIL ADDRESS"
                    />
                    <ErrorMessage name="paypalAccountName">
                      {msg => <div className="error-message">{msg}</div>}
                    </ErrorMessage>
                  </FormField>
                </UikWidgetContent>
              </UikWidget>
            </div>
          )
        );
      }}
    </NamespacesConsumer>
  );
};

export default PayoutsForm;
