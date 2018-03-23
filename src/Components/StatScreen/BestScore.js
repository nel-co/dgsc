import React, { Component } from 'react';

export default class FavoriteHole extends Component {
  checkBestScoreExists = () => {
    if(this.props.bestScore.course !== undefined) {
      return `${this.props.bestScore.total}`
    } else {
      return 'N/A'
    }
  }

  getBestScoreCourse = () => {
    if(this.props.bestScore.course !== undefined) {
      return `${this.props.bestScore.course}`
    } else {
      return 'N/A'
    }
  }

  render() {
    return (
      <div className="stat-block">
        <span>Best <br /> Score</span>
        <span>{this.checkBestScoreExists()}</span>
        <span>{this.getBestScoreCourse()}</span>
      </div>
    );
  }
 }