import React, { Component } from 'react'
import './PlayerList.css';

import PlayerRow from './PlayerRow';

export default class PlayerList extends Component {

  render() {    
    return (
      <div className="playerlist-container">
        {this.props.currentGame && this.props.currentGame.players.map((player,index) => {
          return <PlayerRow 
                    playerName={player.name} 
                    score={player.score} 
                    currentGame={this.props.currentGame}
                    savedPlayers={this.props.savedPlayers}                    
                    handleRunningTotal={this.props.handleRunningTotal}
                    index={index}
                    currentIndex={this.props.currentIndex}
                    handlePlayerScore={this.props.handlePlayerScore}
                    key={index} />
        })}
      </div>
    )
  }
}

