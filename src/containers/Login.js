import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../design/Login.css";
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import PersonIcon from '@material-ui/icons/Person';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
const ENDPOINT="https://comunitate.netlify.app";

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
        //console.log(this.state.userName);
        fetch('https://hidden-fortress-80148.herokuapp.com/users/'+this.state.userName+'/'+this.state.password)
        .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.text();
        })
        .then(function(data) {
          console.log(data);
          if(data=="wrong")
          {
            alert("Nume sau Parolă incorectă!");
          }
          else
          {
            alert('Bun venit, '+data+" !");
            window.location.href = ENDPOINT+"?user="+data;
          }
        })
        .catch(err => {
          console.log('Error!', err);
        })
      }
      componentDidMount() {
        var user = document.getElementsByClassName("collasible-nav-dropdown")[0];
        user.style.display = "none";
      }
      render() {
        const responseFacebook = (response) => {
          console.log(response);
          var name=response.name;
          var email= response.email;
          var userID=response.userID;
          //var user_birthday=response.user_birthday;
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
              alert('Bun venit, '+response.data+" !");
              // var login = document.getElementsByClassName("mr-auto")[2];
              // login.style.display = "none";
              window.location.href = ENDPOINT+"?user="+response.data;
            //   .mr-auto .collasible-nav-dropdown{
            //     display: none;
            // }
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
              alert('Bun venit, '+response.data+" !");
              window.location.href = ENDPOINT+"?user="+response.data;
            })
            .catch(err => {
              console.error(err);
            });
          
        }
    
        return (
          <div className="Login">
            <br></br>
            <br></br>
            <br></br>
            <div className="FB">
            <FacebookLogin
              appId="635668626990364" 
              fields="name,email"
              callback={responseFacebook}
              textButton={<span>Continuă cu Facebook</span>}
            />
            <br />
            <br></br>
             <GoogleLogin
              clientId="443094691967-2j7a99kuh7puj3dvb7m7f9i40j6lcjr3.apps.googleusercontent.com"
              buttonText="Continuă cu GOOGLE"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
            <br></br>
            <br></br>
            <h5>SAU</h5>
            <br></br>
            </div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="userName" bssize="large" >
              <PersonIcon  color="action" fontSize="large"/>
              <Col sm="10">
              <Form.Control
                  autoFocus
                  placeholder="Introduceți numele de utilizator"
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
                  placeholder="Introduceți parola"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                </Col>
              </Form.Group>
              <Button
                block
                type="submit"
                disabled={!this.validateForm()}
              >Intră în cont
              </Button>
            </Form>
          </div>
        );
      }
    }
    export default Login;