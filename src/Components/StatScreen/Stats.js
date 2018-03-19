import React, { Component } from 'react'
import './Stats.css';

import AvgScore from './AvgScore';
import AvgPar from './AvgPar';
import RoundsPlayed from './RoundsPlayed';
import CoursesPlayed from './CoursesPlayed';
import FavoriteHole from './FavoriteHole';

export default class Stats extends Component {

  render() {
    const Stats = (
      <div className="stat-screen-container">
        <div className="option-screen stat-screen">
          <div className="course-name"><h1>Stats</h1></div>
          <span className="finish-round-btn" onClick={this.props.toggleStats}>X</span>
          <div className="stat-wrapper">
            <div className="stat-wrapper-top-row">
              <AvgScore savedPlayers={this.props.savedPlayers} />
              <AvgPar savedPlayers={this.props.savedPlayers} savedCourses={this.props.savedCourses} />
              <RoundsPlayed savedPlayers={this.props.savedPlayers} />              
            </div>
            <CoursesPlayed savedPlayers={this.props.savedPlayers} />
            <FavoriteHole savedPlayers={this.props.savedPlayers} />
          </div>
        </div>
      </div>
    );
    return (
      <span>
        {Stats}
      </span>
    )
  }
}