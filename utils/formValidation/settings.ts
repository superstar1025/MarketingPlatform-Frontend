import * as yup from "yup";
import _ from "lodash";

import { settingDetailFormFields } from "../../constants/formFields";

// IMPORTANT: Our form validation schemas pass back our locale keys instead of the raw error message. This way the components can utilize the translation function and have ready access to the right key.
// const { formValidation } = localeNamespaceKeys;

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const generalValidation = yup.string().required("This is a required field");
const emailValidation =  yup.string().email('This field must be a valid email').required('Email is required');
const numberValidation =  yup.number().min(0).integer();
const discountValidation =  yup.number().min(0).max(100).integer().required('This is a required field');;
const phoneNumberValidation =  yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required');

export const settingDetailsValidationSchema = () =>
  yup.object().shape({
    [settingDetailFormFields.businessDetails.companyName]: generalValidation,
    [settingDetailFormFields.businessDetails.email]: emailValidation,
    [settingDetailFormFields.businessDetails.address1]: generalValidation,
    [settingDetailFormFields.businessDetails.address2]: generalValidation,
    [settingDetailFormFields.businessDetails.customerSupportNumber]: generalValidation,
    [settingDetailFormFields.businessDetails.zipCode]: numberValidation,
    [settingDetailFormFields.businessDetails.city]: generalValidation,
    [settingDetailFormFields.businessDetails.currency]: generalValidation,
    [settingDetailFormFields.businessDetails.country]: generalValidation,
    [settingDetailFormFields.businessDetails.state]: generalValidation
  });
export const locationValidation = () =>
  yup.object().shape({
    [settingDetailFormFields.location.locationName]: generalValidation,
    [settingDetailFormFields.location.locationCity]: generalValidation,
    [settingDetailFormFields.location.locationCountry]: generalValidation,
    [settingDetailFormFields.location.locationEmail]: emailValidation,
    [settingDetailFormFields.location.locationPhoneNumber]: phoneNumberValidation,
    [settingDetailFormFields.location.locationAdress1]: generalValidation,
    [settingDetailFormFields.location.locationAdress2]: generalValidation,
    [settingDetailFormFields.location.locationZipCode]: numberValidation,
    [settingDetailFormFields.location.locationState]: generalValidation,
  });
export const userValidation = () =>
  yup.object().shape({
    [settingDetailFormFields.user.firstName]: generalValidation,
    [settingDetailFormFields.user.lastName]: generalValidation,
    [settingDetailFormFields.user.email]: emailValidation
  });
export const promoValidation = () =>
  yup.object().shape({
    [settingDetailFormFields.promotion.unitOfDiscount]: generalValidation,
    [settingDetailFormFields.promotion.discount]: discountValidation,
    [settingDetailFormFields.promotion.promoCode]: generalValidation,
    [settingDetailFormFields.promotion.firstDateTime]: generalValidation,
    [settingDetailFormFields.promotion.lastDateTime]: generalValidation,
  });
