import React, { Component } from 'react';
import Routes from "./Routes";
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render(){
  return (
    <div className="App container">
      <Routes /> 
    </div>
  );
}
}
export default App;
//routes returneaza continutul clasei
//functie return, clasa render