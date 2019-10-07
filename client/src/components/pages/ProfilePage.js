import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { image: null, success: {}, errors: {} };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.buttonClose = React.createRef();
  }

  onFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", this.state.image);
    console.log("im", formData.get("image"));
    axios
      .put("api/users/updateProfileImage", formData, {
        headers: { "content-type": "multipart/form-data" }
      })
      .then(response => {
        this.buttonClose.current.click();
        this.setState({ success: response.data.success, errors: {} });
        this.props.updateUserAfterImageChangeMethod(
          response.data.success.imageName
        );
      })
      .catch(error => {
        if (error.response) {
          const { errors } = error.response.data;
          //     this.setState({ errors: errors, success: {} });
        } else {
          console.log(error);
        }
      });
  }
  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.files[0] });
  }
  render() {
    return (
      <div
        className="container"
        style={{ marginTop: "50px", minHeight: "80vh" }}
      >
        <div className="row">
          <div class="col-sm-3">
            <img
              style={{ width: "100%" }}
              src={"/images/" + this.props.user.image}
            />
            <button
              style={{
                width: "100%",
                position: "absolute",
                left: "0",
                bottom: "27px",
                backgroundColor: "#31618859",
                border: "none"
              }}
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#updateProfilePictureModal"
            >
              update profile picture
            </button>
          </div>
          <div class="col-sm">
            <table class="table table-sm">
              {" "}
              <tbody>
                <tr class="table-info">
                  <th scope="row">first Name</th>
                  <td>{this.props.user.firstName}</td>
                </tr>
                <tr class="table-info">
                  <th scope="row">last Name</th>
                  <td>{this.props.user.lastName}</td>
                </tr>
                <tr class="table-info">
                  <th scope="row">email </th>
                  <td>{this.props.user.email}</td>
                </tr>
                <tr class="table-info">
                  <th scope="row">gender</th>
                  <td>{this.props.user.gender ? "male" : "female"}</td>
                </tr>
                <tr class="table-info">
                  <th scope="row">birth Date</th>
                  <td>
                    {moment(this.props.user.birthDate).format("YYYY/DD/MM")}
                  </td>
                </tr>
                <tr class="table-info">
                  <th scope="row">phone Number</th>
                  <td>
                    {this.props.user.phoneNumber
                      ? this.props.user.phoneNumber
                      : "please add your phone number"}
                  </td>
                </tr>
                <tr class="table-info">
                  <th scope="row">role </th>
                  <td
                    style={{
                      textTransform: "capitalize"
                    }}
                  >
                    {this.props.user.role.toLowerCase()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal" id="updateProfilePictureModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <form onSubmit={this.onFormSubmit}>
                  <input
                    style={{ margin: "10px" }}
                    type="file"
                    name="image"
                    onChange={this.onInputChange}
                  />
                  <br />
                  <input
                    type="submit"
                    style={{ margin: "10px" }}
                    value="update"
                    className="btn btn-info"
                  />
                </form>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  ref={this.buttonClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
