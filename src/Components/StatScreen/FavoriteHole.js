import React, { Component } from 'react';

export default class FavoriteHole extends Component {

  getFavoriteHole = () => {
    const mainPlayer = this.props.savedPlayers[0];
    return mainPlayer.prevRounds.length;
  }

  render() {
    return (
      <div className="stat-block__horizontal">
        <span>Favorite Hole</span>
        <span>{this.getFavoriteHole()}</span>
      </div>
    );
  }

 }