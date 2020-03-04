import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure'
import Container from 'react-bootstrap/Container';
import pers1 from '../images/person_1.jpg';
import '../design/Provider.css';
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
    
      }
      componentDidMount() {
        var url = 'http://127.0.0.1:3000/providers';
        fetch(url)
        .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.text();
        })
        .then(function(data) {
          var obj=JSON.parse(data); 
          var body = document.getElementsByTagName("body")[0];
          var tbl = document.createElement("table");
          var tblBody = document.createElement("tbody");
          for (var i = 0; i < obj.length; i++) {
              var row = document.createElement("tr");
              var cell = document.createElement("td");
              var div =document.createElement("div");

              var image = document.createElement("IMG");
              console.log(obj[i].Photo);
              var buf=Buffer.from(obj[i].Photo);
              console.log(buf);
              var string=buf.toString();
              console.log(string);
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
              var text = document.createTextNode(obj[i].services_Id);
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
              
            tblBody.appendChild(row);
          }
          tbl.appendChild(tblBody);
          tbl.style.width = "600px";
          tbl.align = "center";
          body.style.backgroundColor="#f2f2f2";
          body.appendChild(tbl);
        })
        .catch(err => {
          console.log('Error!', err);
        })
      }   
    render(){
      return (
      <body>
      </body>
    );
    }
  }
 export default Provider;
