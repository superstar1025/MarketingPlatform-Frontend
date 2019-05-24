import * as React from "react";
import { Route, RouteProps } from "react-router-dom";

import CowLogo from "../UI/Icons/CowLogo";
import routePaths from "../../../constants/routePaths";
import Login from "../Pages/Authentication/Login";
import ResetPassword from "../Pages/Authentication/ResetPassword";
import Register from "../Pages/Authentication/Register";
import ForgotPassword from "../Pages/Authentication/ForgotPassword";

interface ITestIds {
  authentication: string;
}

// TODO: refactor some of the auth page error and success messages to use a utility function
class Authentication extends React.PureComponent<RouteProps> {
  public static readonly testIds: ITestIds = {
    authentication: "authentication"
  };
  public render() {
    return (
      <div
        className="widget-page-container page"
        data-testid={Authentication.testIds.authentication}
      >
        <div>
          <CowLogo />
        </div>
        <Route path={routePaths.auth.login} render={Login} />
        <Route path={routePaths.auth.resetPassword} render={ResetPassword} />
        <Route path={routePaths.auth.register} render={Register} />
        <Route path={routePaths.auth.forgotPassword} render={ForgotPassword} />
      </div>
    );
  }
}

export default Authentication;
