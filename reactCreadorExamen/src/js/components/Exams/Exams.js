import React, { Component } from "react";
import ReactDOM from "react-dom";
//import "./Questions.css";
import "./../../../css/Questions.css";
import axios from "axios";
import Modal from "react-modal";
import { isArray } from "util";

class Exams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exams: {},
      open: false,
      selectedExam: {},
      openModExam: false,
      openModBorrar: false
    };
    this.getTable();
  }
  onOpenModExamen = i => {
    console.log(i);
    this.setState({
      openModExam: true,
      selectedExam: i
    });
  };
  onOpenModExam = i => {
    console.log(i);
    this.setState({
      openModExam: true,
      selectedExam: i
    });
  };
  onOpenModal = i => {
    this.setState({
      open: true,
      selectedExam: i // cuando se selecciona una pregunta se guarda en el state
    });
  };

  onCloseModExamen = () => {
    this.setState({ openModExam: false });
  };
  onCloseModBorrar = () => {
    this.setState({ openModBorrar: false });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };

  getTable() {
    axios.get("http://localhost:8080/creadorExamen/ExamServlet").then(
      res => {
        var aux = res.data;
        this.setState({ exams: aux });
      },
      err => alert("error al obtener examenes")
    );
  }

  createTable() {
    let table = [];
    table.push(
      <thead>
        <tr>
          <th className="td-id">id</th>
          <th className="td-name">Nombre del Examen</th>
          <th className="td-actions"></th>
        </tr>
      </thead>
    );

    let tt = [];
    if (isArray(this.state.exams.exams.exam)) {
      this.state.exams.exams.exam.forEach(element => {
        let children = [];
        children.push(<td className="td-id">{element.id}</td>);
        children.push(<td className="td-name">{element.text}</td>);
        children.push(
          <td className="td-actions">
            <button
              className="btn btn-primary btn-cool"
              onClick={() => this.onOpenModal(element)}
            >
              resolver
            </button>

            <button
              className="btn btn-info btn-cool"
              onClick={() => this.onOpenModExamen(element)}
            >
              modificar
            </button>
            <button
              className="btn btn-danger btn-cool"
              onClick={() => this.onOpenModExam(element)}
            >
              eliminar
            </button>
          </td>
        );

        tt.push(<tr>{children}</tr>);
      });
    } else {
      if (this.state.exams.exams.exams === undefined) {
      } else {
        let children = [];
        children.push(
          <td className="td-id">{this.state.exams.exams.exam.id}</td>
        );
        children.push(
          <td className="td-name">{this.state.exams.exams.exam.text}</td>
        );
        children.push(
          <td className="td-actions">
            <button
              className="btn btn-primary btn-cool"
              onClick={() => this.onOpenModal(this.state.exams.exams.exam)}
            >
              Resolver
            </button>

            <button
              className="btn btn-info btn-cool"
              onClick={() => this.onOpenModExamen(this.state.exams.exams.exam)}
            >
              modificar
            </button>
            <button
              className="btn btn-danger btn-cool"
              onClick={() => this.onOpenModExam(this.state.exams.exams.exam)}
            >
              eliminar
            </button>
          </td>
        );

        tt.push(<tr>{children}</tr>);
      }
    }

    table.push(<tbody>{tt}</tbody>);
    return table;
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <br></br>
        <table className="table table-striped table-hover">
          {Object.keys(this.state.exams).length === 0
            ? console.log("no data")
            : this.createTable()}
        </table>
      </div>
    );
  }
}

export default Exams;
