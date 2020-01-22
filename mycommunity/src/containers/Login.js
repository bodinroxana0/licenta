import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Bootstrap from "react-bootstrap";
import ReactDOM from 'react-dom';
import "./Login.css";

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
        return this.state.password.length > 5 || this.state.password.length < 10;
      }

      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

      
      handleSubmit (event) {
        event.preventDefault();
        // fetch('http://127.0.0.1:3000/users')
        // .then(function(response) {
        //   if (response.status >= 400) {
        //       throw new Error("Bad response from server");
        //   }
        //   return response.json();
        // })
        // .then(function(data) {
        //   console.log(data);
        // })
        // .catch(err => {
        //   console.log('Error!', err);
        // })
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
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="userName" bsSize="large">
                <Form.Control
                  autoFocus
                  placeholder="Enter User Name"
                  value={this.state.userName}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="password" bsSize="large">
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <small id="passwordHelpBlock" class="form-text text-muted">
                  Your password must be 6-10 characters long.
                </small>
              </Form.Group>
              <div className="form-check">
                <input type="checkbox" id="exampleCheck1"/>
                <label for="exampleCheck1"> Remember me</label>
              </div>
              <Button
                block
                type="submit"
                disabled={!this.validateForm()}
              >
              Login
              </Button>
            </Form>
          </div>
        );
      }
    }
    export default Login;