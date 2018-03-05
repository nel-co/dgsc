import React, { Component } from 'react'
import './OptionScreen.css';

import OptionPlayer from './OptionPlayer';
import OptionCourse from './OptionCourse';

export default class OptionScreen extends Component {

  // Toggles selected option
  selectOptions = (e) => {
    if(document.querySelector('.option-single')) {
      if(e.target.classList.contains('option-select')) {
        if(!e.target.classList.contains('selected')) {
          this.toggleOneCourse();  
          e.target.classList.add('selected');
        } else {
        this.toggleOneCourse(); 
        e.target.classList.remove('selected'); 
        }
      } else if (e.target.className === 'option-name') {
        this.toggleOneCourse();
        e.target.parentNode.querySelector('.option-select').classList.toggle('selected');        
      } else {
        this.toggleOneCourse();
        e.target.querySelector('.option-select').classList.toggle('selected');
      }
    }
  }

  toggleOneCourse = () => {
    if(this.props.playersPicked) {
      const courseList = Array.from(document.querySelectorAll('.option-single'));
      for(let i = 0; i < courseList.length; i++) {
        courseList[i].childNodes[0].classList.remove('selected');
      }
    }
  }

  render() {
    const props = {
      newGame: this.props.newGame,
      addingNewPlayer: this.props.addingNewPlayer,
      savedPlayers: this.props.savedPlayers,
      playersPicked: this.props.playersPicked,
      savedCourses: this.props.savedCourses,
      addingNewCourse: this.props.addingNewCourse,

      handleNewGame: this.props.handleNewGame,      
      toggleNewPlayerModal: this.props.toggleNewPlayerModal,
      toggleNewCourseModal: this.props.toggleNewCourseModal,
      saveNewPlayer: this.props.saveNewPlayer,
      savePlayersPicked: this.props.savePlayersPicked,
      saveNewCourse: this.props.saveNewCourse,
      saveCoursePicked: this.props.saveCoursePicked,

      selectOptions: this.selectOptions
    };

    let showOptions = () => {
      if(!this.props.playersPicked) {
        return <OptionPlayer {...props} />
      } else if(!this.props.coursePicked) {
          return <OptionCourse {...props} />
      } else {
        return null;
      }
    }

    return (
      // !this.props.playersPicked ? <OptionPlayer {...props} /> : <OptionCourse {...props} />
      showOptions()
    )
  }
}