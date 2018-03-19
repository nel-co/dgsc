import React, { Component } from 'react'
import './NewPlayerModal.css';

export default class NewPlayerModal extends Component {
  toggleModal = (e) => {
    if(e.target.querySelector('.modal-wrapper')) {
      this.props.toggleNewPlayerModal();
    }
  }

  handleEnterKey = (e) => {
    if(e.key == 'Enter') {
      this.props.saveNewPlayer();
      e.preventDefault();
    }
  }

  render() {
    return (
      <div className="modal-container" onClick={this.toggleModal}>
        <div className="modal-wrapper">
          <input name="new-player-name" type="text" onKeyPress={this.handleEnterKey} placeholder="Player Name" />
          <div className="option-btn primary" onClick={this.props.saveNewPlayer}>Save Player</div>
        </div>
      </div>
    )
  }
}
