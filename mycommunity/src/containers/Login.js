import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../design/Login.css";

import PersonIcon from '@material-ui/icons/Person';
import LockRoundedIcon from '@material-ui/icons/LockRounded';


    class Login extends Component {
      constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
      
        this.state = {
          userName: "",
          password: ""
        };
      }

      validateForm() {
        return this.state.userName.length>0 && this.state.password.length>0;
      }

      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

      
      handleSubmit (event) {
        event.preventDefault();
        console.log(this.state.userName);
        fetch('http://127.0.0.1:3000/users/'+this.state.userName+'/'+this.state.password)
        .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.text();
        })
        .then(function(data) {
          console.log(data);
        })
        .catch(err => {
          console.log('Error!', err);
        })
      }
      
      render() {
        return (
          <div className="Login">
            <br></br>
            <br></br>
            <br></br>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="userName" bssize="large" >
              <PersonIcon  color="action" fontSize="large"/>
              <Col sm="10">
              <Form.Control
                  autoFocus
                  placeholder="Enter User Name"
                  value={this.state.userName}
                  onChange={this.handleChange}
                />
              </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="password" bssize="large">
              <LockRoundedIcon color="action" fontSize="large"/>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                </Col>
              </Form.Group>
              <Button
                block
                type="submit"
                disabled={!this.validateForm()}
              >Login
              </Button>
            </Form>
          </div>
        );
      }
    }
    export default Login;