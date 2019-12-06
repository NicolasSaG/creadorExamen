import React, { Component } from "react";
//import "./Questions.css";
import "./../../../css/Questions.css";
import PropTypes from "prop-types";

import classnames from "classnames";
import { connect } from "react-redux";
import { sendQuestion } from "../../actions/questionAction";

import { sendFilesDragDrop } from "../../actions/questionAction";
import validateInput from "../../validations/newquestion";

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: {},
      interactionId: "",
      text: "",
      qtype: "1",
      dragObject1: "",
      dragObject2: "",
      dragObject3: "",
      dragObject4: "",
      targetObject1: "",
      targetObject2: "",
      targetObject3: "",
      targetObject4: "",
      answer: "",
      errors: {},
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFileChange(event) {
    let f = this.state.files;
    f[event.target.name] = event.target.files[0];
    this.setState({ files: f });
  }

  //funcion que valida que los estados no esten vacios
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      //enviar datos de pregunta a servidor
      //si todo marcho bien, enviar a /welcome, sino no existe un usario con esos datos

      this.props.sendQuestion(this.state).then(
        res => {
          this.props.sendFilesDragDrop(this.state).then(
            res => {
              this.context.router.push("questions");
            },
            err =>
              this.setState({
                errors: { form: "problema al subir archivos" },
                isLoading: false
              })
          );
        },
        err =>
          this.setState({
            errors: { form: "problema al crear pregunta" },
            isLoading: false
          })
      );
    }
  }

  render() {
    const { errors, isLoading } = this.state;
    return (
      <div className="">
        <div className="mx-auto size70">
          <br></br>
          <form onSubmit={this.handleSubmit}>
            <h1 className="text-center">Nueva pregunta Drag n Drop</h1>
            <div className="form-group">
              <label className="control-label">interaction id</label>
              <input
                type="text"
                className={classnames("form-control", {
                  "is-invalid": errors.interactionId
                })}
                name="interactionId"
                onChange={this.handleChange}
                value={this.state.interactionId}
              />
            </div>
            <div className="form-group">
              <label className="control-label ">pregunta</label>
              <input
                type="text"
                className={classnames("form-control", {
                  "is-invalid": errors.text
                })}
                name="text"
                onChange={this.handleChange}
                value={this.state.text}
              />
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <div className="text-center">
                    <label className="control-label ">drag object name</label>
                  </div>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.dragObject1
                    })}
                    name="dragObject1"
                    placeholder="drag object 1"
                    onChange={this.handleChange}
                    value={this.state.dragObject1}
                  />
                  <input
                    type="file"
                    name="file1"
                    id="0"
                    onChange={this.handleFileChange}
                  />
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.dragObject2
                    })}
                    name="dragObject2"
                    placeholder="drag object 2"
                    onChange={this.handleChange}
                    value={this.state.dragObject2}
                  />
                  <input
                    type="file"
                    name="file2"
                    id="1"
                    onChange={this.handleFileChange}
                  />
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.dragObject3
                    })}
                    name="dragObject3"
                    placeholder="drag object 3"
                    onChange={this.handleChange}
                    value={this.state.dragObject3}
                  />
                  <input
                    type="file"
                    name="file3"
                    id="2"
                    onChange={this.handleFileChange}
                  />
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.dragObject4
                    })}
                    name="dragObject4"
                    placeholder="drag object 4"
                    onChange={this.handleChange}
                    value={this.state.dragObject4}
                  />
                  <input
                    type="file"
                    name="file4"
                    id="3"
                    onChange={this.handleFileChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <div className="text-center">
                    <label className="control-label">target object name</label>
                  </div>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.targetObject1
                    })}
                    name="targetObject1"
                    placeholder="target object 1"
                    onChange={this.handleChange}
                    value={this.state.targetObject1}
                  />
                  <input
                    type="file"
                    name="file5"
                    id="4"
                    onChange={this.handleFileChange}
                  />
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.targetObject2
                    })}
                    name="targetObject2"
                    placeholder="target object 2"
                    onChange={this.handleChange}
                    value={this.state.targetObject2}
                  />
                  <input
                    type="file"
                    name="file6"
                    id="5"
                    onChange={this.handleFileChange}
                  />
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.targetObject3
                    })}
                    name="targetObject3"
                    placeholder="target object 3"
                    onChange={this.handleChange}
                    value={this.state.targetObject3}
                  />
                  <input
                    type="file"
                    name="file7"
                    id="6"
                    onChange={this.handleFileChange}
                  />
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.targetObject4
                    })}
                    name="targetObject4"
                    placeholder="target object 4"
                    onChange={this.handleChange}
                    value={this.state.targetObject4}
                  />
                  <input
                    type="file"
                    name="file8"
                    id="7"
                    onChange={this.handleFileChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label ">Respuesta</label>
              <input
                type="text"
                className={classnames("form-control", {
                  "is-invalid": errors.answer
                })}
                name="answer"
                placeholder="example: 1-3;2-2;3-4;4-1"
                onChange={this.handleChange}
                value={this.state.answer}
              />
            </div>
            <div className="form-group  text-right">
              <input
                type="submit"
                value="Crear pregunta"
                className="btn btn-primary"
              />
              <button className="btn btn-info">Options</button>
              <button className="btn btn-info">Assets</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  sendQuestion: PropTypes.func.isRequired,
  sendFilesDragDrop: PropTypes.func.isRequired
};

Question.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { sendQuestion, sendFilesDragDrop })(Question);
