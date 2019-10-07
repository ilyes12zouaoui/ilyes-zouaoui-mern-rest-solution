import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRouteRedirectToHome = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={prop =>
      isAuthenticated ? <Component {...prop} /> : <Redirect to="/" />
    }
  />
);

export default ProtectedRouteRedirectToHome;
