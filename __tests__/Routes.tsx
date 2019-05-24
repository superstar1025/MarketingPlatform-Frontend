import React from "react";

import Routes from "../Routes";
import { renderTestUtil } from "../setupTests";
import routePaths from "../constants/routePaths";
import { loginTestIds } from "../views/components/Pages/Authentication/Login";
import { resetPasswordTestIds } from "../views/components/Pages/Authentication/ResetPassword";
import { forgotPasswordTestIds } from "../views/components/Pages/Authentication/ForgotPassword";
import { registerTestIds } from "../views/components/Pages/Authentication/Register";
import { mockToken } from "../mocks/authentication";
import { setToken } from "../utils/localStorage";
import { dashboardTestIds } from "../views/components/Pages/App/Domain/Dashboard";

describe(`${Routes.name}`, () => {
  afterEach(() => {
    localStorage.clear();
  });
  it("should redirect to login page if user goes to home page and local storage token is falsy", async () => {
    const { getByTestId, history } = renderTestUtil({ ui: <Routes /> });
    const loginPage = await getByTestId(loginTestIds.login);

    expect(history.location.pathname).toEqual(routePaths.auth.login);
    expect(loginPage).toBeTruthy();
  });
  it("should allow user access to home page if local storage token is truthy", async () => {
    setToken(mockToken);
    const { getByTestId, history } = renderTestUtil({ ui: <Routes /> });
    const homePage = await getByTestId(dashboardTestIds.dashboard);

    expect(history.location.pathname).toEqual(routePaths.dashboard);
    expect(homePage).toBeTruthy();
  });
  it("should allow user access to login page if local storage token is falsy", async () => {
    const { getByTestId, history } = renderTestUtil({
      testOptions: {
        route: routePaths.auth.login
      },
      ui: <Routes />
    });
    const homePage = await getByTestId(loginTestIds.login);

    expect(history.location.pathname).toEqual(routePaths.auth.login);
    expect(homePage).toBeTruthy();
  });
  it("should allow user access to reset password page if local storage token is falsy", async () => {
    const { getByTestId, history } = renderTestUtil({
      testOptions: {
        route: routePaths.auth.resetPassword
      },
      ui: <Routes />
    });
    const resetPasswordPage = await getByTestId(
      resetPasswordTestIds.resetPassword
    );

    expect(history.location.pathname).toEqual(routePaths.auth.resetPassword);
    expect(resetPasswordPage).toBeTruthy();
  });
  it("should allow user access to forgot password page if local storage token is falsy", async () => {
    const { getByTestId, history } = renderTestUtil({
      testOptions: {
        route: routePaths.auth.forgotPassword
      },
      ui: <Routes />
    });
    const forgotPasswordPage = await getByTestId(
      forgotPasswordTestIds.forgotPassword
    );

    expect(history.location.pathname).toEqual(routePaths.auth.forgotPassword);
    expect(forgotPasswordPage).toBeTruthy();
  });
  it("should allow user access to register page if local storage token is falsy", async () => {
    const { getByTestId, history } = renderTestUtil({
      testOptions: {
        route: routePaths.auth.register
      },
      ui: <Routes />
    });
    const registerPage = await getByTestId(registerTestIds.register);

    expect(history.location.pathname).toEqual(routePaths.auth.register);
    expect(registerPage).toBeTruthy();
  });
});
