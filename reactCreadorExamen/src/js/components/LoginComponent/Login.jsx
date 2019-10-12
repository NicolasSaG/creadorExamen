import React, { Component } from "react";
import ReactDOM from "react-dom";
import Form from "./Form.jsx";

class Login extends Component {
  render() {
    return (
      <div className="LoginPage">
        <header className="LoginPageHeader"></header>
        <div className="LoginPageForm">
          <Form />
        </div>
      </div>
    );
  }
}

export default Login;
