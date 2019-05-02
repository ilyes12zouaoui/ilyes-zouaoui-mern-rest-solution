import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <nav className="navbar navbar-expand-md bg-primary navbar-dark sticky-top">
        <NavLink className="navbar-brand" to="/">
          Zouaoui Ilyes MERN Stack
        </NavLink>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          {/* <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
          </ul> */}
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <NavLink className="nav-link" to="/">
                home
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/signIn">
                signIn
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/signUp">
                signUp
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
