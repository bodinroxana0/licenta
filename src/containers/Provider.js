import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure'
import Container from 'react-bootstrap/Container';
import pers1 from '../images/person_1.jpg';
import Spinner from 'react-bootstrap/Spinner';
import '../design/Provider.css';

function displayProfile(params) {
  window.location.href = "https://comunitate.netlify.app/Profile/"+params;
}
//arata numarul de telefon doar daca esti logat, verifica sesiunea
function showPhone(username){
  fetch('https://hidden-fortress-80148.herokuapp.com/phone/'+username)
  .then(function(response) {
    if (response.status >= 400) {
        throw new Error("Bad response from server");
    }
    return response.text();
  })
  .then(function(data) {
    if(data!='Null')
    {
      var object=JSON.parse(data);
      var btn = document.getElementsByTagName("BUTTON")[username];
      console.log(btn.name);
      btn.innerHTML=object[0].Phone; //seteaza numarul de telefon
    }
    else
      alert("Trebuie să vă înregistrați pentru a vedea numărul de telefon!");
  })
  .catch(err => {
    console.log('Error!', err);
  })
}


function printProviders(obj,nr){
  var x=0;
  var body = document.getElementsByTagName("body")[0];

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
              cell.appendChild(image);
              cell.style.backgroundColor="white";
              row.appendChild(cell);

              var cell2 = document.createElement("td");
              var name = document.createElement("H3");
              var text = document.createTextNode(obj[i].FirstName+" "+obj[i].LastName);
              name.id="?FirstName="+obj[i].FirstName+"&LastName="+obj[i].LastName;
              name.addEventListener("click", function(){
                displayProfile(this.id);
              });
              name.addEventListener("mouseenter", function( event ) {   
                // highlight the mouseenter target
                event.target.style.backgroundColor = " #f2f2f2";
                 // reset the color after a short delay
                setTimeout(function() {
                  event.target.style.backgroundColor = "";
                }, 2000);
              }, false);      
              name.appendChild(text);

              var info = document.createElement("H5");
              var text = document.createTextNode(obj[i].City+", "+obj[i].Region);
              info.appendChild(text);
              
              var info2 = document.createElement("H5");
              var text = document.createTextNode(obj[i].ServiceDomain+", "+obj[i].ServiceName); 
              info2.appendChild(text);

              var btn = document.createElement("BUTTON");
              btn.name=obj[i].UserName;
              btn.addEventListener("click", function(){
                showPhone(this.name);
              });
              var phone = document.createTextNode('07xxxxxxxx');
              
              div.appendChild(name);
              div.appendChild(info);
              div.appendChild(info2);
              btn.appendChild(phone);
              div.appendChild(btn);
              //div.style.cssFloat = "right";
              cell2.appendChild(div);
              cell2.style.backgroundColor="white";
              row.appendChild(cell2);
              x++;
          }
          
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
              var option = document.createElement("option");
              option.text = 'Alege un oras ...';
              select.add(option);
              select.options[0].disabled = true;
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
             var unique=[0];
             var option = document.createElement("option");
             option.text = 'Alege un domeniu ...';
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
              var sel = document.getElementById("service");
              var length = sel.options.length;
              for (let i = length-1; i >= 0; i--) {
                sel.options[i] = null;
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
                var sel = document.getElementById("service");
                var option = document.createElement("option");
                option.text = 'Alege un serviciu ...';
                sel.add(option);
                sel.options[0].disabled = true;
                for (let i = 0; i < obj.length; i++) {
                  var option = document.createElement("option");
                  option.text = obj[i].ServiceName;
                  sel.add(option);
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
        var choose=0;
        var url;
        if(this.state.domain && this.state.service && this.state.region && this.state.city)
        {
          choose=0; //filtru pe toate-serviciu +oras , care e cel mai explicit
        }
        else if(this.state.domain && this.state.city)
        {
          choose=6;// filtru pe domeniu si oras, putin probabil
        }
        else if(this.state.domain && this.state.region)
        {
          choose=5;// filtru pe domeniu si judet, putin probabil
        }
        else if((this.state.domain && this.state.service )|| this.state.service)
        {
          choose=2; //filtru pe serviciu
        }
        else if(this.state.domain)
        {
          choose=1; //filtru doar pe domeniu
        }
        else if((this.state.region && this.state.city) || this.state.city)
        {
          choose=4; //filtru pe oras
        }
        else if(this.state.region)
        {
          choose=3; //filtru doar pe judet
        }
        
        else 
        {
          alert("Trebuie să selectezi măcar unul din câmpuri pentru a filtra rezultatele!");
        }
        switch(choose) {
          case 0:
            url='https://hidden-fortress-80148.herokuapp.com/searchprovider/'+this.state.service+"/"+this.state.city;
            break;
          case 1:
            url='https://hidden-fortress-80148.herokuapp.com/searchprovider1/'+this.state.domain;
            break;
          case 2:
            url='https://hidden-fortress-80148.herokuapp.com/searchprovider2/'+this.state.service;
            break;
          case 3:
            url='https://hidden-fortress-80148.herokuapp.com/searchprovider3/'+this.state.region;
            break;
          case 4:
            url='https://hidden-fortress-80148.herokuapp.com/searchprovider4/'+this.state.city;
            break;
          case 5:
            url='https://hidden-fortress-80148.herokuapp.com/searchprovider5/'+this.state.domain+"/"+this.state.region;
            break;
          case 6:
            url='https://hidden-fortress-80148.herokuapp.com/searchprovider6/'+this.state.domain+"/"+this.state.city;
            break;
          default:
            // code block
        }
        
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
        var url = 'https://hidden-fortress-80148.herokuapp.com/provider';
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
                    >
                 </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="service">
                <Form.Control as="select" 
                    onLoad={this.loadServices()}
                    value={this.state.service}
                    onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="region">
                <Form.Control as="select"
                    onLoad={this.loadCounties()}
                    value={this.state.region}
                    onChange={this.handleChange}
                    >
                 </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="city">
                <Form.Control as="select" 
                    onLoad={this.loadCities()}
                    value={this.state.city}
                    onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="search" >
                <Button
                  block
                  type="submit"
                >
                Caută
                </Button>
                </Form.Group>
                <div id="center">
                    <Spinner id="spinner" animation="border" variant="secondary" />
                </div>
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
