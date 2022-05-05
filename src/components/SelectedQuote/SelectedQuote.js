import React, { Component, PureComponent } from 'react';
import styles from './SelectedQuote.module.css';
import { returnStar } from '../../utils/utils';
import { QuoteContext } from '../../Context/contex';

export default class SelectedQuote extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.quote !== this.props.quote) {
      return true;
    }

    return false;
  }

  onDelete(id) {
    this.props.onDelete(id);
  }

  render() {
    console.log('SelectedQuote');
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
        {<div className={starRow}>{stars.map((star, i) => star(i))}</div>}
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
