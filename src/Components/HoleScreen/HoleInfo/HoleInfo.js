import React, { Component } from 'react'
import './HoleInfo.css';


export default class HoleInfo extends Component {

  // On input change update state of course par
  handleParInputChange = () => {
    let parInputArray = Array.from(document.querySelectorAll('.hole-screen-par input'));
    let inputValue = parInputArray[this.props.currentIndex].value;
    inputValue = parseFloat(inputValue);
    console.log(inputValue);
    if(inputValue > 0 && inputValue <= 5) {
      this.props.handleParChange(this.props.currentGame.course, this.props.currentIndex, inputValue);        
    }    
  }

  render() {
    return (
      <div className="hole-screen-holeinfo">
        <div className="hole-screen-number">Hole {this.props.currentHole} </div>
        <div className="hole-screen-par">
          <span>Par</span>
          <input type="number" maxLength="1" size="1" onChange={this.handleParInputChange} placeholder={this.props.currentGame.par[this.props.currentIndex]}/></div>
      </div>
    )
  }
}