import { Component } from 'react';
import styles from './NewComment.module.css';

export default class NewCommnet extends Component {
  onAddComment(event) {
    event.preventDefault();
    const { quoteId } = this.props;
    const { value: text } = event.target[0];
    const { value: rate } = event.target[1];

    const newComment = { id: quoteId, text, rate: Number(rate) };

    this.props.addComment(newComment);
  }

  render() {
    const {
      newCommentForm,
      newCommentInput,
      textarea,
      rateIabel,
      rateInput,
      btn,
      btnYellow,
    } = styles;

    return (
      <form onSubmit={(event) => this.onAddComment(event)}>
        <div className={newCommentForm}>
          <div className={newCommentInput}>
            <textarea
              placeholder="Text"
              className={textarea}
              required
            ></textarea>
            <div className={rateIabel}>Rate</div>
            <input
              className={rateInput}
              name="rate"
              type="number"
              min="0"
              max="10"
              required
            ></input>
          </div>
          <button className={btn + ' ' + btnYellow} type="submit">
            Submit
          </button>
        </div>
      </form>
    );
  }
}
