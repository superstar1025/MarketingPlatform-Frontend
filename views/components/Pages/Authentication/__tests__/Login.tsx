import React from "react";
import { fireEvent, waitForElement } from "react-testing-library";

import Login from "../Login";
import { renderTestUtil } from "../../../../../setupTests";
import { authenticationFormFields } from "../../../../../constants/formFields";
import Routes from "../../../../../Routes";
import {
  mockEmail,
  mockGraphQLErrorMessage,
  mockPassword,
  mockPasswordFail,
  mockToken,
  tokenAuthMockFailure,
  tokenAuthMockSuccess
} from "../../../../../mocks/authentication";
import { getToken } from "../../../../../utils/localStorage";
import { dashboardTestIds } from "../../App/Domain/Dashboard";

const { login } = authenticationFormFields;

describe(`<${Login.name}>`, () => {
  afterEach(() => {
    localStorage.clear();
  });
  it("should render an error message and keep the submit button disabled if the user does not pass the email validation check", async () => {
    const { container } = renderTestUtil({ ui: <Login /> });
    const emailField = await waitForElement(
      () =>
        container.querySelector(`input[name="${login.email}"]`) as HTMLElement
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
    const { container } = renderTestUtil({ ui: <Login /> });
    const passwordField = await waitForElement(
      () =>
        container.querySelector(
          `input[name="${login.password}"]`
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
  it("should set the token and redirect the user to the page where they originally came from if they login successfully", async () => {
    const { container, getByTestId } = renderTestUtil({
      mocks: [tokenAuthMockSuccess],
      ui: <Routes />
    });
    const emailField = container.querySelector(
      `input[name="${login.email}"]`
    ) as HTMLElement;
    const passwordField = container.querySelector(
      `input[name="${login.password}"]`
    ) as HTMLElement;
    fireEvent.change(emailField, { target: { value: mockEmail } });
    fireEvent.change(passwordField, { target: { value: mockPassword } });
    fireEvent.submit(container.querySelector("form") as HTMLElement);
    const homePage = await waitForElement(
      () => getByTestId(dashboardTestIds.dashboard) as HTMLElement
    );
    expect(getToken()).toEqual(mockToken);
    expect(homePage).toBeTruthy();
  });
  it("should render graphQL error messages", async () => {
    const { container } = renderTestUtil({
      mocks: [tokenAuthMockFailure],
      ui: <Login />
    });
    const emailField = container.querySelector(
      `input[name="${login.email}"]`
    ) as HTMLElement;
    const passwordField = container.querySelector(
      `input[name="${login.password}"]`
    ) as HTMLElement;
    fireEvent.change(emailField, { target: { value: mockEmail } });
    fireEvent.change(passwordField, { target: { value: mockPasswordFail } });
    fireEvent.submit(container.querySelector("form") as HTMLElement);
    const errorMessage = await waitForElement(
      () =>
        container.querySelector(
          'div[class="error-message"] > span'
        ) as HTMLElement
    );
    const disabled = await waitForElement(
      () => container.querySelector("button[disabled]") as HTMLElement
    );

    expect(errorMessage).toBeTruthy();
    expect(errorMessage.innerHTML).toEqual(mockGraphQLErrorMessage);
    expect(disabled).toBeTruthy();
    expect(getToken()).toEqual(null);
  });
});
