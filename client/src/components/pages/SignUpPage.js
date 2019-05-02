import React, { Component } from "react";
import axios from "axios";
import { isEmpty } from "../../helpers/CustomValidators";
class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmationPassword: "",
      firstName: "",
      lastName: "",
      gender: "male",
      phoneNumber: "",
      birthDate: "",
      errors: {},
      success: {}
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(e) {
    // console.log({ [e.target.name]: e.target.value });
    //console.log(e.currentTarget);
    this.setState({ [e.target.name]: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();

    axios
      .post("api/auth/signUp", {
        email: this.state.email,
        password: this.state.password,
        confirmationPassword: this.state.confirmationPassword,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        gender: this.state.gender == "male" ? true : false,
        birthDate: this.state.birthDate,
        ...(this.state.phoneNumber && { phoneNumber: this.state.phoneNumber })
      })
      .then(response => {
        console.log(response);
        this.setState({ success: response.data.success, errors: {} });
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
      <div style={{ margin: "30px auto", maxWidth: "400px" }}>
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label>First name *</label>
            <input
              name="firstName"
              type="text"
              className={
                this.state.errors && this.state.errors.firstName
                  ? "form-control is-invalid"
                  : "form-control"
              }
              value={this.state.firstName}
              onChange={this.onInputChange}
            />
            <div className="invalid-feedback">
              {this.state.errors.firstName}
            </div>
          </div>
          <div className="form-group">
            <label>Last name *</label>
            <input
              type="text"
              name="lastName"
              className={
                this.state.errors && this.state.errors.lastName
                  ? "form-control is-invalid"
                  : "form-control"
              }
              value={this.state.lastName}
              onChange={this.onInputChange}
            />
            <div className="invalid-feedback">{this.state.errors.lastName}</div>
          </div>

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
            <label>phone Number (optional)</label>
            <input
              type="text"
              name="phoneNumber"
              className={
                this.state.errors && this.state.errors.phoneNumber
                  ? "form-control is-invalid"
                  : "form-control"
              }
              value={this.state.phoneNumber}
              onChange={this.onInputChange}
            />
            <div className="invalid-feedback">
              {this.state.errors.phoneNumber}
            </div>
          </div>
          <div className="form-group">
            <label>gender *</label>
            <br />
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                checked={this.state.gender == "male"}
                onChange={this.onInputChange}
                id="inlineRadio1"
                value="male"
              />
              <label class="form-check-label" for="inlineRadio1">
                male
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                checked={this.state.gender == "female"}
                onChange={this.onInputChange}
                id="inlineRadio2"
                value="female"
              />
              <label class="form-check-label" for="inlineRadio2">
                female
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>birth Date *</label>
            <input
              type="date"
              name="birthDate"
              className={
                this.state.errors && this.state.errors.birthDate
                  ? "form-control is-invalid"
                  : "form-control"
              }
              value={this.state.birthDate}
              onChange={this.onInputChange}
            />
            <div className="invalid-feedback">
              {this.state.errors.birthDate}
            </div>
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
          <div className="form-group">
            <label>Confirm password *</label>
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
          {!isEmpty(this.state.errors) && (
            <div
              style={{ marginTop: "10px" }}
              class="alert alert-danger"
              role="alert"
            >
              form value(s) is (are) unvalid
            </div>
          )}
        </form>
        {this.state.success && this.state.success.global && (
          <div
            style={{
              color: "green",
              fontWeight: 500,
              margin: "5px"
            }}
          >
            {this.state.success.global}
          </div>
        )}
      </div>
    );
  }
}

export default SignUpPage;
