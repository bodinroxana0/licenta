import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure'
import Container from 'react-bootstrap/Container';
import pers1 from '../images/person_1.jpg';
import '../design/Provider.css';
class Provider extends Component {
    constructor(props) {
        super(props);
      

        this.state = {
          city:"",
          region:"",
          domain:"",
          service:"",
          load:false,
          load2:false
        };
      }
      
  
    render(){
    return (
        <Container>
        <Row>
		<Col>
        <div class="pers">
        <Figure>
        <Figure.Image
            width={80}
            height={80}
            alt="171x180"
            src={pers1}
            roundedCircle
        />
        <span class="location mb-0">Western City, UK</span>
		    <h2>Danica Lewis</h2>
			<span class="position">Graduate</span>
			<p class="mb-2">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>                
        </Figure>
        </div>
        </Col>
        </Row>
        </Container>
        );
      }
    }
 export default Provider;
