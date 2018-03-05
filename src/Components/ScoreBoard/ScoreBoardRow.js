import React, { Component } from 'react'
import './ScoreBoard.css';

export default class ScoreBoardRow extends Component {

  render() {    
    return (
      <div className="scoreboard-main-row" key={'hole: ' + this.props.holeIndex}>
        <div className="scoreboard-main-row-item">{this.props.holeIndex + 1} ({this.props.currentGame.par[this.props.holeIndex]})</div>
        {this.props.currentGame.players.map(player => {
          if(player.score[this.props.holeIndex] === this.props.currentGame.par[this.props.holeIndex]) {
            return <div className="scoreboard-main-row-item"><span className="scoreboard-even">{player.score[this.props.holeIndex]}</span></div>
          } else if(player.score[this.props.holeIndex] > this.props.currentGame.par[this.props.holeIndex]) {
              return <div className="scoreboard-main-row-item"><span className="scoreboard-bogey">{player.score[this.props.holeIndex]}</span></div>            
          } else if(player.score[this.props.holeIndex] < this.props.currentGame.par[this.props.holeIndex]) {
              return <div className="scoreboard-main-row-item"><span className="scoreboard-birdie">{player.score[this.props.holeIndex]}</span></div>            
          }
        })}
      </div>
    )
  }
}