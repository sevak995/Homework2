import { Component } from 'react';
import NewCommnet from '../NewComment/NewComment';
import Comment from '../Comment/Comment';
import styles from './Quote.module.css';

export default class Quote extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.quote.comments !== this.props.quote.comments ||
      nextState !== this.state
    ) {
      return true;
    }

    return false;
  }

  render() {
    const { text, author, comments, sectionName, id } = this.props.quote;
    const {
      cart,
      selected,
      quoteInfo,
      quoteText,
      author: authorStyle,
      comments: commentsStyle,
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
            return <Comment key={comment.id} comment={comment} quoteId={id} />;
          })}
        </div>
        <NewCommnet quoteId={id} />
      </li>
    );
  }
}
