import React, { useState, useEffect } from "react";
import { renderButton, checkSignedIn } from "./utils";
import Repo from './repo';
import ReactGA from 'react-ga';
const trackingId = "UA-167975679-1"; // Replace with your Google Analytics tracking ID
const ENDPOINT="https://comunitate.netlify.app"; //"https://localhost:3000";
var VIEW_ID = '219697764';

function Report() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const updateSignin = (signedIn) => { //(3)
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
    }
  };

  const init = () => { //(2)
    checkSignedIn()
      .then((signedIn) => {
        updateSignin(signedIn);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    window.gapi.load("auth2", init); //(1)
  });

  return (
    <div className="App">
      {!isSignedIn ? (
        <div id="signin-button"></div>
      ) : (
        <Repo />
      )}
    </div>
  );
}
export default Report;