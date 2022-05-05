import { Component } from 'react';
import styles from './NewReply.module.css';
import { QuoteContext } from '../../Context/contex';

export default class NewReply extends Component {
  constructor(props) {
    super(props);
    this.state = { showReplyForm: false };
  }
  static contextType = QuoteContext;

  onAddReply(event) {
    event.preventDefault();
    const { value: text } = event.target[0];
    const { commentId, quoteId } = this.props;

    const { onAddReply } = this.context;

    onAddReply({ text, commentId, quoteId });
    this.toggleForm();
  }

  toggleForm() {
    this.setState((prev) => {
      return { showReplyForm: !prev.showReplyForm };
    });
  }

  render() {
    const { replyForm, textarea, btn, btnYellow, btn_submit } = styles;
    const { showReplyForm } = this.state;

    return (
      <>
        <button
          onClick={() => this.toggleForm()}
          className={btn + ' ' + btnYellow}
        >
          Reply
        </button>

        {showReplyForm && (
          <form
            onSubmit={(event) => this.onAddReply(event)}
            className={replyForm}
          >
            <div>
              <textarea
                className={textarea}
                placeholder="Text"
                required
              ></textarea>
            </div>
            <button
              className={btn + ' ' + btnYellow + ' ' + btn_submit}
              type="submit"
            >
              Submit
            </button>
          </form>
        )}
      </>
    );
  }
}
