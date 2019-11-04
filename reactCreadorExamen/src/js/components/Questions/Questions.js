import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Questions.css";
import axios from "axios";
class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { preguntas: "" };
  }
  render() {
    return (
      <div id="Reder-ReactComponent-Questions">
        <h1>Página de Preguntas</h1>
        <button
          type="button"
          id="CreateNewElem"
          onClick={event => this.handleButton(event)}
        >
          Crear Nueva Pregunta
        </button>
        <div className="QuestionsArea">{this.QuestionsArea(1)}</div>
      </div>
    );
  }
  handleButton(event) {
    event.preventDefault();
    console.log("dasdwq");
    window.location = "CrearPregunta";
  }

  createTable(numQuestions) {
    const elem = (
      <tr key="elem">
        <td>dasdwqe</td>
        <td className="td">
          <a id="Mod" href="#">
            Modificar Pregunta
          </a>
          |
          <a id="Del" href="#">
            Eliminar Pregunta
          </a>
          |
          <a id="See" href="#">
            Ver Pregunta
          </a>
        </td>
      </tr>
    );
    const array = [];

    for (let id = 0; id != numQuestions; id++) {
      array.push(elem);
    }
    const id = "Elements";
    return <tbody key={id}>{array}</tbody>;
  }
  fetchData(infor) {
    {
      console.log("fetching data");
      axios
        .get(
          "http://localhost:8080/creadorExamen/QuestionsServlet",
          { infor },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json"
            }
          }
        )
        .then(resp => {
          const token = resp.data;
          const trato = token.getElementbyid("object");
          console.log(trato + "_trato");
          console.log(token + "fetched data");
          localStorage.setItem("informacion", token);
        });
    }
  }

  setCurrentInfo(info) {
    return {
      type: "info",
      info: info
    };
  }
  QuestionsArea(numQuestions) {
    //Aqui debería ir la petición al serviddor de xml de numero de  preguntas
    let contenedor = "";
    this.fetchData(contenedor);
    console.log(contenedor + "auxilio");
    return (
      <div id="QuestionsArea">
        <h2>Área de Preguntas</h2>
        <table id="table">
          <thead>
            <tr>
              <th>Nombre de la Pregunta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          {this.createTable(numQuestions)}
        </table>
      </div>
    );
  }
}

export default Questions;
