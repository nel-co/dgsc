import React, { Component } from 'react'
import './OptionScreen.css';
import backArrow from './back-arrow.svg';

import emptyCourse from './empty-course.png';


import NewCourseModal from '../NewCourseModal/NewCourseModal';

export default class OptionCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRemoving: false
    }
  }

  componentDidMount = () => {
    this.selectFirstCourse();
    this.hideRemoveIcon();
  }

  componentDidUpdate = () => {
    if(document.querySelector('.option-single')) {
      this.selectFirstCourse();   
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.state.courseInterval);
  }
 
  // Selects the first Course in array of courses
  selectFirstCourse = () => {
    if(document.querySelector('.option-single')) {
      const courseList = Array.from(document.querySelectorAll('.option-single'));
      courseList[0].childNodes[0].classList.add('selected');
    }
  }

  handleCourseRemove = () => {
    if(document.querySelector('.option-single')) {
      const courseList = Array.from(document.querySelectorAll('.option-single'));
      if(courseList.length > 0) {
        this.setState({
          isRemoving: !this.state.isRemoving
        });
        courseList.map(course => {
          course.querySelector('.option-remove').classList.toggle('remove-hidden');
        })
        console.log(courseList)
      }
    }
  }

  hideRemoveIcon = () => {
    let courseInterval = setInterval(() => {
      if(this.props.savedCourses.length === 0) {
        this.setState({
          isRemoving: false
        })
      }
    }, 500);
    this.setState({
      courseInterval: courseInterval
    })
  }

  render() {
    let courseScreen;
    const courseList = (
      <div className="option-screen">
        <h1><img src={backArrow} alt="" onClick={this.props.handleCourseScreenBack} />Choose Course</h1><span className="player-pick-number" onClick={this.handleCourseRemove}>{!this.state.isRemoving ? 'EDIT' : 'DONE'}</span>
        <div className="option-wrapper">
          {this.props.savedCourses && this.props.savedCourses.map((course, index) => {
            return (
            <div className="option-single" key={index} onClick={!this.state.isRemoving ? this.props.selectOptions : null}>
              <div className="option-select"></div>
              <div className="option-name">{course.courseName}</div>
              <div className="option-remove remove-hidden" onClick={() => this.props.removeCourse(index)}>DELETE</div>  
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
        <h1><img src={backArrow} alt="" onClick={this.props.handleCourseScreenBack} />Choose Course</h1>
        <div className="option-wrapper empty-wrapper">
          <img src={emptyCourse} alt="No Courses Added" />
          <h1>Which Course?</h1>
          <p>Courses that you’ve added will appear here. Give it a try.</p>
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