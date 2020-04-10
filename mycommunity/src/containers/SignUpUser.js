import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

  class SignUpUser extends Component{
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadCounties = this.loadCounties.bind(this);
        this.loadCities=this.loadCities.bind(this);
        //this.encrypt=this.encrypt.bind(this);

        this.state = {
          firstName: "",
          lastName: "",
          email:"",
          phone:"",
          city:"",
          region:"",
          birthdate:"",
          userName:"",
          password:"",
          load:false
        };
      }
    

      loadCounties(){
       if(!this.state.load){
         //fetch is async, that's why you can;t set setstate inside of their responses...
         //now it enters only once in this function
          this.setState((state, props) => ({
            load:true,
            city:""
          }));
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
    }

    loadCities(){
      if(!this.state.region==" "){
        if(this.state.city==""){
          var select = document.getElementById("city");
          var length = select.options.length;
          for (let i = length-1; i >= 0; i--) {
            select.options[i] = null;
          }
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
      }
    }
  

      validateForm() {
        return this.state.password.length>5 && this.state.firstName.length>0 && this.state.lastName.length>0 && this.state.email.length>0 && this.state.phone.length>0 && this.state.userName.length>0 && this.state.region.length>0 && this.state.city.length>0;
      }

      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
      
      handleSubmit (event) {
        event.preventDefault();
        
        const { userName,password ,firstName, lastName, email,phone,city,region,birthdate } = this.state;
        const user = { userName, password, firstName, lastName, email,phone,city,region,birthdate};
        console.log(user);
        axios
          .post('http://127.0.0.1:3000/SignUpUser', user)
          .then(() => console.log('User Registered'))
          .catch(err => {
            console.error(err);
          });
        }
      
      //novalidate disables browser default feedback
      render() {
        return (
          <div className="was-validated">
            <br></br>
            <br></br>
            <Form onSubmit={this.handleSubmit}  noValidate > 
              <Form.Group controlId="firstName" bssize="large">
                <Form.Control
                  autoFocus
                  placeholder="Prenume"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  required/>
              </Form.Group>
              <Form.Group controlId="lastName" bssize="large">
                <Form.Control placeholder="Nume"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="email" bssize="large">
                <Form.Control placeholder="Email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="phone" bssize="large">
              <Form.Control placeholder="Telefon"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="region" bssize="large">
              <Form.Control as="select"
                  onLoad={this.loadCounties()}
                  value={this.state.region}
                  onChange={this.handleChange}
                  required
                  >
               </Form.Control>
              </Form.Group>
              <Form.Group controlId="city" bssize="large">
              <Form.Control as="select" 
                  onLoad={this.loadCities()}
                  value={this.state.city}
                  onChange={this.handleChange}
                  required
                  />
              </Form.Group>
              <Form.Group controlId="birthdate" bssize="large">
                <Form.Control placeholder="Data nașterii"
                  type="date"
                  value={this.state.birthdate}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="userName" bssize="large">
                <Form.Control placeholder="Nume utilizator"
                  value={this.state.userName}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password" bssize="large">
                <Form.Control placeholder="Parola"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
                <Form.Text className="text-muted">
                  Parola trebuie să aibă cel puțin 5 caractere.
                </Form.Text>
              </Form.Group>
              <Button
                block
                type="submit"
                disabled={!this.validateForm()}
              >
              Înregistrează-te
              </Button>
            </Form>
          </div>
          
        );
      }
    }
    export default SignUpUser;