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
  onOpenModBorrar = i => {
    console.log(i);
    this.setState({
      openModBorrar: true,
      selectedExam: i
    });
  };
  onOpenModal = i => {
    this.setState({
      open: true,
      selectedExam: i // cuando se selecciona un examen se guarda en el state
    });
    console.log(this.state.selectedExam);
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
              Resolver
            </button>

            <button
              className="btn btn-info btn-cool"
              onClick={() => this.onOpenModExamen(element)}
            >
              Modificar
            </button>
            <button
              className="btn btn-danger btn-cool"
              onClick={() => this.onOpenModBorrar(element)}
            >
              Eliminar
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
        <div>
          {Object.keys(this.state.selectedExam).length === 0 ? (
            console.log("Se cambiará la pregunta" + this.state.selectedExam)
          ) : (
            <Modal
              isOpen={this.state.openModExam}
              contentLabel="Modificar Examen"
              ariaHideApp={false}
            >
              <form
                action="http://localhost:8080/creadorExamen/ServletModExam"
                method="post"
              >
                <h1 className="text-center">Modificar Examen</h1>
                <div className="form-group">
                  <input
                    type="hidden"
                    name="id"
                    defaultValue={this.state.selectedExam.id}
                  />
                  Título del Exámen
                  <input
                    type="text"
                    className="form-control texto-caja"
                    name="texto"
                    onChange={this.handleChange}
                    defaultValue={this.state.selectedExam.text}
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <div className="text-center">
                        <label className="control-label ">Pregunta</label>
                      </div>
                      <input
                        type="text"
                        className="form-control preg"
                        name="Pregunta0"
                        onChange={this.handleChange}
                        defaultValue={this.state.selectedExam.pregunta[0]}
                      />
                      <input
                        type="text"
                        className="form-control preg"
                        name="Pregunta1"
                        onChange={this.handleChange}
                        defaultValue={this.state.selectedExam.pregunta[1]}
                      />
                      <input
                        type="text"
                        className="form-control preg"
                        name="Pregunta2"
                        onChange={this.handleChange}
                        defaultValue={this.state.selectedExam.pregunta[2]}
                      />
                      <input
                        type="text"
                        className="form-control preg"
                        name="Pregunta3"
                        onChange={this.handleChange}
                        defaultValue={this.state.selectedExam.pregunta[3]}
                      />
                      <input
                        type="text"
                        className="form-control preg"
                        name="Pregunta4"
                        onChange={this.handleChange}
                        defaultValue={this.state.selectedExam.pregunta[4]}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <div className="text-center">
                        <label className="control-label">Pregunta</label>
                      </div>

                      <input
                        type="text"
                        className="form-control preg"
                        name="Pregunta5"
                        onChange={this.handleChange}
                        defaultValue={this.state.selectedExam.pregunta[5]}
                      />
                      <input
                        type="text"
                        className="form-control preg"
                        name="Pregunta6"
                        onChange={this.handleChange}
                        defaultValue={this.state.selectedExam.pregunta[6]}
                      />
                      <input
                        type="text"
                        className="form-control preg"
                        name="Pregunta7"
                        onChange={this.handleChange}
                        defaultValue={this.state.selectedExam.pregunta[7]}
                      />
                      <input
                        type="text"
                        className="form-control preg"
                        name="Pregunta8"
                        onChange={this.handleChange}
                        defaultValue={this.state.selectedExam.pregunta[8]}
                      />
                      <input
                        type="text"
                        className="form-control preg"
                        name="Pregunta9"
                        onChange={this.handleChange}
                        defaultValue={this.state.selectedExam.pregunta[9]}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group  text-right">
                  <input
                    type="submit"
                    value="Modificar Examen"
                    className="btn btn-primary"
                  />
                  <button className="btn btn-info">Options</button>
                  <button className="btn btn-info">Assets</button>
                  <button
                    onClick={this.onCloseModExamen}
                    className="btn btn-danger"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
              *Ingresa el id de la pregunta
            </Modal>
          )}
        </div>
        <div>
          {Object.keys(this.state.selectedExam).length === 0 ? (
            console.log("BorrarPegunta")
          ) : (
            <Modal
              isOpen={this.state.openModBorrar}
              contentLabel="BorrarExamen"
              ariaHideApp={false}
              className="BorrarPopUp"
            >
              Estas Seguro de Borrar el Examen Con id{" "}
              {this.state.selectedExam.id}
              <form
                action="http://localhost:8080/creadorExamen/ServletBorrarExamen"
                method="post"
              >
                <input
                  type="submit"
                  value="Borrar Examen"
                  className="btn btn-primary"
                />
                <input
                  type="hidden"
                  name="idExam"
                  defaultValue={this.state.selectedExam.id}
                />
                <button
                  onClick={this.onCloseModBorrar}
                  className="btn btn-danger"
                >
                  Cancelar
                </button>
              </form>
            </Modal>
          )}
        </div>
        <div>
          {Object.keys(this.state.selectedExam).length === 0 ? (
            console.log("Resolver Examen")
          ) : (
            <Modal
              isOpen={this.state.open}
              contentLabel="Verificacion Res Exam"
              ariaHideApp={false}
              className="BorrarPopUp"
            >
              Quieres Resolver El examen con id: {this.state.selectedExam.id}
              <form action="http://localhost:3000/test" method="get">
                <input
                  type="submit"
                  value="Resolver"
                  className="btn btn-primary"
                />
                <input
                  type="hidden"
                  name="idExamen"
                  defaultValue={this.state.selectedExam.id}
                />
                <button onClick={this.onCloseModal} className="btn btn-danger">
                  Cancelar
                </button>
              </form>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export default Exams;
