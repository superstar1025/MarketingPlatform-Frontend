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
import { adopt } from "react-adopt";
import isEmpty from "lodash/fp/isEmpty";
import { RenderFn } from "create-react-context";

import { authenticationFormFields } from "../../../../constants/formFields";
import { registerValidationSchema } from "../../../../utils/formValidation/authentication";
import localeNamespaceKeys from "../../../../constants/localization";
import routePaths from "../../../../constants/routePaths";
import GraphQLErrors from "../../Helpers/GraphQLErrors";
import TokenRedirect from "./TokenRedirect";
import {
  RegisterComponent,
  TokenAuthComponent,
  TokenAuthMutation,
  TokenAuthVariables,
  RegisterMutation,
  RegisterVariables
} from "../../../../typeDefinitions/__generated__/components";
import { MutationRenderProp } from "../../../../typeDefinitions";

const { UikButton, UikFormInputGroup } = require("../../../../@uik");

interface ITestIds {
  register: string;
}

interface IRegisterFormValues {
  [key: string]: string | undefined;
  email?: string;
  password?: string;
  domainLabel?: string;
  firstName?: string;
  lastName?: string;
}

export interface IMapper {
  render: RenderFn<any>;
}

interface IMapped {
  loginMutation: MutationRenderProp<TokenAuthMutation, TokenAuthVariables>;
  registerMutation: MutationRenderProp<RegisterMutation, RegisterVariables>;
}

type Register = (props: RouteProps) => React.ReactElement<any>;

export const registerTestIds: ITestIds = {
  register: "register"
};

const { register } = authenticationFormFields;

const registerMutation = ({ render }: IMapper) => (
  <RegisterComponent>
    {(mutation, result) => render({ mutation, result })}
  </RegisterComponent>
);

const loginMutation = ({ render }: IMapper) => (
  <TokenAuthComponent>
    {(mutation, result) => render({ mutation, result })}
  </TokenAuthComponent>
);

const Composed = adopt({
  loginMutation,
  registerMutation
});

const Register: Register = () => {
  return (
    <NamespacesConsumer
      ns={[
        localeNamespaceKeys.authorization._name,
        localeNamespaceKeys.formValidation._name
      ]}
    >
      {(t, { ready }) =>
        ready && (
          <Composed>
            {({ loginMutation, registerMutation }: IMapped) => {
              const newToken =
                loginMutation &&
                loginMutation.result.data &&
                loginMutation.result.data.tokenAuth &&
                loginMutation.result.data.tokenAuth.token;

              const domainId =
                (registerMutation &&
                  registerMutation.result.data &&
                  registerMutation.result.data.register &&
                  registerMutation.result.data.register.domain &&
                  registerMutation.result.data.register.domain.id) ||
                "";
              if (newToken) {
                return (
                  <TokenRedirect
                    token={newToken}
                    pathname={routePaths.catalog.getProductsListPath(domainId)}
                  />
                );
              }
              const submit = async (
                {
                  domainLabel,
                  email,
                  firstName,
                  lastName,
                  password
                }: IRegisterFormValues,
                { setSubmitting }: FormikActions<IRegisterFormValues>
              ) => {
                try {
                  await registerMutation.mutation({
                    variables: {
                      domainLabel: domainLabel || "",
                      email: email || "",
                      firstName: firstName || "",
                      lastName: lastName || "",
                      password: password || ""
                    }
                  });
                  await loginMutation.mutation({
                    variables: {
                      email: email || "",
                      password: password || ""
                    }
                  });
                  setSubmitting(false);
                } catch (error) {
                  setSubmitting(false);
                }
              };
              const renderProp = ({
                values,
                errors,
                isSubmitting
              }: FormikProps<IRegisterFormValues>) => {
                const buttonDisabled =
                  !isEmpty(errors) ||
                  (registerMutation && registerMutation.result.loading) ||
                  (loginMutation && loginMutation.result.loading) ||
                  isSubmitting;
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
                                .domain
                            }`
                          )}
                        </label>
                      </div>
                      <Field
                        name={register.domainLabel}
                        value={values[register.domainLabel]}
                        className="form-input"
                      />
                      <ErrorMessage name={register.domainLabel}>
                        {() => (
                          <div className="error-message">
                            {t(
                              `${localeNamespaceKeys.formValidation._name}:${
                                errors[register.domainLabel]
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
                                .firstName
                            }`
                          )}
                        </label>
                      </div>
                      <Field
                        name={register.firstName}
                        value={values[register.firstName]}
                        className="form-input"
                      />
                      <ErrorMessage name={register.firstName}>
                        {() => (
                          <div className="error-message">
                            {t(
                              `${localeNamespaceKeys.formValidation._name}:${
                                errors[register.firstName]
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
                                .lastName
                            }`
                          )}
                        </label>
                      </div>
                      <Field
                        name={register.lastName}
                        value={values[register.lastName]}
                        className="form-input"
                      />
                      <ErrorMessage name={register.lastName}>
                        {() => (
                          <div className="error-message">
                            {t(
                              `${localeNamespaceKeys.formValidation._name}:${
                                errors[register.lastName]
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
                                .emailAddress
                            }`
                          )}
                        </label>
                      </div>
                      <Field
                        name={register.email}
                        value={values[register.email]}
                        type="email"
                        className="form-input"
                      />
                      <ErrorMessage name={register.email}>
                        {() => (
                          <div className="error-message">
                            {t(
                              `${localeNamespaceKeys.formValidation._name}:${
                                errors[register.email]
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
                        name={register.password}
                        value={values[register.password]}
                        type="password"
                        className="form-input"
                      />
                      <ErrorMessage name={register.password}>
                        {() => (
                          <div className="error-message">
                            {t(
                              `${localeNamespaceKeys.formValidation._name}:${
                                errors[register.password]
                              }`
                            )}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <GraphQLErrors
                      mutationResult={
                        registerMutation && registerMutation.result
                      }
                    />
                    <GraphQLErrors
                      mutationResult={loginMutation && loginMutation.result}
                    />
                    <div className="form-button">
                      <UikFormInputGroup>
                        <UikButton
                          type="submit"
                          success
                          disabled={buttonDisabled}
                          isLoading={
                            (registerMutation &&
                              registerMutation.result &&
                              registerMutation.result.loading) ||
                            (loginMutation &&
                              loginMutation.result &&
                              loginMutation.result.loading)
                          }
                        >
                          {t(
                            `${
                              localeNamespaceKeys.authorization.registerPage
                                ._name
                            }.${
                              localeNamespaceKeys.authorization.registerPage
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
                <div
                  className="auth-page"
                  data-testid={registerTestIds.register}
                >
                  <div className="widget-page-form-header">
                    {t(
                      `${
                        localeNamespaceKeys.authorization.registerPage._name
                      }.${
                        localeNamespaceKeys.authorization.registerPage.header
                      }`
                    )}
                  </div>
                  <div className="widget-page-form-link">
                    <span className="light-text">
                      {t(
                        `${
                          localeNamespaceKeys.authorization.registerPage._name
                        }.${
                          localeNamespaceKeys.authorization.registerPage
                            .question
                        }`
                      )}{" "}
                    </span>
                    <Link to={routePaths.auth.login}>
                      {t(
                        `${
                          localeNamespaceKeys.authorization.registerPage._name
                        }.${
                          localeNamespaceKeys.authorization.registerPage
                            .callToActionLink
                        }`
                      )}
                    </Link>
                  </div>
                  <Formik
                    onSubmit={submit}
                    validationSchema={registerValidationSchema()}
                    initialValues={{
                      [register.email]: "",
                      [register.password]: "",
                      [register.domainLabel]: "",
                      [register.firstName]: "",
                      [register.lastName]: ""
                    }}
                    render={renderProp}
                  />
                </div>
              );
            }}
          </Composed>
        )
      }
    </NamespacesConsumer>
  );
};

export default Register;
