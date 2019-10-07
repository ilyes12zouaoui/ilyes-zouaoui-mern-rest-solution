import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer
        className="d-flex"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "rgba(255,255,255,0.5)"
        }}
      >
        <div class="footer-created-by">
          <span> 2019 &#169; created with love 💖 by Zouaoui Ilyes </span>
        </div>
        <ul class="footer-links-list">
          <li class="footer-links-item">
            <div class="footer-icon-container">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/ilyes-zouaoui/"
              >
                <i class="fab fa-linkedin footer-icon fa-2x" />
              </a>
            </div>
          </li>
          <li class="footer-links-item">
            <div class="footer-icon-container">
              <a
                href="https://www.facebook.com/ilyes.zouaoui11"
                target="_blank"
              >
                <i class="fab fa-facebook footer-icon fa-2x" />
              </a>
            </div>
          </li>
          <li class="footer-links-item">
            <div class="footer-icon-container">
              <a
                style={{ cursor: "pointer" }}
                data-toggle="modal"
                data-target="#myModal"
              >
                <i class="fab fa-google-plus-square footer-icon fa-2x" />
              </a>
            </div>
          </li>
        </ul>
        <div class="modal" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body text-center" style={{ color: "black" }}>
                <h3>my email address : ilyes.zouaoui@esprit.tn</h3>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
