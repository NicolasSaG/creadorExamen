import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./../../../css/Questions.css";
import axios from "axios";
import { sendExam } from "../../actions/examAction";
import Modal from "react-modal";
import { isArray } from "util";
import PropTypes from "prop-types";

import { connect } from "react-redux";

class NewExam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: {},
      open: false,
      examName: "",
      examId: "",
      selectedQuestion: {},
      questionsForExamen: []
    };
    this.getTable();
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    //enviar datos de examen a servidor
    //si todo marcho bien, enviar a /examenes
    this.props
      .sendExam(
        this.state.questionsForExamen,
        this.state.examName,
        this.state.examId
      )
      .then(
        res => this.context.router.push("exams"),
        err =>
          this.setState({
            errors: { form: "problema al crear examen" },
            isLoading: false
          })
      );
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

  handleCheckBox = i => {
    let q = this.state.questionsForExamen;
    if (q.indexOf(i) === -1) {
      //no lo encuentra
      q.push(i);
    } else {
      q.splice(q.indexOf(i), 1);
    }

    this.setState({
      questionsForExamen: q
    });
    console.log(this.state.questionsForExamen);
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

            <input
              type="checkbox"
              onChange={() => this.handleCheckBox(element.id)}
              className="btn-cool"
            ></input>
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
            <div>
              <button
                className="btn btn-primary btn-cool"
                onClick={() =>
                  this.onOpenModal(this.state.questions.questions.question)
                } //pasar pregunta seleccionada
              >
                ver
              </button>

              <input
                type="checkbox"
                onChange={() => this.handleCheckBox(element.id)}
                className="btn-cool"
              ></input>
            </div>
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
        nombre de examen
        <input type="text" name="examName" onChange={this.handleChange}></input>
        id de examn
        <input type="text" name="examId" onChange={this.handleChange}></input>
        <table className="table table-striped table-hover">
          {Object.keys(this.state.questions).length === 0
            ? console.log("no data")
            : this.createTable()}
        </table>
        <input
          type="button"
          value="Crear examen"
          onClick={this.onSubmit}
        ></input>
        <div>
          {Object.keys(this.state.selectedQuestion).length === 0 ? (
            console.log("error en pregunta seleccionada")
          ) : (
            <Modal
              isOpen={this.state.open}
              contentLabel="Minimal Modal Example"
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
                        src={`http://localhost:8080/images/${this.state.selectedQuestion.drags.option[0].src}`}
                      ></img>
                    </p>
                    <p>
                      drag option 2:
                      {this.state.selectedQuestion.drags.option[1].content}
                      <img
                        src={`http://localhost:8080/images/${this.state.selectedQuestion.drags.option[1].src}`}
                      ></img>
                    </p>
                    <p>
                      drag option 3:
                      {this.state.selectedQuestion.drags.option[2].content}
                      <img
                        src={`http://localhost:8080/images/${this.state.selectedQuestion.drags.option[2].src}`}
                      ></img>
                    </p>
                    <p>
                      drag option 4:
                      {this.state.selectedQuestion.drags.option[3].content}
                      <img
                        src={`http://localhost:8080/images/${this.state.selectedQuestion.drags.option[3].src}`}
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
                        src={`http://localhost:8080/images/${this.state.selectedQuestion.targets.option[0].src}`}
                      ></img>
                    </p>
                    <p>
                      target option 2:
                      {this.state.selectedQuestion.targets.option[1].content}
                      <img
                        src={`http://localhost:8080/images/${this.state.selectedQuestion.targets.option[1].src}`}
                      ></img>
                    </p>
                    <p>
                      target option 3:
                      {this.state.selectedQuestion.targets.option[2].content}
                      <img
                        src={`http://localhost:8080/images/${this.state.selectedQuestion.targets.option[2].src}`}
                      ></img>
                    </p>
                    <p>
                      target option 4:
                      {this.state.selectedQuestion.targets.option[3].content}
                      <img
                        src={`http://localhost:8080/images/${this.state.selectedQuestion.targets.option[3].src}`}
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

NewExam.propTypes = {
  sendExam: PropTypes.func.isRequired
};

NewExam.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { sendExam })(NewExam);
