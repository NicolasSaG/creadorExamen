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
      questions: {},
      exams: {}
    };
  }

  getSelectedExam() {
    let url = document.URL.split("?");
    url = url[1];
    let id = url.split("&");
    id = id[0];
    id = id.split("=")[1];
    //console.log(`Se ha elegido el examen ${id}`);
    return id;
  }

  componentDidMount() {
    this.getQuestions();
    this.getExams();
  }

  getQuestions() {
    axios.get("http://localhost:8080/creadorExamen/QuestionsServlet").then(
      res => {
        var aux = res.data;
        this.setState({ questions: aux });
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
    let numExam = this.getSelectedExam();
    //console.log(this.state.exams);
    let examen = null;
    let aux = this.state.exams;
    let idPreg = null;
    let todasPreg = this.state.questions;

    if (aux === undefined) {
      console.log("no se ha encontrado nada");
    }
    if (aux["exams"] === undefined) {
      console.log("no se ha encontrado ningun examen");
    } else {
      let exams = aux["exams"]["exam"];
      console.log(exams);
      //console.log(typeof exams);
      for (let i = 0; i != exams.length; i++) {
        //console.log("imprimeido examenes");
        //console.log(exams[i]);
        if (numExam == exams[i]["id"]) {
          examen = exams[i];
          idPreg = examen["pregunta"];
          //console.log("se ha encontrado el examen");
        }
      }
    }
    //console.log(examen);
    console.log("las preguntas requeridas son");
    console.log(idPreg);

    let arrayPreg = [];

    if (todasPreg === undefined) {
      console.log("no se ha encontrado nada");
    }
    if (todasPreg["questions"] === undefined) {
      console.log("no se ha encontrado ninguna Pregunta");
    } else {
      let preguntas = todasPreg["questions"]["question"];

      for (let i = 0; i != preguntas.length; i++) {
        if (idPreg != null) {
          //ya se pueden buscar preguntas
          for (let a = 0; a != idPreg.length; a++) {
            if (preguntas[i]["id"] == idPreg[a]) {
              console.log("se ha encontrado una pregunta del examen");
              arrayPreg.push(preguntas[i]);
            }
          }
        }
      }
    }
    console.log("preg");
    //console.log(this.state.allQuestions);
    console.log(arrayPreg);

    //let preg = [];
    let defecto = {
      answer: "op1-3;op2-4;op3-1;op4-2",
      drags: {
        option: [
          {
            img: "presidente2.jpg",
            content: "Fidel Castro"
          },
          {
            img: "presidente4.jpg",
            content: "George W. Bush"
          },
          {
            img: "presidente3.jpg",
            content: "Vicente Fox"
          },
          {
            img: "presidente1.jpg",
            content: "Ricardo Lagos"
          }
        ]
      },
      id: 2,
      text: "Politica",
      type: 0,
      targets: {
        option: [
          {
            img: "nacion3.jpg",
            content: "Mexico"
          },
          {
            img: "nacion1.jpg",
            content: "Chile"
          },
          {
            img: "nacion2.jpg",
            content: "Cuba"
          },
          {
            img: "nacion4.jpg",
            content: "Estados Unidos"
          }
        ]
      }
    };
    let renderizado = (
      <div>
        <MiniQuestion id="0" question={defecto} />
      </div>
    );

    if (arrayPreg.length != 0) {
      renderizado = (
        <div className="row">
          <div className="col">
            <div className="form-group">
              <div className="text-center">
                <MiniQuestion
                  id="0"
                  question={arrayPreg.length > 0 ? arrayPreg[0] : defecto}
                />
                <MiniQuestion
                  id="1"
                  question={arrayPreg.length > 1 ? arrayPreg[1] : defecto}
                />
                <MiniQuestion
                  id="2"
                  question={arrayPreg.length > 2 ? arrayPreg[2] : defecto}
                />
                <MiniQuestion
                  id="3"
                  question={arrayPreg.length > 3 ? arrayPreg[3] : defecto}
                />
                <MiniQuestion
                  id="4"
                  question={arrayPreg.length > 4 ? arrayPreg[4] : defecto}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <div className="text-center">
                <MiniQuestion
                  id="5"
                  question={arrayPreg.length > 5 ? arrayPreg[5] : defecto}
                />
                <MiniQuestion
                  id="6"
                  question={arrayPreg.length > 6 ? arrayPreg[6] : defecto}
                />
                <MiniQuestion
                  id="7"
                  question={arrayPreg.length > 7 ? arrayPreg[7] : defecto}
                />
                <MiniQuestion
                  id="8"
                  question={arrayPreg.length > 8 ? arrayPreg[8] : defecto}
                />
                <MiniQuestion
                  id="9"
                  question={arrayPreg.length > 9 ? arrayPreg[9] : defecto}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        RESUELVE LAS SIGUIENTES PREGUNTAS
        <br />
        <br />
        {renderizado}
      </div>
    );
  }
}

export default Test;
