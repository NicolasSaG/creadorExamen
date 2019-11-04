import React, { Component } from "react";
import NavigationBar from "./js/components/NavigationBarComponent/NavigationBar";
class App extends Component {
  render() {
    return (
      <div>
        {/*creamos la barra de navegacion para todos, y en el componente 
        manejamos lo que puede ver el usuario logueado y el que no lo este */}
        <NavigationBar />

        {this.props.children}
      </div>
    );
  }
}

export default App;
