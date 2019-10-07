import React, { Component } from "react";
import { Link } from "react-router-dom";
class NotFoundPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{ margin: "50px auto", maxWidth: "400px", minHeight: "80vh" }}
      >
        <div
          style={{ marginTop: "10px" }}
          class="alert alert-info"
          role="alert"
        >
          <h1>404 not found page!</h1>
          <p style={{ marginTop: "15px" }}>
            go back <Link to="/">home</Link> to page
          </p>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
