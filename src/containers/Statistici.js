import React, { Component } from "react";
import GoogleLogin from 'react-google-login';
var VIEW_ID = '219697764';

class Statistici extends Component {
  render(){
         // Query the API and print the results to the page.
  function queryReports() {
    window.gapi.client.request({
      path: '/v4/reports:batchGet',
      root: 'https://analyticsreporting.googleapis.com/',
      method: 'POST',
      body: {
        reportRequests: [
          {
            viewId: VIEW_ID,
            dateRanges: [
              {
                startDate: '7daysAgo',
                endDate: 'today'
              }
            ],
            metrics: [
              {
                expression: 'ga:users'
              }
            ]
          }
        ]
      }
    }).then(this.displayResults, console.error.bind(console));
    }
    const responseGoogleFailure = (error) => {
      console.error(error);
    };
    const displayResults = (response) => {
        console.log("aici");
        var formattedJson = JSON.stringify(response.result, null, 2);
        console.log(formattedJson);
        document.getElementById('query-output').value = formattedJson;
      }
    return (
        <body>
        <h1>Hello Analytics Reporting API V4</h1>

        <GoogleLogin
              clientId="443094691967-2j7a99kuh7puj3dvb7m7f9i40j6lcjr3.apps.googleusercontent.com"
              buttonText="Continuă cu GOOGLE"
              onSuccess={queryReports}
              onFailure={responseGoogleFailure}
            />

        <textarea cols="80" rows="20" id="query-output"></textarea>
        </body>
    );
  }
}
export default Statistici;