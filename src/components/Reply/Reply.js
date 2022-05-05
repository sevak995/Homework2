import { PureComponent } from 'react';
import styles from './Reply.module.css';

export default class Reply extends PureComponent {
  render() {
    const { text } = this.props.reply;
    return <div className={styles.reply}>{text}</div>;
  }
}
