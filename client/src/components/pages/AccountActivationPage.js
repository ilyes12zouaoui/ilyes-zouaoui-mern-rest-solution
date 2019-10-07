import React, { Component } from "react";
import axios from "axios";

class AccountActivationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    console.log(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  componentDidMount() {
    console.log(this.props.match.params.id);
    axios
      .get(`api/auth/AccountActivation/${this.props.match.params.id}`)
      .then(response => {
        this.setState(response.data);
      })
      .catch(error => {
        console.log(error.response);
        if (error.response) {
          const { errors } = error.response.data;
          this.setState({ errors: errors, success: {} });
        }
      });
  }

  onButtonClick() {
    this.props.history.push("/signIn");
  }

  render() {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ margin: "30px auto", minHeight: "80vh" }}
      >
        <h1 class="display-4">
          {" "}
          {this.state.success && this.state.success.global}
          {this.state.errors && this.state.errors.global}
        </h1>
      </div>
    );
  }
}

export default AccountActivationPage;
