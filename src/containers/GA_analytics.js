import React, { Component } from "react";
import ReactGA from 'react-ga';
const trackingId = "UA-167975679-1";

export default function GA_analytics(){

  const initGA = () => { 
    console.log("/");      
    ReactGA.initialize(trackingId); // put your tracking id here
  } 
  const GApageView = (page) => {   
    ReactGA.pageview(page);   
  }
}

