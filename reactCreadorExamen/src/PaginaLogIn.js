import React, { Component } from "react";
import Login from "./js/components/LoginComponent/Login.jsx";

class PaginaLogIn extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Inicio prron</h2>
        </div>

        <Login />
      </div>
    );
  }
}

export default PaginaLogIn;