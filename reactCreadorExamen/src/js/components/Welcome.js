import React, { Component } from "react";
import Questions from "./Questions/Questions.js";
class Welcome extends Component {
  render() {
    return (
      <div>
        <h1>Bienvenido(a) {localStorage.getItem("littleToken")}</h1>
        <h3>Misión</h3>
        <p>
          Este proyecto nace con la iniciativa de proporcionar una plataforma
          sencilla de usar, para la creación de distintas clases de preguntas.
        </p>
        <h3>Como Usar</h3>
        <ul>
          <li>
            <p>
              Dirigete a la sección de Nueva Pregunta para Crear una Pregunta.
            </p>
          </li>
          <li>
            <p>
              Dirigete a la sección de Preguntas para poder ver, modificar o
              borrar preguntas que hayas creado.
            </p>
          </li>
          <li>
            <p>Da click en la sección de Inicio para volver a esta página.</p>
          </li>
          <li>
            <p>
              Si quieres cerrar tu sesión da click en Logout en la barra de
              navegación
            </p>
          </li>
        </ul>
        <h3>Pagina Creada por:</h3>
        <ul>
          <li>Nico :V</li>
          <li>Jiménez Villa Victor Hugo.</li>
        </ul>
      </div>
    );
  }
}
export default Welcome;
