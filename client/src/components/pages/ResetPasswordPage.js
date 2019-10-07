import React, { Component } from "react";
import axios from "axios";
import { isEmpty } from "../../helpers/CustomValidators";
class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmationPassword: "",
      errors: {},
      success: {}
    };

    console.log("pppp", props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {}
  onInputChange(e) {
    // console.log({ [e.target.name]: e.target.value });
    //console.log(e.currentTarget);
    this.setState({ [e.target.name]: e.target.value });
  }
  onFormSubmit(e) {
    e.preventDefault();

    axios
      .put(`api/auth/resetPassword/${this.props.match.params.id}`, {
        password: this.state.password,
        confirmationPassword: this.state.confirmationPassword
      })
      .then(response => {
        this.setState({ success: response.data.success, errors: {} });
      })
      .catch(error => {
        if (error.response) {
          const { errors } = error.response.data;
          this.setState({ errors: errors, success: {} });
        }
      });
  }

  render() {
    if (
      this.state.errors &&
      this.state.errors.global &&
      this.state.errors.global.includes("invalid token")
    ) {
      return (
        <div
          style={{ margin: "50px auto", maxWidth: "400px", minHeight: "80vh" }}
        >
          <div
            style={{ marginTop: "10px" }}
            class="alert alert-danger"
            role="alert"
          >
            {this.state.errors.global}
          </div>
        </div>
      );
    } else if (this.state.success && this.state.success.global) {
      return (
        <div
          style={{ margin: "50px auto", maxWidth: "400px", minHeight: "80vh" }}
        >
          <div
            class="alert alert-success"
            style={{ marginTop: "10px" }}
            role="alert"
          >
            {this.state.success.global}
          </div>
        </div>
      );
    }
    return (
      <div
        style={{ margin: "50px auto", maxWidth: "400px", minHeight: "80vh" }}
      >
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label>New password *</label>
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
          <div className="form-group">
            <label>Confirm new password *</label>
            <input
              type="password"
              className={
                this.state.errors && this.state.errors.confirmationPassword
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="password2"
              name="confirmationPassword"
              value={this.state.confirmationPassword}
              onChange={this.onInputChange}
            />
            <div className="invalid-feedback">
              {this.state.errors.confirmationPassword}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {!isEmpty(this.state.errors) && (
          <div
            style={{ marginTop: "10px" }}
            class="alert alert-danger"
            role="alert"
          >
            {this.state.errors.global
              ? this.state.errors.global
              : "form value(s) is (are) unvalid"}
          </div>
        )}
      </div>
    );
  }
}

export default ResetPasswordPage;
