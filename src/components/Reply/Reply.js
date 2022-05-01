import { Component } from 'react';
import styles from './Reply.module.css';

export default class Reply extends Component {
  render() {
    const { text } = this.props.reply;
    return <div className={styles.reply}>{text}</div>;
  }
}
