import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={prop =>
      isAuthenticated ? <Component {...prop} /> : <Redirect to="/signIn" />
    }
  />
);

export default ProtectedRoute;
