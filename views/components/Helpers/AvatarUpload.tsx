import React from "react";
import { FormikProps } from "formik";
import Dropzone from "react-dropzone";
import { NamespacesConsumer } from "react-i18next";
import { SettingFormValues } from "../../../typeDefinitions/setting/forms";

const { UikWidget, UikWidgetHeader, UikButton, UikAvatar } = require("../../../@uik");

import { settingDetailFormFields } from "../../../constants/formFields";
import localeNamespaceKeys from "../../../constants/localization";
import FormSection from "./FormSection";
import Avatar from "./ImageDrop/Avatar";

interface IProps {
  avatar: string[];
  updated: string[];
  avatarContent: string[];
  formBag: FormikProps<SettingFormValues>;
}

const SortableList = ({ image, updated, avatarContent }: any) => {
  return (
    <ul>
      <div className="image-tile">
        <Avatar updated={updated} avatar={image} avatarContent={avatarContent}/>
      </div>
    </ul>
  );
};

// TODO: Localization
class AvatarUpload extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    this.renderDropArea = this.renderDropArea.bind(this);
  }
  renderDropArea() {    
    const { avatar } = this.props;
    const { updated } = this.props;
    const { avatarContent } = this.props;
    return (
      <div>
        <div className="image-upload-thumbnails">
          <SortableList
            image={avatar}
            updated={updated}
            avatarContent={avatarContent}
            axis="xy"
          />
        </div>
      </div>
    )
  }

  render() {
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
              <Dropzone
                disableClick
                accept="image/*"
                multiple={false}
                onDrop={(acceptedFile) => {
                  const { formBag } = this.props;
                  this.setState(
                    () => {
                      if (acceptedFile) {
                        formBag.setFieldValue(
                          settingDetailFormFields.brandingDetails.updated,
                          acceptedFile
                        );
                      }
                    }
                  );
                }}
              >
                {({
                  getInputProps,
                  open
                }) => {
                  return (
                    <UikWidget>
                      <UikWidgetHeader className="section-header"
                        rightEl={
                          <UikButton
                            primary
                            icon={<i className="icofont-cloud" />}
                            onClick={() => open()}
                          >
                            {t(`${ localeNamespaceKeys.setting.branding.updateAvatar }`)}
                          </UikButton>
                        }
                      >
                        <span className="title">{t(`${ localeNamespaceKeys.setting.branding._name }`)}</span>
                        <br />
                        <span className="description">
                          {t(`${ localeNamespaceKeys.setting.branding.header }`)}
                        </span>
                      </UikWidgetHeader>

                      <FormSection>
                        <div>
                          <input {...getInputProps()} />
                          {this.renderDropArea()}
                        </div>
                      </FormSection>
                    </UikWidget>
                  );
                }}
              </Dropzone>
            )
          );
        }}
      </NamespacesConsumer>
    );
  }
}

export default AvatarUpload;
