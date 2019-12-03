import React, { Component } from "react";
import ReactDOM from "react-dom";
//import "./Questions.css";
import "./../../../css/Questions.css";

class Calificacion extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ time: Date.now() }),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (localStorage.getItem("NumPreg") != null) {
      return (
        <h3>
          ACIERTOS : {localStorage.getItem("aciertos")}/
          {localStorage.getItem("NumPreg")}
        </h3>
      );
    } else {
      return <h3>Existe un problema con tu calificacion</h3>;
    }
  }
}

export default Calificacion;
