import React, { Component } from "react";
var VIEW_ID = '219697764';
function  displayResults(response) {
  console.log("aici");
  var formattedJson = JSON.stringify(response.result, null, 2);
  console.log(formattedJson);
  document.getElementById('query-output').value = formattedJson;
}
class Statistici extends Component {
    constructor(props) {
      super(props);    
    }
     // Query the API and print the results to the page.
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
    }).then(displayResults, console.error.bind(console));
  }

  
  render(){
    return (
        <body>
        <h1>Hello Analytics Reporting API V4</h1>

        <p class="g-signin2" data-onsuccess="queryReports"></p>

        <textarea cols="80" rows="20" id="query-output"></textarea>
        </body>
    );
  }
}
export default Statistici;