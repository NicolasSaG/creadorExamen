import React, { Component } from "react";
import Questions from "./Questions/Questions.js";
import NavBar from "./NavigationBarComponent/NavigationBar.jsx";
class Greetings extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Questions />
      </div>
    );
    //return <Questions />;
  }
}
export default Greetings;
