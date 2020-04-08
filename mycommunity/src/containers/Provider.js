import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure'
import Container from 'react-bootstrap/Container';
import pers1 from '../images/person_1.jpg';
import '../design/Provider.css';

function clearInner(node) {
  while (node.hasChildNodes()) {
    clear(node.firstChild);
  }
}

function clear(node) {
  while (node.hasChildNodes()) {
    clear(node.firstChild);
  }
  node.parentNode.removeChild(node);
  console.log(node, "cleared!");
}

function printProviders(obj,nr){
  var x=0;
  var body = document.getElementsByTagName("body")[0];
  /*var tr=document.getElementsByTagName("tr");
  console.log(tr.length)
  for(var i=0;i<tr.length;i++){
  document.getElementsByTagName("table")[0].deleteRow(i);
  }*/
  
  if(nr==0){
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
  }
  else if (nr==1){
    var tbl = document.getElementsByTagName("table")[0];
    console.log(tbl.rows);
    var new_tbl = document.createElement("table");
    tbl.parentElement.replaceChild(new_tbl,tbl);
    var tbl = document.getElementsByTagName("table")[0];
    console.log(tbl.rows);
    var tblBody = document.createElement("tbody");
  }
  for (var i = 0; i < obj.length; i++) {
              //var row = document.createElement("tr");
              var row = tbl.insertRow(x);
              var cell = document.createElement("td");
              var div =document.createElement("div");

              var image = document.createElement("IMG");
              var buf=Buffer.from(obj[i].Photo);
              var string=buf.toString();
              image.setAttribute("src",string);
              image.setAttribute("width", "150");
              image.setAttribute("height", "130");
              image.setAttribute("alt", "provider "+i);
              
              var name = document.createElement("H3");
              var text = document.createTextNode(obj[i].FirstName+" "+obj[i].LastName);
              name.appendChild(text); 

              var info = document.createElement("H5");
              var text = document.createTextNode(obj[i].City+", "+obj[i].Region);
              info.appendChild(text);
              
              var info2 = document.createElement("H5");
              var text = document.createTextNode(obj[i].ServiceDomain+", "+obj[i].ServiceName); 
              info2.appendChild(text);

              var btn = document.createElement("BUTTON"); 
              var phone = document.createTextNode(obj[i].Phone);
              
              cell.appendChild(image);
              div.appendChild(name);
              div.appendChild(info);
              div.appendChild(info2);
              btn.appendChild(phone);
              div.appendChild(btn);
              div.style.cssFloat = "right";
              cell.appendChild(div);
              cell.style.backgroundColor="white";
              row.appendChild(cell);
              x++;
            //tblBody.appendChild(row);
          }
          
          //tbl.appendChild(tblBody);
          tbl.style.width = "600px";
          tbl.align = "center";
          body.style.backgroundColor="#f2f2f2";
          body.appendChild(tbl);
}

function bufferFromBufferString(bufferStr) {
  return Buffer.from(
      bufferStr
          .replace(/[<>]/g, '') // remove < > symbols from str
          .split(' ') // create an array splitting it by space
          .slice(1) // remove Buffer word from an array
          .reduce((acc, val) => 
              acc.concat(parseInt(val, 16)), [])  // convert all strings of numbers to hex numbers
   )
}
class Provider extends Component {
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
        var url='http://127.0.0.1:3000/searchprovider/'+this.state.service+"/"+this.state.city;
        console.log(url);
        fetch(url)
        .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.text();
        })
        .then(function(data) {
          var object=JSON.parse(data);
          console.log(object);
          printProviders(object,1);
        })
        .catch(err => {
          console.log('Error!', err);
        })
      }
      componentDidMount() {
        var url = 'http://127.0.0.1:3000/provider';
        fetch(url)
        .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.text();
        })
        .then(function(data) {
          var object=JSON.parse(data); 
          console.log(object);
          printProviders(object,0);
          
        })
        .catch(err => {
          console.log('Error!', err);
        })
      }   
    render(){
      return (
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
        <body>
        </body>
        </div>
        </div>
    );
    }
  }
 export default Provider;
