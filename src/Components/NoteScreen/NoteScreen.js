import React, { Component } from 'react'
import './NoteScreen.css';



export default class HoleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleEnterKey = (e) => {
    if(e.key === 'Enter') {
      this.props.addNote(this.props.currentGame.course);
      e.preventDefault();
    }
  }

  handleNoteRemove = (courseName, index) => {
    this.props.removeNote(courseName, index);
  }

  render() {
    const NoteScreen = (
      <div className="note-screen-container">
        <div className="option-screen note-screen">
          <div className="course-name"><h1>{this.props.currentGame.course}</h1></div>
          <span className="finish-round-btn" onClick={this.props.toggleNotes}>X</span>
          <div className="list-wrapper">
            {this.props.currentGame.notes.length === 0 ? <div className="note-empty-wrapper"><p className="note-empty">Notes you add <br />will show up here</p></div> : null}
            {this.props.currentGame.notes.map((note, index) => {
              return (
                <div className="note-block">
                  <p>{note}</p>
                  <span onClick={() => this.handleNoteRemove(this.props.currentGame.course,index)}>-</span>
                </div>
              );
            })}
          </div>
          <div className="note-form">
            <textarea name="note-text" rows="4" onKeyPress={this.handleEnterKey} placeholder={`Add a note about ${this.props.currentGame.course} here`}></textarea>
            <div className="option-btn green" onClick={() => this.props.addNote(this.props.currentGame.course)}>Add Note</div>
          </div>
        </div>
      </div>
    );
    return (
      <span>
        {NoteScreen}
      </span>
    )
  }
}