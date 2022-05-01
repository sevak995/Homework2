import { Component } from 'react';
import NewCommnet from './NewComment';
import Comment from './Comment';
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

  onAddReplay(replay) {
    const { quote } = this.props;

    this.props.onAddReplay({ ...replay, quoteId: quote.id });
  }

  render() {
    const { text, author, comments, sectionName, id } = this.props.quote;
    const { showForm } = this.state;

    const ListClass =
      sectionName === 'main'
        ? styles.cart
        : styles.cart + ' ' + styles.selected;

    return (
      <li className={ListClass}>
        <div className={styles['quote-info']}>
          <div className={styles['quote-text']}>{text}</div>
          <div className={styles.author}>{author}</div>
        </div>
        <div>Comments</div>
        <div className={styles.comments}>
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                onAddReplay={(replay) => this.onAddReplay(replay)}
              />
            );
          })}
        </div>
        <button
          onClick={() => this.toggleForm(id)}
          className={styles.btn + ' ' + styles['btn-yellow']}
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
