import React, { Component } from "react";
import ReactDOM from "react-dom";
import LogInForm from "./LogInForm.jsx";
import "./Login.css";

class LogInPage extends Component {
  render() {
    return (
      <div className="LoginPage">
        <header className="LoginPageHeader"></header>
        <div className="LoginPageForm">
          <LogInForm />
        </div>
      </div>
    );
  }
}

export default LogInPage;
