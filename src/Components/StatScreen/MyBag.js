import React, { Component } from 'react';

export default class MyBag extends Component {

  render() {
    const renderDiscType = (type) => {
      switch (type) {
        case 0:
          return <span className="disc-badge disc-p">putter</span>
          break;
        case 1:
          return <span className="disc-badge disc-m">mid</span>
          break;
        case 2:
          return <span className="disc-badge disc-d">driver</span>
          break;
        default:
          break;
      }
    };
    return (
      <div className="stat-block__table">
      <div className="stat-block-row">
        <span>My Bag ({this.props.myBag.length} discs)</span>
        <span className="add-disc-btn" onClick={this.props.toggleNewDiscModal}>+ Add Disc</span>
      </div>
      {this.props.myBag.map((disc,index) => {
        return (
          <div className="stat-block-row">
            <div className="row-disc-info">
              <span>{disc.discName}</span>
              <span>{renderDiscType(disc.discType)}</span>
            </div>
            <span onClick={() => this.props.removeDisc(index)} className="disc-remove">-</span>
          </div>
        );
      })}
    </div>
    );
  }

 }