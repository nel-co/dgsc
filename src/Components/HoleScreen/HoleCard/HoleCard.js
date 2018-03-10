import React, { Component } from 'react'

import HoleInfo from '../HoleInfo/HoleInfo';
import PlayerList from '../PlayerList/PlayerList';

export default class HoleCard extends Component {

  render() {    
    return (
      <div className="hole-screen-card">
        <HoleInfo currentGame={this.props.currentGame} currentHole={this.props.currentHole} currentIndex={this.props.currentIndex} handleParChange={this.props.handleParChange} />
        <PlayerList currentGame={this.props.currentGame} savedPlayers={this.props.savedPlayers} currentIndex={this.props.currentIndex} handlePlayerScore={this.props.handlePlayerScore} handleRunningTotal={this.props.handleRunningTotal} />
      </div>
    )
  }
}