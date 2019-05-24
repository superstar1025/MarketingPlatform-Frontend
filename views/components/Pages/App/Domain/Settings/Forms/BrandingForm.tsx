import React from "react";
import { FormikProps } from "formik";
import { NamespacesConsumer } from "react-i18next";
import isEmpty from "lodash/fp/isEmpty";
import classnames from "classnames";

const { UikWidget } = require("../../../../../../../@uik");

import { settingDetailFormFields } from "../../../../../../../constants/formFields";
import localeNamespaceKeys from "../../../../../../../constants/localization";
import AvatarUpload from "../../../../../Helpers/AvatarUpload";
import { SettingFormValues } from "../../../../../../../typeDefinitions/setting/forms";
import { UserActionTopBarDropdownContext } from "../../../../../Contexts/UserActionTopBarDropdown";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES,
  DROP_DOWN_BUTTON_TEXT
} from "../../../../../../../constants/dropDowns";
import { areMutationsLoading } from "../../../../../../../utils/setting";
import { IMappedSettingFormMutations } from "../../../../../../../utils/setting";

interface IProps {
  brandingFormBag: FormikProps<SettingFormValues>;
  mutations: IMappedSettingFormMutations;
}
const BrandingForm = ({ brandingFormBag, mutations }: IProps) => {
  const { showDropDown, close } = React.useContext(
    UserActionTopBarDropdownContext
  );
  React.useEffect(() => {
    if (brandingFormBag.dirty) {
      showDropDown(DROP_DOWN_TYPES.DROP_DOWN_READY, {
        title: DROP_DOWN_TITLES.DROP_DOWN_READY,
        buttonText: DROP_DOWN_BUTTON_TEXT.DROP_DOWN_READY,
        isLoading: areMutationsLoading(mutations),
        buttonProps: {
          type: "submit"
        }
      });
    }
    if (!brandingFormBag.dirty && isEmpty(brandingFormBag.touched)) {
      close();
    }
  }, [brandingFormBag.dirty, brandingFormBag.values]);

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
                <AvatarUpload
                  avatar={
                    brandingFormBag.values[
                      settingDetailFormFields.brandingDetails.avatar
                    ]
                  }
                  updated={
                    brandingFormBag.values[
                      settingDetailFormFields.brandingDetails.updated
                    ]
                  }
                  avatarContent={
                    brandingFormBag.values[
                      settingDetailFormFields.brandingDetails.avatarContent
                    ]
                  }
                  formBag={brandingFormBag}
                />
              </UikWidget>
            </div>
          )
        );
      }}
    </NamespacesConsumer>
  );
};

export default BrandingForm;
