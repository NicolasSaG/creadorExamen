import React, { Component } from "react";
import axios from "axios";
import "./Questions.css";
class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interactionId: "",
      text: "",
      dragObjects: {},
      targetObjects: {},
      answer: ""
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="">
        <div className="mx-auto size70">
          <br></br>
          <form>
            <h1 className="text-center">Crear Pregunta</h1>
            <div className="form-group">
              <label className="control-label without-opacity">
                interaction id
              </label>
              <input type="text" className="form-control without-opacity" />
            </div>
            <div className="form-group">
              <label className="control-label without-opacity">pregunta</label>
              <input type="text" className="form-control without-opacity" />
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <div className="text-center">
                    <label className="control-label without-opacity ">
                      drag object name
                    </label>
                  </div>
                  <input type="text" className="form-control without-opacity" />
                  <input type="text" className="form-control without-opacity" />
                  <input type="text" className="form-control without-opacity" />
                  <input type="text" className="form-control " />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <div className="text-center">
                    <label className="control-label">target object name</label>
                  </div>
                  <input type="text" className="form-control" />
                  <input type="text" className="form-control" />
                  <input type="text" className="form-control" />
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
            <div className="form-group  text-right">
              <input
                type="submit"
                value="Crear pregunta"
                className="btn btn-primary "
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

export default Question;
