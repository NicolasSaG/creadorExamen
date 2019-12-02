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
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  getSelectedExam() {
    let url = document.URL.split("?");
    url = url[1];
    let id = url.split("&");
    id = id[0];
    id = id.split("=")[1];
    let objetoExamenes = this.state.exams.exams;
    return objetoExamenes;
  }

  componentDidMount() {
    this.getQuestions();
    this.getExams();
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
    const { open } = this.state;
    //console.log("examenes");
    //console.log(this.state.exams);
    //console.log("preguntas");
    let aux = this.state.exams;
    let aux2 = aux.exam;
    console.log(aux2);
    //aux = aux["question"];
    //let examenes = JSON.stringify(this.getSelectedExam());
    console.log(aux);
    //console.log(examenes);

    /*let aux = this.getSelectedExam();
    console.log(examenes);
    Object.keys(aux).length === 0
      ? console.log("vacio")
      : console.log("dwefivnocswkjdcnxjin");
    */
    //console.log(this.state.allQuestions.questions);

    const pregunta = {
      answer: "1-1;2-4;3-2;4-3",
      drags: {
        option: [
          {
            img: "img1.jpg",
            content: "Primera Guerra Mundial"
          },
          {
            img: "img2.jpg",
            content: "Segunda Guerra Mundial"
          },
          {
            img: "img3.jpg",
            content: "Guerra Civil Rusa"
          },
          {
            img: "img4.jpg",
            content: "Revolucion Mexicana"
          }
        ]
      },
      id: 11,
      text: "Historia",
      type: 1,
      targets: {
        option: [
          {
            img: "img1.jpg",
            content: "1914-1918"
          },
          {
            img: "img2.jpg",
            content: "1917-1923"
          },
          {
            img: "img3.jpg",
            content: "1910-1921"
          },
          {
            img: "img4.jpg",
            content: "1939-1845"
          }
        ]
      }
    };
    const preguntaHotSpot = {
      answer: "1-1;2-4;3-2;4-3",
      drags: {
        option: [
          {
            img: "img1.jpg",
            content: "Primera Guerra Mundial"
          },
          {
            img: "img2.jpg",
            content: "Segunda Guerra Mundial"
          },
          {
            img: "img3.jpg",
            content: "Guerra Civil Rusa"
          },
          {
            img: "img4.jpg",
            content: "Revolucion Mexicana"
          }
        ]
      },
      id: 11,
      text: "Historia",
      type: 2,
      targets: {
        option: [
          {
            img: "img1.jpg",
            content: "1914-1918"
          },
          {
            img: "img2.jpg",
            content: "1917-1923"
          },
          {
            img: "img3.jpg",
            content: "1910-1921"
          },
          {
            img: "img4.jpg",
            content: "1939-1845"
          }
        ]
      }
    };

    const preguntas = (
      <div className="row">
        <div className="col">
          <div className="form-group">
            <div className="text-center">
              <MiniQuestion id="0" question={pregunta} />
              <MiniQuestion id="1" question={pregunta} />
              <MiniQuestion id="2" question={pregunta} />
              <MiniQuestion id="3" question={preguntaHotSpot} />
              <MiniQuestion id="4" question={pregunta} />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <div className="text-center">
              <MiniQuestion id="5" question={pregunta} />
              <MiniQuestion id="6" question={pregunta} />
              <MiniQuestion id="7" question={pregunta} />
              <MiniQuestion id="8" question={pregunta} />
              <MiniQuestion id="9" question={pregunta} />
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        RESUELVE LAS SIGUIENTES PREGUNTAS
        <br />
        <br />
        {preguntas}
      </div>
    );
  }
}

export default Test;
