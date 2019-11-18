import React, { Component } from "react";
//import "./NewQuestion.css";
import "./../../../css/NewQuestion.css";
class NewQuestion extends Component {
  render() {
    return (
      <div class="NewQuestion">
        <form action="ServletNuevaPregunta" method="GET">
          <h4>Crea una nueva Pregunta {localStorage.getItem("littleToken")}</h4>
          <br />
          Título:
          <br />
          <input
            type="text"
            name="Titulo"
            placeholder="Agrega un título a tu pregunta."
            required
          />
          <br />
          Pregunta:
          <br />
          <textarea
            name="Pregunta"
            cols="40"
            rows="3"
            placeholder="Escribe tu pregunta."
            wrap="hard"
            required
          ></textarea>
          <br />
          <input type="submit" value="Crear Pregunta" />
        </form>
      </div>
    );
  }
}
export default NewQuestion;
