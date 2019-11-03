import React, { Component } from "react";
import "./Render.css";
import "./Questions.css";
class Questions extends Component {
  constructor(props) {
    super(props);
  }

  createTable(numQuestions) {
    const elem = (
      <tr>
        <td>dasdwqe</td>
        <td>dasfqew</td>
      </tr>
    );
    const array = [];

    for (let index = 0; index != numQuestions; index++) {
      array.push(elem);
    }
    return array;
  }
  QuestionsArea = numQuestions => {
    //Aqui debería ir la petición al serviddor de xml de preguntas
    return (
      <div id="QuestionsArea">
        <h1>Esto es el area de preguntas</h1>
        <table id="table">
          <tr>
            <th>Nombre de la Pregunta</th>
            <th>Acciones</th>
          </tr>
          {this.createTable(numQuestions)}
        </table>
      </div>
    );
  };

  reder() {
    return (
      <div className="Reder-ReactComponent-Questions">
        <h1>Pagina de Preguntas</h1>
        <div className="QuestionsArea">
          <QuestionsArea numQuestions="20" />
        </div>
      </div>
    );
  }

  /*
  createQuestionsTable = () => {
    let table = [];
    for (let i = 0; i < 5; i++) {
      let children = [];
      for (let j = 0; j < 5; j++) {
        children.push(<td>hola {j}</td>);
      }
      table.push(<tr>{children}</tr>);
    }
    return table;
  };
  render() {
    return (
      <div>
        <h1>Tabla</h1>
      </div>
    );
  }*/
}

export default Questions;
