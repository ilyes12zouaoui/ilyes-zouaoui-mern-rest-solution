import React, { Component } from "react";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";

import ProtectedRoute from "./commun/ProtectedRoute";

import ProtectedRouteRedirectToHome from "./commun/ProtectedRouteRedirectToHome";
import ProtectedAdminRoute from "./commun/ProtectedAdminRoute";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileUpdatePasswordPage from "./pages/ProfileUpdatePasswordPage";
import ProfileUpdateInfosPage from "./pages/ProfileUpdateInfosPage";
import AccountActivationPage from "./pages/AccountActivationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminMageUsersPage from "./pages/AdminMageUsersPage";

function checkIfUserConnectedAndReturnUser() {
  let user = {
    isAuthenticated: false,
    role: "",
    user: {}
  };

  if (localStorage.Authorization && localStorage.user) {
    user = {
      isAuthenticated: true,
      role: JSON.parse(localStorage.user).role,
      user: JSON.parse(localStorage.user)
    };
    axios.defaults.headers.common["Authorization"] = localStorage.Authorization;
  }

  return user;
}

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = checkIfUserConnectedAndReturnUser();
    this.loginMethod = this.loginMethod.bind(this);
    this.logoutMethod = this.logoutMethod.bind(this);
    this.updateUserAfterImageChangeMethod = this.updateUserAfterImageChangeMethod.bind(
      this
    );
    this.updateUser = this.updateUser.bind(this);
  }

  loginMethod(user, token) {
    localStorage.setItem("Authorization", `JWT ${token}`);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
    this.setState({ role: user.role, user, isAuthenticated: true });
  }

  logoutMethod() {
    axios.delete("api/auth/SignOut").then(res => {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("Authorization");
      localStorage.removeItem("user");
      this.setState({ role: "", user: {}, isAuthenticated: false });
    });
  }

  updateUser(user, profileUpdateInfosPageSuccess) {
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({ role: user.role, user, profileUpdateInfosPageSuccess });
  }
  updateUserAfterImageChangeMethod(imageName) {
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user);
      user.image = imageName;
      localStorage.setItem("user", JSON.stringify(user));
      this.setState({ user });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Header
          logoutMethod={this.logoutMethod}
          isAuthenticated={this.state.isAuthenticated}
          user={this.state.user}
        />
        <main>
          <Switch>
            <Route path="/" exact component={HomePage} />

            <ProtectedRoute
              path="/profile"
              isAuthenticated={this.state.isAuthenticated}
              component={props => (
                <ProfilePage
                  {...props}
                  updateUserAfterImageChangeMethod={
                    this.updateUserAfterImageChangeMethod
                  }
                  user={this.state.user}
                />
              )}
            />
            <ProtectedRoute
              path="/updatePassword"
              isAuthenticated={this.state.isAuthenticated}
              component={props => <ProfileUpdatePasswordPage {...props} />}
            />
            <ProtectedAdminRoute
              path="/manageUsers"
              isAuthenticated={this.state.isAuthenticated}
              role={this.state.role}
              component={props => (
                <AdminMageUsersPage {...props} user={this.state.user} />
              )}
            />
            <ProtectedRoute
              path="/updateProfile"
              isAuthenticated={this.state.isAuthenticated}
              component={props => (
                <ProfileUpdateInfosPage
                  success={
                    this.state.profileUpdateInfosPageSuccess
                      ? this.state.profileUpdateInfosPageSuccess
                      : {}
                  }
                  updateUser={this.updateUser}
                  {...props}
                  user={this.state.user}
                />
              )}
            />
            <ProtectedRouteRedirectToHome
              path="/resetPassword/:id"
              isAuthenticated={!this.state.isAuthenticated}
              component={props => <ResetPasswordPage {...props} />}
            />
            <ProtectedRouteRedirectToHome
              path="/signIn"
              isAuthenticated={!this.state.isAuthenticated}
              component={props => (
                <SignInPage {...props} loginMethod={this.loginMethod} />
              )}
            />
            <ProtectedRouteRedirectToHome
              path="/forgotPassword"
              isAuthenticated={!this.state.isAuthenticated}
              component={props => <ForgotPasswordPage {...props} />}
            />
            <ProtectedRouteRedirectToHome
              path="/signUp"
              isAuthenticated={!this.state.isAuthenticated}
              component={props => <SignUpPage {...props} />}
            />
            <ProtectedRouteRedirectToHome
              path="/about"
              isAuthenticated={!this.state.isAuthenticated}
              component={props => <AboutPage {...props} />}
            />
            <ProtectedRouteRedirectToHome
              path="/accountActivation/:id"
              isAuthenticated={!this.state.isAuthenticated}
              component={props => <AccountActivationPage {...props} />}
            />
            <ProtectedRoute component={NotFoundPage} />
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default AppRouter;
