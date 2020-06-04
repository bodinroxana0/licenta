import React, { Component } from "react";
import GoogleLogin from 'react-google-login';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CanvasJSReact from '../canvasjs/canvasjs.react';
import $ from 'jquery';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var VIEW_ID = '219697764';


class ChartViews extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
        <CanvasJSChart options={this.props.opti2} ></CanvasJSChart>
    );
  }
}
//<textarea cols="80" rows="20" id="query-output"></textarea>
export default ChartViews;