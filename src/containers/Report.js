import React, { useState, useEffect } from "react";
import { renderButton, checkSignedIn } from "./utils";
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
        <div>Coming soon...</div>
      )}
    </div>
  );
}

export default Report;
// const Report = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     window.gapi.auth2.init({
//       client_id: "443094691967-2j7a99kuh7puj3dvb7m7f9i40j6lcjr3.apps.googleusercontent.com", //paste your client ID here
//       scope: "https://www.googleapis.com/auth/analytics.readonly",
//     });
//     const queryReport = () => {//(1)
//       window.gapi.client
//         .request({
//           path: "/v4/reports:batchGet",
//           root: "https://analyticsreporting.googleapis.com/",
//           method: "POST",
//           body: {
//             reportRequests: [
//               {
//                 viewId: VIEW_ID, //enter your view ID here
//                 dateRanges: [
//                   {
//                     startDate: "10daysAgo",
//                     endDate: "today",
//                   },
//                 ],
//                 metrics: [
//                   {
//                     expression: "ga:users",
//                   },
//                 ],
//                 dimensions: [
//                   {
//                     name: "ga:date",
//                   },
//                 ],
//               },
//             ],
//           },
//         })
//         .then(displayResults, console.error.bind(console));
//     };

//     const displayResults = (response) => {//(2)
//       const queryResult = response.result.reports[0].data.rows;
//       const result = queryResult.map((row) => {
//         const dateSting = row.dimensions[0];
//         const formattedDate = `${dateSting.substring(0, 4)}
//         -${dateSting.substring(4, 6)}-${dateSting.substring(6, 8)}`;
//         return {
//           date: formattedDate,
//           visits: row.metrics[0].values[0],
//         };
//       });
//       setData(result);
//     };

//     queryReport();
//   }, []);

//   return data.map((row) => (
//     <div key={row.date}>{`${row.date}: ${row.visits} visits`}</div>//(3)
//   ));
// };
  
// export default Report;