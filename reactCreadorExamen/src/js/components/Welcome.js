import React, { Component } from "react";
import Questions from "./Questions/Questions.js";
class Welcome extends Component {
  render() {
    return <h1>Bienvenido(a) {localStorage.getItem("littleToken")}</h1>;
  }
}
export default Welcome;
