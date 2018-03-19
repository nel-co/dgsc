import React, { Component } from 'react';

export default class AvgPar extends Component {

  getAvgPar = () => {
    const mainPlayer = this.props.savedPlayers[0];
    let totalPar = 0;
    let coursesPlayed = 0;
    for(let i = 0; i < mainPlayer.prevRounds.length; i++) {
      for(let x = 0; x < this.props.savedCourses.length; x++) {
        if(mainPlayer.prevRounds[i].courseName === this.props.savedCourses[x].courseName) {
          coursesPlayed++;
          totalPar += this.props.savedCourses[x].par.reduce((a,b) => {
            return a + b;
          })
        }
      }
    }
    return totalPar ? Math.round(totalPar / coursesPlayed) : 0;
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