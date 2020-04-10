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
class Home extends Component {
   
    
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
          <h1 class="motto">Cel mai ușor mod de a găsi serviciul de care ai nevoie</h1>
          <Row>
          <Col>
          <LocationCityIcon color="action" fontSize="large"/>
          <strong class="number" data-number="46"> 100</strong>
          <span> Orașe și sate</span>
          </Col>
          <Col>
          <FaceIcon color="action" fontSize="large"/>
          <strong class="number" data-number="46"> 30</strong>
          <span> Utilizatori</span>
          </Col>
          <Col>
          <img class="image" src={Services} alt="Services" width="40" height="40" ></img>
          <strong class="number" data-number="46"> 20</strong>
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
