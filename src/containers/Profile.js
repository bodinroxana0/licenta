import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ChatIcon from '@material-ui/icons/Chat';
import default_img from '../images/user-avatar.png';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
const ENDPOINT="https://comunitate.netlify.app"; //"https://localhost:3000";

var username="";
var receiver="";
var no=0;
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}

function printProfile(obj) {
  var i = 0;
  username=obj[i].UserName;
  var image = document.getElementById("poza");
  var buf = Buffer.from(obj[i].Photo);
  var string = buf.toString();
  image.setAttribute("src", string);

  var name = document.getElementById("nume");
  name.innerHTML = obj[i].FirstName + " " + obj[i].LastName + "&nbsp;" + "&nbsp;";

  var location = document.getElementById("locatie");
  location.innerHTML = obj[i].City + ", " + obj[i].Region;

  //var table=document.getElementsByTagName("table")[0];
  //var cell2=table.rows[0].cells[1];

  var service = document.getElementById("H_6");
  service.innerHTML = obj[i].ServiceName + ", " + obj[i].ServiceDomain;
  service.style.color = "#33adff";

  var rating = document.getElementById("H_7");
  rating.innerHTML = "RATING";
  rating.style.color = "grey";
  rating.style.fontWeight = "lighter";
  rating.style.fontSize = "10px";

  var number = document.getElementById("rating");
  number.innerHTML = obj[i].Rating;
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
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };
  }
  confirmationWindow = (newRating) => {
      var centerpoint = document.getElementById("centerpoint");
      var dialog = document.getElementById("dialog");
      dialog.innerHTML = "Esti sigur ca vrei sa acorzi " + newRating + " stele?";
      var btn_da = document.createElement("BUTTON");
      btn_da.innerHTML='DA';
      var btn_nu = document.createElement("BUTTON");
      btn_nu.innerHTML='NU';
      btn_da.addEventListener("click", function(){
        this.setState({ rating: newRating });
        const {rating}=this.state;
        const user_rating={username,rating};
        
        axios
              .post('https://hidden-fortress-80148.herokuapp.com/rating', user_rating)
              .then((response) => {
                alert(response.data);
                
              })
              .catch(err => {
                console.error(err);
              }); 
        var centerpoint = document.getElementById("centerpoint");
        var dialog = document.getElementById("dialog");
        dialog.style.display = "none";
        centerpoint.style.display = "none";
        window.location.href = window.location.pathname + window.location.search + window.location.hash;
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
    var title=document.getElementsByClassName("text-primary")[0];
        title.innerHTML=user;
    fetch("https://hidden-fortress-80148.herokuapp.com/provider/" + firstName + "/" + lastName)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.text();
      })
      .then(function (data) {
        var object = JSON.parse(data);
        printProfile(object);
        no=object[0].Rating;
       
      })
      .catch(err => {
        console.log('Error!', err);
      })
      
      setTimeout(() => {   console.log(no);
        this.setState({rating:no}); }, 2000);
  }
  render() {
    return (
      <div class="background_profile">
        <br></br><br></br>
        <div class="profile">
          <Table>
            <tr>
              <td id="small">
                <img src={default_img} id="poza" width="250" height="200" ></img>
              </td>
              <td id="big">
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
                
                <label id="rating">0</label>
                <div id="centerpoint">
                  <div id="dialog"></div>
                </div>
                <br></br>
                <br></br>
                <div id="message">
                <ChatIcon color="action" fontSize="small"/>
                <Button size="lg" 
                onClick={function openChat(){
                  var sender=getUrlVars()["user"];
                  window.location.href = ENDPOINT+"/Chat/?Sender="+sender+"&Receiver="+username;
                }}
                >Trimite mesaj</Button>
                </div>
              </td>
            </tr>
            <tr>
              <td id="small">
                <label id="detalii"></label>
              </td>
              <td id="big">
                <Tabs defaultActiveKey="despre" id="tab">
                  <Tab eventKey="locatie" title="Locatie">
                  </Tab>
                  <Tab eventKey="despre" title="Despre">
                  </Tab>
                </Tabs>
              </td>
            </tr>
          </Table>
        </div>
      </div>
    );
  }
}
export default Profile;
