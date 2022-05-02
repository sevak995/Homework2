import { Component } from 'react';
import NewCommnet from '../NewComment/NewComment';
import Comment from '../Comment/Comment';
import styles from './Quote.module.css';

export default class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = { showForm: false };
  }

  addCommentHandler(newComment) {
    this.props.addCommentHandler(newComment);
    this.setState({ showForm: false });
  }

  toggleForm(id) {
    console.log(id);
    this.setState((prev) => {
      return { showForm: !prev.showForm };
    });
  }

  onAddReply(reply) {
    const { quote } = this.props;

    this.props.onAddReply({ ...reply, quoteId: quote.id });
  }

  render() {
    const { text, author, comments, sectionName, id } = this.props.quote;
    const { showForm } = this.state;
    const {
      cart,
      selected,
      quoteInfo,
      quoteText,
      author: authorStyle,
      comments: commentsStyle,
      btn,
      btnYellow,
    } = styles;

    const ListClass = sectionName === 'main' ? cart : cart + ' ' + selected;

    return (
      <li className={ListClass}>
        <div className={quoteInfo}>
          <div className={quoteText}>{text}</div>
          <div className={authorStyle}>{author}</div>
        </div>
        <div>Comments</div>
        <div className={commentsStyle}>
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                onAddReply={(reply) => this.onAddReply(reply)}
              />
            );
          })}
        </div>
        <button
          onClick={() => this.toggleForm(id)}
          className={btn + ' ' + btnYellow}
        >
          Add new comment
        </button>
        {showForm && (
          <NewCommnet
            quoteId={id}
            addComment={(newComment) => this.addCommentHandler(newComment)}
          />
        )}
      </li>
    );
  }
}
