import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Questions.css";
import axios from "axios";
import Modal from "react-modal";

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: {},
      open: false,
      selectedQuestion: {}
    };
    this.getTable();
  }
  onOpenModal = i => {
    this.setState({
      open: true,
      selectedQuestion: i // cuando se selecciona una pregunta se guarda en el state
    });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  getTable() {
    axios.get("http://localhost:8080/creadorExamen/QuestionsServlet").then(
      res => {
        var aux = res.data;
        this.setState({ questions: aux });
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
          <button
            className="btn btn-primary btn-cool"
            onClick={() => this.onOpenModal(element)} //pasar pregunta seleccionada
          >
            ver
          </button>

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
        <br></br>
        <table className="table table-striped table-hover">
          {Object.keys(this.state.questions).length === 0
            ? console.log("no data")
            : this.createTable()}
        </table>
        <div>
          {Object.keys(this.state.selectedQuestion).length === 0 ? (
            console.log("algo rato")
          ) : (
            <Modal
              isOpen={this.state.open}
              contentLabel="Minimal Modal Example"
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
                        src={`http://localhost:8080/creadorExamen/images/${this.state.selectedQuestion.drags.option[0].img}`}
                      ></img>
                    </p>
                    <p>
                      drag option 2:
                      {this.state.selectedQuestion.drags.option[1].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.selectedQuestion.drags.option[1].img}`}
                      ></img>
                    </p>
                    <p>
                      drag option 3:
                      {this.state.selectedQuestion.drags.option[2].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.selectedQuestion.drags.option[2].img}`}
                      ></img>
                    </p>
                    <p>
                      drag option 4:
                      {this.state.selectedQuestion.drags.option[3].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.selectedQuestion.drags.option[3].img}`}
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
                        src={`http://localhost:8080/creadorExamen/images/${this.state.selectedQuestion.targets.option[0].img}`}
                      ></img>
                    </p>
                    <p>
                      target option 2:
                      {this.state.selectedQuestion.targets.option[1].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.selectedQuestion.targets.option[1].img}`}
                      ></img>
                    </p>
                    <p>
                      target option 3:
                      {this.state.selectedQuestion.targets.option[2].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.selectedQuestion.targets.option[2].img}`}
                      ></img>
                    </p>
                    <p>
                      target option 4:
                      {this.state.selectedQuestion.targets.option[3].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.selectedQuestion.targets.option[3].img}`}
                      ></img>
                    </p>
                  </div>
                </div>
              </div>
              <button onClick={this.onCloseModal}>Cerrar pregunta</button>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export default Questions;
