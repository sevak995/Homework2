import { Component } from 'react';
import styles from './NewReply.module.css';

export default class NewReply extends Component {
  onAddReply(event) {
    event.preventDefault();
    const { value: text } = event.target[0];
    const { id } = this.props;

    this.props.onAddReply({ text, commentId: id });
  }

  render() {
    const { replyForm, textarea, btn, btnYellow } = styles;

    return (
      <form onSubmit={(event) => this.onAddReply(event)} className={replyForm}>
        <div>
          <textarea className={textarea} placeholder="Text"></textarea>
        </div>
        <button className={btn + ' ' + btnYellow} type="submit">
          Submit
        </button>
      </form>
    );
  }
}
