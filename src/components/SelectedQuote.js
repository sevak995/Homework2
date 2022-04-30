import React, { Component } from 'react';

export default class SelectedQuote extends Component {
  onDelete(id) {
    this.props.onDelete(id);
  }

  render() {
    const { id, text, author, mean } = this.props.quote;

    return (
      <li className="cart">
        <div className="mean">Mean: {mean.toFixed(2)}</div>
        <button className="btn btn-delete" onClick={() => this.onDelete(id)}>
          Delete from {this.constructor.name}
        </button>
        <div>{text}</div>
        <div className="author">{author}</div>
      </li>
    );
  }
}
