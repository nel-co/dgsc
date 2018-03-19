import React, { Component } from 'react'
import './OptionScreen.css';

import backArrow from './back-arrow.svg';
import emptyPlayers from './empty-players.png';

import NewPlayerModal from '../NewPlayerModal/NewPlayerModal';

export default class OptionPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRemoving: false
    }
  }

  componentDidMount = () => {
    this.selectFirstPlayer();
    this.disableMainPlayerRemove();
    this.hideRemoveIcon();
  }

  componentDidUpdate = () => {
    if(document.querySelector('.option-single')) {
      this.selectFirstPlayer();
      this.disableMainPlayerRemove();      
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.state.playerInterval);
  }
  

  // Selects the first Player in array of players
  selectFirstPlayer = () => {
    if(document.querySelector('.option-single')) {
      const playerList = Array.from(document.querySelectorAll('.option-single'));
      playerList[0].childNodes[0].classList.add('selected');
    }
  }

  handlePlayerRemove = () => {
    if(document.querySelector('.option-single')) {
      const playerList = Array.from(document.querySelectorAll('.option-single'));
      if(playerList.length > 0) {
        this.setState({
          isRemoving: !this.state.isRemoving
        });
        playerList.map(player => {
          if(player.querySelector('.option-remove')) {
            player.querySelector('.option-remove').classList.toggle('remove-hidden');
          }
        })
      }
    }
  }

  hideRemoveIcon = () => {
    let playerInterval = setInterval(() => {
      if(this.props.savedPlayers.length === 0) {
        this.setState({
          isRemoving: false
        })
      }
    }, 500);
    this.setState({
      playerInterval: playerInterval
    })
  }

  disableMainPlayerRemove = () => {
    if(document.querySelector('.option-single')) {
      const playerList = Array.from(document.querySelectorAll('.option-single'));
      const deleteBtn = playerList[0].querySelector('.option-remove');
      deleteBtn.style.display = 'none';
    }
  }

  render() {
    let playerScreen;
    const playerList = (
      <div className="option-screen">
        <h1><img src={backArrow} alt="" onClick={this.props.handlePlayerScreenBack} /> Choose Players (4 Max)</h1><span className="player-pick-number" onClick={this.handlePlayerRemove}>{!this.state.isRemoving ? 'EDIT' : 'DONE'}</span>
        <div className="option-wrapper">
          {this.props.savedPlayers && this.props.savedPlayers.map((player, index) => {
            return (
            <div className="option-single" key={index} onClick={!this.state.isRemoving ? this.props.selectOptions : null}>
              <div className="option-select"></div>
              <div className="option-name">{player.playerName}</div>
              <div className="option-remove remove-hidden" onClick={() => this.props.removePlayer(index)}>DELETE</div>
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
        <h1><img src={backArrow} alt="" onClick={this.props.handlePlayerScreenBack} />Choose Players (4 Max)</h1><span className="player-pick-number"></span>
        <div className="option-wrapper empty-wrapper">
          <img src={emptyPlayers} alt="No Players Here" />
          <h1>Who’s playing?</h1>
          <p>Players that you’ve added will appear here. Try adding yourself.</p>
        </div>
        <div className="btn-wrapper">
          <div className="option-btn disabled-btn">Choose Course</div>
          <div className="option-btn outline" onClick={this.props.toggleNewPlayerModal}>Add Me</div>
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