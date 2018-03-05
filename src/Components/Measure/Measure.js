import React, { Component } from 'react'
import './Measure.css';

export default class Measure extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMeasuring: true
    }
  }
  
  componentDidMount = () => {
    this.getStartingCoords();
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
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          startingLon: position.coords.longitude,
          startingLat: position.coords.latitude
        })
      });
    } else {
        alert("Sorry, your browser does not support geolocation services.");
    }
  }

  getEndingCoords = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          endingLon: position.coords.longitude,
          endingLat: position.coords.latitude

        })
        this.calculateDistance(this.state.startingLat,this.state.startingLon, this.state.endingLat, this.state.endingLon, 'M');
      });
    } else {
        alert("Sorry, your browser does not support geolocation services.");
    }
  }

  calculateDistance = (lat1, lon1, lat2, lon2, unit) => {
    this.setState({
      finalDistance: 0
    })
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var radlon1 = Math.PI * lon1/180;
    var radlon2 = Math.PI * lon2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    this.setState({
      finalDistance: Math.round((dist * 5280) * 10) /10
      // finalDistance: dist * 5280
    }, () => {
      console.log('final distance: ' + `${this.state.finalDistance}ft`)
    })
  }

  RenderHoleBtn = () => {
    if(this.state.isMeasuring) {
      return <div className="option-btn disabled-btn">View Hole</div>
    } else {
      return <div className="option-btn primary" onClick={this.props.toggleMeasure}>View Hole</div>
    }
  }

  render() {
    const Measure = (
      <div className="option-screen">
        <h1>{this.props.currentGame.course}</h1>
        <div className="option-wrapper measure-wrapper">
          <h1>{!this.state.finalDistance ? '0ft' : `${this.state.finalDistance}ft`}</h1>
          <p>To finish the measurement, walk to where your disc rests and tap stop.</p>
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