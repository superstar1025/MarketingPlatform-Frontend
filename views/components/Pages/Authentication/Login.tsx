import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
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

import { authenticationFormFields } from "../../../../constants/formFields";
import { getToken } from "../../../../utils/localStorage";
import localeNamespaceKeys from "../../../../constants/localization";
import { loginValidationSchema } from "../../../../utils/formValidation/authentication";
import routePaths from "../../../../constants/routePaths";
import GraphQLErrors from "../../Helpers/GraphQLErrors";
import routeParams from "../../../../constants/routeParams";
import { queryLocationURL } from "../../../../utils/browserAPI";
import TokenRedirect from "./TokenRedirect";
import { TokenAuthComponent } from "../../../../typeDefinitions/__generated__/components";

const { UikButton, UikFormInputGroup } = require("../../../../@uik");

interface ITestIds {
  login: string;
}

interface ILoginFormValues {
  [key: string]: string | undefined;
  email?: string;
  password?: string;
}

export const loginTestIds: ITestIds = {
  login: "login"
};

const { login } = authenticationFormFields;

const Login = ({ location }: RouteComponentProps) => {
  const { from } = get("state")(location) || {
    from: { pathname: "/stores" }
  };

  const token = getToken();
  if (token) {
    return <TokenRedirect token={token} pathname={from.pathname} />;
  }

  return (
    <NamespacesConsumer
      ns={[
        localeNamespaceKeys.authorization._name,
        localeNamespaceKeys.formValidation._name
      ]}
    >
      {(t, { ready }) =>
        ready && (
          <TokenAuthComponent>
            {(tokenAuth, result) => {
              const { data, loading } = result;

              const newToken = get("tokenAuth.token")(data);

              if (newToken) {
                return (
                  <TokenRedirect token={newToken} pathname={from.pathname} />
                );
              }

              const passwordWasResetMessage =
                queryLocationURL({
                  location,
                  queryParam: routeParams.RESET
                }) === "true"
                  ? t(
                      `${localeNamespaceKeys.authorization.loginPage._name}.${
                        localeNamespaceKeys.authorization.loginPage
                          .passwordWasReset
                      }`
                    )
                  : null;

              const submit = (
                { email, password }: ILoginFormValues,
                { resetForm }: FormikActions<ILoginFormValues>
              ) => {
                tokenAuth({
                  variables: {
                    email: email || "",
                    password: password || ""
                  }
                }).catch(() => {
                  resetForm({
                    email,
                    password
                  });
                });
              };

              const renderProp = ({
                values,
                errors,
                dirty,
                isSubmitting
              }: FormikProps<ILoginFormValues>) => {
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
                        name={login.email}
                        value={values[login.email]}
                        type="email"
                        className="form-input"
                      />
                      <ErrorMessage name={login.email}>
                        {() => (
                          <div className="error-message">
                            {t(
                              `${localeNamespaceKeys.formValidation._name}:${
                                errors[login.email]
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
                                .password
                            }`
                          )}
                        </label>
                      </div>
                      <Field
                        name={login.password}
                        value={values[login.password]}
                        type="password"
                        className="form-input"
                      />
                      <div className="form-field-link">
                        <Link to={routePaths.auth.forgotPassword}>
                          {t(
                            `${
                              localeNamespaceKeys.authorization.loginPage._name
                            }.${
                              localeNamespaceKeys.authorization.loginPage
                                .forgotPasswordQuestion
                            }`
                          )}
                        </Link>
                      </div>
                      <ErrorMessage name={login.password}>
                        {() => (
                          <div className="error-message">
                            {t(
                              `${localeNamespaceKeys.formValidation._name}:${
                                errors[login.password]
                              }`
                            )}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <GraphQLErrors mutationResult={result} />
                    {passwordWasResetMessage && (
                      <div className="success-message">
                        {passwordWasResetMessage}
                      </div>
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
                              localeNamespaceKeys.authorization.loginPage._name
                            }.${
                              localeNamespaceKeys.authorization.loginPage
                                .buttonText
                            }`
                          )}
                        </UikButton>
                      </UikFormInputGroup>
                    </div>
                  </Form>
                );
              };
              return (
                <div className="auth-page" data-testid={loginTestIds.login}>
                  <div className="widget-page-form-header">
                    {t(
                      `${localeNamespaceKeys.authorization.loginPage._name}.${
                        localeNamespaceKeys.authorization.loginPage.header
                      }`
                    )}
                  </div>
                  <div className="widget-page-form-link">
                    <span className="light-text">
                      {t(
                        `${localeNamespaceKeys.authorization.loginPage._name}.${
                          localeNamespaceKeys.authorization.loginPage.question
                        }`
                      )}{" "}
                    </span>
                    <Link to={routePaths.auth.register}>
                      {t(
                        `${localeNamespaceKeys.authorization.loginPage._name}.${
                          localeNamespaceKeys.authorization.loginPage
                            .callToActionLink
                        }`
                      )}
                    </Link>
                  </div>
                  <Formik
                    onSubmit={submit}
                    validationSchema={loginValidationSchema()}
                    initialValues={{
                      [login.email]: "",
                      [login.password]: ""
                    }}
                    render={renderProp}
                  />
                </div>
              );
            }}
          </TokenAuthComponent>
        )
      }
    </NamespacesConsumer>
  );
};

export default Login;
