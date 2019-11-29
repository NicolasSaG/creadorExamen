import React, { Component } from "react";
import ReactDOM from "react-dom";
//import "./Questions.css";
import "./../../../css/Questions.css";
import axios from "axios";
import Modal from "react-modal";
import { isArray } from "util";

class MiniQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      question:{},
      userAnswer:[]
    };
    this.bindQuestion(props);
  }
  bindQuestion(props){
      this.setState({question = props.question});
  }

  render(){
    if(this.state == 1)
        return (<div>Drag&Drop</div>);
    else if(this.state == 2)
        return (<div>HotSpot</div>);
    else
        return(<p>Hubo un problema</p>);
  }

}

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedExam: {},
      questions: {}
    };
    this.getQuestions();
  }

  getQuestions() {
    axios.get("http://localhost:8080/creadorExamen/ServletGetTest").then(
      res => {
        var aux = res.data;
        this.setState({ questions: aux });
      },
      err => alert("error al obtener examenes")
    );
  }

  render() {
    return (
        <div>
            <div>
            <MiniQuestion question={this.state.questions.questions.question[0]}/>
            <MiniQuestion question={this.state.questions.questions.question[1]}/>
            <MiniQuestion question={this.state.questions.questions.question[2]}/>
            <MiniQuestion question={this.state.questions.questions.question[3]}/>
            <MiniQuestion question={this.state.questions.questions.question[4]}/>
            <MiniQuestion question={this.state.questions.questions.question[5]}/>
            <MiniQuestion question={this.state.questions.questions.question[6]}/>
            <MiniQuestion question={this.state.questions.questions.question[7]}/>
            <MiniQuestion question={this.state.questions.questions.question[8]}/>
            <MiniQuestion question={this.state.questions.questions.question[9]}/>
        </div>    
    </div>
    );
  }
}

export default Test;
