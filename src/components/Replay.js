import { Component } from 'react';

export default class Replay extends Component {
  onAddReplay(event) {
    event.preventDefault();
    const { value: text } = event.target[0];
    const { id } = this.props;

    this.props.onAddReplay({ text, commentId: id });
  }

  render() {
    return (
      <form onSubmit={(event) => this.onAddReplay(event)}>
        <div className="newComment-form">
          <textarea placeholder="Text"></textarea>
        </div>
        <button className="btn btn-delete" type="submit">
          Submit
        </button>
      </form>
    );
  }
}
