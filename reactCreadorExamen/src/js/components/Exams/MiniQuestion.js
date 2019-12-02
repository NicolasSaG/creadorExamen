import React, { Component } from "react";
import ReactDOM from "react-dom";
//import "./Questions.css";
import "./../../../css/Questions.css";
import axios from "axios";
import Modal from "react-modal";

class MiniQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      question: {},
      userAnswer: []
    };
    this.bindQuestion(props);
  }
  bindQuestion(props) {
    this.setState({ question: "aux" });
  }

  render() {
    if (this.state.type == 1) return <div>Drag&Drop</div>;
    else if (this.state.type == 2) return <div>HotSpot</div>;
    else return <p>Hubo un problema</p>;
  }
}

export default MiniQuestion;
