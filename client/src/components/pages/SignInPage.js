import React, { Component } from "react";
import axios from "axios";
import { isEmpty } from "../../helpers/CustomValidators";
import { Link } from "react-router-dom";
class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      success: {}
    };

    console.log("pppp", props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSpanClick = this.onSpanClick.bind(this);
  }

  onInputChange(e) {
    // console.log({ [e.target.name]: e.target.value });
    //console.log(e.currentTarget);
    this.setState({ [e.target.name]: e.target.value });
  }
  onFormSubmit(e) {
    e.preventDefault();

    axios
      .post("api/auth/signIn", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        const { token, user } = response.data;
        console.log("hedha token :", token);
        this.props.loginMethod(user, token);
        this.props.history.push("/");
        // this.setState({ errors: {} });
      })
      .catch(error => {
        console.log(error.response);
        if (error.response) {
          const { errors } = error.response.data;
          this.setState({ errors: errors, success: {} });
        }
      });
  }

  onSpanClick(id) {
    axios
      .get(`api/auth/resendAccountActivationEmail/${id}`)
      .then(response => {
        this.setState({ success: response.data.success, errors: {} });
        // this.setState({ errors: {} });
      })
      .catch(error => {
        console.log(error.response);
        if (error.response) {
          const { errors } = error.response.data;
          this.setState({ errors: errors, success: {} });
        }
      });
  }

  render() {
    return (
      <div
        style={{ margin: "50px auto", maxWidth: "400px", minHeight: "80vh" }}
      >
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              className={
                this.state.errors && this.state.errors.email
                  ? "form-control is-invalid"
                  : "form-control"
              }
              value={this.state.email}
              onChange={this.onInputChange}
            />
            <div className="invalid-feedback">{this.state.errors.email}</div>
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input
              name="password"
              type="password"
              className={
                this.state.errors && this.state.errors.password
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="password1"
              value={this.state.password}
              onChange={this.onInputChange}
            />
            <div className="invalid-feedback">{this.state.errors.password}</div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <Link
          to="/forgotPassword"
          style={{ marginTop: "10px", display: "block" }}
        >
          forgot password ?
        </Link>

        {this.state.errors.global && (
          <div
            style={{ marginTop: "8px" }}
            class="alert alert-danger"
            role="alert"
          >
            {this.state.errors.global}
            {this.state.errors.global.includes("inactive") && (
              <React.Fragment>
                {" "}
                click{" "}
                <span
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline"
                  }}
                  onClick={() => {
                    this.onSpanClick(this.state.errors.userId);
                  }}
                >
                  hire
                </span>{" "}
                to resent the activation e-mail
              </React.Fragment>
            )}
          </div>
        )}

        {this.state.success && this.state.success.global && (
          <div
            class="alert alert-success"
            style={{ marginTop: "10px" }}
            role="alert"
          >
            {this.state.success.global}
          </div>
        )}
      </div>
    );
  }
}

export default SignInPage;
