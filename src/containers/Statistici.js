import React, { Component } from "react";
import GoogleLogin from 'react-google-login';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CanvasJSReact from '../canvasjs/canvasjs.react';
import Grid from '@material-ui/core/Grid';
import $ from 'jquery';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJSChart1 = CanvasJSReact.CanvasJSChart;
var VIEW_ID = '220652351';
var event_category = [];
var event_action = [];
var event_count = [];
var page_name = [];
var page_views = [];
var view_count = 0;
//optiuni primul chart conectare
var opt = {
  animationEnabled: true,
  exportEnabled: true,
  theme: "dark2", // "light1", "dark1", "dark2"
  title: {
    text: "Modul de conectare al utilizatorilor"
  },
  data: [
    {
      type: "pie",
      indexLabel: "{label}: {y}%",
      startAngle: -90,
      dataPoints: [
      ]
    }]
};
var opt2 = {
  animationEnabled: true,
  theme: "light2", // "light1", "light2", "dark1", "dark2"
  title: {
    text: "Cele mai vizualizate profiluri din ultimele 7 zile"
  },
  axisY: {
    title: "Numărul de vizualizări",
    includeZero: false
  },
  axisX: {
    title: "Nume profil"
  },
  //height:260,
  //width:320,
  data: [{
    type: "column",
    dataPoints: [
      // { label: "India", y: 7.1 },        
    ]
  }]
}

class Statistici extends Component {
  constructor(props) {
    super(props);
    this.queryReports = this.queryReports.bind(this);
    this.state = {
      options1: "",
      options2: ""
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
                name: "ga:eventCategory"
              },
              {
                name: "ga:eventAction"
              }
            ],
            metrics: [
              {
                expression: "ga:totalEvents",
                formattingType: "INTEGER"
              }
            ]
          }
        ]
      }
    }).then(function (response) {
      console.log(response);
      var formattedJson = response.result.reports[0].data.rows;
      //toate evenimentele
      for (var i = 0; i < formattedJson.length; i++) {
        event_category.push(formattedJson[i].dimensions[0]);
        event_action.push(formattedJson[i].dimensions[1]);
        event_count.push(formattedJson[i].metrics[0].values[0]);

      }
      //conectare login -cele 3 tipuri
      var action = [];
      var count_per_event = [];
      var count = 0;

      //separare chart-uri
      for (var i = 0; i < event_category.length; i++) {
        if (event_category[i] == "Conectare") {
          action.push(event_action[i]); //descriere eveniment
          count_per_event.push(event_count[i]); //numar
          count = parseInt(count) + parseInt(event_count[i]); //total
        }
        else if (event_category[i] == "Vizualizari") {
          page_name.push(event_action[i]);
          page_views.push(event_count[i]);
          view_count = parseInt(view_count) + parseInt(event_count[i]);
        }
      }
      console.log(action,count_per_event,count);
      //calculare si adaugare puncte pe chart pentru conectare
      for (var i = 0; i < action.length; i++) {
        opt.data[0].dataPoints.push({ y: Math.round(count_per_event[i] * 100 / count), label: action[i] });
      }
      for (var i = 0; i < page_views.length; i++) {
        if (i == 0)
          opt2.data[0].dataPoints.push({ label: page_name[i], y: parseInt(page_views[i]) });
        else
          opt2.data[0].dataPoints.push({ label: page_name[i], y: parseInt(page_views[i]) });
      }
    //setare optiuni si desenare chart2
    this.setState((state, props) => ({
      options2: opt2,
      options1: opt
    }));
    }.bind(this));
  }
  render() {
    const responseGoogleFailure = (error) => {
      console.error(error);
    };

    return (
      <body>
        <h1>Rapoarte Google Analytics</h1>
        <br></br>
        <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid> */}
        <Grid item xs={6}>
        <CanvasJSChart options={this.state.options1} ></CanvasJSChart>
        </Grid>
        <Grid item xs={6}>
        <CanvasJSChart1 options={this.state.options2}></CanvasJSChart1> 
        </Grid>
        </Grid>
        <br></br>
        <GoogleLogin
          clientId="443094691967-2j7a99kuh7puj3dvb7m7f9i40j6lcjr3.apps.googleusercontent.com"
          buttonText="Continuă cu GOOGLE"
          onSuccess={this.queryReports}
          onFailure={responseGoogleFailure}
        />
      </body>
    );
  }
}
export default Statistici;