import React from "react";
import {
  ErrorMessage,
  FastField,
  FormikProps
} from "formik";
import RichTextEditor from "../../../../../Helpers/RichTextEditor";
import FormField from "../../../../../Helpers/FormField";
import { settingDetailFormFields } from "../../../../../../../constants/formFields";
import { SettingFormValues } from "../../../../../../../typeDefinitions/setting/forms";

type Props = {
  keyInformationTabType: number;
  keyInformationTabLabel: string;
  keyInformationFormBag: FormikProps<SettingFormValues>;
  handleChange: (e: any) => void;
};
const { UikHeadlineDesc } = require("../../../../../../../@uik");

const TabInputSwitch = ({
  keyInformationTabType,
  keyInformationTabLabel,
  keyInformationFormBag,
  handleChange
}: Props) => {
  switch (keyInformationTabType) {
    case 1:
      return (
        <div className="key-info">
          <UikHeadlineDesc className="tab-label">
            {keyInformationTabLabel}
          </UikHeadlineDesc>
          <FormField>
            <FastField
              name={settingDetailFormFields.keyInformation.facebookPixelId}
              value={
                keyInformationFormBag.values[
                  settingDetailFormFields.keyInformation.facebookPixelId
                ]
              }
              placeholder="1297928996961197"
              className="uik-input__input"
              type="text"
            />
            <ErrorMessage
              name={settingDetailFormFields.keyInformation.facebookPixelId}
            >
              {msg => <div className="error-message">{msg}</div>}
            </ErrorMessage>
          </FormField>
        </div>
      );
    case 2:
      return (
        <div className="key-info">
          <UikHeadlineDesc className="tab-label">
            {keyInformationTabLabel}
          </UikHeadlineDesc>
          <FormField>
            <RichTextEditor
              handleChange={handleChange}
              value={
                keyInformationFormBag.values[
                  settingDetailFormFields.keyInformation.returnPolicy
                ]
              }
            />
          </FormField>
        </div>
      );
    case 3:
      return (
        <div className="key-info">
          <UikHeadlineDesc className="tab-label">
            {keyInformationTabLabel}
          </UikHeadlineDesc>
          <FastField
            name={settingDetailFormFields.keyInformation.snapchatPixelId}
            value={
              keyInformationFormBag.values[
                settingDetailFormFields.keyInformation.snapchatPixelId
              ]
            }
            placeholder="a7f1f289-a0d0-4a99-a07e-f10e9e1baf7e"
            className="uik-input__input"
            type="text"
          />
          <ErrorMessage
            name={settingDetailFormFields.keyInformation.snapchatPixelId}
          >
            {msg => <div className="error-message">{msg}</div>}
          </ErrorMessage>
        </div>
      );
    case 4:
      return (
        <div className="key-info">
          <UikHeadlineDesc className="tab-label">
            {keyInformationTabLabel}
          </UikHeadlineDesc>
          <RichTextEditor
            handleChange={handleChange}
            value={
              keyInformationFormBag.values[
                settingDetailFormFields.keyInformation.sizeGuide
              ]
            }
          />
        </div>
      );
    default:
      return <div className="key-info" />;
  }
};

export default TabInputSwitch;
