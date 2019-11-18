import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { sendQuestion } from "../../actions/questionAction";
import validateInput from "../../validations/newquestion";

class HotSpot extends Component {

  render() {
    return (
      <div align="center">
        <div className="mx-auto size70">
        <h1 className="text-center">Crear Pregunta</h1>
        <br />
            <form>
                Interaction ID <input type="text" name="interactionId" className="form-control"/><br />
                Pregunta <input type="text" name="text" className="form-control"/><br />


            <div className="row">
              <div className="col">
                <div className="form-group">
                  <div className="text-center">
                    <label className="control-label ">Hot Spot Instance Name</label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="hs1"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="hs2"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="hs3"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="hs4"
                  />
                </div>
              </div>
              <div className="col">
                <div >
                  <div className="text-center">
                    <label className="control-label ">Correct</label>
                  </div>
                  <input
                    type="checkbox"
                    className="form-control"
                  />
                  <input
                    type="checkbox"
                    className="form-control"
                  />
                  <input
                    type="checkbox"
                    className="form-control"
                  />
                  <input
                    type="checkbox"
                    className="form-control"
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
export default HotSpot;