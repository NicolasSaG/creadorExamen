import React, { Component } from "react";


class Type extends Component {
  render() {
    return (
      <div class="Type" align="center">
        <h1>Selecciona el tipo de pregunta: </h1><br />
        <h2><a href="/newquestion">Drag and Drop </a></h2><br />
        <h2><a href="/hotspot">Hot Spot </a></h2><br />
        <br />
      </div>
    );
  }
}
export default Type;
