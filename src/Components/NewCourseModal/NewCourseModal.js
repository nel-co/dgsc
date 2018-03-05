import React, { Component } from 'react'
import './NewCourseModal.css';

export default class NewPlayerModal extends Component {
  toggleModal = (e) => {
    if(e.target.querySelector('.modal-wrapper')) {
      this.props.toggleNewCourseModal();
    }
  }
  render() {
    return (
      <div className="modal-container" onClick={this.toggleModal}>
        <div className="modal-wrapper">
          <input name="new-course-name" type="text" placeholder="Course Name" />
          <input name="new-course-holes" type="number" placeholder="How Many Holes?" />          
          <div className="option-btn primary" onClick={this.props.saveNewCourse}>Save Course</div>
        </div>
      </div>
    )
  }
}
