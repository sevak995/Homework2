import { Component } from 'react';
import NewCommnet from './NewComment';
import Comment from './Comment';

export default class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = { showForm: false };
  }

  addCommentHandler(newComment) {
    this.props.addCommentHandler(newComment);
  }

  toggleForm(id) {
    console.log(id);
    this.setState((prev) => {
      return { showForm: !prev.showForm };
    });
  }

  onAddReplay(replay) {
    const { quote } = this.props;

    console.log(quote);

    this.props.onAddReplay({ ...replay, quoteId: quote.id });
  }

  render() {
    const { text, author, comments, sectionName, id } = this.props.quote;
    const { showForm } = this.state;

    return (
      <li className={sectionName === 'main' ? 'cart' : 'cart selected'}>
        <button onClick={() => this.toggleForm(id)} className="btn btn-delete">
          ADD NEW COMMENT
        </button>
        {showForm && (
          <NewCommnet
            quoteId={id}
            addComment={(newComment) => this.addCommentHandler(newComment)}
          />
        )}
        <div>{text}</div>
        <div className="author">{author}</div>
        {comments.map((comment, i) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              onAddReplay={(replay) => this.onAddReplay(replay)}
            />
          );
        })}
      </li>
    );
  }
}
