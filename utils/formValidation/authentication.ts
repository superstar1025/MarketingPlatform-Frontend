import * as yup from "yup";

import {
  authenticationFormFields,
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH
} from "../../constants/formFields";
import localeNamespaceKeys from "../../constants/localization";

const {
  login,
  register,
  resetPassword,
  forgotPassword
} = authenticationFormFields;

// IMPORTANT: Our form validation schemas pass back our locale keys instead of the raw error message. This way the components can utilize the translation function and have ready access to the right key.
const { formValidation } = localeNamespaceKeys;

// REGISTRATION VALIDATION & RESET PASSWORD VALIDATION
const noWhitespaceRegex = /^[^\s]+$/;

const emailCreationValidation = yup
  .string()
  .max(MAX_EMAIL_LENGTH, formValidation.emailLength)
  .email(formValidation.emailNotValid)
  .required(formValidation.emailRequired);

const passwordCreationValidation = yup
  .string()
  .matches(noWhitespaceRegex, {
    excludeEmptyString: true,
    message: formValidation.noWhitespace
  })
  .min(MIN_PASSWORD_LENGTH, formValidation.passwordMinLength)
  .max(MAX_PASSWORD_LENGTH, formValidation.passwordMaxLength)
  .required(formValidation.passwordRequired);

const passwordConfirmationValidation = yup
  .string()
  .oneOf([yup.ref(register.password)], formValidation.passwordDoesntMatch)
  .required(formValidation.passwordConfirmationRequired);

const firstNameValidation = yup
  .string()
  .max(MAX_NAME_LENGTH, formValidation.firstNameMaxLength)
  .required(formValidation.firstNameRequired);

const lastNameValidation = yup
  .string()
  .max(MAX_NAME_LENGTH, formValidation.lastNameMaxLength)
  .required(formValidation.lastNameRequired);

const domainLabelValidation = yup
  .string()
  .max(MAX_NAME_LENGTH)
  .required(formValidation.domainRequired);

export const registerValidationSchema = () =>
  yup.object().shape({
    [register.firstName]: firstNameValidation,
    [register.lastName]: lastNameValidation,
    [register.domainLabel]: domainLabelValidation,
    [register.email]: emailCreationValidation,
    [register.password]: passwordCreationValidation
  });

export const resetPasswordValidationSchema = () =>
  yup.object().shape({
    [resetPassword.password]: passwordCreationValidation,
    [resetPassword.passwordConfirm]: passwordConfirmationValidation
  });

// LOGIN VALIDATION
const emailLoginValidation = yup
  .string()
  .email(formValidation.emailNotValid)
  .required(formValidation.emailRequired);

const passwordLoginValidation = yup
  .string()
  .required(formValidation.passwordRequired);

export const loginValidationSchema = () =>
  yup.object().shape({
    [login.email]: emailLoginValidation,
    [login.password]: passwordLoginValidation
  });

// FORGOT PASSWORD VALIDATION
const emailForgotPasswordValidation = yup
  .string()
  .email(formValidation.emailNotValid)
  .required(formValidation.emailRequired);

export const forgotPasswordValidationSchema = () =>
  yup.object().shape({
    [forgotPassword.email]: emailForgotPasswordValidation
  });
