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

        // this.fetch('http://localhost:3000/login')
        // .then(resposnse => response.json())
        // .then(posts => (this.setState({posts})))};
         
      handleSubmit (event) {
        event.preventDefault()
          var data = { 
              username: this.state.userName,
              password: this.state.password
          }
          console.log(data);
          fetch("http://localhost:3000/auth", {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(data),
              })
              .then((response) => response.json())
              .then((data) => {
                console.log('Success:', data);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
      }
      
      render() {
        return (
          <div className="Login">
            <Form onSubmit={this.handleSubmit} method="POST">
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