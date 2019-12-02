import React, { Component } from "react";
//import "./Questions.css";
import "./../../../css/Questions.css";
import PropTypes from "prop-types";
import classnames from "classnames";

import { connect } from "react-redux";
import { sendQuestionHotSpot } from "../../actions/questionAction";
import validateInput from "../../validations/newhostpot";

class HotSpot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interactionId: "",
      qtype: "hostpot",
      text: "",
      hotspotInstanceName1: "",
      hotspotInstanceName2: "",
      hotspotInstanceName3: "",
      hotspotInstanceName4: "",
      correct1: false,
      correct2: false,
      correct3: false,
      correct4: false,
      errors: {},
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value =
      event.target.type === "checkbox"
        ? this.setState({ [event.target.name]: event.target.checked })
        : this.setState({ [event.target.name]: event.target.value });
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
      this.props.sendQuestionHotSpot(this.state).then(
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
    const { errors, isLoading } = this.state;
    return (
      <div className="">
        <div className="mx-auto size70">
          <br></br>
          <form onSubmit={this.handleSubmit}>
            <h1 className="text-center">Nueva pregunta HotSpot</h1>
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
                    <label className="control-label ">
                      hotspot instance name
                    </label>
                  </div>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.hotspotInstanceName1
                    })}
                    name="hotspotInstanceName1"
                    placeholder="hotspot instance name 1"
                    onChange={this.handleChange}
                    value={this.state.hotspotInstanceName1}
                  />
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.hotspotInstanceName2
                    })}
                    name="hotspotInstanceName2"
                    placeholder="hotspot instance name 2"
                    onChange={this.handleChange}
                    value={this.state.hotspotInstanceName2}
                  />
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.hotspotInstanceName3
                    })}
                    name="hotspotInstanceName3"
                    placeholder="hotspot instance name 3"
                    onChange={this.handleChange}
                    value={this.state.hotspotInstanceName3}
                  />
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.hotspotInstanceName4
                    })}
                    name="hotspotInstanceName4"
                    placeholder="hotspot instance name 4"
                    onChange={this.handleChange}
                    value={this.state.hotspotInstanceName4}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <div className="text-center">
                    <label className="control-label">Correctas</label>
                  </div>
                  <input
                    type="checkbox"
                    className="form-control"
                    name="correct1"
                    onChange={this.handleChange}
                    value={this.state.correct1}
                  />
                  <input
                    type="checkbox"
                    className="form-control"
                    name="correct2"
                    onChange={this.handleChange}
                    value={this.state.correct2}
                  />
                  <input
                    type="checkbox"
                    className="form-control"
                    name="correct3"
                    onChange={this.handleChange}
                    value={this.state.correct3}
                  />
                  <input
                    type="checkbox"
                    className="form-control"
                    name="correct4"
                    onChange={this.handleChange}
                    value={this.state.correct4}
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

HotSpot.propTypes = {
  sendQuestionHotSpot: PropTypes.func.isRequired
};

HotSpot.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { sendQuestionHotSpot })(HotSpot);
