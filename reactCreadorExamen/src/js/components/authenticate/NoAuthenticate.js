import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export default function(ComposedComponent) {
  class NoAuthenticate extends Component {
    UNSAFE_componentWillMount() {
      if (this.props.isAuthenticated) {
        this.context.router.push("welcome");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  NoAuthenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  NoAuthenticate.contextTypes = {
    router: PropTypes.object.isRequired
  };

  function mapStoreToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStoreToProps)(NoAuthenticate);
}
