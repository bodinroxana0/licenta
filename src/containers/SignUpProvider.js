import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import $ from 'jquery';
import ReactGA from 'react-ga';
const ENDPOINT= "https://comunitate.netlify.app"; //"https://localhost:3000";
const trackingID = "UA-167975679-1"; 
var path;
var path2;
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
function printString2(callback){
  path2=new Array();
  var length = document.getElementById("docs").files.length;
  console.log(length);
  for(var i=0;i<length;i++)
  {
    var file = document.getElementById("docs").files[i];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      path2[path2.length] = reader.result;
      callback();
    }, false);
      
    if (file) {
      reader.readAsDataURL(file);
    }
  }
}

  class SignUpProvider extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadCounties = this.loadCounties.bind(this);
        this.loadCities=this.loadCities.bind(this);
        this.loadDomain=this.loadDomain.bind(this);
        this.loadServices=this.loadServices.bind(this);

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
          docs:"",
          description:""
        };
      }
     componentDidMount(){
        ReactGA.initialize(trackingID); 
       //ReactGA.pageview("/SignUpProvider");  
    }
    loadCounties(){
       if(!this.state.load){
          this.setState((state, props) => ({
            load:true,
            city:""
          }));
          fetch('https://hidden-fortress-80148.herokuapp.com/counties')
          .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.text();
          })
          .then(function(data) {
            var obj=JSON.parse(data);
            var x = document.getElementById("region");
            var option = document.createElement("option");
            option.text = 'Alege un județ ...';
             x.add(option);
             x.options[0].disabled = true;
            for (let i = 0; i < obj.length; i++) {
              var option = document.createElement("option");
              option.text = obj[i].name;
              x.add(option);
            }
            x.options[0].selected=true;
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
        fetch('https://hidden-fortress-80148.herokuapp.com/cities/'+this.state.region)
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
         fetch('https://hidden-fortress-80148.herokuapp.com/domain')
         .then(function(response) {
           if (response.status >= 400) {
               throw new Error("Bad response from server");
           }
           return response.text();
         })
         .then(function(data) {
           var obj=JSON.parse(data);
           var x = document.getElementById("domain");
           var option = document.createElement("option");
           option.text = 'Alege un domeniu ...';
            x.add(option);
            x.options[0].disabled = true;
            var option2 = document.createElement("option");
           option2.text = '...';
            x.add(option2);
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
        fetch('https://hidden-fortress-80148.herokuapp.com/services/'+this.state.domain)
            .then(function(response) {
              if (response.status >= 400) {
                  throw new Error("Bad response from server");
              }
              return response.text();
            })
            .then(function(data) {
              var obj=JSON.parse(data);
              var select = document.getElementById("service");
              var option = document.createElement("option");
              option.text = 'Alege un serviciu ...';
              select.add(option);
              select.options[0].disabled = true;
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
    fireEvent(){
      ReactGA.event({
        category: 'Inregistrare',
        action: 'Un furnizor de servicii a creat un cont!'
      });
    }
      validateForm() {
        return this.state.password.length>5 && this.state.firstName.length>0 && this.state.lastName.length>0 && this.state.email.length>0 && this.state.phone.length>0 && this.state.userName.length>0 && this.state.region.length>0 && this.state.city.length>0 && this.state.domain.length>0 && this.state.service.length>0;
      }
      handlePhoto=event=>{
        printString(() => {
          console.log(path);
        })
      }
      handlePhoto2=event=>{
        printString2(() => {
          console.log(path2);
        })
      }
      handleChange = event => {
          if(event.target.id=="region"){
          this.setState({
              [event.target.id]: event.target.value
          });
          this.setState({
            city:""
        });
          this.setState({
            domain:""
        });
        console.log("am setat");
        }
        else{
          this.setState({
            [event.target.id]: event.target.value
        });
        }

      }
      handleSubmit (event) {
        event.preventDefault();
        const { userName,password ,firstName, lastName, email,phone,city,region,birthdate,domain,service,description } = this.state;
        var services_Id=0;
        console.log(service);
        fetch('https://hidden-fortress-80148.herokuapp.com/services/'+domain)
        .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.text();
        })
        .then(function(data) {
          var obj=JSON.parse(data);
          for (let i = 0; i < obj.length; i++) {
            if(obj[i].ServiceName==service)
            {
              services_Id=obj[i].Id;
              console.log(services_Id);
              const user = { path2,userName, password, firstName, lastName, email,phone,city,region,birthdate,domain,services_Id,path, description};
              console.log(user);
              //doar dupa ce am gasit id-ul serviciului pe care vrem sa il introducem , face cerere post
              axios
              .post('https://hidden-fortress-80148.herokuapp.com/SignUpProvider', user)
              .then((response) =>{
                if(response.data!='ok')
                {
                  alert(response.data);
                }
                else{
                  alert("Contul a fost creat cu succes!");
                window.location.href = ENDPOINT+"/Login";
                }
              })
              .catch(err => {
                console.error(err);
              });
            }
          }
        })
        .catch(err => {
          console.log('Error!', err);
        })
        this.fireEvent();
      }
    
      //novalidate disables browser default feedback
      //controlId is super important, it must have the same name as the variable!if not , then the select will not set anything
      render() {
        return (
          <div className="was-validated">
            <br></br>
            <br></br>
            <Form onSubmit={this.handleSubmit} noValidate > 
            <Form.Row> 
              <Form.Group as={Col} controlId="firstName" bssize="large">
                <Form.Control
                  autoFocus
                  placeholder="Prenume"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  required/>
              </Form.Group>
              <Form.Group as={Col} controlId="lastName" bssize="large">
                <Form.Control placeholder="Nume"
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
              <Form.Control placeholder="Telefon"
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
                <Form.Control placeholder="Data nașterii"
                  type="date"
                  value={this.state.birthdate}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Row>
              <Form.Group as={Col} controlId="userName" bssize="large">
                <Form.Control placeholder="Nume utilizator"
                  value={this.state.userName}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group  as={Col} controlId="password" bssize="large">
                <Form.Control placeholder="Parolă"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
                <Form.Text className="text-muted">
                  Parola trebuie să aibă minim 5 caractere.
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
              <Form.Text className="text-muted">Alege o poză de profil</Form.Text>
                <Form.Control
                  type="file"
                  value={this.state.photo}
                  onChange={this.handlePhoto}
                />
                </Form.Group>
              <Form.Group as={Col} >
                <img src="" id="preview" width="40" height="40" ></img>
              </Form.Group>
              </Form.Row> 
              <Form.Row>
              <Form.Group as={Col} controlId="docs">
              <Form.Text className="text-muted">Alege poze care să ateste calificarea ta profesională/CV</Form.Text>
                <Form.Control
                  type="file"
                  multiple
                  value={this.state.docs}
                  onChange={this.handlePhoto2}
                />
                </Form.Group>
              </Form.Row> 
              <Form.Group controlId="description">
                <Form.Control 
                as="textarea" 
                placeholder="Introdu detalii despre serviciul pe care îl oferi (prețuri, orar ...)" 
                value={this.state.description}
                onChange={this.handleChange}
                />
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
    export default SignUpProvider;