import { Component } from 'react';
import styles from './NewComment.module.css';

export default class NewCommnet extends Component {
  onAddComment(event) {
    event.preventDefault();
    const { quoteId } = this.props;
    const { value: text } = event.target[0];
    const { value: rate } = event.target[1];

    console.log(rate);

    const NewComment = { id: quoteId, text, rate };

    this.props.addComment(NewComment);
  }

  render() {
    return (
      <form onSubmit={(event) => this.onAddComment(event)}>
        <div className={styles['newComment-form']}>
          <div className={styles['newComment-input']}>
            <textarea placeholder="Text" className={styles.textarea}></textarea>
            <div className={styles['rate-label']}>Rate</div>
            <input
              className={styles['rate-input']}
              name="rate"
              type="number"
              min="0"
              max="10"
            ></input>
          </div>
          <button
            className={styles['btn'] + ' ' + styles['btn-yellow']}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}
