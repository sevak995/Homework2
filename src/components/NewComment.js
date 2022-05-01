import { Component } from 'react';

export default class NewCommnet extends Component {
  onAddComment(event) {
    event.preventDefault();
    const { quoteId } = this.props;
    const { value: text } = event.target[0];
    const { value: rate } = event.target[1];

    console.log(rate);

    const NewComment = { id: quoteId, text, rate };

    this.props.addComment(NewComment);
  }

  render() {
    return (
      <form onSubmit={(event) => this.onAddComment(event)}>
        <div className="newComment-form">
          <textarea placeholder="Text"></textarea>
          <input
            placeholder="Rate"
            className="rate-input"
            name="rate"
            type="number"
            min="0"
            max="10"
          ></input>
        </div>
        <button className="btn btn-delete" type="submit">
          Submit
        </button>
      </form>
    );
  }
}
