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
// function click_profile(name)
// {
//   var name = $(this).data('username');        
//   if (name != undefined && name != null) {
//       window.location = '/player_detail?username=' + name;
//   }
// }​
class Home extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    var users=0;
    var url = 'https://hidden-fortress-80148.herokuapp.com/provider_count';
    fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.text();
    })
    .then(function(data) {
      var object=JSON.parse(data); 
      users=users+object;
      
    })
    .catch(err => {
      console.log('Error!', err);
    })
    url = 'https://hidden-fortress-80148.herokuapp.com/user_count';
    fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.text();
    })
    .then(function(data) {
      var object=JSON.parse(data); 
      users=users+object;
      var user_count=document.getElementById('user');
      user_count.textContent=users;
      console.log(users);
      
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
          <strong class="number" id="city">0</strong>
          <span> Orașe și sate</span>
          </Col>
          <Col>
          <FaceIcon color="action" fontSize="large"/>
          <strong class="number" id="user">0</strong>
          <span> Utilizatori</span>
          </Col>
          <Col>
          <img class="image" src={Services} alt="Services" width="40" height="40" ></img>
          <strong class="number" id="service">0</strong>
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
