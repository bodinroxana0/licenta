import React, { Component } from "react";
import GoogleLogin from 'react-google-login';
var VIEW_ID = '219697764';
var METRIC='ga:totalEvents';//users//ga:pagePath

class Statistici extends Component {
  queryReports() {
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
    }).then(function(response){
      console.log(response);
      
      //var formattedJson = JSON.stringify(response.result.reports[0].data.rows[0].metrics[0], null, 2);
      
      document.getElementById('query-output').value = response.result.reports[0].data.totals.values;
}); 
    }
  render(){
    const responseGoogleFailure = (error) => {
      console.error(error);
    };
    return (
        <body>
        <h1>Hello Analytics Reporting API V4</h1>
        <GoogleLogin
              clientId="443094691967-2j7a99kuh7puj3dvb7m7f9i40j6lcjr3.apps.googleusercontent.com"
              buttonText="Continuă cu GOOGLE"
              onSuccess={this.queryReports()}
              onFailure={responseGoogleFailure}
            />

        <textarea cols="80" rows="20" id="query-output"></textarea>
        </body>
    );
  }
}
export default Statistici;