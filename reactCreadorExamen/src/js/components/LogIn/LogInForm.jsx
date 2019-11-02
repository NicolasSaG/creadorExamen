import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { connect } from "react-redux";
import { login } from "../../actions/loginAction";

import validateInput from "../../validations/login";
import "./Form.css";

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {},
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      this.props
        .login(this.state)
        .then(
          res => this.context.router.push("greetings"),
          err =>
            this.setState({
              errors: "No existe un usuario con esa contrasena",
              isLoading: false
            })
        );
    }
  }

  render() {
    const { errors, username, password, isLoading } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h2 className="text-center">Iniciar Sesion</h2>
        <div className="form-group">
          <label
            className={classnames("control-label without-opacity", {
              "with-errors": errors.username
            })}
          >
            username
          </label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="username"
            className={classnames("form-control without-opacity", {
              "is-invalid": errors.username
            })}
          />
          {errors.username && (
            <span className="help-block with-errors">{errors.username}</span>
          )}
        </div>
        <div className="form-group">
          <label
            className={classnames("control-label without-opacity", {
              "with-errors": errors.password
            })}
          >
            password
          </label>
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            id="3"
            placeholder="password"
            className={classnames("form-control without-opacity", {
              "is-invalid": errors.password
            })}
          />
          {errors.password && (
            <span className="help-block with-errors">{errors.password}</span>
          )}
        </div>
        <div className="form-group text-center">
          <input
            type="submit"
            value="Iniciar sesión"
            className="btn btn-primary without-opacity "
            disabled={isLoading}
          />
        </div>
      </form>
    );
  }
}

LogInForm.propTypes = {
  login: PropTypes.func.isRequired
};

LogInForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(
  null,
  { login }
)(LogInForm);
