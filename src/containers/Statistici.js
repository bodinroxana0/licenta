import React, { Component } from "react";
import GoogleLogin from 'react-google-login';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CanvasJSReact from '../canvasjs/canvasjs.react';
import $ from 'jquery';
import ChartViews from './ChartViews';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var VIEW_ID = '219697764';
var event_category=[];
var event_action=[];
var event_count=[];
var page_name=[];
var page_views=[];
var view_count=0;


class Statistici extends Component {
  constructor(props) {
    super(props);
    this.queryReports = this.queryReports.bind(this);
    this.state={
      options:"",
      options2:""
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
        event_count.push(formattedJson[i].metrics[0].values[0]); 
        count=parseInt(count)+parseInt(formattedJson[i].metrics[0].values[0]);
       
       }
      console.log(count);
     var opt={
      animationEnabled: true,
      exportEnabled: true,
      theme: "dark2", // "light1", "dark1", "dark2"
      title:{
        text: "Evenimente Conectare"
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
        {
          opt.data[0].dataPoints.push({ y: Math.round(event_count[i]*100/count),label:event_action[i]});
        }
        else if(event_category[i]=="Vizualizari")
        {
          page_name.push(event_action[i]);
          page_views.push(event_count[i]);
          view_count=parseInt(view_count)+parseInt(event_count[i]);
        }
      }
      var opt2 = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", //"light1", "dark1", "dark2"
        title:{
          text: "Topul profilurilor în funcție de numărul de vizualizări"
        },
        data: [{
          type: "column", //change type to bar, line, area, pie, etc
          //indexLabel: "{y}", //Shows y value on all Data Points
          indexLabelFontColor: "#5A5757",
          indexLabelPlacement: "outside",
          dataPoints: [
          ]
        }]
      };
      page_views.sort();
      console.log(page_views);
      for(var i=0;i<page_views.length;i++)
      {
        if(i==0)
          opt2.data[0].dataPoints.push({ x:page_name[i] ,y: Math.round(page_views[i]*100/view_count),indexLabel:"Cel mai vizualizat profil"});
        else
          opt2.data[0].dataPoints.push({ x:page_name[i] ,y: Math.round(page_views[i]*100/view_count)});
      }
      this.setState((state, props) => ({
        options:opt,
        options2:opt2
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
         <ChartViews opti2={this.state.options2}></ChartViews>
          </body>
    );
  }
}
//<textarea cols="80" rows="20" id="query-output"></textarea>
export default Statistici;