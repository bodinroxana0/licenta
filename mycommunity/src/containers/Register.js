import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Bootstrap from "react-bootstrap";
import ReactDOM from 'react-dom';
import axios from 'axios';
import validator from 'react-validation';
import { format, compareAsc } from 'date-fns';
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

      loadCounties(){
        fetch('http://127.0.0.1:3000/counties')
        .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.text();
        })
        .then(function(data) {
          var obj=JSON.parse(data);
          var x = document.getElementById("region");
          for (let i = 0; i < obj.length; i++) {
            var option = document.createElement("option");
            option.text = obj[i].name;
            x.add(option);
          }
        })
        .catch(err => {
          console.log('Error!', err);
        })
      }

      loadCities(){
        fetch('http://127.0.0.1:3000/cities/'+this.state.region)
        .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.text();
        })
        .then(function(data) {
          var obj=JSON.parse(data);
          var select = document.getElementById("city");
          //var length = select.options.length;
          // for (let i = 0; i < length; i++) {
          //   select.options[i] = null;
          // }
          obj.sort((a,b) => (a.city_name > b.city_name) ? 1 : ((b.city_name > a.city_name) ? -1 : 0)); 
          for (let i = 0; i < obj.length; i++) {
            var option = document.createElement("option");
            option.text = obj[i].city_name;
            select.add(option);
          }
        })
        .catch(err => {
          console.log('Error!', err);
        })
      }

      validateForm() {
        console.log(this.state.city);
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
                 type="email"
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
              <Form.Group controlId="region" bsSize="large">
              <Form.Control as="select"
                  onload={this.loadCounties()}
                  value={this.state.region}
                  onChange={this.handleChange}
                  >
               </Form.Control>
              </Form.Group>
              <Form.Group controlId="city" bsSize="large">
              <Form.Control as="select" 
                  value={this.state.city}
                  onload={this.loadCities()}
                  onChange={this.handleChange}>
               </Form.Control>
              </Form.Group>
              <Form.Group controlId="birthdate" bsSize="large">
                <Form.Control placeholder="Birth Date"
                  type="date"
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
                  type="password"
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