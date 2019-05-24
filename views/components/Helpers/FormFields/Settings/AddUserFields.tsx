import React from "react";
import { NamespacesConsumer } from "react-i18next";
import { FastField, ErrorMessage, FormikProps } from "formik";
import classnames from "classnames";

import FormRow from "../../FormRow";
import FormField from "../../FormField";
import FormLabel from "../../FormLabel";
import localeNamespaceKeys from "../../../../../constants/localization";
import { UserFormValues } from "../../../../../typeDefinitions/setting/forms";
import { settingDetailFormFields } from "../../../../../constants/formFields";

const { UikCheckbox, UikWidgetContent } = require("../../../../../@uik");
interface IProps {
  userFormBag: FormikProps<UserFormValues>;
  modalType: string;
}

const AddUserFields = ({ userFormBag, modalType }: IProps) => {
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
              <FormRow>
                <FormField>
                  <FormLabel>
                    {t(`${localeNamespaceKeys.setting.user.firstName}`)}
                  </FormLabel>
                  <FastField
                    name={settingDetailFormFields.user.firstName}
                    className="uik-input__input"
                    type="text"
                    value={
                      userFormBag.values[settingDetailFormFields.user.firstName]
                    }
                  />
                  <ErrorMessage name={settingDetailFormFields.user.firstName}>
                    {msg => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </FormField>
              </FormRow>
              <FormRow>
                <FormField>
                  <FormLabel>
                    {t(`${localeNamespaceKeys.setting.user.lastName}`)}
                  </FormLabel>
                  <FastField
                    name={settingDetailFormFields.user.lastName}
                    className="uik-input__input"
                    type="text"
                    value={
                      userFormBag.values[settingDetailFormFields.user.lastName]
                    }
                  />
                  <ErrorMessage name={settingDetailFormFields.user.lastName}>
                    {msg => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </FormField>
              </FormRow>
              <FormRow>
                <FormField>
                  <FormLabel>
                    {t(`${localeNamespaceKeys.setting.user.email}`)}
                  </FormLabel>
                  <FastField
                    name={settingDetailFormFields.user.email}
                    className="uik-input__input"
                    type="text"
                    disabled={modalType === "Edit"}
                    value={
                      userFormBag.values[settingDetailFormFields.user.email]
                    }
                  />
                  <ErrorMessage name={settingDetailFormFields.user.email}>
                    {msg => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </FormField>
              </FormRow>
              <UikCheckbox
                label={t(`${localeNamespaceKeys.setting.user.owner}`)}
                name={settingDetailFormFields.user.owner}
                value={userFormBag.values[settingDetailFormFields.user.owner]}
                onClick={() => {
                  userFormBag.setFieldValue(
                    settingDetailFormFields.user.owner,
                    !userFormBag.values[settingDetailFormFields.user.owner]
                  );
                }}
              />
              <span
                className={classnames({
                  "error-message": true,
                  "hide-item":
                    userFormBag.values[settingDetailFormFields.user.owner] ===
                    false
                })}
              >
                {t(`${localeNamespaceKeys.setting.user.warning}`)}
              </span>
            </UikWidgetContent>
          )
        );
      }}
    </NamespacesConsumer>
  );
};

export default AddUserFields;
