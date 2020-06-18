import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import ReactGA from 'react-ga';
const ENDPOINT= "https://comunitate.netlify.app"; //"https://localhost:3000";
const trackingID = "UA-167975679-3"; 

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
      componentDidMount(){
        ReactGA.initialize(trackingID); 
       //ReactGA.pageview("/SignUpUser");  
    }
    loadCounties(){
       if(!this.state.load){
         //fetch is async, that's why you can;t set setstate inside of their responses...
         //now it enters only once in this function
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
          .post('https://hidden-fortress-80148.herokuapp.com/SignUpUser', user)
          .then(() =>{
            alert('Contul a fost creat cu succes!')
            window.location.href = ENDPOINT+"/Login";
          })
          .catch(err => {
            console.error(err);
          });
        this.fireEvent();
        }
    fireEvent(){
        ReactGA.event({
          category: 'Inregistrare',
          action: 'Un utilizator a creat un cont!'
        });
      }
      //novalidate disables browser default feedback
      render() {

        const responseFacebook = (response) => {
          console.log(response);
          var name=response.name;
          var email= response.email;
          var userID=response.userID;
          const user = { name , email,userID};
          if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
           } else {
            console.log('User cancelled login or did not fully authorize.');
           }
          
          if(typeof(name)!='undefined')
          {
            console.log(user);
            axios
            .post('https://hidden-fortress-80148.herokuapp.com/LoginFB',user)
            .then((response) => {
              alert(response);
              window.location.href = ENDPOINT;
            })
            .catch(err => {
              console.error(err);
            });
          }
        }
    
        const responseGoogle = (response) => {
          console.log(response);
          try{
            var username=response.Qt.Ad;
            var email=response.Qt.zu;
          }
          catch{
            var username=response.Pt.Ad;
            var email=response.Pt.yu;
          }
          
          var Googleid=response.Ca;
          var user={username,email,Googleid};
          
            console.log(user);
            axios
            .post('https://hidden-fortress-80148.herokuapp.com/LoginGoogle',user)
            .then((response) =>{
              console.log(response.data);
              alert(response.data);
              // var navbar=document.getElementById("intra");
              // var nav0=navbar.getElementsByTagName("a")[1];
              // nav0.style.display="none";
              window.location.href = ENDPOINT;
            })
            .catch(err => {
              console.error(err);
            });
          
        }
    
        return (
          <div className="was-validated">
            <br></br>
            <br></br>
            <div className="FB">
            <FacebookLogin
              appId="635668626990364" 
              fields="name,email,userID"
              callback={responseFacebook}
              textButton={<span>Continuă cu Facebook</span>}
            />
            <br />
            <br />
             <GoogleLogin
              clientId="443094691967-2j7a99kuh7puj3dvb7m7f9i40j6lcjr3.apps.googleusercontent.com"
              buttonText="Continuă cu GOOGLE"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
            <br></br>
            <h5>SAU</h5>
            <br></br>
            </div>
            <Form onSubmit={this.handleSubmit}  noValidate > 
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
              <Form.Row>
              <Form.Group as={Col} controlId="email" bssize="large">
                <Form.Control placeholder="Email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="phone" bssize="large">
              <Form.Control placeholder="Telefon"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              </Form.Row>
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
              <Form.Group as={Col} controlId="password" bssize="large">
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
              </Form.Row>
              <Form.Text className="text-muted">
                Prin clic pe butonul Înregistrează-te, accept Termenii de utilizare.
                </Form.Text>
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