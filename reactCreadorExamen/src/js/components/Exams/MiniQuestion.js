import React, { Component } from "react";
import ReactDOM from "react-dom";
//import "./Questions.css";
import "./../../../css/Questions.css";
import axios from "axios";
import Modal from "react-modal";

class MiniQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      openModal: false,
      question: {},
      userAnswer: "",
      answer: "",
      normal: "btn btn-secondary miniNormal",
      correcto: "btn btn-success",
      incorrecto: "btn btn-warning",
      value: ""
    };
    this.changeDD = this.changeDD.bind(this);
    this.handleSubmitDD = this.handleSubmitDD.bind(this);
  }
  bindQuestion() {
    this.setState({ question: this.props.question });
    this.setState({ id: this.props.id });
    this.setState({ value: this.state.normal });
    console.log(this.state.answer);
    //console.log("aux");
    //this.forceUpdate();
  }
  componentDidMount() {
    this.bindQuestion();
    this.setState({ answer: this.state.question["answer"] });
  }
  /*componentDidUpdate() {
    if (this.state.userAnswer == answer) {
      console.log("correcto");
    }
  }*/
  openModal() {
    console.log(this.state.question["answer"]);
    this.setState({ openModal: true });
  }
  onCloseModal = () => {
    this.setState({ openModal: false });
  };
  changeDD(event) {
    this.setState({ userAnswer: event.target.value });
    console.log(this.state.answer);
  }

  handleSubmitDD(event) {
    console.log("Se ha cambiado la respuesta a: " + this.state.userAnswer);

    if (this.state.question["answer"] == this.state.userAnswer) {
      console.log("respuesta correcta");
      this.setState({ value: this.state.correcto });
      this.forceUpdate();
      if (localStorage.getItem("aciertos") != null) {
        //se enconotro el token
        let califAux = Number(localStorage.getItem("aciertos"));
        califAux += 1;
        localStorage.setItem("aciertos", califAux);
      }
    } else {
      console.log("respuesta inccorrecta");
      this.setState({ value: this.state.incorrecto });
      this.forceUpdate();
    }
    this.changeDD = null;
    this.setState({ openModal: false });
    event.preventDefault();
  }

  displayModal() {
    if (this.state.question["type"] == 1) {
      //es dragandDrop
      return (
        <div>
          {Object.keys(this.state.question).length === 0 ? (
            console.log("algo raro")
          ) : (
            <Modal
              isOpen={this.state.openModal}
              contentLabel="Minimal Modal Example"
              ariaHideApp={false}
            >
              <h3>pregunta: {this.state.question.text}</h3>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <div className="text-center">
                      <label className="control-label ">drag object name</label>
                    </div>

                    <p>
                      drag option 1:{" "}
                      {this.state.question.drags.option[0].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.drags.option[0].img}`}
                      ></img>
                    </p>
                    <p>
                      drag option 2:
                      {this.state.question.drags.option[1].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.drags.option[1].img}`}
                      ></img>
                    </p>
                    <p>
                      drag option 3:
                      {this.state.question.drags.option[2].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.drags.option[2].img}`}
                      ></img>
                    </p>
                    <p>
                      drag option 4:
                      {this.state.question.drags.option[3].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.drags.option[3].img}`}
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
                      {this.state.question.targets.option[0].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.targets.option[0].img}`}
                      ></img>
                    </p>
                    <p>
                      target option 2:
                      {this.state.question.targets.option[1].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.targets.option[1].img}`}
                      ></img>
                    </p>
                    <p>
                      target option 3:
                      {this.state.question.targets.option[2].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.targets.option[2].img}`}
                      ></img>
                    </p>
                    <p>
                      target option 4:
                      {this.state.question.targets.option[3].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.targets.option[3].img}`}
                      ></img>
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={this.handleSubmitDD}>
                <br />
                Tu Respuesta:
                <br />
                <br />
                <input
                  type="text"
                  value={this.state.userAnswer}
                  onChange={this.changeDD}
                  placeholder="ejemplo 1-0;2-0;3-1;4-1"
                  className="form-control"
                />
                <br />
                <input type="submit" value="Calificar" />
                <br />
              </form>
              <br />

              <button onClick={this.onCloseModal}>Cerrar pregunta</button>
            </Modal>
          )}
        </div>
      );
    } else if (this.state.question["type"] == 2) {
      //esHotspot
      return (
        <div>
          {Object.keys(this.state.question).length === 0 ? (
            console.log("algo raro")
          ) : (
            <Modal
              isOpen={this.state.openModal}
              contentLabel="Minimal Modal Example"
              ariaHideApp={false}
            >
              <h3>pregunta: {this.state.question.text}</h3>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <div className="text-center">
                      <label className="control-label ">drag object name</label>
                    </div>

                    <p>
                      drag option 1:{" "}
                      {this.state.question.drags.option[0].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.drags.option[0].img}`}
                      ></img>
                    </p>
                    <p>
                      drag option 2:
                      {this.state.question.drags.option[1].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.drags.option[1].img}`}
                      ></img>
                    </p>
                    <p>
                      drag option 3:
                      {this.state.question.drags.option[2].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.drags.option[2].img}`}
                      ></img>
                    </p>
                    <p>
                      drag option 4:
                      {this.state.question.drags.option[3].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.drags.option[3].img}`}
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
                      {this.state.question.targets.option[0].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.targets.option[0].img}`}
                      ></img>
                    </p>
                    <p>
                      target option 2:
                      {this.state.question.targets.option[1].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.targets.option[1].img}`}
                      ></img>
                    </p>
                    <p>
                      target option 3:
                      {this.state.question.targets.option[2].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.targets.option[2].img}`}
                      ></img>
                    </p>
                    <p>
                      target option 4:
                      {this.state.question.targets.option[3].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.targets.option[3].img}`}
                      ></img>
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={this.handleSubmitDD}>
                Tu Respuesta:
                <br />
                <input
                  type="text"
                  value={this.state.userAnswer}
                  onChange={this.changeDD}
                  placeholder="ejemplo 1-0;2-0;3-1;4-1"
                  className="form-control"
                />
                <br />
                <input type="submit" value="Verificar" />
              </form>
              <br />
              <button onClick={this.onCloseModal}>Cerrar pregunta</button>
            </Modal>
          )}
        </div>
      );
    }
  }
  render() {
    const { open } = this.state;
    //this.bindQuestion();
    if (this.state.question["type"] == 1)
      return (
        <div>
          <button onClick={() => this.openModal()} className={this.state.value}>
            Pregunta {this.state.id}{" "}
          </button>
          {this.displayModal()}
          <br />
          <br />
        </div>
      );
    else if (this.state.question["type"] == 2) {
      let respuesta = this.state.question["answer"];
      console.log(respuesta);
      return (
        <div>
          <button onClick={() => this.openModal()} className={this.state.value}>
            Pregunta {this.state.id}{" "}
          </button>{" "}
          {this.displayModal()}
          <br />
          <br />
        </div>
      );
    } else
      return (
        <div>
          <br />
        </div>
      );
  }
}

export default MiniQuestion;
