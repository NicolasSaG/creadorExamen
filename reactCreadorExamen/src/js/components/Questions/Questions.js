import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Questions.css";
import axios from "axios";

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: {}
    };
    this.getTable();
  }

  getTable() {
    axios.get("http://localhost:8080/creadorExamen/QuestionsServlet").then(
      res => {
        var aux = res.data;
        this.setState({ questions: aux });
        //console.log(this.state.questions);
      },
      err => alert("2")
    );
  }

  createTable() {
    let table = [];
    table.push(
      <thead>
        <tr>
          <th className="td-id">id</th>
          <th className="td-name">Nombre</th>
          <th className="td-actions"></th>
        </tr>
      </thead>
    );

    let tt = [];
    this.state.questions.questions.question.forEach(element => {
      let children = [];
      children.push(<td className="td-id">{element.id}</td>);
      children.push(<td className="td-name">{element.text}</td>);
      children.push(
        <td className="td-actions">
          <button className="btn btn-primary btn-cool">ver</button>
          <button className="btn btn-info btn-cool">modificar</button>
          <button className="btn btn-danger btn-cool">eliminar</button>
        </td>
      );

      tt.push(<tr>{children}</tr>);
    });
    table.push(<tbody>{tt}</tbody>);
    return table;
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <table className="table table-striped table-hover">
          {Object.keys(this.state.questions).length === 0
            ? console.log("no data")
            : this.createTable()}
        </table>
      </div>
    );
  }
}

export default Questions;
