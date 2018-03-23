import React, { Component } from 'react';

export default class RecentGames extends Component {
  render() {
    return (
      <div className="stat-block__table">
        <div className="stat-block-row">
          <span>Recent Games (par)</span>
          <span>Score</span>
        </div>
        {this.props.savedPlayers[0].prevRounds.slice(this.props.savedPlayers[0].prevRounds.length - 5 ).reverse().map(round => {
          return (
            <div className="stat-block-row">
              <span>{round.courseName} ({round.par.reduce((a,b) => a + b)})</span>
              <span>{round.scores.reduce((a,b) => a + b)}</span>
            </div>
          );
        })}
      </div>
    );
  }

 }