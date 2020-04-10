import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BuildIcon from '@material-ui/icons/Build';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import SignUpUser from "./SignUpUser";
import SignUpProvider from "./SignUpProvider";
import Button from 'react-bootstrap/Button';
import $ from 'jquery';
import "../design/SignUp.css";

  class SignUp extends Component {
    
     myFunction() {
      $(document).ready(function(){
        $("#hide").click(function(){
          $("table").hide();
        });
      });
    }
    render(){
    return (
    <Router>
    <div id="hide" onClick={this.myFunction()}>
    <table >
    <tr>
      <td >
      <AccessibilityIcon color="action" fontSize="large"/>
      <Link to="/SignUpUser" >Caut un serviciu</Link>
    
      </td>
      <td>
      <BuildIcon color="action" fontSize="large"/>
      <Link to="/SignUpProvider" >Vreau să ofer un sericiu</Link> 
      </td>
    </tr>
    </table>
    </div>
   <Switch>
      <Route path="/SignUpUser" exact component={SignUpUser}></Route>
      <Route path="/SignUpProvider" exact component={SignUpProvider}></Route>
    </Switch>
    </Router>
  );
 }
}

 export default SignUp;
