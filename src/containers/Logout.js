import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
class Logout extends Component {
    constructor(props) {
      super(props);
      fetch('https://hidden-fortress-80148.herokuapp.com/logout')
        .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.text();
        })
        .then(function(data) {
          alert('V-ati deconectat cu succes!');
          if(data=="ok")
          {
            window.location.href = "https://comunitate.netlify.app";
          }
        })
        .catch(err => {
          console.log('Error!', err);
        })
    }
    render() {
        return (
            <div></div>
        );
    }
}
export default Logout;