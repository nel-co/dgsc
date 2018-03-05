import React, { Component } from 'react'
import './ScoreBoard.css';

import ScoreBoardRow from './ScoreBoardRow';

export default class ScoreBoard extends Component {

  render() {    
    const ScoreBoard = (
      <div className="option-screen">
        <h1>{this.props.currentGame.course}</h1>
        <div className="option-wrapper scoreboard-wrapper">
          <div className="scoreboard-top-row">
            <div className="scoreboard-top-row-player-wrapper">
              <div className="scoreboard-top-row-title">Hole</div>
              <div className="scoreboard-top-row-title">(par)</div>
            </div>
            {this.props.currentGame.players.map((player,index) => {
              return (
                <div className="scoreboard-top-row-player-wrapper" key={index}>
                  <div className="scoreboard-top-row-title">{player.name}</div>
                  <div className="scoreboard-top-row-title">{this.props.handleRunningTotal(index)}</div>
                </div>
              )
            })}
          </div>
          {this.props.currentGame.par.map((hole, holeIndex) => {
            return <ScoreBoardRow currentGame={this.props.currentGame} holeIndex={holeIndex} key={holeIndex} />
          })}
        </div>
        <div className="btn-wrapper">
          <div className="option-btn primary" onClick={this.props.toggleScoreBoard}>View Hole</div>
          <div className="option-btn outline" onClick={this.props.handleScoreBoardMeausureButton}>Measure Throw</div>
        </div>
      </div>
    );
    return (
      ScoreBoard
    )
  }
}