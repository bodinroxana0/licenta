///react
import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';
import ReactGA from 'react-ga';
////material-ui
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import ChatIcon from '@material-ui/icons/Chat';
import CakeIcon from '@material-ui/icons/Cake';
import default_img from '../images/user-avatar.png';
import ReactStars from 'react-rating-stars-component';
import scriptLoader from 'react-async-script-loader';
import Grid from '@material-ui/core/Grid';
//const & var
const trackingId = "UA-167975679-2";
const ENDPOINT = "https://comunitate.netlify.app"; //"https://localhost:3000"; 
const server = "https://hidden-fortress-80148.herokuapp.com";//"http://localhost:5000";//

var username = "";
var receiver = "";
var no = 0;
var map;

//functions
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}
function printProfile(obj, callback) {
  var i = 0;
  username = obj[i].UserName;
  var image = document.getElementById("poza");
  var buf = Buffer.from(obj[i].Photo);
  var string = buf.toString();
  image.setAttribute("src", string);

  var name = document.getElementById("nume");
  name.innerHTML = obj[i].FirstName + " " + obj[i].LastName + "&nbsp;" + "&nbsp;";

  var location = document.getElementById("locatie");
  location.innerHTML = obj[i].City + ", " + obj[i].Region;

  var service = document.getElementById("H_6");
  service.innerHTML = obj[i].ServiceName + ", " + obj[i].ServiceDomain;
  service.style.color = "#33adff";

  var rating = document.getElementById("H_7");
  rating.innerHTML = "RATING";
  rating.style.color = "grey";
  rating.style.fontWeight = "lighter";
  rating.style.fontSize = "10px";

  var email = document.getElementById("email");
  email.innerHTML = "&nbsp;" + "&nbsp;"+obj[i].Email;

  var phone = document.getElementById("phone");
  phone.innerHTML = "&nbsp;" + "&nbsp;"+obj[i].Phone;

  var birthday = document.getElementById("birthday");
  var SendingTime=obj[i].BirthDate.split("T");
  var SendingDay=SendingTime[0];
  birthday.innerHTML = "&nbsp;" + "&nbsp;"+SendingDay;
  //var number = document.getElementById("rating");
  //number.innerHTML = obj[i].Rating;
  this.setState({ rating: obj[i].Rating });
  console.log(this.state.rating);
  var address = obj[i].HouseNumber + "," + obj[i].Street + "," + obj[i].City + "," + obj[i].Region;
  callback(address, obj[i].Rating);
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
function geocodeLocation(address, callback) {
  //geocoding: din adresa-coordonate
  var geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == window.google.maps.GeocoderStatus.OK) {
      var res = results[0];
      callback(res);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: ""
    };
    printProfile = printProfile.bind(this);
  }
  confirmationWindow = (newRating) => {
    var centerpoint = document.getElementById("centerpoint");
    var dialog = document.getElementById("dialog");
    dialog.innerHTML = "Esti sigur ca vrei sa acorzi " + newRating + " stele?";
    var btn_da = document.createElement("BUTTON");
    btn_da.innerHTML = 'DA';
    var btn_nu = document.createElement("BUTTON");
    btn_nu.innerHTML = 'NU';
    btn_da.addEventListener("click", function () {
      this.setState({ rating: newRating });
      const { rating } = this.state;
      const user_rating = { username, rating };
      console.log(user_rating);
      axios
        .post(server + '/rating', user_rating)
        .then((response) => {
          alert(response.data);
          window.location.href = window.location.pathname + window.location.search + window.location.hash;
        })
        .catch(err => {
          console.error(err);
        });
      var centerpoint = document.getElementById("centerpoint");
      var dialog = document.getElementById("dialog");
      dialog.style.display = "none";
      centerpoint.style.display = "none";

    }.bind(this));
    btn_nu.addEventListener("click", function () {
      var dialog = document.getElementById("dialog");
      dialog.style.display = "none";
      centerpoint.style.display = "none";
    });
    dialog.appendChild(btn_da);
    dialog.appendChild(btn_nu);
    dialog.style.display = "block";
    centerpoint.style.display = "block";
  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      // load finished
      if (isScriptLoadSucceed) {
        //intializare care se poate face si inainte sa vem adresa din baza de date
        var latlng = new window.google.maps.LatLng(-34.397, 150.644);
        var mapOptions = {
          zoom: 15,
          center: latlng
        }
        map = new window.google.maps.Map(this.refs.map, mapOptions);
      }
    }
  }
  //pentru locatia curenta-vezi cand faci filtrare dupa nr km

  // navigator.geolocation.getCurrentPosition(
  //   position => {
  //     const pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };

  //     this.map.setCenter(pos);

  //     const marker = new window.google.maps.Marker({
  //       position: pos,
  //       map: this.map,
  //       title: 'Hello World!'
  //     });
  //   },
  //   () => {
  //     console.log('navigator disabled');
  //   }
  // );
  componentDidMount() {
    ///navbar
    var user = document.getElementsByClassName("collasible-nav-dropdown")[0];
    var connect = document.getElementsByClassName("signup")[0];
    var login = document.getElementsByClassName("login")[0];
    user.style.display = "block";
    connect.style.display = "none";
    login.style.display = "none";
    ////confirmation box
    var centerpoint = document.getElementById("centerpoint");
    var dialog = document.getElementById("dialog");
    dialog.style.display = "none";
    centerpoint.style.display = "none";
    //take param name from url
    var url = window.location.href;
    var firstName = getUrlVars()["FirstName"];
    var lastName = getUrlVars()["LastName"];
    var user = getUrlVars()["user"];
    var title = document.getElementsByClassName("text-primary")[0];
    title.innerHTML = user;

    ReactGA.initialize(trackingId);
    ReactGA.event({
      category: 'Vizualizari',
      action: firstName + " " + lastName
    });
    fetch(server + "/provider/" + firstName + "/" + lastName)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.text();
      })
      .then(function (data) {
        var object = JSON.parse(data);
        printProfile(object, function (address, rating) {
          //geocoding: din adresa-coordonate
          geocodeLocation(address, res => {
            console.log(res);
            map.setCenter(res.geometry.location);
            //place a marker at the location
            var marker = new window.google.maps.Marker({
              map: map,
              position: res.geometry.location
            });
          });
        });

      })
      .catch(err => {
        console.log('Error!', err);
      })
  }
  render() {
    return (
      <div class="background_profile">
        <br></br><br></br>
        <div class="profile">
        <Grid container spacing={1} direction="row"
  justify="flex-start"
  alignItems="center">
          <Grid item xs={4}>
              <img src={default_img} id="poza" width="250" height="200" ></img>
          </Grid>
          <Grid item xs={4}>    
                <label id="nume"></label>
                <LocationOnIcon color="action" fontSize="small" />
                <label id="locatie"></label>
                <h6 id="H_6"></h6>
                <br></br>
                <h7 id="H_7"></h7>
                <ReactStars
                      count={5}
                      value={this.state.rating}
                      onChange={this.confirmationWindow}
                      size={24}
                      half={true}
                      emptyIcon={<i className='far fa-star'></i>}
                      halfIcon={<i className='fa fa-star-half-alt'></i>}
                      fullIcon={<i className='fa fa-star'></i>}
                      color2={'#ffd700'}
                    />
                <br></br>
                <div id="message">
                      <ChatIcon color="action" fontSize="small" />
                      <Button size="lg"
                        onClick={function openChat() {
                          var sender = getUrlVars()["user"];
                          window.location.href = ENDPOINT + "/Chat/?Sender=" + sender + "&Receiver=" + username;
                        }}
                      >Trimite mesaj</Button>
                </div>
          </Grid>
        </Grid>
        <br></br><br></br>
        <Grid container container spacing={1} direction="row"
  justify="flex-start"
  alignItems="center">
          <Grid item xs={12}>
                <Tabs defaultActiveKey="locatie" id="tab">
                  <Tab eventKey="locatie" title="Locatie">
                    <div ref="map" style={{ height: '300px', width: '500px' }}></div>
                    {!map && <div className="center-md">Loading...</div>}
                  </Tab>
                  <Tab eventKey="despre" title="Despre">
                    <div id="despre">
                      <br></br>
                      <EmailIcon color="action" fontSize="small"/><label id="email"></label>
                      <br></br>
                      <PhoneIcon color="action" fontSize="small"/><label id="phone"></label>
                      <br></br>
                      <CakeIcon color="action" fontSize="small"/><label id="birthday"></label>
                    </div>
                  </Tab>
                </Tabs>
            </Grid>
        </Grid>
        
        <div id="centerpoint">
        <div id="dialog"></div>
      </div>
        </div>
      </div>
    );
  }
}
export default scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyA5kW2qzrdcllO1rSEoTr4NMzpxNYPbHZ0'])(Profile);