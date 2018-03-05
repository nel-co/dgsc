import React, { Component } from 'react'
import './OptionScreen.css';

import emptyCourse from './empty-course.png';


import NewCourseModal from '../NewCourseModal/NewCourseModal';

export default class OptionCourse extends Component {

  componentDidMount = () => {
    this.selectFirstCourse();
  }

  componentDidUpdate = () => {
    if(document.querySelector('.option-single')) {
      this.selectFirstCourse();   
    }
  }
 
  // Selects the first Course in array of players
  selectFirstCourse = () => {
    if(document.querySelector('.option-single')) {
      const courseList = Array.from(document.querySelectorAll('.option-single'));
      courseList[0].childNodes[0].classList.add('selected');
    }
  }

  render() {
    let courseScreen;
    const courseList = (
      <div className="option-screen">
        <h1>Choose Course</h1>
        <div className="option-wrapper">
          {this.props.savedCourses && this.props.savedCourses.map((course, index) => {
            return (
            <div className="option-single" key={index} onClick={this.props.selectOptions}>
              <div className="option-select"></div>
              <div className="option-name">{course.courseName}</div>
              {/* <div className="option-amount">{player.gamesPlayed} Games Played</div>   */}
            </div>
            )
          })}
        </div>
        <div className="btn-wrapper">
          <div className="option-btn primary" onClick={this.props.saveCoursePicked}>Start Game</div>
          <div className="option-btn outline" onClick={this.props.toggleNewCourseModal}>Add New Course</div>
        </div>
      </div>
    );
    const emptyCourseList = (
      <div className="option-screen">
        <h1>Choose Course</h1>
        <div className="option-wrapper empty-wrapper">
          <img src={emptyCourse} alt="No Courses Added" />
          <h1>Which Course?</h1>
          <p>Courses that you’ve added will appear here. Add one now.</p>
        </div>
        <div className="btn-wrapper">
          <div className="option-btn disabled-btn">Start Game</div>
          <div className="option-btn outline" onClick={this.props.toggleNewCourseModal}>Add New Course</div>
        </div>
      </div>
    );
    if(this.props.savedCourses.length === 0) {
      courseScreen = emptyCourseList;
    } else {
      courseScreen = courseList;
    }
    return (
      this.props.addingNewCourse ? <NewCourseModal saveNewCourse={this.props.saveNewCourse} toggleNewCourseModal={this.props.toggleNewCourseModal} /> : courseScreen
    )
  }
}