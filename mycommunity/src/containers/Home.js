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
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadCounties = this.loadCounties.bind(this);
        this.loadCities=this.loadCities.bind(this);
        this.loadDomain=this.loadDomain.bind(this);
        this.loadServices=this.loadServices.bind(this);

        this.state = {
          city:"",
          region:"",
          domain:"",
          service:"",
          load:false,
          load2:false
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
             var option = document.createElement("option");
             option.text = 'Choose a region ...';
             x.add(option);
             x.options[0].disabled = true;
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
             var option = document.createElement("option");
             option.text = 'Choose a service domain ...';
             x.add(option);
             x.options[0].disabled = true;
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
      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
      handleSubmit (event) {
        event.preventDefault();
      
        // axios
        //   .post('http://127.0.0.1:3000/SignUpProvider', user)
        //   .then((response) => {
        //     console.log(response);
        //   })
        //   .catch(err => {
        //     console.error(err);
        //   });
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
          <h1 class="motto">The easiest way to find the service you need</h1>
          <Row>
          <Col>
          <LocationCityIcon color="action" fontSize="large"/>
          <strong class="number" data-number="46"> 100</strong>
          <span> Cities and Villages</span>
          </Col>
          <Col>
          <FaceIcon color="action" fontSize="large"/>
          <strong class="number" data-number="46"> 30</strong>
          <span> Users</span>
          </Col>
          <Col>
          <img class="image" src={Services} alt="Services" width="40" height="40" ></img>
          <strong class="number" data-number="46"> 20</strong>
          <span> Services</span>
          </Col>
          </Row>
        </Carousel.Caption>
      </Carousel.Item>
      </Carousel>
      <div class="background">
      <br></br><br></br>
      <Form onSubmit={this.handleSubmit}>
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
              <Form.Group as={Col} controlId="search" bssize="large">
              <Button
                block
                type="submit"
              >
              Search
              </Button>
              </Form.Group>
        </Form.Row>
        </Form>
       
        <div class="providers">
        <Provider></Provider> 
        </div>
        </div>
      </div>
        );
      }
    }
 export default Home;
