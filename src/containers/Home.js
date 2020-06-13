import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FaceIcon from '@material-ui/icons/Face';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import House from '../images/home.jfif'; 
import Services from '../images/services.png';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import '../design/Home.css';
import Provider from './Provider.js';
import FacebookLogin from 'react-facebook-login';
import ReactGA from 'react-ga';
const trackingId = "UA-167975679-2";

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}
class Home extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    var user = document.getElementsByClassName("collasible-nav-dropdown")[0];
    var connect = document.getElementsByClassName("signup")[0];
    var login = document.getElementsByClassName("login")[0];
    user.style.display = "none";
    connect.style.display = "block";
    login.style.display = "block";
    var username = getUrlVars()["user"];
    console.log(username);
    var url = 'https://hidden-fortress-80148.herokuapp.com/logged';
    fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.text();
    })
    .then(function(data) {
      if(data!="Null") 
      {
        user.style.display = data;
        if(data=="block"){
          connect.style.display = "none";
          login.style.display = "none";
        }
        else
        {
          connect.style.display ="block";
          login.style.display = "block";
        }
      }
      if(username)
      {
        var title=document.getElementsByClassName("text-primary")[0];
        title.innerHTML=username;
      }
      console.log(data);
    })
    .catch(err => {
      console.log('Error!', err);
    })
    var users=0;
    var cities=0;
    var services=0;
    var url = 'https://hidden-fortress-80148.herokuapp.com/cities_count';
    fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.text();
    })
    .then(function(data) {
      var object=JSON.parse(data);
      cities=cities+object[0].count;
      var city_count=document.getElementById('cities');
      city_count.textContent=cities;
      console.log(cities);
      
    })
    .catch(err => {
      console.log('Error!', err);
    })
    url = 'https://hidden-fortress-80148.herokuapp.com/provider_count';
    fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.text();
    })
    .then(function(data) {
      var object=JSON.parse(data);
      users=users+object[0].count;
      
    })
    .catch(err => {
      console.log('Error!', err);
    })
    url = 'https://hidden-fortress-80148.herokuapp.com/users_count';
    fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.text();
    })
    .then(function(data) {
      var object=JSON.parse(data); 
      users=users+object[0].count;
      var user_count=document.getElementById('users');
      user_count.textContent=users;
      console.log(users);
      
    })
    .catch(err => {
      console.log('Error!', err);
    })
    url = 'https://hidden-fortress-80148.herokuapp.com/services_count';
    fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.text();
    })
    .then(function(data) {
      var object=JSON.parse(data); 
      services=services+object[0].count;
      var service_count=document.getElementById('services');
      service_count.textContent=services;
      console.log(services);
      
    })
    .catch(err => {
      console.log('Error!', err);
    })
  }   
    render(){
    return (
      <div class="Home">
      <Carousel>
      <Carousel.Item>
        <div class="image">
        <img
          className="d-block w-100"
          src={House}
          alt="First slide"
          width={400}
          height={500}
        />
        </div>
        <Carousel.Caption>
          <Row>
          <h1 class="motto">Cel mai ușor mod de a găsi serviciul de care ai nevoie</h1>
          </Row>
          <Row>
            <br></br>
            <br></br>
          </Row>
          <Row>
          <Col>
          <LocationCityIcon color="action" fontSize="large"/>
          <strong class="number" id="cities">0</strong>
          <span> Orașe și sate</span>
          </Col>
          <Col>
          <FaceIcon color="action" fontSize="large"/>
          <strong class="number" id="users">0</strong>
          <span> Utilizatori</span>
          </Col>
          <Col>
          <img class="image" src={Services} alt="Services" width="40" height="40" ></img>
          <strong class="number" id="services">0</strong>
          <span> Servicii</span>
          </Col>
          </Row>
        </Carousel.Caption>
      </Carousel.Item>
      </Carousel>
        <Provider></Provider> 
        </div>
        );
      }
    }
 export default Home;
