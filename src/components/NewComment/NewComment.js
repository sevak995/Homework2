import { Component } from 'react';
import styles from './NewComment.module.css';
import { QuoteContext } from '../../Context/contex';
import { toggleForm } from '../../utils/utils';

export default class NewCommnet extends Component {
  constructor(props) {
    super(props);
    this.state = { showForm: false };
    this.toggleForm = toggleForm.bind(this);
  }

  static contextType = QuoteContext;

  onAddComment(event) {
    event.preventDefault();
    const { quoteId } = this.props;
    const { value: text } = event.target[0];
    const { value: rate } = event.target[1];

    const newComment = { id: quoteId, text, rate: Number(rate) };

    const { addCommentHandler } = this.context;

    addCommentHandler(newComment);
    this.toggleForm();
  }

  render() {
    const { showForm } = this.state;

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
      <>
        <button
          onClick={() => this.toggleForm()}
          className={btn + ' ' + btnYellow}
        >
          Add new comment
        </button>
        {showForm && (
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
        )}
      </>
    );
  }
}
