import React, { Component } from "react";
import { Link } from "react-router";
//import { connect } from "react-redux"

class NavigationBar extends Component {
  render() {
    /*const { isAuthenticated } = this.props.auth;

    const userLinks = {
    <ul className="navbar-nav mr-auto">
    <li className="nav-item active">
      <a className="nav-link" href="#">
        Home
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">
        preguntas
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">
        logout
      </a>
    </li>
  </ul>
  };

    const guestLinks = {
    <ul className="navbar-nav mr-auto">
    <li className="nav-item">
      <a className="nav-link" href="#">
        login
      </a>
    </li>
  </ul>};
  */
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/greetings" className="nav-link">
                greetings
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

/*NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
*/
export default /*connect(mapStateToProps)(*/ NavigationBar /*)*/;
