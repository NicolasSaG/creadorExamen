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
      normal: "btn btn-secondary",
      correcto: "btn btn-success",
      incorrecto: "btn btn-warning",
      drop1: "",
      drop2: "",
      drop3: "",
      drop4: "",
      value: "",
      checked: 0
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
    if (this.state.checked == 0) {
      console.log("Se ha cambiado la respuesta a: " + this.state.userAnswer);
      console.log(
        `${this.state.drop1};${this.state.drop2};${this.state.drop3};${this.state.drop4}`
      );

      let respuestaDD = `${this.state.drop1};${this.state.drop2};${this.state.drop3};${this.state.drop4}`;

      if (this.state.question["answer"] == respuestaDD) {
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
      this.setState({ checked: 1 });
      this.setState({ openModal: false });
      event.preventDefault();
    } else {
      console.log("ya se ha revisado esta respuesta");
      this.setState({ openModal: false });
      event.preventDefault();
    }
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
                        alt=" "
                        onDrag={() => {
                          console.log("se ha seleccionado la img 1");
                        }}
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      drag option 2:
                      {this.state.question.drags.option[1].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.drags.option[1].img}`}
                        alt=" "
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      drag option 3:
                      {this.state.question.drags.option[2].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.drags.option[2].img}`}
                        alt=" "
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      drag option 4:
                      {this.state.question.drags.option[3].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.drags.option[3].img}`}
                        alt=" "
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
                      {this.state.question.targets.option[0].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.targets.option[0].img}`}
                        alt=" "
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      target option 2:
                      {this.state.question.targets.option[1].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.targets.option[1].img}`}
                        alt=" "
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      target option 3:
                      {this.state.question.targets.option[2].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.targets.option[2].img}`}
                        alt=" "
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      target option 4:
                      {this.state.question.targets.option[3].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.targets.option[3].img}`}
                        alt=" "
                        width="80"
                        height="80"
                      ></img>
                    </p>
                  </div>
                </div>
              </div>
              {this.displayFormDD()}

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
                        alt=" "
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      drag option 2:
                      {this.state.question.drags.option[1].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.drags.option[1].img}`}
                        alt=" "
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      drag option 3:
                      {this.state.question.drags.option[2].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.drags.option[2].img}`}
                        alt=" "
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      drag option 4:
                      {this.state.question.drags.option[3].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.drags.option[3].img}`}
                        alt=" "
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
                      {this.state.question.targets.option[0].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.targets.option[0].img}`}
                        alt=" "
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      target option 2:
                      {this.state.question.targets.option[1].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.targets.option[1].img}`}
                        alt=" "
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      target option 3:
                      {this.state.question.targets.option[2].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.targets.option[2].img}`}
                        alt=" "
                        width="80"
                        height="80"
                      ></img>
                    </p>
                    <p>
                      target option 4:
                      {this.state.question.targets.option[3].content}
                      <img
                        src={`http://localhost:8080/creadorExamen/images/${this.state.question.targets.option[3].img}`}
                        alt=" "
                        width="80"
                        height="80"
                      ></img>
                    </p>
                  </div>
                </div>
              </div>

              <br />
              <button onClick={this.onCloseModal}>Cerrar pregunta</button>
            </Modal>
          )}
        </div>
      );
    }
  }
  displayFormHS() {
    <div>
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
    </div>;
  }
  displayFormDD() {
    return (
      <div className="formRes">
        <form onSubmit={this.handleSubmitDD}>
          <br />
          <br />
          <input type="submit" value="Calificar" />
          <br />
          <table align="center" className="tablaRelacional">
            <tbody>
              <tr>
                <td>
                  <div className="dragArea">
                    <p
                      id="drag1"
                      draggable="true"
                      onDragStart={event => {
                        event.dataTransfer.setData("Text", event.target.id);
                      }}
                    >
                      Drag1
                    </p>
                  </div>
                </td>
                <td>
                  <div className="dragArea"></div>
                </td>
                <td>
                  <div
                    id="drop1"
                    className="dropArea"
                    onDrop={event => {
                      var data = event.dataTransfer.getData("Text");
                      event.target.appendChild(document.getElementById(data));
                      event.preventDefault();
                      data = data.split("drag")[1];
                      console.log(`${data}-1`);
                      this.setState({ drop1: `${data}-1` });
                      //console.log(data);
                    }}
                    onDragOver={event => event.preventDefault()}
                  ></div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="dragArea">
                    <p
                      id="drag2"
                      draggable="true"
                      onDragStart={event => {
                        event.dataTransfer.setData("Text", event.target.id);
                      }}
                    >
                      Drag2
                    </p>
                  </div>
                </td>
                <td>
                  <div className="dragArea"></div>
                </td>
                <td>
                  <div
                    id="drop2"
                    className="dropArea"
                    onDrop={event => {
                      var data = event.dataTransfer.getData("Text");
                      event.target.appendChild(document.getElementById(data));
                      event.preventDefault();
                      data = data.split("drag")[1];
                      console.log(`${data}-2`);
                      this.setState({ drop2: `${data}-2` });
                    }}
                    onDragOver={event => event.preventDefault()}
                  ></div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="dragArea">
                    <p
                      id="drag3"
                      draggable="true"
                      onDragStart={event => {
                        event.dataTransfer.setData("Text", event.target.id);
                      }}
                    >
                      Drag3
                    </p>
                  </div>
                </td>
                <td>
                  <div className="dragArea"></div>
                </td>
                <td>
                  <div
                    id="drop3"
                    className="dropArea"
                    onDrop={event => {
                      var data = event.dataTransfer.getData("Text");
                      event.target.appendChild(document.getElementById(data));
                      event.preventDefault();
                      data = data.split("drag")[1];
                      console.log(`${data}-3`);
                      this.setState({ drop3: `${data}-3` });
                    }}
                    onDragOver={event => event.preventDefault()}
                  ></div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="dragArea">
                    <p
                      id="drag4"
                      draggable="true"
                      onDragStart={event => {
                        event.dataTransfer.setData("Text", event.target.id);
                      }}
                    >
                      Drag4
                    </p>
                  </div>
                </td>
                <td>
                  <div className="dragArea"></div>
                </td>
                <td>
                  <div
                    id="drop4"
                    className="dropArea"
                    onDrop={event => {
                      var data = event.dataTransfer.getData("Text");
                      event.target.appendChild(document.getElementById(data));
                      event.preventDefault();
                      data = data.split("drag")[1];
                      console.log(`${data}-4`);
                      this.setState({ drop4: `${data}-4` });
                    }}
                    onDragOver={event => event.preventDefault()}
                  ></div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  render() {
    const { open } = this.state;
    //this.bindQuestion();
    if (this.state.question["type"] == 1) {
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
    } else if (this.state.question["type"] == 2) {
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
    } else {
      return (
        <div>
          <br />
        </div>
      );
    }
  }
}

export default MiniQuestion;
