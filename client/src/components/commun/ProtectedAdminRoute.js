import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedAdminRoute = ({
  role,
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={prop =>
      isAuthenticated && role == "ADMIN" ? (
        <Component {...prop} />
      ) : (
        <Redirect to="/signIn" />
      )
    }
  />
);

export default ProtectedAdminRoute;
