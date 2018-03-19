import React, { Component } from 'react';

export default class AvgScore extends Component {

  getAvg = () => {
    const mainPlayer = this.props.savedPlayers[0];
    let totalScore = 0;
    let roundsPlayed = mainPlayer.prevRounds.length;
    let allScores = [];

    for(let i = 0; i < mainPlayer.prevRounds.length; i++) {
      for(let x = 0; x < mainPlayer.prevRounds[i].scores.length; x++) {
        totalScore += mainPlayer.prevRounds[i].scores[x];
      }
    }
    return totalScore ? Math.round(totalScore / roundsPlayed) : 0;
  }

  render() {
    return (
      <div className="stat-block stat__green">
        <span>Avg. <br /> Score</span>
        <span>{this.getAvg()}</span>
      </div>
    );
  }

 }