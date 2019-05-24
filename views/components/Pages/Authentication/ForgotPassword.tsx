import * as React from "react";
import { Link, RouteProps } from "react-router-dom";
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
import get from "lodash/fp/get";

import GraphQLErrors from "../../Helpers/GraphQLErrors";
import { authenticationFormFields } from "../../../../constants/formFields";
import { forgotPasswordValidationSchema } from "../../../../utils/formValidation/authentication";
import localeNamespaceKeys from "../../../../constants/localization";
import routePaths from "../../../../constants/routePaths";
import { ResetPasswordComponent } from "../../../../typeDefinitions/__generated__/components";

const { UikButton, UikFormInputGroup } = require("../../../../@uik");

interface ITestIds {
  forgotPassword: string;
}

interface IResetPasswordFormValues {
  [key: string]: string | undefined;
  email?: string;
}

type ForgotPassword = (props: RouteProps) => React.ReactElement<any>;

export const forgotPasswordTestIds: ITestIds = {
  forgotPassword: "forgotPassword"
};

const { forgotPassword } = authenticationFormFields;

const ForgotPassword: ForgotPassword = () => {
  return (
    <NamespacesConsumer
      ns={[
        localeNamespaceKeys.authorization._name,
        localeNamespaceKeys.formValidation._name
      ]}
    >
      {(t, { ready }) =>
        ready && (
          <ResetPasswordComponent>
            {(resetPassword, result) => {
              const { called, data, loading } = result;
              const userEmail = get("resetPassword.user.email")(data);
              const successMessage =
                called && userEmail
                  ? `${t(
                      `${
                        localeNamespaceKeys.authorization.forgotPasswordPage
                          ._name
                      }.${
                        localeNamespaceKeys.authorization.forgotPasswordPage
                          .sentEmail
                      }`
                    )} ${userEmail}`
                  : null;
              const submit = (
                { email }: IResetPasswordFormValues,
                { resetForm }: FormikActions<IResetPasswordFormValues>
              ) => {
                resetPassword({
                  variables: {
                    email: email || ""
                  }
                }).catch(() => {
                  resetForm({
                    email
                  });
                });
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
                                .emailAddress
                            }`
                          )}
                        </label>
                      </div>
                      <Field
                        name={forgotPassword.email}
                        value={values[forgotPassword.email]}
                        type="email"
                        className="form-input"
                      />
                      <ErrorMessage name={forgotPassword.email}>
                        {() => (
                          <div className="error-message">
                            {t(
                              `${localeNamespaceKeys.formValidation._name}:${
                                errors[forgotPassword.email]
                              }`
                            )}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <GraphQLErrors mutationResult={result} />
                    {successMessage && (
                      <div className="success-message">{successMessage}</div>
                    )}
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
                                .forgotPasswordPage._name
                            }.${
                              localeNamespaceKeys.authorization
                                .forgotPasswordPage.buttonText
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
                  data-testid={forgotPasswordTestIds.forgotPassword}
                >
                  <div className="widget-page-form-header">
                    {t(
                      `${
                        localeNamespaceKeys.authorization.forgotPasswordPage
                          ._name
                      }.${
                        localeNamespaceKeys.authorization.forgotPasswordPage
                          .header
                      }`
                    )}
                  </div>
                  <div className="widget-page-form-link">
                    <span className="light-text">
                      {t(
                        `${
                          localeNamespaceKeys.authorization.forgotPasswordPage
                            ._name
                        }.${
                          localeNamespaceKeys.authorization.forgotPasswordPage
                            .question
                        }`
                      )}{" "}
                    </span>
                    <Link to={routePaths.auth.register}>
                      {t(
                        `${
                          localeNamespaceKeys.authorization.forgotPasswordPage
                            ._name
                        }.${
                          localeNamespaceKeys.authorization.forgotPasswordPage
                            .callToActionLink
                        }`
                      )}
                    </Link>
                  </div>
                  <Formik
                    onSubmit={submit}
                    validationSchema={forgotPasswordValidationSchema()}
                    initialValues={{
                      [forgotPassword.email]: ""
                    }}
                    render={renderProp}
                  />
                </div>
              );
            }}
          </ResetPasswordComponent>
        )
      }
    </NamespacesConsumer>
  );
};

export default ForgotPassword;
