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
import Profile from "./containers/Profile";

/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */
class Routes extends Component {
  render(){
  return (
    <Router>
      <div>
      <Navbar id="intra" bg="dark" variant="dark">
        <Navbar.Brand href="/">Acasă</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/Login">Intră în cont</Nav.Link>
          <Nav.Link href="/Logout">Deconectare</Nav.Link>
          <Nav.Link href="/SignUp">Creează un cont</Nav.Link>
        </Nav>
        </Navbar>
        <Switch>
          <Route path="/Login" component={Login}></Route>
          <Route path="/Logout" component={Logout}></Route>
          <Route path="/SignUp" component={SignUp}></Route>
          <Route path="/Profile" component={Profile}></Route>
          <Route path="/" exact component={Home}></Route>
        </Switch>
      </div>
    </Router>
  );
}
}
export default Routes;
