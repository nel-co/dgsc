import React, { Component } from 'react'

import './PlayerList.css';

export default class PlayerRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playerScore: this.props.currentGame.players[this.props.index].score[this.props.currentIndex] || props.currentGame.par[props.currentIndex]
    }
  }

  componentDidMount = () => {
    this.handleRunningTotalStyle();
  }

  componentDidUpdate = () => {
    this.handleRunningTotalStyle();
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.currentGame !== this.props.currentGame) {
      this.setState({
        playerScore: nextProps.currentGame.par[this.props.currentIndex]
      })
    }
  }

  handleRunningTotalStyle = () => {
    const runningTotalSpan = Array.from(document.querySelectorAll('.playerlist-total'));
    runningTotalSpan.map(total => {
      if(total.innerHTML < 0) {
        total.style.color = '#5bcacb';        
      } else if(total.innerHTML === 'e') {
        total.style.color = '#5bcb70';        
      } else {
        total.style.color = '#cb5b5b';  
      }
    })
  }

  handleScoreIncrease = () => {
    this.setState({
      playerScore: this.state.playerScore + 1
    }, () => {
          this.props.handlePlayerScore(this.state.playerScore, this.props.currentIndex, this.props.index)
    })
  }

  handleScoreDecrease = () => {
    if(this.state.playerScore > 1) {
      this.setState({
        playerScore: this.state.playerScore - 1
      }, () => {
            this.props.handlePlayerScore(this.state.playerScore, this.props.currentIndex, this.props.index)
      })
    }
  }

  getAvg = (playerScores, holeIndex) => {
    let par = this.props.currentGame.par;
    let courseName = this.props.currentGame.course;
    let scores;
    let gamesPlayed;
    let sum = 0;

    for(let i = 0; i < playerScores.length; i++) {
      if(courseName === playerScores[i].courseName) { // if course match is found
        scores = playerScores[i].scores;              // set scores to found scores
        gamesPlayed = scores.length;                  // set games played to length of scores
      } else {
        scores = false;
        gamesPlayed = 0;
      }
    }

    if(scores && gamesPlayed > 0) {
      for(let x = 0; x < scores.length; x++) {
        sum += scores[x][holeIndex];
      }
      let avg = sum / gamesPlayed;
      return 'Avg: ' + avg.toFixed(2);
    } else {
      return 'No Games Played';       
    }
  }

  getBest = (playerScores, holeIndex) => {
    let par = this.props.currentGame.par;
    let courseName = this.props.currentGame.course;
    let scores;
    let best;

    for(let i = 0; i < playerScores.length; i++) {
      if(courseName === playerScores[i].courseName) {
        scores = playerScores[i].scores;
      } else {
        scores = false;
      }
    }
    if(scores) {
      let holeArr = scores.map(score => {
        return score[holeIndex];
      });
      best = Math.min(...holeArr)
      return 'Best: '+ best;
    } else {
      return;       
    }
  }

  render() {
    return (
      <div className="playerlist-row">
      <div className="playerlist-left">
        <div className="playerlist-name">
          <span>{this.props.playerName}</span>
          <span className="playerlist-total">{this.props.handleRunningTotal(this.props.index)}</span>
          </div>
          <div className="playerlist-hole-stats">
            <span>{this.getAvg(this.props.savedPlayers[this.props.index].prevRounds,this.props.currentIndex)}</span>
            <span>{this.getBest(this.props.savedPlayers[this.props.index].prevRounds,this.props.currentIndex)}</span>
          </div>
      </div>

        <div className="playerlist-score">
          <span className="playerlist-score-button" onClick={this.handleScoreDecrease}>-</span>
          <span>{this.props.currentGame.players[this.props.index].score[this.props.currentIndex] || this.props.currentGame.par[this.props.currentIndex]}</span>
          
          <span className="playerlist-score-button" onClick={this.handleScoreIncrease}>+</span>
        </div>
      </div>
    )
  }
}