import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Bootstrap from "react-bootstrap";
import ReactDOM from 'react-dom';
import axios from 'axios';
import validator from 'react-validation';
import "./Register.css";

  class Register extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
      
        this.state = {
          firstName: "",
          lastName: "",
          email:"",
          phone:"",
          city:"",
          region:"",
          birthdate:"",
          userName:"",
          password:""
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

        const { userName, password, firstName, lastName, email,phone,city,region,birthdate } = this.state;

        const user = {
          userName, password, firstName, lastName, email,phone,city,region,birthdate
        };
        console.log(user);
        axios
          .post('http://127.0.0.1:3000/register', user)
          .then(() => console.log('User Registered'))
          .catch(err => {
            console.error(err);
          });
        }
      
      
      render() {
        return (
          <div className="Register">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="firstName" bsSize="large">
                <Form.Control
                  autoFocus
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="lastName" bsSize="large">
                <Form.Control placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="email" bsSize="large">
                <Form.Control placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="phone" bsSize="large">
                <Form.Control placeholder="Phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="city" bsSize="large">
                <Form.Control placeholder="City"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="region" bsSize="large">
                <Form.Control placeholder="Region"
                  value={this.state.region}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="birthdate" bsSize="large">
                <Form.Control placeholder="Birth Date(eg.1998-06-22)"
                  value={this.state.birthdate}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="userName" bsSize="large">
                <Form.Control placeholder="UserName"
                  value={this.state.userName}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="password" bsSize="large">
                <Form.Control placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                block
                type="submit"
                disabled={!this.validateForm()}
              >
              Register
              </Button>
            </Form>
          </div>
        );
      }
    }
    export default Register;