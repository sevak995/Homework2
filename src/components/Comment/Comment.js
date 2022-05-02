import { Component } from 'react';
import styles from './Comment.module.css';
import './Comment.module.css';
import NewReply from '../NewReply/NewReply';
import Reply from '../Reply/Reply';
import { returnStar } from '../../utils/utils';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { showReplyForm: false };
  }

  toggleForm() {
    this.setState((prev) => {
      return { showReplyForm: !prev.showReplyForm };
    });
  }

  onAddReply(reply) {
    this.props.onAddReply(reply);
    this.setState({ showReplyForm: false });
  }

  render() {
    const { text, value, id, replys } = this.props.comment;
    const { showReplyForm } = this.state;

    const {
      comment,
      commentInfo,
      btn,
      btnYellow,
      replysForm,
      replysList,
      commentGreen,
      commentYellow,
      commentRed,
      starRow,
    } = styles;

    const commentStyles =
      value > 8
        ? comment + ' ' + commentGreen
        : value > 4
        ? comment + ' ' + commentYellow
        : comment + ' ' + commentRed;

    const stars = new Array(value).fill(returnStar);

    return (
      <div className={commentStyles}>
        <div className={commentInfo}>
          <div>{text}</div>
          <div className={starRow}>
            {<div className={starRow}>{stars.map((star, i) => star(i))}</div>}
            <button
              onClick={() => this.toggleForm()}
              className={btn + ' ' + btnYellow}
            >
              Reply
            </button>
          </div>
        </div>

        {replys && (
          <div className={replysForm}>
            <div>Replys</div>
            <div className={replysList}>
              {replys.map((reply) => {
                return <Reply key={reply.id} reply={reply} />;
              })}
            </div>
          </div>
        )}

        {showReplyForm && (
          <NewReply onAddReply={(reply) => this.onAddReply(reply)} id={id} />
        )}
      </div>
    );
  }
}
