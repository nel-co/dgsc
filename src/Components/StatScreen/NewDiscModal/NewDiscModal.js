import React, { Component } from 'react'
import './NewDiscModal.css';

export default class NewDiscModal extends Component {

  componentDidMount = () => {
    document.querySelector('body').style.width = '100%';
  }

  componentWillUnmount = () => {
    document.querySelector('body').style.width = '100%';    
  }

  toggleModal = (e) => {
    if(e.target.querySelector('.modal-wrapper')) {
      this.props.toggleNewDiscModal();
    }
  }

  // handleEnterKey = (e) => {
  //   if(e.key == 'Enter') {
  //     this.props.saveNewPlayer();
  //     e.preventDefault();
  //   }
  // }

  render() {
    return (
      <div className="modal-container" onClick={this.toggleModal}>
        <div className="modal-wrapper">
          <input name="disc-name-input" type="text" onKeyPress={this.handleEnterKey} placeholder="Disc Name" />
          <select name="disc-type-select" id="disc-type-select">
            <option defaultValue value="0">Putter</option> 
            <option value="1">Mid</option>
            <option value="2">Driver</option>
          </select>
          <div className="option-btn primary" onClick={this.props.addDisc}>Add Disc</div>
        </div>
      </div>
    )
  }
}
