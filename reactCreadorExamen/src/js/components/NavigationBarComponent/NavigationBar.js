import React, { Component } from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "./../../actions/loginAction";
class NavigationBar extends Component {
  logout(event) {
    event.preventDefault();
    //cerramos sesion
    this.props.logout();
    //regresamos al formulario de login
    this.context.router.push("/");
  }

  //links que puede ver el usuario logueado
  createUserLinks = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Hola {localStorage.getItem("littleToken")}
            </a>
          </li>
          <li className="nav-item">
            <Link to="/welcome" className="nav-link">
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/questions" className="nav-link">
              Preguntas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/newquestion" className="nav-link">
              Nueva Pregunta
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/" onClick={this.logout.bind(this)}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  //links que puede ver el usuario no registrado
  createGuestLinks = () => {
    return;
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const userLinks = this.createUserLinks();
    const guestLinks = this.createGuestLinks();
    //comprobar si el usuario ya esta logueado y mostrar los links correspondientes
    return <div>{isAuthenticated ? userLinks : guestLinks}</div>;
  }
}

//definicion de tipo de props del componente
NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

NavigationBar.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

//conectar con la store de redux
export default connect(mapStateToProps, { logout })(NavigationBar);
