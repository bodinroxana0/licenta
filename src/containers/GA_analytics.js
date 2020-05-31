import React, { Component } from "react";
import ReactGA from 'react-ga';
const trackingId = "UA-167975679-1";


export const initGA = () => {       
  ReactGA.initialize(trackingId); // put your tracking id here
} 
export const GApageView = (page) => {   
  ReactGA.pageview(page);   
}
