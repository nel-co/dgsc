import React, { Component } from 'react'
import './OptionScreen.css';
import trash from './trash.svg';
import emptyPlayers from './empty-players.png';

import NewPlayerModal from '../NewPlayerModal/NewPlayerModal';

export default class OptionPlayer extends Component {

  componentDidMount = () => {
    this.selectFirstPlayer();
  }

  componentDidUpdate = () => {
    if(document.querySelector('.option-single')) {
      this.selectFirstPlayer();    
    }
  }

  // Selects the first Player in array of players
  selectFirstPlayer = () => {
    if(document.querySelector('.option-single')) {
      const playerList = Array.from(document.querySelectorAll('.option-single'));
      playerList[0].childNodes[0].classList.add('selected');
    }
  }

  handlePlayerRemove = (index) => {
    console.log(index)
  }

  render() {
    let playerScreen;
    const playerList = (
      <div className="option-screen">
        <h1>Choose Players</h1><span className="player-pick-number">Up to 4 players</span>
        <div className="option-wrapper">
          {this.props.savedPlayers && this.props.savedPlayers.map((player, index) => {
            return (
            <div className="option-single" key={index} onClick={this.props.selectOptions}>
              <div className="option-select"></div>
              <div className="option-name">{player.playerName}</div>
              {/* <div className="option-remove" onClick={this.handlePlayerRemove}><img src={trash} alt="Remove Player" /></div> */}
            </div>
            )
          })}
        </div>
        <div className="btn-wrapper">
          <div className="option-btn primary" onClick={this.props.savePlayersPicked}>Choose Course</div>
          <div className="option-btn outline" onClick={this.props.toggleNewPlayerModal}>Add New Player</div>
        </div>
      </div>
    );
    const emptyPlayerList = (
      <div className="option-screen">
        <h1>Choose Players</h1><span className="player-pick-number">Up to 4 players</span>
        <div className="option-wrapper empty-wrapper">
          <img src={emptyPlayers} alt="No Players Here" />
          <h1>Who’s playing?</h1>
          <p>Players that you’ve added will appear here. Try adding yourself.</p>
        </div>
        <div className="btn-wrapper">
          <div className="option-btn disabled-btn">Choose Course</div>
          <div className="option-btn outline" onClick={this.props.toggleNewPlayerModal}>Add New Player</div>
        </div>
      </div>
    );
    if(this.props.savedPlayers.length === 0) {
      playerScreen = emptyPlayerList;
    } else {
      playerScreen = playerList;
    }
    return (
      this.props.addingNewPlayer ? <NewPlayerModal saveNewPlayer={this.props.saveNewPlayer} toggleNewPlayerModal={this.props.toggleNewPlayerModal} /> : playerScreen
    )
  }
}