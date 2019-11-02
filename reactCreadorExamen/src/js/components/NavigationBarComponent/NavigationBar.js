import React, { Component } from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "./../../actions/loginAction";
class NavigationBar extends Component {
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  createUserLinks = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/welcome" className="nav-link">
                welcome
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/questions" className="nav-link">
                questions
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={this.logout.bind(this)}>
                logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  };

  createGuestLinks = () => {
    return;
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = this.createUserLinks();
    const guestLinks = this.createGuestLinks();

    return <div>{isAuthenticated ? userLinks : guestLinks}</div>;
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  { logout }
)(NavigationBar);
