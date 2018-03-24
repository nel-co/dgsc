import React, { Component } from 'react'
import './WelcomeScreen.css';

import logo from './logo-main.svg';

export default class WelcomeScreen extends Component {
  render() {
    const statButton = () => {
      if(this.props.savedPlayers[0] && this.props.savedPlayers[0].prevRounds.length > 0) {
        return <div className="welcome-btn" onClick={this.props.handleStatClick}>My Stats</div> 
      } else {
        return;
      }
    }
    return (
      <div className="welcome-screen">
        <div className="welcome-wrapper">
          <img src={logo} alt="disc golf logo" />
          <h1>DiscGolfScoreBoard</h1>
          <p>Start a new round to track your score and measure the distance of your throws.</p>
          <div className="welcome-btn" onClick={this.props.handleNewGame}>New Round</div>
          {statButton()}
        </div>
      </div>
    )
  }
}