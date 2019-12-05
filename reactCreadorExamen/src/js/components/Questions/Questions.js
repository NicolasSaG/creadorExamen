import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./../../../css/Questions.css";
import axios from "axios";
import Modal from "react-modal";
import { isArray } from "util";

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: {},
      open: false,
      selectedQuestion: {},
      openModPreg: false,
      openModBorrar: false
    };
    this.getTable();
  }
  onOpenModPregunta = i => {
    this.setState({
      openModPreg: true,
      selectedQuestion: i
    });
    console.log(this.selectedQuestion.type);
  };
  onOpenModBorrar = i => {
    console.log(i);
    this.setState({
      openModBorrar: true,
      selectedQuestion: i
    });
  };
  onOpenModal = i => {
    this.setState({
      open: true,
      selectedQuestion: i // cuando se selecciona una pregunta se guarda en el state
    });
  };

  onCloseModPregunta = () => {
    this.setState({ openModPreg: false });
  };
  onCloseModBorrar = () => {
    this.setState({ openModBorrar: false });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };

  getTable() {
    axios.get("http://localhost:8080/QuestionsServlet").then(
      res => {
        var aux = res.data;
        this.setState({ questions: aux });
      },
      err => alert("error al obtener preguntas")
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

    if (isArray(this.state.questions.questions.question)) {
      this.state.questions.questions.question.forEach(element => {
        let children = [];
        children.push(<td className="td-id">{element.id}</td>);
        children.push(<td className="td-name">{element.text}</td>);
        children.push(
          <td className="td-actions">
            <button
              className="btn btn-primary btn-cool"
              onClick={() => this.onOpenModal(element)} //pasar pregunta seleccionada
            >
              ver
            </button>

            <button
              className="btn btn-info btn-cool"
              onClick={() => this.onOpenModPregunta(element)}
            >
              modificar
            </button>
            <button
              className="btn btn-danger btn-cool"
              onClick={() => this.onOpenModBorrar(element)}
            >
              eliminar
            </button>
          </td>
        );

        tt.push(<tr>{children}</tr>);
      });
    } else {
      if (this.state.questions.questions.question === undefined) {
      } else {
        let children = [];
        children.push(
          <td className="td-id">
            {this.state.questions.questions.question.id}
          </td>
        );
        children.push(
          <td className="td-name">
            {this.state.questions.questions.question.text}
          </td>
        );
        children.push(
          <td className="td-actions">
            <button
              className="btn btn-primary btn-cool"
              onClick={() =>
                this.onOpenModal(this.state.questions.questions.question)
              } //pasar pregunta seleccionada
            >
              ver
            </button>

            <button
              className="btn btn-info btn-cool"
              onClick={() =>
                this.onOpenModPregunta(this.state.questions.questions.question)
              }
            >
              modificar
            </button>
            <button
              className="btn btn-danger btn-cool"
              onClick={() =>
                this.onOpenModBorrar(this.state.questions.questions.question)
              }
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
          {Object.keys(this.state.questions).length === 0
            ? console.log("no data")
            : this.createTable()}
        </table>
        <div>
          {Object.keys(this.state.selectedQuestion).length === 0 ? (
            console.log("ver pregunta")
          ) : (
            <Modal
              isOpen={this.state.open}
              contentLabel="drag drop"
              ariaHideApp={false}
            >
              <h3>pregunta: {this.state.selectedQuestion.text}</h3>
              <p>answer: {this.state.selectedQuestion.answer}</p>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <div className="text-center">
                      <label className="control-label ">drag object name</label>
                    </div>

                    <p>
                      drag option 1:{" "}
                      {this.state.selectedQuestion.drags.option[0].content}
                      <img
                        src={`images/${this.state.selectedQuestion.drags.option[0].src}`}
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      drag option 2:
                      {this.state.selectedQuestion.drags.option[1].content}
                      <img
                        src={`images/${this.state.selectedQuestion.drags.option[1].src}`}
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      drag option 3:
                      {this.state.selectedQuestion.drags.option[2].content}
                      <img
                        src={`images/${this.state.selectedQuestion.drags.option[2].src}`}
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      drag option 4:
                      {this.state.selectedQuestion.drags.option[3].content}
                      <img
                        src={`images/${this.state.selectedQuestion.drags.option[3].src}`}
                        width="80"
                        height="80"
                      ></img>
                    </p>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <div className="text-center">
                      <label className="control-label">
                        target object name
                      </label>
                    </div>
                    <p>
                      target option 1:
                      {this.state.selectedQuestion.targets.option[0].content}
                      <img
                        src={`images/${this.state.selectedQuestion.targets.option[0].src}`}
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      target option 2:
                      {this.state.selectedQuestion.targets.option[1].content}
                      <img
                        src={`images/${this.state.selectedQuestion.targets.option[1].src}`}
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      target option 3:
                      {this.state.selectedQuestion.targets.option[2].content}
                      <img
                        src={`images/${this.state.selectedQuestion.targets.option[2].src}`}
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      target option 4:
                      {this.state.selectedQuestion.targets.option[3].content}
                      <img
                        src={`images/${this.state.selectedQuestion.targets.option[3].src}`}
                        width="80"
                        height="80"
                      ></img>
                    </p>
                  </div>
                </div>
              </div>
              <button onClick={this.onCloseModal}>Cerrar pregunta</button>
            </Modal>
          )}
        </div>
        <div>
          {Object.keys(this.state.selectedQuestion).length === 0 ? (
            console.log("Se cambiará la pregunta" + this.state.selectedQuestion)
          ) : (
            <Modal
              isOpen={this.state.openModPreg}
              contentLabel="Mod Pregunta"
              ariaHideApp={false}
            >
              <form action="ServletModPreg" method="post">
                <h1 className="text-center">Modificar Pregunta</h1>
                <div className="form-group">
                  <input
                    type="hidden"
                    name="id"
                    defaultValue={this.state.selectedQuestion.id}
                  />
                </div>
                <div className="form-group">
                  <label className="control-label ">pregunta</label>
                  <input
                    type="text"
                    className="form-control"
                    name="text"
                    onChange={this.handleChange}
                    defaultValue={this.state.selectedQuestion.text}
                  />
                  <label className="control-label ">Respuesta</label>
                  <input
                    type="text"
                    name="answer"
                    className="form-control"
                    onChange={this.handleChange}
                    defaultValue={this.state.selectedQuestion.answer}
                  />
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <div className="text-center">
                        <label className="control-label ">
                          drag object name
                        </label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="dragObject1"
                        onChange={this.handleChange}
                        defaultValue={
                          this.state.selectedQuestion.drags.option[0].content
                        }
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="dragObject2"
                        onChange={this.handleChange}
                        defaultValue={
                          this.state.selectedQuestion.drags.option[1].content
                        }
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="dragObject3"
                        onChange={this.handleChange}
                        defaultValue={
                          this.state.selectedQuestion.drags.option[2].content
                        }
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="dragObject4"
                        onChange={this.handleChange}
                        defaultValue={
                          this.state.selectedQuestion.drags.option[3].content
                        }
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <div className="text-center">
                        <label className="control-label">
                          target object name
                        </label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="targetObject1"
                        onChange={this.handleChange}
                        defaultValue={
                          this.state.selectedQuestion.targets.option[0].content
                        }
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="targetObject2"
                        onChange={this.handleChange}
                        defaultValue={
                          this.state.selectedQuestion.targets.option[1].content
                        }
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="targetObject3"
                        onChange={this.handleChange}
                        defaultValue={
                          this.state.selectedQuestion.targets.option[2].content
                        }
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="targetObject4"
                        onChange={this.handleChange}
                        defaultValue={
                          this.state.selectedQuestion.targets.option[3].content
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group  text-right">
                  <input
                    type="submit"
                    value="Modificar Pregunta"
                    className="btn btn-primary"
                  />
                  <button className="btn btn-info">Options</button>
                  <button className="btn btn-info">Assets</button>
                  <button
                    onClick={this.onCloseModPregunta}
                    className="btn btn-danger"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </Modal>
          )}
        </div>
        <div>
          {Object.keys(this.state.selectedQuestion).length === 0 ? (
            console.log("BorrarPegunta")
          ) : (
            <Modal
              isOpen={this.state.openModBorrar}
              contentLabel="BorrarPreg"
              ariaHideApp={false}
              className="BorrarPopUp"
            >
              Estas Seguro de Borrar la Pregunta Con id{" "}
              {this.state.selectedQuestion.id}
              <form action="BorrarPreg" method="post">
                <input
                  type="submit"
                  value="Borrar Pregunta"
                  className="btn btn-primary"
                />
                <input
                  type="hidden"
                  name="idPreg"
                  defaultValue={this.state.selectedQuestion.id}
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
      </div>
    );
  }
}

export default Questions;
