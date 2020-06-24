import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ChatIcon from '@material-ui/icons/Chat';
import default_img from '../images/user-avatar.png';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import emailjs from 'emailjs-com';
import ReactGA from 'react-ga';
const trackingID = "UA-167975679-3"; 
const ENDPOINT="https://hidden-fortress-80148.herokuapp.com";
const socket = socketIOClient("https://vast-atoll-37075.herokuapp.com");

var service_id = "default_service";
var template_id = "template_el0ysHEX";
var user_id="user_sxHPqH9UT7VA9DSVYCuDy";
var username = "";
var no = 0;
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}
function sendEmail(email,mess,user){
  var template_params = {
    "email": email,
    "user": user,
    "to_name": email,
    "from_name": user,
    "message_html": mess
  }
  emailjs.send(service_id,template_id, template_params, user_id)
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
    }, (err) => {
       console.log('FAILED...', err);
    });

}
function message(user,mess,SendingTime){
  console.log(SendingTime);
  var sender = getUrlVars()["Sender"];
  var body = document.getElementsByClassName("box")[0];
  console.log(body.className);
  //clock time
  var div = document.createElement("DIV");
  var info = document.createElement("P");
  var SendingT=SendingTime.split(" ");
  var text = document.createTextNode(SendingT[1]);
  console.log(SendingT[1]);
  info.appendChild(text);
  info.style.fontSize="small";
  info.style.fontWeight="lighter";
  div.appendChild(info);
  //message
  var div2 = document.createElement("DIV");
  var info2 = document.createElement("P");
  var text2 = document.createTextNode(mess);
  info2.appendChild(text2);
  info2.style.fontSize="large";
  if(user==sender)
  {
    div.style.textAlign= "left";
    div2.style.textAlign="right";
    info2.style.backgroundColor="#99e6ff";
  }
  else
  {
    div.style.textAlign="right";
    div2.style.textAlign="left";
    info2.style.backgroundColor="#D3D3D3";
  }
  //div2.style.paddingBottom="100px";
  div2.appendChild(info2);
  body.appendChild(div);
  body.appendChild(div2);
  
  var br2 = document.createElement("br");
  body.appendChild(br2);
}

function printChat(obj) {
  
  console.log("am intrat");
  var sender = getUrlVars()["Sender"];
  var receiver = getUrlVars()["Receiver"];
  console.log(obj);
  obj.sort((a, b) => (a.SendingTime > b.SendingTime) ? 1 : -1);
  var body = document.getElementsByClassName("box")[0];
  console.log(body.className);
  var day="0";
  //for one message
  for (var i = 0; i < obj.length; i++) {
    //clock time
    var div = document.createElement("DIV");
    var info = document.createElement("P");
    var SendingTime=obj[i].SendingTime.split("T");
    var SendingDay=SendingTime[0];
    var Time=SendingTime[1].split(".");
    var text = document.createTextNode(Time[0]);
    info.appendChild(text);
    info.style.fontSize="small";
    info.style.fontWeight="lighter";
    div.appendChild(info);
    if(day.localeCompare(SendingDay)!=0)
    {//day time
      var div1 = document.createElement("DIV");
      var info1 = document.createElement("P");
      var text1 = document.createTextNode(SendingDay);
      info1.appendChild(text1);
      div1.style.textAlign="center";
      info1.style.fontSize="small";
      info1.style.fontWeight="lighter";
      div1.appendChild(info1);
      body.appendChild(div1);
    }
    day=SendingDay;
    //message
    var div2 = document.createElement("DIV");
    var info2 = document.createElement("P");
    var text2 = document.createTextNode(obj[i].Message);
    info2.appendChild(text2);
    info2.style.fontSize="large";
    div2.appendChild(info2);
    if(obj[i].Sender==sender)
    {
      div.id = "left";
      div2.id="right";
      info2.style.backgroundColor="#99e6ff";
    }
    else
    {
      div.id="right";
      div2.id="left";
      info2.style.backgroundColor="#D3D3D3";
    }
     if(i==obj.length-1)
    {
       div2.style.paddingBottom="100px";
    }
    
   
    var br = document.createElement("br");
    body.appendChild(br);
    body.appendChild(div);
    body.appendChild(div2);
    var br2 = document.createElement("br");
    body.appendChild(br2);
  }

    body.style.backgroundColor="#f2f2f2";
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
class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      message: ""
    };
    socket.on('message', function (data) {
      if(data.text && data.sendingtime) {
        message(data.user,data.text,data.sendingtime);
        sendEmail(data.email,data.text,data.user);
      } else {
          console.log("There is a problem:", data);
      }
    });
    
  }
  fireEvent(){
    ReactGA.event({
      category: 'Chat',
      action: 'Un utilizator a trimis un mesaj!'
    });
  }
  componentDidMount() {
    ReactGA.initialize(trackingID);
    var Sender = getUrlVars()["Sender"];
    var Receiver = getUrlVars()["Receiver"];
    var email=getUrlVars()["Email"];
    console.log(Sender,Receiver,email);
    var n = Sender.localeCompare(Receiver);
    if(n<0)
    {
      var room=Receiver+"_"+Sender;
      console.log(room);
    }
    else if(n>0)
    {
      var room=Sender+"_"+Receiver;
      console.log(room); 
    }
    var name=Sender;
    socket.emit('join', {name,room,email}, ()=>{
    });
    
    fetch(ENDPOINT+"/chat/" + Sender + "/" + Receiver)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.text();
      })
      .then(function (data) {
        var object1 = JSON.parse(data);
        try{
        console.log(object1);
        printChat(object1);
        }
        catch{
          console.log("nu s-a incarcat");
        }
      })
      .catch(err => {
        console.log('Error!', err);
      })
    ///navbar
    var user = document.getElementsByClassName("collasible-nav-dropdown")[0];
    var connect = document.getElementsByClassName("signup")[0];
    var login = document.getElementsByClassName("login")[0];
    user.style.display = "block";
    connect.style.display = "none";
    login.style.display = "none";
    //take param name from url
    var url = window.location.href;
    var title = document.getElementsByClassName("text-primary")[0];
    title.innerHTML = Sender;
  }
 
  handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    var Message=this.state.message;
    var currentdate = new Date(); 
    var SendingTime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    var Sender = getUrlVars()["Sender"];
    var Receiver = getUrlVars()["Receiver"];
    const postChat = { SendingTime,Sender,Receiver,Message};
    console.log(postChat);
    if(Message)
    {
      socket.emit('sendmessage', Message,SendingTime, ()=>{
        this.setState({message:""});
        console.log("after:"+this.state.message);
      });
    }
    axios
      .post(ENDPOINT+'/post_chat', postChat)
      .then((response) => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
      this.fireEvent();
    //   window.location.href = window.location.pathname + window.location.search + window.location.hash;
  }
  validateForm() {
    return this.state.message.length>0;
  }
  render() {
    return (
      
      <div className="chat">
        <div className="box"></div>
        <div className="messagebox">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="message">
            <Form.Control
              as="textarea"
              value={this.state.message}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            block
            type="submit"
            disabled={!this.validateForm()}
            size="lg"
          >
            Trimite
          </Button>
        </Form>
      </div>
      </div>
    );
  }
}
export default Chat;
