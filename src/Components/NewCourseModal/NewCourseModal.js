import React, { Component } from 'react'
import './NewCourseModal.css';

export default class NewPlayerModal extends Component {
  toggleModal = (e) => {
    if(e.target.querySelector('.modal-wrapper')) {
      this.props.toggleNewCourseModal();
    }
  }

  handleEnterKey = (e) => {
    if(e.key == 'Enter') {
      this.props.saveNewCourse();
      e.preventDefault();
    }
  }

  render() {
    return (
      <div className="modal-container" onClick={this.toggleModal}>
        <div className="modal-wrapper">
          <input name="new-course-name" type="text" placeholder="Course Name" />
          <input name="new-course-holes" type="number" pattern="[0-9]*" onKeyPress={this.handleEnterKey} placeholder="How Many Holes?" />          
          <div className="option-btn primary" onClick={this.props.saveNewCourse}>Save Course</div>
        </div>
      </div>
    )
  }
}
