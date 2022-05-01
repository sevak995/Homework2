import React, { Component } from 'react';
import styles from './SelectedQuote.module.css';
import { returnStar } from '../../utils/utils';

export default class SelectedQuote extends Component {
  onDelete(id) {
    this.props.onDelete(id);
  }

  render() {
    const { id, text, author, mean } = this.props.quote;
    const {
      cart,
      starRow,
      mean: meanStyles,
      btn,
      btnYellow,
      author: authorStyles,
    } = styles;

    const stars = new Array(Math.round(mean)).fill(returnStar);

    return (
      <li className={cart}>
        {<div className={starRow}>{stars.map((star) => star())}</div>}
        <div className={meanStyles}>Mean: {mean.toFixed(2)}</div>
        <button
          className={btn + ' ' + btnYellow}
          onClick={() => this.onDelete(id)}
        >
          Delete from {this.constructor.name}
        </button>
        <div>{text}</div>
        <div className={authorStyles}>{author}</div>
      </li>
    );
  }
}
