import { Component } from 'react';
import styles from './NewReplay.module.css';

export default class Replay extends Component {
  onAddReplay(event) {
    event.preventDefault();
    const { value: text } = event.target[0];
    const { id } = this.props;

    this.props.onAddReplay({ text, commentId: id });
  }

  render() {
    return (
      <form
        onSubmit={(event) => this.onAddReplay(event)}
        className={styles['replay-form']}
      >
        <div>
          <textarea className={styles.textarea} placeholder="Text"></textarea>
        </div>
        <button
          className={styles.btn + ' ' + styles['btn-yellow']}
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}
