import * as React from "react";
import { Link, Redirect, RouteProps } from "react-router-dom";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikActions,
  FormikProps
} from "formik";
import { NamespacesConsumer } from "react-i18next";
import isEmpty from "lodash/fp/isEmpty";

import Button from "../../UI/Button";
import { authenticationFormFields } from "../../../../constants/formFields";
import { resetPasswordValidationSchema } from "../../../../utils/formValidation/authentication";
import localeNamespaceKeys from "../../../../constants/localization";
import routePaths from "../../../../constants/routePaths";
import { queryLocationURL } from "../../../../utils/browserAPI";
import GraphQLErrors from "../../Helpers/GraphQLErrors";
import routeParams from "../../../../constants/routeParams";
import { ResetPasswordConfirmComponent } from "../../../../typeDefinitions/__generated__/components";

const { UikButton, UikFormInputGroup } = require("../../../../@uik");

interface ITestIds {
  resetPassword: string;
}
interface IResetPasswordFormValues {
  [name: string]: string | undefined;
  password?: string;
  passwordConfirm?: string;
}

type ResetPassword = (props: RouteProps) => React.ReactElement<any>;

export const resetPasswordTestIds: ITestIds = {
  resetPassword: "resetPassword"
};

const { resetPassword } = authenticationFormFields;

const ResetPassword: ResetPassword = ({ location }) => {
  return (
    <NamespacesConsumer
      ns={[
        localeNamespaceKeys.authorization._name,
        localeNamespaceKeys.formValidation._name
      ]}
    >
      {(t, { ready }) =>
        ready && (
          <ResetPasswordConfirmComponent>
            {(resetPasswordMutation, result) => {
              const { called, loading, error } = result;
              if (called && !error) {
                return (
                  <Redirect
                    push
                    to={`${routePaths.auth.login}?${routeParams.RESET}=true`}
                  />
                );
              }
              const submit = async (
                { password, passwordConfirm }: IResetPasswordFormValues,
                { resetForm }: FormikActions<IResetPasswordFormValues>
              ) => {
                try {
                  await resetPasswordMutation({
                    variables: {
                      password: password || "",
                      passwordResetToken: queryLocationURL({
                        location,
                        queryParam: routeParams.TOKEN
                      })
                    }
                  });
                } catch (error) {
                  resetForm({
                    password,
                    passwordConfirm
                  });
                }
              };
              const renderProp = ({
                values,
                errors,
                dirty,
                isSubmitting
              }: FormikProps<IResetPasswordFormValues>) => {
                const buttonDisabled =
                  !isEmpty(errors) || !dirty || loading || isSubmitting;
                return (
                  <Form className="auth-form">
                    <div className="form-field">
                      <div className="form-label">
                        <label>
                          {t(
                            `${
                              localeNamespaceKeys.authorization.formLabels._name
                            }.${
                              localeNamespaceKeys.authorization.formLabels
                                .password
                            }`
                          )}
                        </label>
                      </div>
                      <Field
                        name={resetPassword.password}
                        value={values[resetPassword.password]}
                        type="password"
                        className="form-input"
                      />
                      <ErrorMessage name={resetPassword.password}>
                        {() => (
                          <div className="error-message">
                            {t(
                              `${localeNamespaceKeys.formValidation._name}:${
                                errors[resetPassword.password]
                              }`
                            )}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="form-field">
                      <div className="form-label">
                        <label>
                          {t(
                            `${
                              localeNamespaceKeys.authorization.formLabels._name
                            }.${
                              localeNamespaceKeys.authorization.formLabels
                                .passwordConfirm
                            }`
                          )}
                        </label>
                      </div>
                      <Field
                        name={resetPassword.passwordConfirm}
                        value={values[resetPassword.passwordConfirm]}
                        type="password"
                        className="form-input"
                      />
                      <ErrorMessage name={resetPassword.passwordConfirm}>
                        {() => (
                          <div className="error-message">
                            {t(
                              `${localeNamespaceKeys.formValidation._name}:${
                                errors[resetPassword.passwordConfirm]
                              }`
                            )}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <GraphQLErrors mutationResult={result} />
                    <div className="form-button">
                      <UikFormInputGroup>
                        <UikButton
                          type="submit"
                          success
                          disabled={buttonDisabled}
                          isLoading={result && result.loading}
                        >
                          {t(
                            `${
                              localeNamespaceKeys.authorization
                                .resetPasswordPage._name
                            }.${
                              localeNamespaceKeys.authorization
                                .resetPasswordPage.buttonText
                            }`
                          )}
                        </UikButton>
                      </UikFormInputGroup>
                    </div>
                  </Form>
                );
              };
              return (
                <div
                  className="auth-page"
                  data-testid={resetPasswordTestIds.resetPassword}
                >
                  <div className="widget-page-form-header">
                    {t(
                      `${
                        localeNamespaceKeys.authorization.resetPasswordPage
                          ._name
                      }.${
                        localeNamespaceKeys.authorization.resetPasswordPage
                          .header
                      }`
                    )}
                  </div>
                  <div className="widget-page-form-link">
                    <span className="light-text">
                      {t(
                        `${
                          localeNamespaceKeys.authorization.resetPasswordPage
                            ._name
                        }.${
                          localeNamespaceKeys.authorization.resetPasswordPage
                            .question
                        }`
                      )}{" "}
                    </span>
                    <Link to={routePaths.auth.register}>
                      {t(
                        `${
                          localeNamespaceKeys.authorization.resetPasswordPage
                            ._name
                        }.${
                          localeNamespaceKeys.authorization.resetPasswordPage
                            .callToActionLink
                        }`
                      )}
                    </Link>
                  </div>
                  <Formik
                    onSubmit={submit}
                    validationSchema={resetPasswordValidationSchema()}
                    initialValues={{
                      [resetPassword.password]: "",
                      [resetPassword.passwordConfirm]: ""
                    }}
                    render={renderProp}
                  />
                </div>
              );
            }}
          </ResetPasswordConfirmComponent>
        )
      }
    </NamespacesConsumer>
  );
};

export default ResetPassword;
