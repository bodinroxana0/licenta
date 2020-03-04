import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import $ from 'jquery';
var path;
function printString(callback){
  var file = document.getElementById("photo").files[0];
  var preview = document.getElementById("preview");
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    // convert image file to base64 string
    preview.src = reader.result;
    path=reader.result;
     callback();
   }, false);
    
   if (file) {
     reader.readAsDataURL(file);
   }
}
  class SignUpProvider extends Component{
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadCounties = this.loadCounties.bind(this);
        this.loadCities=this.loadCities.bind(this);
        this.loadDomain=this.loadDomain.bind(this);
        this.loadServices=this.loadServices.bind(this);
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
          load:false,
          load2:false,
          domain:"",
          service:"",
          photo:"",
          description:""
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
    
    loadDomain(){
      if(!this.state.load2){
         this.setState((state, props) => ({
           load2:true,
           service:""
         }));
         fetch('http://127.0.0.1:3000/domain')
         .then(function(response) {
           if (response.status >= 400) {
               throw new Error("Bad response from server");
           }
           return response.text();
         })
         .then(function(data) {
           var obj=JSON.parse(data);
           var x = document.getElementById("domain");
           var unique=[0];
           for (let i = 0; i < obj.length; i++) {
            var option = document.createElement("option");
            if(unique.includes(obj[i].ServiceDomain)==false || i==0)
            {
              unique.push(obj[i].ServiceDomain);
               option.text = obj[i].ServiceDomain;
               x.add(option);
            }
          }
           
         })
         .catch(err => {
           console.log('Error!', err);
         })
       }   
    }
    loadServices(){
      if(!this.state.domain==" "){
        if(this.state.service==""){
            var select = document.getElementById("service");
            var length = select.options.length;
            for (let i = length-1; i >= 0; i--) {
              select.options[i] = null;
            }
        fetch('http://127.0.0.1:3000/services/'+this.state.domain)
            .then(function(response) {
              if (response.status >= 400) {
                  throw new Error("Bad response from server");
              }
              return response.text();
            })
            .then(function(data) {
              var obj=JSON.parse(data);
              //console.log(obj);
              var select = document.getElementById("service");
              
              for (let i = 0; i < obj.length; i++) {
                var option = document.createElement("option");
                option.text = obj[i].ServiceName;
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
        return this.state.password.length>5 && this.state.firstName.length>0 && this.state.lastName.length>0 && this.state.email.length>0 && this.state.phone.length>0 && this.state.userName.length>0 && this.state.region.length>0 && this.state.city.length>0 && this.state.domain.length>0 && this.state.service.length>0;
      }
      // handleChangePhoto = event => {
      //   var fileTag = document.getElementById("photo"),
      //   preview = document.getElementById("preview");
      //   var reader;
      //   if (fileTag.files && fileTag.files[0]) {
      //     reader = new FileReader();
      //     reader.onload = function(e) {
      //       preview.setAttribute('src', e.target.result);
      //       encoded=e.target.result;
      //       console.log(encoded);
      //     }
      //     reader.readAsDataURL(fileTag.files[0]);  
      //   }
      // }
     
      handlePhoto=event=>{
        printString(() => {
          console.log(path);
        })
        
      }
      handleChange = event => {
          //This method asynchronously starts reading the contents of the specified File or Blob. When the read operation is complete, 
          //readyState will become DONE and the onloadend event handler (that is, callback), 
          //if present, will be invoked. At that time, the result property contains a data URL string that encodes the file’s data
        this.setState({
              [event.target.id]: event.target.value
          });
      }
      handleSubmit (event) {
        event.preventDefault();
        console.log(path);
        const { userName,password ,firstName, lastName, email,phone,city,region,birthdate,domain,service,description } = this.state;
        const user = { userName, password, firstName, lastName, email,phone,city,region,birthdate,domain,service,path, description};
        console.log(user);
        axios
          .post('http://127.0.0.1:3000/SignUpProvider', user)
          .then((response) => {
            console.log(response);
          })
          .catch(err => {
            console.error(err);
          });
        }
      
      //novalidate disables browser default feedback
      //controlId is super important, it must have the same name as the variable!if not , then the select will not set anything
      render() {
        return (
          <div className="was-validated">
            <br></br>
            <br></br>
            <Form onSubmit={this.handleSubmit}  noValidate > 
            <Form.Row> 
              <Form.Group as={Col} controlId="firstName" bssize="large">
                <Form.Control
                  autoFocus
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  required/>
              </Form.Group>
              <Form.Group as={Col} controlId="lastName" bssize="large">
                <Form.Control placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              </Form.Row>
              <Form.Group controlId="email" bssize="large">
                <Form.Control placeholder="Email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="phone" bssize="large">
              <Form.Control placeholder="Phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Row>
              <Form.Group as={Col} controlId="region" bssize="large">
              <Form.Control as="select"
                  onLoad={this.loadCounties()}
                  value={this.state.region}
                  onChange={this.handleChange}
                  required
                  >
               </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="city" bssize="large">
              <Form.Control as="select" 
                  onLoad={this.loadCities()}
                  value={this.state.city}
                  onChange={this.handleChange}
                  required
                  />
              </Form.Group>
              </Form.Row>
              <Form.Group controlId="birthdate" bssize="large">
                <Form.Control placeholder="Birth Date"
                  type="date"
                  value={this.state.birthdate}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Row>
              <Form.Group as={Col} controlId="userName" bssize="large">
                <Form.Control placeholder="UserName"
                  value={this.state.userName}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group  as={Col} controlId="password" bssize="large">
                <Form.Control placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
                <Form.Text className="text-muted">
                  Password length required is minimum 5.
                </Form.Text>
              </Form.Group>
              </Form.Row>
              <Form.Row>
              <Form.Group as={Col} controlId="domain" bssize="large">
              <Form.Control as="select"
                  onLoad={this.loadDomain()}
                  value={this.state.domain}
                  onChange={this.handleChange}
                  required
                  >
               </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="service" bssize="large">
              <Form.Control as="select" 
                  onLoad={this.loadServices()}
                  value={this.state.service}
                  onChange={this.handleChange}
                  required
                  />
              </Form.Group>
              </Form.Row>
              <Form.Row>
              <Form.Group as={Col} controlId="photo">
                <Form.Control
                  type="file"
                  multiple
                  value={this.state.photo}
                  onChange={this.handlePhoto}
                />
                </Form.Group>
              <Form.Group as={Col} >
                <img src="" id="preview" width="40" height="40" ></img>
              </Form.Group>
              </Form.Row>
                <Form.Text className="text-muted">Choose photos to demonstrate your skills (diploma, certificate...)</Form.Text> 
              
              <Form.Group controlId="description">
                <Form.Control 
                as="textarea" 
                placeholder="Enter details about the service you provide (price, schedule...)" 
                value={this.state.description}
                onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                block
                type="submit"
                disabled={!this.validateForm()}
              >
              Sign up
              </Button>
            </Form>
          </div>
          
        );
      }
    }
    export default SignUpProvider;