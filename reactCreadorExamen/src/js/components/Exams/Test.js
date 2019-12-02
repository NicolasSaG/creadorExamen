import React, { Component } from "react";
import ReactDOM from "react-dom";
//import "./Questions.css";
import "./../../../css/Questions.css";
import axios from "axios";
import Modal from "react-modal";
import { isArray } from "util";
import MiniQuestion from "./MiniQuestion";

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedExam: {},
      selectedQuestions: {},
      allQuestions: {},
      exams: {}
    };
    this.getQuestions();
    this.getExams();
  }

  getSelectedExam() {
    let url = document.URL.split("?");
    url = url[1];
    let id = url.split("&");
    id = id[0];
    id = id.split("=")[1];
    let objetoExamenes = this.state.exams.exams;
    //console.log(objetoExamenes);
    return objetoExamenes;
    //let examenes = objetoExamenes;
    //console.log(examenes[1]);

    //console.log(id);
  }

  getQuestions() {
    axios.get("http://localhost:8080/creadorExamen/QuestionsServlet").then(
      res => {
        var aux = res.data;
        this.setState({ allQuestions: aux });
      },
      err => alert("error al obtener examenes")
    );
  }
  getExams() {
    axios.get("http://localhost:8080/creadorExamen/ExamServlet").then(
      res => {
        var aux1 = res.data;
        this.setState({ exams: aux1 });
      },
      err => alert("error al obtener examenes")
    );
  }

  render() {
    let Examenes = this.getSelectedExam();
    //console.log(Examenes["exam"][0]);

    /*const preguntas = (
      <div>
        <MiniQuestion question={this.state.questions.questions.question[0]} />
        <MiniQuestion question={this.state.questions.questions.question[1]} />
        <MiniQuestion question={this.state.questions.questions.question[2]} />
        <MiniQuestion question={this.state.questions.questions.question[3]} />
        <MiniQuestion question={this.state.questions.questions.question[4]} />
        <MiniQuestion question={this.state.questions.questions.question[5]} />
        <MiniQuestion question={this.state.questions.questions.question[6]} />
        <MiniQuestion question={this.state.questions.questions.question[7]} />
        <MiniQuestion question={this.state.questions.questions.question[8]} />
        <MiniQuestion question={this.state.questions.questions.question[9]} />
      </div>
    );*/
    return (
      <div>
        Test
        <div>{/*console.log(this.state.allQuestions)*/}</div>
      </div>
    );
  }
}

export default Test;
