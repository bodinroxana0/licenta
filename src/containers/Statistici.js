import React, { Component } from "react";
import ReactGA from 'react-ga';
const trackingId = "UA-167975679-1"; // Replace with your Google Analytics tracking ID
const ENDPOINT="https://comunitate.netlify.app"; //"https://localhost:3000";
class Statistici extends Component {
    constructor(props) {
      super(props);
      // ReactGA.set({
      //   userId: auth.currentUserId(),
      //   // any data that is relevant to the user session
      //   // that you would like to track with google analytics
      // })

      // ReactGA.event({
      //   category: "Sign Up",
      //   action: "User pressed the big blue sign up button",
      // });
    }
    componentDidMount() {
      //ReactGA.initialize(trackingId);
   }
    render() {
        return (
            <div>
              <p>Statistici</p>
            </div>
        );
    }
}
export default Statistici;