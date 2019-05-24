import React from "react";
import { FormikProps } from "formik";
import { NamespacesConsumer } from "react-i18next";
import isEmpty from "lodash/fp/isEmpty";
import classnames from "classnames";

const {
  UikWidget,
  UikWidgetContent,
  UikTabContainer,
  UikWidgetHeader,
  UikTabItem
} = require("../../../../../../../@uik");

import localeNamespaceKeys from "../../../../../../../constants/localization";
import { SettingFormValues } from "../../../../../../../typeDefinitions/setting/forms";
import { UserActionTopBarDropdownContext } from "../../../../../Contexts/UserActionTopBarDropdown";
import { TabActiveContext } from "../../../../../Contexts/TabActive";

import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES,
  DROP_DOWN_BUTTON_TEXT
} from "../../../../../../../constants/dropDowns";
import { IMappedSettingFormMutations } from "../../../../../../../utils/setting";
import { areMutationsLoading } from "../../../../../../../utils/setting";
import TabInputSwitch from "../SubComponents/TabInputSwitch";
import { settingDetailFormFields } from "../../../../../../../constants/formFields";

interface IProps {
  keyInformationFormBag: FormikProps<SettingFormValues>;
  mutations: IMappedSettingFormMutations;
}
const KeyInformationForm = ({ keyInformationFormBag, mutations }: IProps) => {
  const { showDropDown, close } = React.useContext(
    UserActionTopBarDropdownContext
  );

  React.useEffect(() => {
    if (
      keyInformationFormBag.dirty &&
      (keyInformationFormBag.values.returnPolicy !==
        keyInformationFormBag.initialValues.returnPolicy ||
        keyInformationFormBag.values.sizeGuide !==
          keyInformationFormBag.initialValues.sizeGuide ||
        keyInformationFormBag.values.snapchatPixelId !==
          keyInformationFormBag.initialValues.snapchatPixelId ||
        keyInformationFormBag.values.facebookPixelId !==
          keyInformationFormBag.initialValues.facebookPixelId)
    ) {
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
      !keyInformationFormBag.dirty &&
      isEmpty(keyInformationFormBag.touched)
    ) {
      close();
    }
  }, [keyInformationFormBag.dirty, keyInformationFormBag.values]);

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
                    {t(`${localeNamespaceKeys.setting.keyInformation._name}`)}
                  </span>
                  <br />
                  <span className="description">
                    {t(
                      `${
                        localeNamespaceKeys.setting.keyInformation.description
                      }`
                    )}
                  </span>
                </UikWidgetHeader>
                <TabActiveContext.Consumer>
                  {({ setActiveTab, active }) => (
                    <UikTabContainer className="key-info-tab">
                      <UikTabItem
                        onClick={() => setActiveTab(1)}
                        active={active === 1}
                      >
                        {t(
                          `${
                            localeNamespaceKeys.setting.keyInformation.tabs[0]
                          }`
                        )}
                      </UikTabItem>
                      <UikTabItem
                        onClick={() => setActiveTab(2)}
                        active={active === 2}
                      >
                        {t(
                          `${
                            localeNamespaceKeys.setting.keyInformation.tabs[1]
                          }`
                        )}
                      </UikTabItem>
                      <UikTabItem
                        onClick={() => setActiveTab(3)}
                        active={active === 3}
                      >
                        {t(
                          `${
                            localeNamespaceKeys.setting.keyInformation.tabs[2]
                          }`
                        )}
                      </UikTabItem>
                      <UikTabItem
                        onClick={() => setActiveTab(4)}
                        active={active === 4}
                      >
                        {t(
                          `${
                            localeNamespaceKeys.setting.keyInformation.tabs[3]
                          }`
                        )}
                      </UikTabItem>
                    </UikTabContainer>
                  )}
                </TabActiveContext.Consumer>
                <TabActiveContext.Consumer>
                  {({ active }) => (
                    <UikWidgetContent className="section-content">
                      <TabInputSwitch
                        keyInformationFormBag={keyInformationFormBag}
                        handleChange={(newValue: any) => {
                          if (active === 2) {
                            keyInformationFormBag.setFieldValue(
                              settingDetailFormFields.keyInformation
                                .returnPolicy,
                              newValue
                            );
                          }
                          if (active === 4) {
                            keyInformationFormBag.setFieldValue(
                              settingDetailFormFields.keyInformation.sizeGuide,
                              newValue
                            );
                          }
                        }}
                        keyInformationTabLabel={
                          localeNamespaceKeys.setting.keyInformation.tabLabels[
                            active - 1
                          ]
                        }
                        keyInformationTabType={active}
                      />
                    </UikWidgetContent>
                  )}
                </TabActiveContext.Consumer>
              </UikWidget>
            </div>
          )
        );
      }}
    </NamespacesConsumer>
  );
};

export default KeyInformationForm;
