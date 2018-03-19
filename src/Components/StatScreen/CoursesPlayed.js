import React, { Component } from 'react';

export default class CoursesPlayed extends Component {

  getCoursesPlayed = () => {
    const mainPlayer = this.props.savedPlayers[0];
    const unique = [...new Set(mainPlayer.prevRounds.map(item => item.courseName))];
    return unique.length;
;
  }

  render() {
    return (
      <div className="stat-block__horizontal">
        <span>Courses Played</span>
        <span>{this.getCoursesPlayed()}</span>
      </div>
    );
  }

 }