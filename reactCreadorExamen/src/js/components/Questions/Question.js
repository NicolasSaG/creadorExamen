import React, { Component } from "react";
import "./Questions.css";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { sendQuestion } from "../../actions/questionAction";
import validateInput from "../../validations/newquestion";

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interactionId: "",
      text: "",
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
        res => this.context.router.push("questions"),
        err =>
          this.setState({
            errors: { form: "problema al crear pregunta" },
            isLoading: false
          })
      );
    }
  }

  render() {
    return (
      <div className="">
        <div className="mx-auto size70">
          <br></br>
          <form onSubmit={this.handleSubmit}>
            <h1 className="text-center">Crear Pregunta</h1>
            <div className="form-group">
              <label className="control-label">interaction id</label>
              <input
                type="text"
                className="form-control"
                name="interactionId"
                onChange={this.handleChange}
                value={this.state.interactionId}
              />
            </div>
            <div className="form-group">
              <label className="control-label ">pregunta</label>
              <input
                type="text"
                className="form-control"
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
                    className="form-control"
                    name="dragObject1"
                    onChange={this.handleChange}
                    value={this.state.dragObject1}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="dragObject2"
                    onChange={this.handleChange}
                    value={this.state.dragObject2}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="dragObject3"
                    onChange={this.handleChange}
                    value={this.state.dragObject3}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="dragObject4"
                    onChange={this.handleChange}
                    value={this.state.dragObject4}
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
                    className="form-control"
                    name="targetObject1"
                    onChange={this.handleChange}
                    value={this.state.targetObject1}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="targetObject2"
                    onChange={this.handleChange}
                    value={this.state.targetObject2}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="targetObject3"
                    onChange={this.handleChange}
                    value={this.state.targetObject3}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="targetObject4"
                    onChange={this.handleChange}
                    value={this.state.targetObject4}
                  />
                </div>
              </div>
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
  sendQuestion: PropTypes.func.isRequired
};

Question.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(
  null,
  { sendQuestion }
)(Question);