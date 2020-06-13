import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ReactStars from 'react-rating-stars-component';
import scriptLoader from 'react-async-script-loader';
import '../design/Provider.css';
const server='https://hidden-fortress-80148.herokuapp.com'; //"http://localhost:5000";
const ENDPOINT= "https://comunitate.netlify.app"; //"https://localhost:3000"; 
var map;
var lookup = [];
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}
function displayProfile(params) {
    var username = getUrlVars()["user"];
    console.log(username);
    var url = server+'/logged';
    fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.text();
    })
    .then(function(data) {
      if(data!="Null" && data!="none") 
      {
        window.location.href = ENDPOINT+"/Profile/"+params+"&user="+username;
      }
      else
        alert("Trebuie să vă logați ca să vedeți mai multe informații!");
    })
    .catch(err => {
      console.log('Error!', err);
    })
 
}
function geocodeLocation(address,title, callback) {
  //geocoding: din adresa-coordonate
  var geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == window.google.maps.GeocoderStatus.OK) {
      var res = results[0];
      callback(res,title);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
function showMap(object){
  if(object){
    for(var i=0;i<object.length;i++){
      var address=object[i].City+","+object[i].Region;
      var t=object[i].FirstName+" "+object[i].LastName;
    //geocoding: din adresa-coordonate
    geocodeLocation(address,t, (res,title) => {
      //console.log(res);
      var lat=res.geometry.location.lat();
      var lng=res.geometry.location.lng();
      //console.log(lat,lng);
      for (var i = 0; i < lookup.length; i++) {
        if (lookup[i][0] === lat && lookup[i][1] === lng)  {
          lat=lat-0.001;
          lng=lng-0.001;
        }
      }
      //console.log(lat,lng);
      lookup.push([lat,lng]);
      var latlng = new window.google.maps.LatLng(lat,lng);
      //map.setCenter(res.geometry.location);
      //place a marker at the location
      var marker = new window.google.maps.Marker({
        map: map,
        position: latlng,
        title: title
      });
    });
    }
     //pentru locatia curenta
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
    position => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);

      const marker = new window.google.maps.Marker({
        position: pos,
        map: map,
        title: 'eu',
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }
      });
    },
    () => {
      console.log('navigator disabled');
    }
  );
  }
  else {
  alert("Geolocation nu este suportat de acest browser.");
  }
}
}
//arata numarul de telefon doar daca esti logat, verifica sesiunea
function showPhone(username){
  fetch(server+'/phone/'+username)
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
              
              var cell0 = document.createElement("td");
              cell0.width="25%";
              row.appendChild(cell0);
              var cell = document.createElement("td");
              var div =document.createElement("div");

              var image = document.createElement("IMG");
              var buf=Buffer.from(obj[i].Photo);
              var string=buf.toString();
              image.setAttribute("src",string);
              image.setAttribute("width", "150");
              image.setAttribute("height", "150");
              image.setAttribute("alt", "provider "+i);
              cell.appendChild(image);
              cell.style.backgroundColor="white";
              cell.width="20%";
              row.appendChild(cell);

              var cell2 = document.createElement("td");
              var dv=document.createElement("DIV");
              var name = document.createElement("H3");
              var text = document.createTextNode(obj[i].FirstName+" "+obj[i].LastName);
              name.id="?FirstName="+obj[i].FirstName+"&LastName="+obj[i].LastName;
              name.addEventListener("click", function(){
                displayProfile(this.id);
              });
              name.addEventListener("mouseenter", function( event ) {   
                event.target.style.backgroundColor = " #f2f2f2";
                setTimeout(function() {
                  event.target.style.backgroundColor = "";
                }, 2000);
              }, false);      
              name.appendChild(text);
              dv.appendChild(name);

              var dv2=document.createElement("DIV");
              const opt={
                  count:5,
                  value:obj[i].Rating,
                  size:24,
                  half:true,
                  color2:'#ffd700'
              };
              
              var title=React.createElement(ReactStars, opt, "rating");
              ReactDOM.render(
                title,
                dv2
              );

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
              
              div.appendChild(dv);
              div.appendChild(dv2);
              div.appendChild(info);
              div.appendChild(info2);
              btn.appendChild(phone);
              div.appendChild(btn);
              cell2.width="30%";
              cell2.appendChild(div);
              cell2.style.backgroundColor="white";
              row.appendChild(cell2);

              var cell00 = document.createElement("td");
              cell00.width="25%";
              row.appendChild(cell00);
              x++;
          }
          var cell0=tbl.rows[0].cells[0];
          
          var div =document.createElement("div");
          var p0 = document.createElement("P");
          p0.innerHTML="Ordonare după: ";
          p0.style.fontWeight = "lighter";
          p0.style.textAlign="center";
          div.appendChild(p0);
          cell0.appendChild(div);

          var br1 = document.createElement("BR");
          cell0.appendChild(br1);
          
          var div1 =document.createElement("div");
          var rating = document.createElement("INPUT");
          rating.setAttribute("type", "checkbox");
          //////////////
          rating.addEventListener("click", function () {
            console.log("aici");
            fetch(server+'/provider_rating')
           .then(function(response) {
             if (response.status >= 400) {
                 throw new Error("Bad response from server");
             }
             return response.text();
           })
           .then(function(data) {
             var obj=JSON.parse(data);
             printProviders(obj,1);
           })
           .catch(err => {
             console.log('Error!', err);
           })
          }.bind(this));
          ///////////////////
          div1.appendChild(rating);
          var p = document.createElement("P");
          p.innerHTML="&nbsp;" + "&nbsp;"+"Rating";
          p.style.fontWeight = "lighter";
          div1.appendChild(p);
          cell0.appendChild(div1);

          var br2 = document.createElement("BR");
          cell0.appendChild(br2);
          
          var div2 =document.createElement("div");
          var location = document.createElement("INPUT");
          location.setAttribute("type", "checkbox");
          location.addEventListener("click", function () {
            var mp=document.getElementsByClassName("map")[0].style.display="block";
            showMap(obj);
          }.bind(this));
          div2.appendChild(location);
          var p2 = document.createElement("P");
          p2.innerHTML="&nbsp;" + "&nbsp;"+"Locație";
          p2.style.fontWeight = "lighter";
          div2.appendChild(p2);
          cell0.appendChild(div2);

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
           fetch(server+'/counties')
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
         fetch(server+'cities/'+this.state.region)
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
           fetch(server+'/domain')
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
          fetch(server+'/services/'+this.state.domain)
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
        if(event.target.id=="region"){
          this.setState({
              [event.target.id]: event.target.value
          });
          this.setState({
            city:""
         });
        console.log("am setat");
        }
        else if(event.target.id=="domain"){
          this.setState({
              [event.target.id]: event.target.value
          });
          this.setState({
            service:""
         });
        console.log("am setat2");
        }
        else{
          this.setState({
            [event.target.id]: event.target.value
        });
        }

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
            url=server+'/searchprovider/'+this.state.service+"/"+this.state.city;
            break;
          case 1:
            url=server+'/searchprovider1/'+this.state.domain;
            break;
          case 2:
            url=server+'/searchprovider2/'+this.state.service;
            break;
          case 3:
            url=server+'/searchprovider3/'+this.state.region;
            break;
          case 4:
            url=server+'/searchprovider4/'+this.state.city;
            break;
          case 5:
            url=server+'/searchprovider5/'+this.state.domain+"/"+this.state.region;
            break;
          case 6:
            url=server+'/searchprovider6/'+this.state.domain+"/"+this.state.city;
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
      
  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      // load finished
      if (isScriptLoadSucceed) {
        //intializare care se poate face si inainte sa vem adresa din baza de date
        var latlng = new window.google.maps.LatLng(-34.397, 150.644);
        var mapOptions = {
          zoom: 12,
          center: latlng
        }
        map = new window.google.maps.Map(this.refs.map, mapOptions);
      }
    }
  }
      componentDidMount() {
        var mp=document.getElementsByClassName("map")[0].style.display="none";
        var url = server+'/provider';
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
          </Form.Row>
          </Form>
         
        <div class="providers">
        <body>
        <div ref="map" className="map" style={{ height: '400px', width: '100%' }}></div>
        </body>
        </div>
        </div>
    );
    }
  }
  export default scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyA5kW2qzrdcllO1rSEoTr4NMzpxNYPbHZ0'])(Provider);
