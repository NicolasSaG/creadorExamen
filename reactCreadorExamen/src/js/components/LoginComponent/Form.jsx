import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Form.css";

class Form extends Component {
  render(args) {
    //todo cambiar form para la pagina correcta :3
    //?className FormUsername o FormUserName?
    return (
      <div className="Form">
        <form action="Pagina2" method="GET">
          <h2 className="FormTitle">Log In</h2>
          <ul>
            <li className="FormUsername">
              Nombre de Usuario:
              <input
                type="text"
                name="userArgument"
                placeholder="Usuario"
                required
              />
            </li>
            <li className="FormPassword">
              Contraseña:
              <input
                type="password"
                name="passwordArgument"
                id="3"
                placeholder="Contraseña"
                required
              />
            </li>
            <li className="FormButton">
              <input type="submit" value="Ingresar" />
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default Form;
