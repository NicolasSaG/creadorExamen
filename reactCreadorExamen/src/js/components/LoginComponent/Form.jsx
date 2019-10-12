import React, { Component } from "react";
import ReactDOM from "react-dom";
import

class Form extends Component {
  render(args) {
    //todo cambiar form para la pagina correcta :3
    return (
      <div className="FormDiv">
        <form action="Pagina2" method="GET">
          <h2 className="FormTitle">¿Quién Eres?</h2>
          <ul>
            <li className="FormUsername">´´
              Nombre de Usuario:
              <input type="text" name="userArgument" placeholder="Usuario" />
            </li>
            <li className="FormPassword">
              Contraseña:
              <input
                type="password"
                name="passwordArgument"
                id="3"
                placeholder="Contraseña"
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
