import React, { Component } from "react";
import GoogleLogin from 'react-google-login';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CanvasJSReact from '../canvasjs/canvasjs.react';
import $ from 'jquery';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var VIEW_ID = '219697764';
var event_category=[];
var event_action=[];
var event_count=[];

class Statistici extends Component {
  constructor(props) {
    super(props);
    this.queryReports = this.queryReports.bind(this);
    this.state={
      options:""
    }
  }
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
            dimensions: [
              {
                name:"ga:eventCategory"
              },
              {
                name:"ga:eventAction"
              }
            ],
            metrics: [
              {
                expression:"ga:totalEvents",
                formattingType:"INTEGER"
             }
            ]
          }
        ]
      }
    }).then(function(response){
      console.log(response);
      var formattedJson=response.result.reports[0].data.rows;
      var count=0;
      for(var i=0;i<formattedJson.length;i++)
      {
        event_category.push(formattedJson[i].dimensions[0]);
        event_action.push(formattedJson[i].dimensions[1]);
        event_count.push(formattedJson[i].metrics[0].values); 
        count=parseInt(count)+parseInt(formattedJson[i].metrics[0].values);
      // document.getElementById('query-output').value += event_category[i]+"-"+event_action[i]+"-"+event_count[i]+"\n";
      }
     console.log(event_category,event_action,event_count);
      console.log(count);
     var opt={
      animationEnabled: true,
      exportEnabled: true,
      theme: "dark2", // "light1", "dark1", "dark2"
      title:{
        text: "Evenimente"
      },
      data: [{
        type: "pie",
        indexLabel: "{label}: {y}%",		
        startAngle: -90,
        dataPoints: [
        ]
      }]};
      for(var i=0;i<event_category.length;i++)
      {
        if(event_category[i]=="Conectare")
          opt.data[0].dataPoints.push({ y: event_count[i]*100/count,label:event_action[i]});
      }
      this.setState((state, props) => ({
        options:opt
      }));
  }.bind(this));
  
}

  render(){
    const responseGoogleFailure = (error) => {
      console.error(error);
    };
    
    return (
      <body>
        <h1>Rapoarte Google Analytics</h1>
        <GoogleLogin
              clientId="443094691967-2j7a99kuh7puj3dvb7m7f9i40j6lcjr3.apps.googleusercontent.com"
              buttonText="Continuă cu GOOGLE"
              onSuccess={this.queryReports}
              onFailure={responseGoogleFailure}
            />
         <CanvasJSChart options={this.state.options} ></CanvasJSChart>
          </body>
    );
  }
}
//<textarea cols="80" rows="20" id="query-output"></textarea>
export default Statistici;