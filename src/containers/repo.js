import React, { Component } from "react";
var VIEW_ID = '219697764';

class Repo extends Component {
    constructor(props) {
      super(props);    
    }
    
    componentDidMount(){
      window.gapi.auth2.init({
        client_id: "443094691967-2j7a99kuh7puj3dvb7m7f9i40j6lcjr3.apps.googleusercontent.com", //paste your client ID here
        scope: "https://www.googleapis.com/auth/analytics.readonly",
      });
       
  }
  render(){
    const queryReport = () => {//(1)
      window.gapi.client
        .request({
          path: "/v4/reports:batchGet",
          root: "https://analyticsreporting.googleapis.com/",
          method: "POST",
          body: {
            reportRequests: [
              {
                viewId: VIEW_ID, //enter your view ID here
                dateRanges: [
                  {
                    startDate: "10daysAgo",
                    endDate: "today",
                  },
                ],
                metrics: [
                  {
                    expression: "ga:users",
                  },
                ],
                dimensions: [
                  {
                    name: "ga:date",
                  },
                ],
              },
            ],
          },
        })
        .then(displayResults, console.error.bind(console));
    };
   const displayResults = (response) => {//(2)
      const queryResult = response.result.reports[0].data.rows;
      console.log(queryResult);
      const result = queryResult.map((row) => {
        const dateSting = row.dimensions[0];
        const formattedDate = `${dateSting.substring(0, 4)}
        -${dateSting.substring(4, 6)}-${dateSting.substring(6, 8)}`;
        return {
          date: formattedDate,
          visits: row.metrics[0].values[0],
        };
      });
    };
    return (
      <div>
        <button onClick={queryReport}>Click me</button>
      </div>
    );
  }
}
export default Repo;