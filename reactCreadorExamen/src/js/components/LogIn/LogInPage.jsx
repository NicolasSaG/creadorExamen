import React, { Component } from "react";
import PropTypes from "prop-types";
import LogInForm from "./LogInForm.jsx";
import { connect } from "react-redux";
import { userSignupRequest } from "../../actions/signupAction";
import "./Login.css";

class LogInPage extends Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div className="LoginPage centrala">
        <div className="LoginPageForm">
          <div className="row ">
            <div className="col-md-12 col-md-offset-4 white-edition  pdg-cool">
              <LogInForm userSignupRequest={userSignupRequest} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LogInPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

export default connect(
  null,
  { userSignupRequest }
)(LogInPage);
