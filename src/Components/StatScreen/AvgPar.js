import React, { Component } from 'react';

export default class AvgPar extends Component {

  getAvgPar = () => {
    const mainPlayer = this.props.savedPlayers[0];
    let totalPar = 0;
    let roundsPlayed = mainPlayer.prevRounds.length;
    let allScores = [];

    for(let i = 0; i < mainPlayer.prevRounds.length; i++) {
      for(let x = 0; x < mainPlayer.prevRounds[i].par.length; x++) {
        totalPar += mainPlayer.prevRounds[i].par[x];
      }
    }
    return totalPar ? Math.round(totalPar / roundsPlayed) : 0;
  }

  render() {
    return (
      <div className="stat-block">
        <span>Avg. <br /> Par</span>
        <span>{this.getAvgPar()}</span>
      </div>
    );
  }

 }