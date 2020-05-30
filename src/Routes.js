import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Home from "./containers/Home";
import Login from "./containers/Login";
import Logout from "./containers/Logout";
import SignUp from "./containers/SignUp";
import Profile from "./containers/Profile";
import Chat from "./containers/Chat";
import './design/Home.css';

/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */
class Routes extends Component {
  render(){
  return (
    <Router>
      <Navbar ollapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Acasă</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="signup" href="/SignUp">Creează un cont</Nav.Link>
          <Nav.Link className="login" href="/Login">Intră în cont</Nav.Link>
          <NavDropdown title={
            <span className="text-primary"></span>
          }
            className="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Setari</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item  href="/Logout">Deconectare</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path="/Login" component={Login}></Route>
          <Route path="/Logout" component={Logout}></Route>
          <Route path="/SignUp" component={SignUp}></Route>
          <Route path="/Profile" component={Profile}></Route>
          <Route path="/Chat" component={Chat}></Route>
          <Route path="/" exact component={Home}></Route>
        </Switch>
    </Router>
  );
}
}
export default Routes;
