import React, { Component } from "react";

class Questions extends Component {
  constructor(props) {
    super(props);
  }

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
        <h1>Tabla de preguntas</h1>
      </div>
    );
  }
}

export default Questions;
