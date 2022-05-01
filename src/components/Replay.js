import { Component } from 'react';
import styles from './Replay.module.css';

export default class Replay extends Component {
  render() {
    const { text } = this.props.replay;
    return <div className={styles.replay}>{text}</div>;
  }
}
