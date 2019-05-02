import React, { Component } from "react";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";

import ProtectedRoute from "./commun/ProtectedRoute";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <main style={{ minHeight: "85vh" }}>
          <Switch>
            <ProtectedRoute path="/profilePage" component={ProfilePage} />
            <Route path="/signIn" component={SignInPage} />
            <Route path="/signUp" component={SignUpPage} />
            <Route path="/" exact component={HomePage} />
            <Route path="/about" component={AboutPage} />
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default AppRouter;
