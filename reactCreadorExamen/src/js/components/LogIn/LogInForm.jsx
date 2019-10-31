import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Form.css";

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.userSignupRequest(this.state);
  }

  render() {
    return (
      <div className="Form">
        <form onSubmit={this.handleSubmit}>
          <h2 className="FormTitle">Log In</h2>
          <ul>
            <li className="FormUsername">
              Usuario:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChangeUsername}
                placeholder="username"
              />
            </li>
            <li className="FormPassword">
              Contraseña:
              <input
                type="password"
                name="password"
                onChange={this.handleChangePassword}
                id="3"
                placeholder="password"
              />
            </li>
            <li className="FormButton">
              <input type="submit" value="Iniciar sesión" />
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

LogInForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

export default LogInForm;
