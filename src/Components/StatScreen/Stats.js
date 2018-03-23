import React, { Component } from 'react'
import './Stats.css';

import AvgScore from './AvgScore';
import AvgPar from './AvgPar';
import RoundsPlayed from './RoundsPlayed';
import CoursesPlayed from './CoursesPlayed';
import BestScore from './BestScore';
import RecentGames from './RecentGames';
import MyBag from './MyBag';
import NewDiscModal from './NewDiscModal/NewDiscModal';

import backArrow from './back-arrow.svg';


export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddingDisc: false,
      myBag: JSON.parse(localStorage.getItem('myBag')) || []
    }
  }

  componentDidMount = () => {
    document.querySelector('body').style.width = '100%';
  }

  componentWillUnmount = () => {
    document.querySelector('body').style.width = '100vw';    
  }

  toggleNewDiscModal = () => {
    this.setState({
      isAddingDisc: !this.state.isAddingDisc
    })
  }

  addDisc = () => {
    const discNameInput = document.querySelector('input[name="disc-name-input"]');
    const discTypeInput = document.getElementById('disc-type-select');    
    if(discNameInput.value.length > 0 && discTypeInput) {
      let newDisc = {};
      newDisc.discName = discNameInput.value.trim();
      newDisc.discType = parseInt(discTypeInput.options[discTypeInput.selectedIndex].value);
      this.setState({
        myBag: [...this.state.myBag, newDisc],
        isAddingDisc: false
      }, () => {
          localStorage.setItem('myBag', JSON.stringify(this.state.myBag));        
       });
    }
  }

  removeDisc = (index) => {
    let myBag = [...this.state.myBag];
    myBag.splice(index, 1)
    this.setState({
      myBag: myBag
    }, () => {
      localStorage.setItem('myBag', JSON.stringify(this.state.myBag));        
   });
  }

  render() {
    const Stats = (
      <div className="stat-screen-container">
        <div className="option-screen stat-screen">
          <div className="course-name"><h1><img src={backArrow} alt="" onClick={this.props.handleStatClick} />Stats</h1></div>
          <div className="stat-wrapper">
            <div className="stat-wrapper-top-row">
              <AvgScore savedPlayers={this.props.savedPlayers} />
              <AvgPar savedPlayers={this.props.savedPlayers} savedCourses={this.props.savedCourses} />
              <RoundsPlayed savedPlayers={this.props.savedPlayers} />  
              <BestScore savedPlayers={this.props.savedPlayers} bestScore={this.props.bestScore} />                          
            </div>
            <RecentGames savedPlayers={this.props.savedPlayers} savedCourses={this.props.savedCourses} />
            <MyBag isAddingDisc={this.state.isAddingDisc} removeDisc={this.removeDisc}  toggleNewDiscModal={this.toggleNewDiscModal} myBag={this.state.myBag} />
          </div>
        </div>
      </div>
    );
    return (
      <span>
        {!this.state.isAddingDisc ? Stats : <NewDiscModal toggleNewDiscModal={this.toggleNewDiscModal} addDisc={this.addDisc} />}
      </span>
    )
  }
}