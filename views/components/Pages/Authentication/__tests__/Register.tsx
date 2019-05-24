import * as React from "react";
import { fireEvent, waitForElement } from "react-testing-library";

import Register from "../Register";
import { renderTestUtil } from "../../../../../setupTests";
import { authenticationFormFields } from "../../../../../constants/formFields";
// import Routes from "Routes";
// import {
//   // mockDomain,
//   mockDomainFail,
//   mockEmail,
//   mockFirstName,
//   mockGraphQLErrorMessage,
//   mockLastName,
//   mockPassword,
//   mockToken,
//   registerMockFailure,
//   registerMockSuccess,
//   tokenAuthMockFailure,
//   tokenAuthMockSuccess
// } from "mocks/authentication";
// import { appTestIds } from "App";
// import { getToken } from "utils/localStorage";
// import routePaths from "constants/routePaths";

const { register } = authenticationFormFields;

describe(`<${Register.name}>`, () => {
  afterEach(() => {
    localStorage.clear();
  });
  it("should render an error message and keep the submit button disabled if the user does not pass the email validation check", async () => {
    const { container } = renderTestUtil({ ui: <Register /> });
    const emailField = await waitForElement(
      () =>
        container.querySelector(
          `input[name="${register.email}"]`
        ) as HTMLElement
    );
    fireEvent.change(emailField, { target: { value: "taco" } });
    fireEvent.blur(emailField);
    const errorMessage = await waitForElement(
      () => container.querySelector('div[class="error-message"]') as HTMLElement
    );
    const disabled = container.querySelector("button[disabled]") as HTMLElement;
    expect(errorMessage).toBeTruthy();
    expect(disabled).toBeTruthy();
  });
  it("should render an error message and keep the submit button disabled if the user does not pass the password validation check", async () => {
    const { container } = renderTestUtil({ ui: <Register /> });
    const passwordField = await waitForElement(
      () =>
        container.querySelector(
          `input[name="${register.password}"]`
        ) as HTMLElement
    );
    fireEvent.change(passwordField, { target: { value: "" } });
    fireEvent.blur(passwordField);
    const errorMessage = await waitForElement(
      () => container.querySelector('div[class="error-message"]') as HTMLElement
    );
    const disabled = await waitForElement(
      () => container.querySelector("button[disabled]") as HTMLElement
    );
    expect(errorMessage).toBeTruthy();
    expect(disabled).toBeTruthy();
  });
  it("should render an error message and keep the submit button disabled if the user does not pass the domain validation check", async () => {
    const { container } = renderTestUtil({ ui: <Register /> });
    const domainField = await waitForElement(
      () =>
        container.querySelector(
          `input[name="${register.domainLabel}"]`
        ) as HTMLElement
    );
    fireEvent.change(domainField, { target: { value: "" } });
    fireEvent.blur(domainField);
    const errorMessage = await waitForElement(
      () => container.querySelector('div[class="error-message"]') as HTMLElement
    );
    const disabled = await waitForElement(
      () => container.querySelector("button[disabled]") as HTMLElement
    );
    expect(errorMessage).toBeTruthy();
    expect(disabled).toBeTruthy();
  });
  it("should render an error message and keep the submit button disabled if the user does not pass the firstName validation check", async () => {
    const { container } = renderTestUtil({ ui: <Register /> });
    const firstNameField = await waitForElement(
      () =>
        container.querySelector(
          `input[name="${register.firstName}"]`
        ) as HTMLElement
    );
    fireEvent.change(firstNameField, { target: { value: "" } });
    fireEvent.blur(firstNameField);
    const errorMessage = await waitForElement(
      () => container.querySelector('div[class="error-message"]') as HTMLElement
    );
    const disabled = await waitForElement(
      () => container.querySelector("button[disabled]") as HTMLElement
    );
    expect(errorMessage).toBeTruthy();
    expect(disabled).toBeTruthy();
  });
  it("should render an error message and keep the submit button disabled if the user does not pass the lastName validation check", async () => {
    const { container } = renderTestUtil({ ui: <Register /> });
    const lastNameField = await waitForElement(
      () =>
        container.querySelector(
          `input[name="${register.lastName}"]`
        ) as HTMLElement
    );
    fireEvent.change(lastNameField, { target: { value: "" } });
    fireEvent.blur(lastNameField);
    const errorMessage = await waitForElement(
      () => container.querySelector('div[class="error-message"]') as HTMLElement
    );
    const disabled = await waitForElement(
      () => container.querySelector("button[disabled]") as HTMLElement
    );
    expect(errorMessage).toBeTruthy();
    expect(disabled).toBeTruthy();
  });

  // TODO: come back to these integration tests and figure out how to properly mock

  // it("should set the token and redirect the user to the home page if they register and login successfully", async () => {
  //   const { container, getByTestId } = renderTestUtil({
  //     mocks: [registerMockSuccess, tokenAuthMockSuccess],
  //     testOptions: {
  //       route: routePaths.auth.register
  //     },
  //     ui: <Routes />
  //   });
  //   const emailField = container.querySelector(
  //     `input[name="${register.email}"]`
  //   ) as HTMLElement;
  //   const passwordField = container.querySelector(
  //     `input[name="${register.password}"]`
  //   ) as HTMLElement;
  //   const domainField = container.querySelector(
  //     `input[name="${register.domain}"]`
  //   ) as HTMLElement;
  //   const firstNameField = container.querySelector(
  //     `input[name="${register.firstName}"]`
  //   ) as HTMLElement;
  //   const lastNameField = container.querySelector(
  //     `input[name="${register.lastName}"]`
  //   ) as HTMLElement;
  //   fireEvent.change(emailField, { target: { value: mockEmail } });
  //   fireEvent.change(passwordField, { target: { value: mockPassword } });
  //   fireEvent.change(domainField, { target: { value: mockDomainFail } });
  //   fireEvent.change(firstNameField, { target: { value: mockFirstName } });
  //   fireEvent.change(lastNameField, { target: { value: mockLastName } });
  //   fireEvent.submit(container.querySelector("form") as HTMLElement);
  //   const homePage = await waitForElement(
  //     () => getByTestId(appTestIds.home) as HTMLElement
  //   );
  //   expect(getToken()).toEqual(mockToken);
  //   expect(homePage).toBeTruthy();
  // });
  // it("should render graphQL error messages", async () => {
  //   const { container } = renderTestUtil({
  //     mocks: [tokenAuthMockFailure, registerMockFailure],
  //     ui: <Register />
  //   });
  //   const emailField = container.querySelector(
  //     `input[name="${register.email}"]`
  //   ) as HTMLElement;
  //   const passwordField = container.querySelector(
  //     `input[name="${register.password}"]`
  //   ) as HTMLElement;
  //   const domainField = container.querySelector(
  //     `input[name="${register.domain}"]`
  //   ) as HTMLElement;
  //   const firstNameField = container.querySelector(
  //     `input[name="${register.firstName}"]`
  //   ) as HTMLElement;
  //   const lastNameField = container.querySelector(
  //     `input[name="${register.lastName}"]`
  //   ) as HTMLElement;
  //   fireEvent.change(emailField, { target: { value: mockEmail } });
  //   fireEvent.change(passwordField, { target: { value: mockPassword } });
  //   fireEvent.change(domainField, { target: { value: mockDomainFail } });
  //   fireEvent.change(firstNameField, { target: { value: mockFirstName } });
  //   fireEvent.change(lastNameField, { target: { value: mockLastName } });
  //   fireEvent.submit(container.querySelector("form") as HTMLElement);
  //   const errorMessage = await waitForElement(
  //     () => container.querySelector('div[class="error-message"]') as HTMLElement
  //   );
  //   const disabled = await waitForElement(
  //     () => container.querySelector("button[disabled]") as HTMLElement
  //   );

  //   expect(errorMessage).toBeTruthy();
  //   expect(errorMessage.innerHTML).toEqual(mockGraphQLErrorMessage);
  //   expect(disabled).toBeTruthy();
  //   expect(getToken()).toEqual(null);
  // });
});
