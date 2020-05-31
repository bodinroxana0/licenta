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
import Statistici from "./containers/Statistici";
import './design/Home.css';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
const trackingId = "UA-167975679-1";
var history;


/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */
class Routes extends Component {
  constructor(props) {
    super(props);    
  }
  componentDidMount(){
    ReactGA.initialize(trackingId);
    const history = createBrowserHistory();
    // Initialize google analytics page view tracking
    history.listen(location => {
      ReactGA.set({ page: location.pathname }); // Update the user's current page
      ReactGA.pageview(location.pathname); // Record a pageview for the given page
    });
  }
  render(){
  return (
    <Router history={history}>
      <Navbar ollapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Acasă</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="signup" href="/SignUp">Creează un cont</Nav.Link>
          <Nav.Link className="login" href="/Login">Intră în cont</Nav.Link>
          <Nav.Link className="statistici" href="/Statistici">Statistici</Nav.Link>
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
          <Route path="/Statistici" component={Statistici}></Route>
          <Route path="/Profile" component={Profile}></Route>
          <Route path="/Chat" component={Chat}></Route>
          <Route path="/" exact component={Home}></Route>
        </Switch>
    </Router>
  );
}
}
export default Routes;
