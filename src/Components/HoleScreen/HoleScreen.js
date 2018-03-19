import React, { Component } from 'react'
import './HoleScreen.css';

import Carousel from 'nuka-carousel';
import HoleCard from './HoleCard/HoleCard';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import Measure from '../Measure/Measure';
import NoteScreen from '../NoteScreen/NoteScreen';

export default class HoleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScoreBoardOpen: false,
      isMeasuringThrow: false,
      isNotesOpen: false
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
    this.adjustSlideHeight();
    this.setPlayerRowHeight();    
    }, 0);
  }
  
  handleRunningTotal = (playerIndex) => {
    const par = this.props.currentGame.par;
    const playerScoreArray = this.props.currentGame.players[playerIndex].score;
    let parScore=0;
    let playerScore=0;
    let playerRunningTotal;
    for(let x = 0; x < playerScoreArray.length; x++){
      parScore=parScore+par[x];
      playerScore=playerScore+playerScoreArray[x];
    }
    if(playerScore === parScore || playerScoreArray.length === 0) {
      playerRunningTotal = 'e';
    } else if(playerScore > parScore) {
      playerRunningTotal = `+${playerScore - parScore}`
    } else if(playerScore < parScore) {
      playerRunningTotal = `${playerScore - parScore}`
    }
    return playerRunningTotal;
  }

  toggleScoreBoard = () => {
    this.setState({
      isScoreBoardOpen: !this.state.isScoreBoardOpen,
      isMeasuringThrow: false
    });
    if(document.querySelector('.slider')) {    
      document.querySelector('.hole-carouel').classList.toggle('hidden');
    }
    setTimeout(() => {
      this.adjustSlideHeight();
      }, 0);
  }

  toggleMeasure = () => {
    this.setState({
      isMeasuringThrow: !this.state.isMeasuringThrow,
      isScoreBoardOpen: false
    });
    if(document.querySelector('.slider')) {    
      document.querySelector('.hole-carouel').classList.toggle('hidden');
      console.log('toggled')
    }
    setTimeout(() => {
      this.adjustSlideHeight();
      }, 0);
  }

  toggleNotes = () => {
    this.setState({
      isMeasuringThrow: false,
      isScoreBoardOpen: false,
      isNotesOpen: !this.state.isNotesOpen
    });
    if(document.querySelector('.slider')) {    
      document.querySelector('.hole-carouel').classList.toggle('hidden');
      console.log('toggled')
    }
    setTimeout(() => {
      this.adjustSlideHeight();
      }, 0);
  }

  handleScoreBoardMeausureButton = () => {
    this.toggleScoreBoard();
    this.toggleMeasure();
  }

  handleSlideChange = () => {
    this.props.currentGame.players.map((player, index) => {
      if(!player.score[this.refs.slider.state.currentSlide]) {
        this.props.handlePlayerScore(this.props.currentGame.par[this.refs.slider.state.currentSlide], this.refs.slider.state.currentSlide, index);
      }
    })
    setTimeout(() => {
      this.adjustSlideHeight();
      }, 0);
  }

  adjustSlideHeight = () => {
    const slideWrapper = document.querySelector('.option-wrapper');
    if(slideWrapper) {
      const slideHeight = window.getComputedStyle(slideWrapper, null).getPropertyValue('height');
      document.querySelector('.slider-list').style.height = slideHeight;
    }
  }

  setPlayerRowHeight = () => {
    const slideWrapper = document.querySelector('.option-wrapper');
    const slideHeader = document.querySelector('.hole-screen-holeinfo');
    if(slideWrapper && !this.state.isMeasuringThrow && !this.state.isScoreBoardOpen) {
      const slideHeight = parseFloat(window.getComputedStyle(slideWrapper, null).getPropertyValue('height'));
      const headerHeight = parseFloat(window.getComputedStyle(slideHeader, null).getPropertyValue('height')) + 60;
      const playerContainerArray = Array.from(document.querySelectorAll('.playerlist-container'));
      playerContainerArray.map(container => {
        container.style.height = `${slideHeight - headerHeight}px`;
      })
    }
  }

  render() {
    const HoleScoreCarousel = (
      <div className="option-screen hole-carouel">
        <div className="course-name" onClick={this.toggleNotes}><h1>{this.props.currentGame.course}</h1>{this.props.currentGame.notes.length > 0 ? <span></span> : <span className="empty-note-span"></span>}</div>
        <span className="finish-round-btn" onClick={this.props.handleFinishRoundClick}>Finish Round</span>
        <div className="option-wrapper hole-wrapper">
            <Carousel ref="slider" decorators={[]} afterSlide={this.handleSlideChange}>
              {this.props.currentGame && this.props.currentGame.par.map((currentGame, index) => {
                return <HoleCard 
                        currentGame={this.props.currentGame} 
                        currentHole= {index + 1}
                        currentIndex={index}
                        savedPlayers={this.props.savedPlayers}
                        handleParChange={this.props.handleParChange}
                        handleRunningTotal={this.handleRunningTotal}
                        handlePlayerScore={this.props.handlePlayerScore}
                        key={index} />
              })} 
            </Carousel>
        </div>
        <div className="btn-wrapper">
          <div className="option-btn primary" onClick={this.toggleScoreBoard}>View Scoreboard</div>
          <div className="option-btn outline" onClick={this.toggleMeasure}>Measure Throw</div>
        </div>
      </div>
    );
    return (
      <span>
        {HoleScoreCarousel}
        {this.state.isNotesOpen && !this.state.isScoreBoardOpen && !this.state.isMeasuringThrow ? <NoteScreen currentGame={this.props.currentGame} addNote={this.props.addNote} removeNote={this.props.removeNote} toggleNotes={this.toggleNotes} /> : null}        
        {this.state.isScoreBoardOpen && !this.state.isMeasuringThrow ? <ScoreBoard handleRunningTotal={this.handleRunningTotal} currentGame={this.props.currentGame} toggleScoreBoard={this.toggleScoreBoard} handleScoreBoardMeausureButton={this.handleScoreBoardMeausureButton} /> : null}
        {!this.state.isScoreBoardOpen && this.state.isMeasuringThrow ? <Measure currentGame={this.props.currentGame} toggleMeasure={this.toggleMeasure}/> : null}
      </span>
    )
  }
}

const options = {
  items: 1,
  rewind: false,
  dots: false,
  nav: false
};