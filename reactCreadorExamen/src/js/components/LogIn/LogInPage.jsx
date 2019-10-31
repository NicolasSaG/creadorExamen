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
      <div className="LoginPage">
        <header className="LoginPageHeader"></header>
        <div className="LoginPageForm">
          <LogInForm userSignupRequest={userSignupRequest} />
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
