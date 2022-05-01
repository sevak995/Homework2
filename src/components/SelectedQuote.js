import React, { Component } from 'react';
import styles from './SelectedQuote.module.css';

export default class SelectedQuote extends Component {
  onDelete(id) {
    this.props.onDelete(id);
  }

  render() {
    const { id, text, author, mean } = this.props.quote;

    return (
      <li className={styles.cart}>
        <div className={styles.mean}>Mean: {mean.toFixed(2)}</div>
        <button
          className={styles.btn + ' ' + styles['btn-yellow']}
          onClick={() => this.onDelete(id)}
        >
          Delete from {this.constructor.name}
        </button>
        <div>{text}</div>
        <div className={styles.author}>{author}</div>
      </li>
    );
  }
}
