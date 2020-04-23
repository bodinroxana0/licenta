import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Home from "./containers/Home";
import Login from "./containers/Login";
import Logout from "./containers/Logout";
import SignUp from "./containers/SignUp";

/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */
class Routes extends Component {
  render(){
  return (
    <Router>
      <div>
      <Navbar id="intra" bg="dark" variant="dark">
        <Navbar.Brand href="https://comunitate.netlify.app/">Acasă</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="https://comunitate.netlify.app/Login">Intră în cont</Nav.Link>
          <Nav.Link href="https://comunitate.netlify.app/Logout">Deconectare</Nav.Link>
          <Nav.Link href="https://comunitate.netlify.app/SignUp">Creează un cont</Nav.Link>
        </Nav>
        </Navbar>
        <Switch>
          <Route path="https://comunitate.netlify.app/Login" exact component={Login}></Route>
          <Route path="https://comunitate.netlify.app/Logout" exact component={Logout}></Route>
          <Route path="https://comunitate.netlify.app/SignUp" exact component={SignUp}></Route>
          <Route path="https://comunitate.netlify.app/" exact component={Home}></Route>
        </Switch>
      </div>
    </Router>
  );
}
}
export default Routes;
