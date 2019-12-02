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
      id: 0,
      question: {},
      userAnswer: ""
    };
  }
  bindQuestion() {
    this.setState({ question: this.props.question });
    this.setState({ id: this.props.id });
    //this.forceUpdate();
  }
  componentDidMount() {
    this.bindQuestion();
  }

  render() {
    const { open } = this.state;

    //this.bindQuestion();
    if (this.state.question["type"] == 1)
      return (
        <div>
          <button>Pregunta {this.state.id} </button>
          Drag&Drop
          <br />
          <br />
        </div>
      );
    else if (this.state.question["type"] == 2)
      return (
        <div>
          <button>Pregunta {this.state.id} </button> HotSpot
          <br />
          <br />
        </div>
      );
    else
      return (
        <p>
          Hubo un problema con la pregunta {this.state.id} la cual es de tipo{" "}
          {this.state.question["type"]}
        </p>
      );
  }
}

export default MiniQuestion;
