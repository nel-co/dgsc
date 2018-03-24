import React, { Component } from 'react'
import './Measure.css';

import MeasureLoading from './MeasureLoading';

const google = window.google;

export default class Measure extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMeasuring: true
    }
  }
  
  componentDidMount = () => {
    setTimeout(() => {
      this.getStartingCoords();
    }, 1500);
  }

  handleMeasure = () => {
    this.setState({
      isMeasuring: !this.state.isMeasuring
    })
    if(this.state.isMeasuring) {
      this.getEndingCoords();
    } else {
      this.getStartingCoords();
    }
  }

  getStartingCoords = () => {
    const geo_options = {
      enableHighAccuracy: true
    };
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          startingLon: position.coords.longitude,
          startingLat: position.coords.latitude
        })
      }, null, geo_options);
    } else {
        alert("Sorry, your browser does not support geolocation services.");
    }
  }

  getEndingCoords = () => {
    const geo_options = {
      enableHighAccuracy: true
    };
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          endingLon: position.coords.longitude,
          endingLat: position.coords.latitude

        })
        this.calculateDistance(this.state.startingLat,this.state.startingLon, this.state.endingLat, this.state.endingLon, 'M');
      }, null, geo_options);
    } else {
        alert("Sorry, your browser does not support geolocation services.");
    }
  }

  calculateDistance = (lat1, lng1, lat2, lng2, unit) => {
    this.setState({
      finalDistance: 0
    });
    let latLng1 = new google.maps.LatLng({
      lat: lat1,
      lng: lng1
    });
    let latLng2 = new google.maps.LatLng({
      lat: lat2,
      lng: lng2
    });
    let distanceM = google.maps.geometry.spherical.computeDistanceBetween (latLng1, latLng2);
    let distanceF = distanceM * 3.28084;
    let finalFeet = parseFloat(distanceF.toFixed(1));
    this.setState({
      finalDistance: finalFeet
    }, () => {
      console.log(`final distance: ${this.state.finalDistance}ft`)
    })
  }

  RenderHoleBtn = () => {
    if(this.state.isMeasuring) {
      return <div className="option-btn disabled-btn">View Hole</div>
    } else {
      return <div className="option-btn primary" onClick={this.props.toggleMeasure}>View Hole</div>
    }
  }

  RenderLoadingAnim = () => {
    if(this.state.isMeasuring) {
      return <MeasureLoading />
    } else {
        return <h1>{!this.state.finalDistance ? '0ft' : `${this.state.finalDistance}ft`}</h1>
    }
  }

  render() {
    const Measure = (
      <div className="option-screen">
        <h1>{this.props.currentGame.course}</h1>
        <div className="option-wrapper measure-wrapper">
          {/* <h1>{!this.state.finalDistance ? '0ft' : `${this.state.finalDistance}ft`}</h1> */}
          {this.RenderLoadingAnim()}
          <p>To finish the measurement, walk to where your disc rests and tap stop.</p>
          {/* <p className="small-font">{`initial coords: ${this.state.startingLat}, ${this.state.startingLon}`}</p> */}
          {/* <p className="small-font">{`ending coords: ${this.state.endingLat}, ${this.state.endingLon}`}</p> */}
          <span>Measurement subject to GPS signal. +/- 30ft</span>          
        </div>
        <div className="btn-wrapper">
          {this.RenderHoleBtn()}
          <div className="option-btn outline" onClick={this.handleMeasure}>{this.state.isMeasuring ? 'Stop' : 'Start'}</div>
        </div>
      </div>
    );
    return (
      Measure
    )
  }
}