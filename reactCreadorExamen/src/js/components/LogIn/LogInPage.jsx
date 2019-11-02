import React, { Component } from "react";
import PropTypes from "prop-types";
import LogInForm from "./LogInForm.jsx";
import { connect } from "react-redux";
import { userSigninRequest } from "../../actions/loginAction";
import "./Login.css";

class LogInPage extends Component {
  render() {
    return (
      <div className="LoginPage centrala">
        <div className="LoginPageForm">
          <div className="row ">
            <div className="col-md-12 col-md-offset-4 white-edition  pdg-cool">
              <LogInForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogInPage;
