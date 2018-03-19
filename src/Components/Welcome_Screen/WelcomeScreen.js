import React, { Component } from 'react'
import './WelcomeScreen.css';

import logo from './logo-green.png';

export default class WelcomeScreen extends Component {
  render() {
    return (
      <div className="welcome-screen">
        <div className="welcome-wrapper">
          <img src={logo} alt="disc golf logo" />
          <h1>DG ScoreKeeper</h1>
          <p>Start a new round to track your score and measure the distance of your throws.</p>
          <div className="welcome-btn" onClick={this.props.handleNewGame}>New Game</div>
        </div>
      </div>
    )
  }
}