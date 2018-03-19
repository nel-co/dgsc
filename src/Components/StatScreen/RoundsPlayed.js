import React, { Component } from 'react';

export default class RoundsPlayed extends Component {

  getRoundsPlayed = () => {
    const mainPlayer = this.props.savedPlayers[0];
    return mainPlayer.prevRounds.length;
  }

  render() {
    return (
      <div className="stat-block">
        <span>Rounds <br />Played</span>
        <span>{this.getRoundsPlayed()}</span>
      </div>
    );
  }

 }