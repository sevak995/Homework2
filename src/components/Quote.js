import { Component } from 'react';

export default class Quote extends Component {
  render() {
    const { text, author, comments, sectionName } = this.props.quoteData;
    return (
      <li className={sectionName === 'main' ? 'cart' : 'cart selected'}>
        <div>{text}</div>
        <div className="author">{author}</div>
        {comments.map((comment, i) => {
          return (
            <div key={i} className="comment">
              <div>{comment.text}</div>
              <div>{comment.value}</div>
            </div>
          );
        })}
      </li>
    );
  }
}
