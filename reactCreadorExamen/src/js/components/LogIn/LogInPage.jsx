import React, { Component } from "react";
import PropTypes from "prop-types";
import LogInForm from "./LogInForm.jsx";
import { connect } from "react-redux";
import { userSigninRequest } from "../../actions/signinAction";
import "./Login.css";

class LogInPage extends Component {
  render() {
    const { userSigninRequest } = this.props;
    return (
      <div className="LoginPage centrala">
        <div className="LoginPageForm">
          <div className="row ">
            <div className="col-md-12 col-md-offset-4 white-edition  pdg-cool">
              <LogInForm userSigninRequest={userSigninRequest} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LogInPage.propTypes = {
  userSigninRequest: PropTypes.func.isRequired
};

export default connect(
  null,
  { userSigninRequest }
)(LogInPage);
